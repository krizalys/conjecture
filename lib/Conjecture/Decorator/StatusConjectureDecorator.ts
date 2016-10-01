import StatusConjecture from "../../../lib/Conjecture/StatusConjecture";

export default class StatusConjectureDecorator
{
    /**
     * @param {StatusConjecture} conjecture The conjecture.
     */
    public constructor(private conjecture: StatusConjecture)
    {
    }
}
