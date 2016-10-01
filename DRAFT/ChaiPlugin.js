chai.use((chai, utils) => {
    const Assertion = chai.Assertion;

    /**
     * @todo Allow the called to decide whether to wait for/aggregate/return the
     *       body.
     * @todo Return the body as stream, or allow it to be returned as a stream.
     */
    function helper(requestOptions)
    {
        return new Promise((resolve, reject) => {
            const request = http.request(requestOptions);

            request.on("response", response => {
                let body = "";

                response.on("data", chunk => {
                    body += String(chunk);
                });

                response.on("end", () => {
                    resolve({response: response, body: body});
                });
            });

            request.on("error", reject);
            request.end();
        });
    }

    Assertion.addMethod("status", function (code, reasonPhrase, callback) {
        return helper(this._obj)
            .then(result => {
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
    });

    Assertion.addMethod("json", function (schema, callback) {
        return helper(this._obj)
            .then(result => {
                const json = result.body;

                let conjecture = new AndConjecture([
                    new HeaderConjecture(
                        result.response.headers,
                        "Content-Type",
                        /^application\/json($|;)?/
                    ),
                    new WellFormedJsonConjecture(json)
                ]);

                this.assert(
                    conjecture.validate(),
                    `expected to ${conjecture.report()}`,
                    `expected not to ${conjecture.report()}`
                )

                const data = JSON.parse(json);
                const ajv = new Ajv();
                const compiler = new AjvJsonSchemaCompiler(ajv);
                schema = compiler.compile(schema);
                conjecture = new ValidJsonConjecture(schema, data);

                this.assert(
                    conjecture.validate(),
                    "Expected JSON to validate schema",
                    "Expected JSON not to validate schema",
                    "a", "b"
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
    });

    /*Assertion.addMethod("body", format => {
        const request = http.request(this._obj);

        request.on("response", response => {
            let body = "";

            response.on("data", chunk => {
                body += String(chunk);
            });

            response.end(() => {
                const conjecture = new WellFormedJsonConjecture(body);
            });
        });

        request.end();

        return {
            validating: (schema) => {

            },
        };
    });*/
});
