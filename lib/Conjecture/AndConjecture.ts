import {Reportable, Validatable} from "../interfaces";

export default class AndConjecture implements Validatable, Reportable
{
    /**
     * @param {Array<Validatable & Reportable>} conjectures
     */
    public constructor(
        private conjectures: Array<Validatable & Reportable>
    )
    {
    }

    /**
     * {@inheritdoc}
     */
    public validate(): boolean
    {
        let valid = true;

        for (const conjecture of this.conjectures) {
            valid = valid && conjecture.validate();
        }

        return valid;
    }

    /**
     * {@inheritdoc}
     */
    public report(): string
    {
        const report = [];

        for (const conjecture of this.conjectures) {
            report.push(conjecture.report());
        }

        return report.join("\n");
    }
}
