import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const _leaseStatus: BoweryReports.LeaseStatus = "Occupied";
const _monthlyRentList = [ 100, 100.22, 100.3332, 10.1, 0 ];

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4184_4709", {
        incomeValue: Enums.INCOME_TYPE.both,
    });
};

export default {
    reportCreationData: reportCreationFixture(),
    leaseStatus: _leaseStatus, 
    monthlyRentList: _monthlyRentList,
    compGroupName: "TestCompGroup-4184_4709"
};