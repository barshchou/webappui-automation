import { PropertySquareFootAnalysisKeys } from '../../../../enums/enumKeys.enum';
import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("5882_83_85"),
    title: "Tax Calculation Discussion",
    squareFootAnalysisRadios: Object.keys(Enums.PROPERTY_SQUARE_FOOT_ANALYSIS) as PropertySquareFootAnalysisKeys[],
    featureFlagKey: Enums.FEATURE_FLAG_KEYS.flexibleTaxes,
    commonValue: "2,124,441",
    enterValue: "1,000",
    onFeatureFlag: 0,
    tooltip: "The following text will appear below the Tax Liability table in your export",
    buttonName: "Add Special Assessment",
};