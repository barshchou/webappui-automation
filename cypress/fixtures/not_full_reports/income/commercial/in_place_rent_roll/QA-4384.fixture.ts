import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.setReportNumber("4384").setAddress()
        .setTemplateValue(Enums.TEMPLATE_TYPE.notFreddieMac)
        .setIncomeValue(Enums.INCOME_TYPE.both)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED).build();
};

const leaseStatusFixture: BoweryReports.LeaseStatus = "Occupied";

export default {
    reportCreationData: reportCreationFixture(),
    leaseStatus: leaseStatusFixture
};