import enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4493", {
        templateValue: enums.TEMPLATE_TYPE.FREDDIE_MAC,
        incomeValue: enums.INCOME_TYPE.BOTH,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_IS
    });
};

const _occupiedleaseStatus: BoweryReports.LeaseStatus = "Occupied";
const _vacantLeaseStatus: BoweryReports.LeaseStatus = "Vacant";

export default {
    reportCreationData: reportCreationFixture(),
    occupiedLeaseStatus: _occupiedleaseStatus,
    vacantLeaseStatus: _vacantLeaseStatus,
};