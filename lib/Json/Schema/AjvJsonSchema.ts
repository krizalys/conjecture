import Ajv                   = require("ajv");
import {JsonSchemaInterface} from "../../interfaces";

export default class AjvJsonSchema implements JsonSchemaInterface
{
    /**
     * @param {Ajv.ValidateFunction} validateCallback
     */
    public constructor(private validateCallback: Ajv.ValidateFunction)
    {
    }

    /**
     * {@inheritdoc}
     */
    public validate(data: any): boolean
    {
        const valid = <boolean> this.validateCallback(data);
        if (!valid) console.log(this.validateCallback.errors);
        return valid;
    }
}
