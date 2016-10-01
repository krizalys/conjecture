import {expect}            from "chai";
import ValidJsonConjecture from "../../../../lib/Conjecture/ValidJsonConjecture";

describe("ValidJsonConjecture", () => {
    describe("#validate()", () => {
        (<Array<[ValidJsonConjecture, boolean]>> [
            [
                new ValidJsonConjecture(
                    {validate: (data: any): boolean => true},
                    "Test data"
                ),
                true,
            ],
            [
                new ValidJsonConjecture(
                    {validate: (data: any): boolean => false},
                    "Test data"
                ),
                false,
            ],
        ]).forEach(test => {
            it("should return the value expected", () => {
                const actual = test[0].validate();
                expect(actual).to.equal(test[1]);
            });
        });
    });
});
