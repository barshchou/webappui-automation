import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.setAddress().setReportNumber("4053")
        .setTemplateValue(Enums.TEMPLATE_TYPE.FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE);
};

const generalFixture = () => {
    return {
        residentialUnits: 12,
        commercialUnits: 3,
        valueConclusion: 750,
        totalValue: '$11,250'
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    general: Object.freeze(generalFixture())
};