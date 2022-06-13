import enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const _reportCreationData = () => {
    return ReportDataCreator.getReportData("4491", {
        templateValue: enums.TEMPLATE_TYPE.FREDDIE_MAC,
        incomeValue: enums.INCOME_TYPE.BOTH,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    });
};

const _leaseStatus: BoweryReports.LeaseStatus = "Occupied";
const _cellNameStart: BoweryReports.LeaseDateName = "Start";
const _cellNameExpiry: BoweryReports.LeaseDateName = "Expiry";

export default {
    reportCreationData: _reportCreationData(),
    newTenantName: "Test",
    rentPerSF: 100,
    newCommentary: 'some text for discussion',
    leaseStatus: _leaseStatus,
    cellNameStart: _cellNameStart,
    cellNameExpiry: _cellNameExpiry 
};