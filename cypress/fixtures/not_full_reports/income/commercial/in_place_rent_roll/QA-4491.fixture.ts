import enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const _reportCreationData = () => {
    return ReportDataCreator.getReportData("4491", {
        templateValue: enums.TEMPLATE_TYPE.FREDDIE_MAC,
        incomeValue: enums.INCOME_TYPE.BOTH,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    });
};

const _leaseStatus: BoweryReports.LeaseStatus = "Occupied";

export default {
    reportCreationData: _reportCreationData(),
    newTenantName: "Test",
    rentPerSF: 100,
    newCommentary: 'some data',
    leaseStatus: _leaseStatus
};