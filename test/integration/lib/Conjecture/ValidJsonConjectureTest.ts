import Ajv                   = require("ajv");
import {expect}              from "chai";
import AjvJsonSchemaCompiler from "../../../../lib/Json/Schema/Compiler/AjvJsonSchemaCompiler";
import ValidJsonConjecture   from "../../../../lib/Conjecture/ValidJsonConjecture";

describe("ValidJsonConjecture", () => {
    describe("#validate()", () => {
        const ajv      = new Ajv();
        const compiler = new AjvJsonSchemaCompiler(ajv);

        for (const test of <Array<[ValidJsonConjecture, boolean]>> [
            [
                new ValidJsonConjecture(compiler.compile({
                    "type": "string",
                }), "Test data"),
                true,
            ],
            [
                new ValidJsonConjecture(compiler.compile({
                    "type": "number",
                }), "Test data"),
                false,
            ],
        ]) {
            (test => {
                it("should return the value expected", () => {
                    const actual = test[0].validate();
                    expect(actual).to.equal(test[1]);
                });
            })(test);
        }
    });
});
