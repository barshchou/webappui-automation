import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4016", {
        incomeValue: Enums.INCOME_TYPE.BOTH
    });
};

const _leaseDates: BoweryReports.leaseDate[] = [
    {
        name: "Start",
        value: "01012022"
    },
    {
        name: "Expiry",
        value: "12012022"
    }
];

export default {
    reportCreationData: reportCreationFixture(),
    squareFootage: 12,
    leaseStatus: "Occupied" as BoweryReports.LeaseStatus,
    tenantName: "Test",
    leaseDates: _leaseDates,
    annualRent: 120,
    monthlyRent: 10
};