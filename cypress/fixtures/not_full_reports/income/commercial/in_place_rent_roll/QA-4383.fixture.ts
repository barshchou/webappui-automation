import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const _leaseOccupied: BoweryReports.LeaseStatus = "Occupied";
const _leaseVacant: BoweryReports.LeaseStatus = "Vacant";

const reportCreationFixture = () => {
    return ReportDataCreator.setReportNumber("4383").setAddress()
        .setTemplateValue(Enums.TEMPLATE_TYPE.freddieMac)
        .setIncomeValue(Enums.INCOME_TYPE.both)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE).build();
};

export default {
    reportCreationData: reportCreationFixture(),
    leaseOccupied: _leaseOccupied,
    leaseVacant: _leaseVacant,
    tenantName: "Test tenant name"
};