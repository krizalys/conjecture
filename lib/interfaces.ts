export interface Validatable
{
    /**
     * @returns {boolean} Whether this object validates itself.
     */
    validate(): boolean;
}

/**
 * @deprecated
 *
 * @todo Remove
 */
export interface Reportable
{
    /**
     * @returns {string}
     *
     * @deprecated
     *
     * @todo Remove
     */
    report(): string;
}

export interface DescriptionInterface
{
    confirm:  (expected: any, actual: any) => string;
    infirm:   (expected: any, actual: any) => string;
    expected: any;
    actual:   any;
}

export interface Describable
{
    /**
     * @returns {DescriptionInterface}
     */
    describe(): DescriptionInterface;
}

export interface JsonSchemaInterface
{
    /**
     * @param {any} data
     *
     * @returns {boolean}
     */
    validate(data: any): boolean;
}

export interface JsonSchemaCompilerInterface
{
    /**
     * @param {any} data
     *
     * @returns {JsonSchemaInterface}
     */
    compile(schema: any): JsonSchemaInterface;
}

export interface StatusInterface
{
    statusCode:    number;
    statusMessage: string;
}

export interface HeaderBagInterface
{
    [name: string]: string;
}
