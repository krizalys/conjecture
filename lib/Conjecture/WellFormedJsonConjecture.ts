import {Reportable, Validatable} from "./../interfaces";

export default class WellFormedJsonConjecture implements Validatable, Reportable
{
    /**
     * @param {string} json The JSON payload.
     */
    public constructor(private json: string)
    {
    }

    /**
     * {@inheritdoc}
     */
    public validate(): boolean
    {
        try {
            JSON.parse(this.json);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * {@inheritdoc}
     */
    public report(): string
    {
        return `have body ${this.json} well-formed JSON`;
    }
}
