import Enums from "../../../enums/enums";
import ReportDataCreator from "../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData('6400', {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _swotTextsFixture = () => {
    return [
        {
            sectionName: Enums.SWOT_SECTIONS.strengths,
            languages: [
                "The building is 100% occupied.",

                "The subject property has good freeway access and is in close proximity to schools, parks, " + 
                "shopping centers, and employment."
            ]
        },
        {
            sectionName: Enums.SWOT_SECTIONS.weaknesses,
            languages: [
                "The subject is half a block to the elevated BQE Expressway and a nearby industrial area.",

                "The subject property does not currently benefit from a tax abatement."
            ]
        },
        {
            sectionName: Enums.SWOT_SECTIONS.opportunities,
            languages: [
                "All units are rent stabilized, and there is potential upside upon tenant turnover.",

                "There has been increased demand for similar assets as investors from prime New York Metro " + 
                "submarkets seek higher returns increasing pricing for similar assets."
            ]
        },
        {
            sectionName: Enums.SWOT_SECTIONS.threats,
            languages: [
                "Rent growth is limited by local rent control laws.",

                "On July 27th, 2022, the Federal Reserve Board increased their benchmark rate by 75 basis points, " +
                "the fourth increase this year in an effort to curb inflation. There was a 25 basis point increase " +
                "in March and a 50 basis point increase in May, followed by 75 bps in June and 75 bps again in July. " +
                "It is likely that the Federal Reserve Board will announce additional rate hikes later this year.",

                "As the economy continues its recovery from the global pandemic, there remains uncertainty " + 
                "related to the speed and consistency of the recovery.",

                "Economic uncertainty and potential market instability related to the war in Ukraine."
            ]
        }
    ];
};

export default {
    reportCreationData: reportCreationFixture(),
    swotTextsFixture: _swotTextsFixture(),
    cmsNavigationFlagKey: Enums.FEATURE_FLAG_KEYS.cmsNavigation,
    reportTextEditorFlagKey: Enums.FEATURE_FLAG_KEYS.reportTextEdit,
    swotAnalysisFlagKey: Enums.FEATURE_FLAG_KEYS.swotAnalysis,
    featureFlagEnable: 0,
    sectionToExport: Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.summaryOfSalientFactsAndConclusions
};
