import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.setReportNumber("4385&86").setAddress()
        .setTemplateValue(Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
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