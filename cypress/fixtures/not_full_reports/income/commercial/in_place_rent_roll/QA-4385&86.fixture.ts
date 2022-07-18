import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.setReportNumber("4385&86").setAddress()
        .setTemplateValue(Enums.TEMPLATE_TYPE.notFreddieMac)
        .setIncomeValue(Enums.INCOME_TYPE.both)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED).build();
};

const occupiedLeaseFixture: BoweryReports.LeaseStatus = "Occupied";
const vacantLeaseFixture: BoweryReports.LeaseStatus = "Vacant";

export default {
    reportCreationData: reportCreationFixture(),
    wrongFormatLeaseDate: "25/45/3000",
    occupiedLease: occupiedLeaseFixture,
    vacantLease: vacantLeaseFixture
};