declare module Chai
{
    interface Assertion
    {
        status(
            code: number,
            reasonPhrase: string,
            callback?: (error?: Error) => any
        ): Assertion;

        json(
            schema,
            callback?: (error?: Error) => any
        ): Assertion;
    }
}
