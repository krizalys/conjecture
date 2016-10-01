import {Describable, DescriptionInterface, HeaderBagInterface, Reportable, Validatable} from "../interfaces";

export default class HeaderConjecture implements Describable, Validatable, Reportable
{
    /**
     * @param {ResponseInterface} headers The actual headers.
     * @param {string}            name    The expected header name.
     * @param {string|RegExp}     value   The expected header value.
     */
    public constructor(
        private headers: HeaderBagInterface,
        private name:    string,
        private value:   string|RegExp
    )
    {
    }

    /**
     * @deprecated
     *
     * @todo Remove
     */
    public something(): any
    {
        return {
            validate: this.validate(),
            reason: "",
            reason2: "",
            expected: this.value,
            actual: this.headers[this.name],
        };
    }

    /**
     * @todo JSDoc
     */
    public describe(): DescriptionInterface
    {
        const name    = this.normalizeName();
        const headers = this.headers;

        if (name in headers) {
            return {
                confirm:  (expected: any, actual: any) => `Expected header "${this.name}" value ${actual} to equal ${expected}`,
                infirm:   (expected: any, actual: any) => `Expected header "${this.name}" value ${actual} not to equal ${expected}`,
                expected: this.value,
                actual:   headers[name],
            };
        }

        return {
            confirm:  (expected: any, actual: any) => `Expected ${actual} to have header ${expected}`,
            infirm:   (expected: any, actual: any) => `Expected ${actual} not to have header ${expected}`,
            expected: this.name,
            actual:   headers,
        };
    }

    /**
     * @returns {boolean}
     *
     * @throws {Error} Thrown if the value is neither a string nor a RegExp.
     */
    public validate(): boolean
    {
        const type = Object
            .prototype
            .toString
            .call(this.value);

        switch (type) {
            case "[object String]":
                return this.validateString();

            case "[object RegExp]":
                return this.validateRegExp();

            default:
                throw new Error("The value must be a string or a RegExp");
        }
    }

    /**
     * @returns {string}
     *
     * @throws {Error} Thrown if the value is neither a string nor a RegExp.
     *
     * @deprecated
     *
     * @todo Remove
     */
    public report(): string
    {
        const type = Object
            .prototype
            .toString
            .call(this.value);

        switch (type) {
            case "[object String]":
                return this.reportString();

            case "[object RegExp]":
                return this.reportRegExp();

            default:
                throw new Error("The value must be a string or a RegExp");
        }
    }

    /**
     * @returns {string} The normalized name.
     */
    private normalizeName(): string
    {
        return this
            .name
            .toLowerCase();
    }

    /**
     * @returns {boolean} Whether this object validates itself.
     */
    private validateString(): boolean
    {
        const name = this.normalizeName();
        return this.headers[name] == this.value;
    }

    /**
     * @returns {boolean} Whether this object validates itself.
     */
    private validateRegExp(): boolean
    {
        const name  = this.normalizeName();
        const value = this.headers[name];
        const regex = <RegExp> this.value;
        return regex.test(value);
    }

    /**
     * @returns {string}
     *
     * @deprecated
     *
     * @todo Remove
     */
    private reportString(): string
    {
        const name = this.normalizeName();
        return `have header "${this.name}" with value "${this.headers[name]}" equal to "${this.value}"`;
    }

    /**
     * @returns {string}
     *
     * @deprecated
     *
     * @todo Remove
     */
    private reportRegExp(): string
    {
        const name = this.normalizeName();
        return `have header "${this.name}" with value "${this.headers[name]}" matching ${this.value}`;
    }
}
