import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import routesUtils from "../../../../utils/routes.utils";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("6444-45");
};

const sections = [
    {
        specName: "[QA-6444]",
        sectionName: Enums.PAGES_TEXTBOX_NAMES.siteDetails,
        route: routesUtils.subjectPropertySiteDetails
    },
    {
        specName: "[QA-6445]",
        sectionName: Enums.PAGES_TEXTBOX_NAMES.asIsBuildingDescription,
        route: routesUtils.subjectPropertyDescription
    }
];

export default {
    reportCreationData: reportCreationFixture(),
    featureFlagKey: Enums.FEATURE_FLAG_KEYS.showSubjectPropertyData,
    onFeatureFlag: 0,
    offFeatureFlag: 1,
    sections
};