import Ajv            = require("ajv");
import * as chai      from "chai";
import {expect}       from "chai";
import * as sinon     from "sinon";
import * as sinonChai from "sinon-chai";
import AjvJsonSchema  from "../../../../../lib/Json/Schema/AjvJsonSchema";

chai.use(sinonChai);

describe("AjvJsonSchema", () => {
    describe("#validate()", () => {
        it("should call the callback once with arguments expected", () => {
            const validateCallback = <Ajv.ValidateFunction> <any> sinon.spy();
            const sut              = new AjvJsonSchema(validateCallback);
            sut.validate("Test data");

            expect(validateCallback).to.have.been
                .calledOnce
                .calledWithExactly("Test data");
        });
    });
});
