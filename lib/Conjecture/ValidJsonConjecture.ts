import {JsonSchemaInterface, Validatable} from "./../interfaces";

export default class ValidJsonConjecture implements Validatable
{
    /**
     * @param {JsonSchemaInterface} schema The expected JSON schema.
     * @param {any}                 data   The actual data.
     */
    public constructor(
        private schema: JsonSchemaInterface,
        private data:   any
    )
    {
    }

    /**
     * {@inheritdoc}
     */
    public validate(): boolean
    {
        return this
            .schema
            .validate(this.data);
    }
}
