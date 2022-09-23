import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportData = [
    {
        specName: {
            name: "[QA-4436]",
            flag: false
        },
        stateFeatureFlag: 1,
        mather: "not.exist"
    },
    {
        specName: {
            name: "[QA-4437-38]",
            flag: true
        },
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