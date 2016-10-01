import {expect}       from "chai";
import RequestFactory from "../../../../lib/Http/RequestFactory";

describe("RequestFactory", () => {
    describe("#create()", () => {
        it("should return the value expected", () => {
            const sut = new RequestFactory("te.st", 123);

            const actual = sut.create({
                method: "METHOD",
                path:   "/path",
            });

            expect(actual).to.eql({
                method:   "METHOD",
                hostname: "te.st",
                port:     123,
                path:     "/path",
            });
        });
    });
});
