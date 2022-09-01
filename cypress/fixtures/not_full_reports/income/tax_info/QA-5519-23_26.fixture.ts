import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("5519-23_26"),
    featureFlagKey: Enums.FEATURE_FLAG_KEYS.flexibleTaxes,
    enterName: "Test Name",
    rowNames: {
        additional: "Additional Tax Rate", 
        special: "Special Assessment Row"
    },
    onFeatureFlag: 0,
    additionalTaxRateValue: 10.1234567890,
    specialAssessmentRowValue: 42.45,
    sectionToExport: [ Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.assessedValueAndRealEstateTaxes ]
};