import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportData = [
    {
        specName: "[QA-4436]",
        stateFeatureFlag: 1,
        mather: "not.exist"
    },
    {
        specName: "[QA-4437]",
        stateFeatureFlag: 0,
        mather: "exist"
    }
];

export default {
    reportCreationData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.inspector, {}, true),
    featureFlag:  Enums.FEATURE_FLAG_KEYS.prefillInspectorFromSalesforce,
    reportData,
    appraiserName: "Pat Ippolito"
};