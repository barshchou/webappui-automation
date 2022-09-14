import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.inspector, {}, true),
    featureFlag:  Enums.FEATURE_FLAG_KEYS.prefillInspectorFromSalesforce,
    offFeatureFlag: 1,
    onFeatureFlag: 0,
    appraiserName: "Pat Ippolito"
};