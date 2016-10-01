import {Describable, DescriptionInterface, StatusInterface, Validatable} from "../interfaces";

export default class StatusConjecturea implements Validatable
{
    /**
     * @param {StatusInterface} status       The actual status.
     * @param {number}          statusCode   The expected status code.
     * @param {string}          reasonPhrase The expected reason phrase.
     */
    public constructor(
        private status:       StatusInterface,
        private statusCode:   number,
        private reasonPhrase: string
    )
    {
    }

    /**
     * @todo JSDoc
     */
    public describe(): DescriptionInterface
    {
        const status = this.status;

        if (!("statusCode" in status)) {
            return {
                confirm:  (expected: any, actual: any) => `Expected ${actual} to have a status code`,
                infirm:   (expected: any, actual: any) => `Expected ${actual} not to have a status code`,
                expected: null,
                actual:   status,
            };
        }

        if (status.statusCode != this.statusCode) {
            return {
                confirm:  (expected: any, actual: any) => `Expected status code ${actual} to equal ${expected}`,
                infirm:   (expected: any, actual: any) => `Expected status code ${actual} not to equal ${expected}`,
                expected: this.statusCode,
                actual:   status.statusCode,
            };
        }

        return {
            confirm:  (expected: any, actual: any) => `Expected reason phrase ${actual} to equal ${expected}`,
            infirm:   (expected: any, actual: any) => `Expected reason phrase ${actual} not to equal ${expected}`,
            expected: this.reasonPhrase,
            actual:   status.statusMessage,
        };
    }

    /**
     * {@inheritdoc}
     */
    public validate(): boolean
    {
        const status = this.status;

        return status.statusCode == this.statusCode
            && status.statusMessage == this.reasonPhrase;
    }
}
