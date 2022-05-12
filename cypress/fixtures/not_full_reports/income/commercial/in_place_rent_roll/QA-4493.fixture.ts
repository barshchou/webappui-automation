import enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4493", {
        templateValue: enums.TEMPLATE_TYPE.FREDDIE_MAC,
        incomeValue: enums.INCOME_TYPE.BOTH,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_IS
    });
};

const _occupiedleaseStatus = "Occupied";
const _vacantLeaseStatus = "Vacant";

export default {
    reportCreationData: reportCreationFixture(),
    occupiedLeaseStatus: _occupiedleaseStatus as BoweryReports.LeaseStatus,
    vacantLeaseStatus: _vacantLeaseStatus as BoweryReports.LeaseStatus
};