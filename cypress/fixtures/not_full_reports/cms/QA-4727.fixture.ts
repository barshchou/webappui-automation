import Enums from "../../../enums/enums";
import ReportDataCreator from "../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData('4727', {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _textUpdate = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

export default {
    reportCreationData: reportCreationFixture(),
    sectionName: Enums.LETTER_SECTIONS.complianceParagraph,
    cmsNavigationFlagKey: Enums.FEATURE_FLAG_KEYS.cmsNavigation,
    reportTextEditorFlagKey: Enums.FEATURE_FLAG_KEYS.reportTextEdit,
    swotAnalysisFlagKey: Enums.FEATURE_FLAG_KEYS.swotAnalysis,
    featureFlagEnable: 0,
    textUpdate: _textUpdate,
    sectionToExport: [ Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.letterOfTransmittal ]
};