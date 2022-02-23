import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.setAddress().setReportNumber("4389")
        .setTemplateValue(Enums.TEMPLATE_TYPE.FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE);
};

const generalFixture = () => {
    return {
        squareFeet: 190.5,
        rentPerSF: 100,
        annualRent: 20000.156,
        monthlyRent: 550.5
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    general: Object.freeze(generalFixture())
};