import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

Cypress.env("report", "ui");

const reportCreationFixture = () => {
    return ReportDataCreator.setReportNumber("4322")
        .setAddress()
        .setTemplateValue(Enums.TEMPLATE_TYPE.notFreddieMac)
        .setIncomeValue(Enums.INCOME_TYPE.both)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE).build();
};

export default {
    reportCreationData: reportCreationFixture()
};