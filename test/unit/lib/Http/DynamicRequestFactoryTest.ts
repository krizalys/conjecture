import * as chai             from "chai";
import {expect}              from "chai";
import * as sinon            from "sinon";
import * as sinonChai        from "sinon-chai";
import DynamicRequestFactory from "../../../../lib/Http/DynamicRequestFactory";
import RequestFactory        from "../../../../lib/Http/RequestFactory";
import RequestLineParser     from "../../../../lib/Http/RequestLineParser";

chai.use(sinonChai);

describe("DynamicRequestFactory", () => {
    describe("#create()", () => {
        it("should call RequestFactory#create() on factory as expected", () => {
            const factory = <RequestFactory> <any> {create: sinon.spy()};
            const parser  = <RequestLineParser> <any> {parse: sinon.spy()};
            const sut     = new DynamicRequestFactory(factory, parser);

            sut.create({
                method: "METHOD",
                path:   "/path",
            });

            expect(factory.create).to.have.been
                .calledOnce
                .calledWithExactly({
                    method: "METHOD",
                    path:   "/path",
                });
        });

        it("should call RequestLineParser#parse() on parser as expected", () => {
            const factory = <RequestFactory> <any> {create: sinon.spy()};
            const parser  = <RequestLineParser> <any> {parse: sinon.spy()};
            const sut     = new DynamicRequestFactory(factory, parser);
            sut.create("METHOD /path");

            expect(parser.parse).to.have.been
                .calledOnce
                .calledWithExactly("METHOD /path");
        });

        it("should throw an Error", () => {
            const factory = <RequestFactory> <any> {create: sinon.spy()};
            const parser  = <RequestLineParser> <any> {parse: sinon.spy()};
            const sut     = new DynamicRequestFactory(factory, parser);

            expect(() => {
                sut.create(["Unsupported type"]);
            }).to.throw(Error);

        });
    });
});
