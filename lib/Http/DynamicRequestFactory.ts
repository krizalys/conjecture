import {RequestOptions}  from "http";
import RequestFactory    from "./RequestFactory";
import RequestLineParser from "./RequestLineParser";

export default class DynamicRequestFactory
{
    public constructor(
        private requestFactory: RequestFactory,
        private requestLineParser: RequestLineParser
    )
    {
    }

    /**
     * @param {any} data The data.
     *
     * @returns {RequestOptions} The parsed request options.
     *
     * @todo Define a custom interface for data.
     * @todo Rename data into options, or similar.
     */
    public create(data: any): RequestOptions
    {
        const type = Object.prototype.toString.call(data);

        switch (type) {
            case "[object Object]":
                return this
                    .requestFactory
                    .create(data);

            case "[object String]":
                return this
                    .requestLineParser
                    .parse(data);

            default:
                throw new Error(`Unsupported input type ${type}`);
        }
    }
}
