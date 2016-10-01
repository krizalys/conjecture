import Ajv                   = require("ajv");
import * as chai             from "chai";
import {expect}              from "chai";
import * as sinon            from "sinon";
import * as sinonChai        from "sinon-chai";
import AjvJsonSchemaCompiler from "../../../../../../lib/Json/Schema/Compiler/AjvJsonSchemaCompiler";

chai.use(sinonChai);

describe("AjvJsonSchemaCompiler", () => {
    describe("#compile()", () => {
        it("should call Ajv#compile() once with arguments expected", () => {
            const ajv = <Ajv.Ajv> <any> {
                compile: sinon.spy(),
            };

            const sut = new AjvJsonSchemaCompiler(ajv);
            sut.compile({test: "Test JSON schema"});

            expect(ajv.compile).to.have.been
                .calledOnce
                .calledWithExactly({test: "Test JSON schema"});
        });
    });
});
