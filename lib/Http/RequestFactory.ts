import {RequestOptions} from "http";

export default class RequestFactory
{
    /**
     * @param {string} hostname The host name or IP address.
     * @param {number} port     The port.
     *
     * @todo Inherit from base class (see RequestLineParser).
     */
    public constructor(private hostname: string, private port: number)
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
        return Object.assign({
            hostname: this.hostname,
            port:     this.port,
        }, data);
    }
}
