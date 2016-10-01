import {expect}          from "chai";
import StatusConjecture  from "../../../../lib/Conjecture/StatusConjecture";
import {StatusInterface} from "../../../../lib/interfaces";

describe("StatusConjecture", () => {
    describe("#describe()", () => {
        (<Array<[StatusConjecture, any]>> [
            [
                new StatusConjecture(
                    <StatusInterface> {statusMessage: "No status code"},
                    123,
                    "Test Reason Phrase"
                ),
                {
                    confirmed: "Expected <actual> to have a status code",
                    infirmed:  "Expected <actual> not to have a status code",
                    expected:  null,
                    actual:    {statusMessage: "No status code"},
                },
            ],
            [
                new StatusConjecture(
                    {statusCode: 999, statusMessage: "Unexpected Reason Phrase"},
                    123,
                    "Test Reason Phrase"
                ),
                {
                    confirmed: "Expected status code <actual> to equal <expected>",
                    infirmed:  "Expected status code <actual> not to equal <expected>",
                    expected:  123,
                    actual:    999,
                },
            ],
            [
                new StatusConjecture(
                    {statusCode: 123, statusMessage: "Unexpected Reason Phrase"},
                    123,
                    "Test Reason Phrase"
                ),
                {
                    confirmed: "Expected reason phrase <actual> to equal <expected>",
                    infirmed:  "Expected reason phrase <actual> not to equal <expected>",
                    expected:  "Test Reason Phrase",
                    actual:    "Unexpected Reason Phrase",
                },
            ],
        ]).forEach(test => {
            it("should return the value expected", () => {
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
        (<Array<[StatusConjecture, boolean]>> [
            [
                new StatusConjecture(
                    {statusCode: 999, statusMessage: "Unexpected Reason Phrase"},
                    123,
                    "Test Reason Phrase"
                ),
                false,
            ],
            [
                new StatusConjecture(
                    {statusCode: 123, statusMessage: "Unexpected Reason Phrase"},
                    123,
                    "Test Reason Phrase"
                ),
                false,
            ],
            [
                new StatusConjecture(
                    {statusCode: 999, statusMessage: "Test Reason Phrase"},
                    123,
                    "Test Reason Phrase"
                ),
                false,
            ],
            [
                new StatusConjecture(
                    {statusCode: 123, statusMessage: "Test Reason Phrase"},
                    123,
                    "Test Reason Phrase"
                ),
                true,
            ],
        ]).forEach(test => {
            it("should return the value expected", () => {
                const actual = test[0].validate();
                expect(actual).to.equal(test[1]);
            });
        });
    });
});
