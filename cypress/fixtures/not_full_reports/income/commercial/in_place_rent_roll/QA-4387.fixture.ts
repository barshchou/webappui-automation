import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4387", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const occupiedLeaseFixture: BoweryReports.LeaseStatus = "Occupied";

export default {
    reportCreationData: reportCreationFixture(),
    squareFeet: 81,
    leaseStatus: occupiedLeaseFixture
};