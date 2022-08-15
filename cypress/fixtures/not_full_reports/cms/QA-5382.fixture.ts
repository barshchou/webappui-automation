import Enums from "../../../enums/enums";
import { ContentManagementSystem } from "../../../types/boweryReports.type";
import ReportDataCreator from "../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData('5382', {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _textUpdate = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
const _certification1: ContentManagementSystem.DiscussionSectionName = {
    sectionName: Enums.CERTIFICATION_SECTIONS.certification1
};

export default {
    reportCreationData: reportCreationFixture(),
    sectionName: _certification1,
    cmsNavigationFlagKey: Enums.FEATURE_FLAG_KEYS.cmsNavigation,
    reportTextEditorFlagKey: Enums.FEATURE_FLAG_KEYS.reportTextEdit,
    swotAnalysisFlagKey: Enums.FEATURE_FLAG_KEYS.swotAnalysis,
    featureFlagEnable: 0,
    textUpdate: _textUpdate
};