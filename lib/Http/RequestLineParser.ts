import {RequestOptions} from "http";

export default class RequestLineParser
{
    /**
     * @param {string} hostname The host name or IP address.
     * @param {number} port     The port.
     *
     * @todo Inherit from base class (see RequestFactory).
     */
    public constructor(private hostname: string, private port: number)
    {
    }

    /**
     * @param {string} requestLine The request line.
     *
     * @returns {RequestOptions} The parsed request options.
     *
     * @throws {Error} Thrown if the request line is malformed.
     */
    public parse(requestLine: string): RequestOptions
    {
        const matches = requestLine.match(/^([A-Z]+)\s+(.+)$/);

        if (matches === null) {
            throw new Error("Malformed request line");
        }

        return {
            method:   matches[1],
            hostname: this.hostname,
            port:     this.port,
            path:     matches[2],
        };
    }
}
