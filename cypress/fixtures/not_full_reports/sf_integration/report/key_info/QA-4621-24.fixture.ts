import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const _numbersJobId = [ "2200017578", "2200018586", "1764459100", "1764459005" ];

export const reportCreationData = (numbersJobId: string) => {
    return ReportDataCreator.setAddress()
        .setReportNumber(numbersJobId, true)
        .setTemplateValue(Enums.TEMPLATE_TYPE.notFreddieMac)
        .setIncomeValue(Enums.INCOME_TYPE.both)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE).build();
};

export default {
    numbersJobId: _numbersJobId,
    verifyValue: "228 West 10th Street__New York, NY 10014 - Bowery EL - signed.pdf"
};