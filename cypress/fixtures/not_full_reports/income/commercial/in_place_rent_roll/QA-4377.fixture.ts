import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

Cypress.env("report", "ui");
Cypress.env("loginMethod", "ui");

const _leaseStatus: BoweryReports.LeaseStatus = "Occupied";

const reportCreationFixture = () => {
    return ReportDataCreator.setReportNumber("4377")
        .setAddress()
        .setTemplateValue(Enums.TEMPLATE_TYPE.notFreddieMac)
        .setIncomeValue(Enums.INCOME_TYPE.both)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED).build();
};

export default {
    reportCreationData: reportCreationFixture(),
    leaseStatus: _leaseStatus
};