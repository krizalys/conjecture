import Ajv                                                = require("ajv");
import {JsonSchemaCompilerInterface, JsonSchemaInterface} from "../../../interfaces";
import AjvJsonSchema                                      from "../AjvJsonSchema";

export default class AjvJsonSchemaCompiler implements JsonSchemaCompilerInterface
{
    /**
     * @param {Ajv.Ajv} ajv
     */
    public constructor(private ajv: Ajv.Ajv)
    {
    }

    /**
     * {@inheritdoc}
     */
    public compile(schema: any): JsonSchemaInterface
    {
        const compiled = this
            .ajv
            .compile(schema);

        return new AjvJsonSchema(compiled);
    }
}
