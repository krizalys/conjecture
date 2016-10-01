import {expect}                 from "chai";
import AndConjecture            from "../../../../lib/Conjecture/AndConjecture";
import HeaderConjecture         from "../../../../lib/Conjecture/HeaderConjecture";
import WellFormedJsonConjecture from "../../../../lib/Conjecture/WellFormedJsonConjecture";

describe("AndConjecture", () => {
    describe("#validate()", () => {
        for (const test of <Array<[AndConjecture, boolean]>> [
            [
                new AndConjecture([
                    new HeaderConjecture(
                        {"content-type": "application/xml"},
                        "Content-Type",
                        /^application\/json($|;)?/
                    ),
                    new WellFormedJsonConjecture("\"Test well-formed JSON\"")
                ]),
                false,
            ],
            [
                new AndConjecture([
                    new HeaderConjecture(
                        {"content-type": "application/json"},
                        "Content-Type",
                        /^application\/json($|;)?/
                    ),
                    new WellFormedJsonConjecture("Test not well-formed JSON")
                ]),
                false,
            ],
            [
                new AndConjecture([
                    new HeaderConjecture(
                        {"content-type": "application/json"},
                        "Content-Type",
                        /^application\/json($|;)?/
                    ),
                    new WellFormedJsonConjecture("\"Test well-formed JSON\"")
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
