import {expect}      from "chai";
import AndConjecture from "../../../../lib/Conjecture/AndConjecture";

describe("AndConjecture", () => {
    describe("#validate()", () => {
        for (const test of <Array<[AndConjecture, boolean]>> [
            [
                new AndConjecture([
                    {validate: (): boolean => false, report: (): string => ""},
                    {validate: (): boolean => false, report: (): string => ""},
                ]),
                false,
            ],
            [
                new AndConjecture([
                    {validate: (): boolean => false, report: (): string => ""},
                    {validate: (): boolean => true, report: (): string => ""},
                ]),
                false,
            ],
            [
                new AndConjecture([
                    {validate: (): boolean => true, report: (): string => ""},
                    {validate: (): boolean => false, report: (): string => ""},
                ]),
                false,
            ],
            [
                new AndConjecture([
                    {validate: (): boolean => true, report: (): string => ""},
                    {validate: (): boolean => true, report: (): string => ""},
                ]),
                true,
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
