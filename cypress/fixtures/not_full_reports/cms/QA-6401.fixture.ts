import Enums from "../../../enums/enums";
import ReportDataCreator from "../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData('6401', {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _languagesDefault = [
    "The building is 100% occupied.",

    "The subject property has good freeway access and is in close proximity to schools, parks, " + 
    "shopping centers, and employment."
];

const _languagesUpdated = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",

    "The subject property has good freeway access and is in close proximity to schools, parks, " + 
    "shopping centers, and employment."
];

export default {
    reportCreationData: reportCreationFixture(),
    sectionName: Enums.SWOT_SECTIONS.strengths,
    cmsNavigationFlagKey: Enums.FEATURE_FLAG_KEYS.cmsNavigation,
    reportTextEditorFlagKey: Enums.FEATURE_FLAG_KEYS.reportTextEdit,
    swotAnalysisFlagKey: Enums.FEATURE_FLAG_KEYS.swotAnalysis,
    featureFlagEnable: 0,
    textUpdate: _languagesUpdated,
    defaultText: _languagesDefault,
    sectionToExport: [ Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.summaryOfSalientFactsAndConclusions ]
};