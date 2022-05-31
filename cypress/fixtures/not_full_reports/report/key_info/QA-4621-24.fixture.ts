import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _numbersJobId = [ "2200016362", "2200018586", "1764459100", "1764459005" ];

export const reportCreationData = (numbersJobId: string) => {
    return ReportDataCreator.setAddress()
        .setReportNumber(numbersJobId, true)
        .setTemplateValue(Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE).build();
};

export default {
    numbersJobId: _numbersJobId,
    verifyValue: "EngagementLetter984234_SIGNED.pdf"
};