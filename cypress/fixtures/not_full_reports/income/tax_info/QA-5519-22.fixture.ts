import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("5519-22"),
    featureFlagKey: Enums.FEATURE_FLAG_KEYS.flexibleTaxes,
    enterName: "Test Name",
    rowNames: {
        additional: "Additional Tax Rate", 
        special: "Special Assessment Row"
    },
    buttonName: "Add Special Assessment",
    onFeatureFlag: 0,
    additionalTaxRateValue: 10.1234567890,
    specialAssessmentRowValue: 42.45
};