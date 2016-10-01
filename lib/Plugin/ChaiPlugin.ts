import Ajv                       = require("ajv");
import * as http                 from "http";
import * as https                from "https";
import AndConjecture             from "../Conjecture/AndConjecture";
import HeaderConjecture          from "../Conjecture/HeaderConjecture";
import StatusConjecture          from "../Conjecture/StatusConjecture";
import ValidJsonConjecture       from "../Conjecture/ValidJsonConjecture";
import WellFormedJsonConjecture  from "../Conjecture/WellFormedJsonConjecture";
import DynamicRequestFactory     from "../Http/DynamicRequestFactory";
import RequestFactory            from "../Http/RequestFactory";
import RequestLineParser         from "../Http/RequestLineParser";
import AjvJsonSchemaCompiler     from "../Json/Schema/Compiler/AjvJsonSchemaCompiler";

class Client
{
    public constructor(private secure: boolean = false)
    {
    }

    public request(requestOptions: http.RequestOptions)
    {
        return new Promise((resolve, reject) => {
            let req;

            if (this.secure) {
                const opts = Object.assign({
                    rejectUnauthorized: false, /** @todo Should be configurable from caller. */
                }, requestOptions);

                req = https.request(opts);
            } else {
                req = http.request(requestOptions);
            }

            req.on("response", response => {
                let body = "";

                response.on("data", chunk => {
                    body += String(chunk);
                });

                response.on("end", () => {
                    resolve({response: response, body: body});
                });
            });

            req.on("error", reject);
            req.end();
        });
    }
}

declare module Chai
{
    interface Assertion
    {
        status(
            code: number,
            reasonPhrase: string,
            callback?: (error?: Error) => any
        ): Assertion;

        json(
            schema,
            callback?: (error?: Error) => any
        ): Assertion;
    }
}

export default function ChaiPlugin(chai, utils): void
{
    const Assertion = chai.Assertion;
    const client    = new Client(true) /** @todo Pass these at run time through chai.conjecture(...) or similar. */;
    const factory   = new RequestFactory("localhost", 8443); /** @todo Pass these at run time through chai.conjecture(...) or similar. */
    const parser    = new RequestLineParser("localhost", 8443); /** @todo Pass these at run time through chai.conjecture(...) or similar. */

    const dynamicFactory = new DynamicRequestFactory(
        factory,
        parser
    );

    Assertion.addMethod(
        "status",
        function (
            code: number,
            reasonPhrase: string,
            callback?: (error?: Error) => any
        ) {
            const opts = dynamicFactory.create(this._obj);

            return client
                .request(opts)
                .then((result: any): any => {
                    const conjecture = new StatusConjecture(
                        result.response,
                        code,
                        reasonPhrase
                    );

                    const description = conjecture.describe();

                    this.assert(
                        conjecture.validate(),
                        description.confirm("#{exp}", "#{act}"),
                        description.infirm("#{exp}", "#{act}"),
                        description.expected,
                        description.actual
                    );

                    if (undefined !== callback) {
                        callback(null);
                        return;
                    }

                    return Promise.resolve();
                })
                .catch(error => undefined !== callback ?
                    callback(error)
                    : Promise.reject(error)
                );
        }
    );

    Assertion.addMethod(
        "json",
        function (
            schema,
            callback?: (error?: Error) => any
        ) {
            const opts = dynamicFactory.create(this._obj);

            return client
                .request(opts)
                .then((result: any): any => {
                    const json = result.body;

                    const conjecture1 = new AndConjecture([
                        new HeaderConjecture(
                            result.response.headers,
                            "Content-Type",
                            /^application\/json($|;)?/
                        ),
                        new WellFormedJsonConjecture(json)
                    ]);

                    this.assert(
                        conjecture1.validate(),
                        `expected to ${conjecture1.report()}`,
                        `expected not to ${conjecture1.report()}`
                    )

                    const data = JSON.parse(json);
                    const ajv = new Ajv();
                    const compiler = new AjvJsonSchemaCompiler(ajv);
                    schema = compiler.compile(schema);
                    const conjecture2 = new ValidJsonConjecture(schema, data);

                    this.assert(
                        conjecture2.validate(),
                        "Expected JSON to validate schema",
                        "Expected JSON not to validate schema",
                        "a", "b"
                    );

                    if (undefined !== callback) {
                        callback(null);
                        return;
                    }

                    return Promise.resolve();
                });
        }
    );
}
