import Enums from "../../../enums/enums";
import ReportDataCreator from "../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData('6403', {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _incomeCapitalizationApproachTextsFixture = () => {
    return [
        {
            sectionName: Enums.INCOME_CAPITALIZATION_APPROACH_SECTIONS.description1,
            languages: 
                "In the Income Capitalization Approach, a property's capacity to generate future benefits is " + 
                "analyzed; the forecasted income is capitalized into an indication of present value. Definitions " + 
                "of commonly used measures of anticipated benefits are defined in the " + 
                "Glossary of Terms within the Addenda."
        },
        {
            sectionName: Enums.INCOME_CAPITALIZATION_APPROACH_SECTIONS.description2,
            languages: 
                "The Income Capitalization Approach supports two methodologies: direct and yield capitalization. " + 
                "Investors in the local market typically utilize a direct capitalization when making investment " + 
                "decisions for this asset class, therefore we conclude that the direct capitalization method is " + 
                "appropriate to apply to the subject."
        }
    ];
};

export default {
    reportCreationData: reportCreationFixture(),
    incomeCapitalizationApproachTextsFixture: _incomeCapitalizationApproachTextsFixture(),
    cmsNavigationFlagKey: Enums.FEATURE_FLAG_KEYS.cmsNavigation,
    reportTextEditorFlagKey: Enums.FEATURE_FLAG_KEYS.reportTextEdit,
    swotAnalysisFlagKey: Enums.FEATURE_FLAG_KEYS.swotAnalysis,
    featureFlagEnable: 0,
    exportSectionName: Enums.EXPORT_TITLES.incomeCapitalizationApproach
};