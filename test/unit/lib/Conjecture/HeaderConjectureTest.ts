import {expect}         from "chai";
import HeaderConjecture from "../../../../lib/Conjecture/HeaderConjecture";

describe("HeaderConjecture", () => {
    describe("#something()", () => {
        [
            [
                /* sut */ new HeaderConjecture(
                    {"unexpected-name": "Test value"},
                    "Test-Name",
                    "Test value"
                ),
                /* validate */ false,
                /* reason */ "Expected <actual> to have header <expected>",
                /* !reason */ "Expected <actual> not to have header <expected>",
                /* expected */ "Test-Name",
                /* actual */ {"unexpected-name": "Test value"},
            ],
        ].forEach((test: Array<any>) => {
            it("should return the value expected", () => {
                const [sut, validate, reason, reason2, expected, actual] = test;
                const result = sut.something();
            });
        });
    });

    describe("#describe()", () => {
        [
            [
               new HeaderConjecture(
                    {"unexpected-name": "Test value"},
                    "Test-Name",
                    "Test value"
               ),
               {
                   confirmed: "Expected <actual> to have header <expected>",
                   infirmed:  "Expected <actual> not to have header <expected>",
                   expected:  "Test-Name",
                   actual:    {"unexpected-name": "Test value"},
               },
            ],
            [
               new HeaderConjecture(
                    {"test-name": "Test value"},
                    "Test-Name",
                    "Test value"
               ),
               {
                   confirmed: "Expected header \"Test-Name\" value <actual> to equal <expected>",
                   infirmed:  "Expected header \"Test-Name\" value <actual> not to equal <expected>",
                   expected:  "Test value",
                   actual:    "Test value",
               },
            ],
        ].forEach((test: [HeaderConjecture, any]) => {
            it("should return the expected value", () => {
                const description = test[0].describe();
                const actual = description.confirm("<expected>", "<actual>");
                expect(actual).to.equal(test[1].confirmed);
            });

            it("should return the expected value", () => {
                const description = test[0].describe();
                const actual = description.infirm("<expected>", "<actual>");
                expect(actual).to.equal(test[1].infirmed);
            });

            it("should return the expected value", () => {
                const description = test[0].describe();
                const actual = description.expected;
                expect(actual).to.deep.equal(test[1].expected);
            });

            it("should return the expected value", () => {
                const description = test[0].describe();
                const actual = description.actual;
                expect(actual).to.deep.equal(test[1].actual);
            });
        });
    });

    describe("#validate()", () => {
        for (const test of <Array<[HeaderConjecture, boolean]>> [
            [
                new HeaderConjecture(
                    {"unexpected-name": "Unexpected value"},
                    "Test-Name",
                    "Test value"
                ),
                false,
            ],
            [
                new HeaderConjecture(
                    {"test-name": "Unexpected value"},
                    "Test-Name",
                    "Test value"
                ),
                false,
            ],
            [
                new HeaderConjecture(
                    {"unexpected-name": "Test value"},
                    "Test-Name",
                    "Test value"
                ),
                false,
            ],
            [
                new HeaderConjecture(
                    {"test-name": "Test value"},
                    "Test-Name",
                    "Test value"
                ),
                true,
            ],
            [
                new HeaderConjecture(
                    {"test-name": ">>> Unexpected value <<<"},
                    "Test-Name",
                    /Test value/
                ),
                false,
            ],
            [
                new HeaderConjecture(
                    {"test-name": ">>> Test value <<<"},
                    "Test-Name",
                    /Test value/
                ),
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

    describe("#report", () => {
        for (const test of <Array<[HeaderConjecture, string]>> [
            [
                new HeaderConjecture(
                    {"test-name": "Unexpected value"},
                    "Test-Name",
                    "Test value"
                ),
                "have header \"Test-Name\" with value \"Unexpected value\" equal to \"Test value\""
            ],
            [
                new HeaderConjecture(
                    {"test-name": ">>> Unexpected value <<<"},
                    "Test-Name",
                    /Test value/
                ),
                "have header \"Test-Name\" with value \">>> Unexpected value <<<\" matching /Test value/",
            ],
        ]) {
            (test => {
                it("should return the value expected", () => {
                    const actual = test[0].report();
                    expect(actual).to.equal(test[1]);
                });
            })(test);
        }
    });
});
