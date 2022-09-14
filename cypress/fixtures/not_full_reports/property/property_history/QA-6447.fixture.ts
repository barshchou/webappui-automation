import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import routesUtils from "../../../../utils/routes.utils";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("6447");
};


export default {
    reportCreationData: reportCreationFixture(),
    featureFlagKey: Enums.FEATURE_FLAG_KEYS.showSubjectPropertyData,
    onFeatureFlag: 0,
    offFeatureFlag: 1,
    sectionName: Enums.PAGES_TEXTBOX_NAMES.propertyHistoricalInformation,
    route: routesUtils.subjectPropertyHistory
};