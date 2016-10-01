import {expect}          from "chai";
import RequestLineParser from "../../../../lib/Http/RequestLineParser";

describe("RequestLineParser", () => {
    describe("#parse()", () => {
        it("should return the value expected", () => {
            const sut    = new RequestLineParser("te.st", 123);
            const actual = sut.parse("METHOD /path");

            expect(actual).to.eql({
                method:   "METHOD",
                hostname: "te.st",
                port:     123,
                path:     "/path",
            });
        });

        it("should throw an Error", () => {
            const sut = new RequestLineParser("te.st", 123);

            expect(() => {
                sut.parse("MALFORMED/request/line");
            }).to.throw(Error);
        });
    });
});
