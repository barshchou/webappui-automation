import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4468");
};

export default {
    reportCreationData: reportCreationFixture(),
    multifamily: Enums.MARKET_ANALYSIS_USES.multifamily
};