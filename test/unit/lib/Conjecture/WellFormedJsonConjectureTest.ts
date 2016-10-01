import {expect}                 from "chai";
import WellFormedJsonConjecture from "../../../../lib/Conjecture/WellFormedJsonConjecture";

describe("WellFormedJsonConjecture", () => {
    describe("#validate()", () => {
        (<Array<[WellFormedJsonConjecture, boolean]>> [
            [
                new WellFormedJsonConjecture("\"Test well-formed JSON\""),
                true,
            ],
            [
                new WellFormedJsonConjecture("Test not well-formed JSON"),
                false,
            ],
        ]).forEach(test => {
            it("should return the value expected", () => {
                const actual = test[0].validate();
                expect(actual).to.equal(test[1]);
            });
        });
    });

    describe("#report", () => {
        (<Array<[WellFormedJsonConjecture, string]>> [
            [
                new WellFormedJsonConjecture("\"Test well-formed JSON\""),
                "have body \"Test well-formed JSON\" well-formed JSON",
            ],
        ]).forEach(test => {
            it("should return the value expected", () => {
                const actual = test[0].report();
                expect(actual).to.equal(test[1]);
            });
        });
    });
});
