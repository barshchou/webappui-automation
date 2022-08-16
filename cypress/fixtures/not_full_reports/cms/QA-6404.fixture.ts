import Enums from "../../../enums/enums";
import ReportDataCreator from "../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData('6404', {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _textUpdate = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

export default {
    reportCreationData: reportCreationFixture(),
    sectionName: Enums.INCOME_CAPITALIZATION_APPROACH_SECTIONS.description1,
    cmsNavigationFlagKey: Enums.FEATURE_FLAG_KEYS.cmsNavigation,
    reportTextEditorFlagKey: Enums.FEATURE_FLAG_KEYS.reportTextEdit,
    swotAnalysisFlagKey: Enums.FEATURE_FLAG_KEYS.swotAnalysis,
    featureFlagEnable: 0,
    textUpdate: _textUpdate
};