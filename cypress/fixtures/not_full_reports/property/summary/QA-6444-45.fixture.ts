import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import subjectPropertyDataRouts from "../../../../utils/subject_property_data_routs.utils";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("6444-45");
};

const sections = [
    {
        specName: "[QA-6444]",
        sectionName: Enums.EDIT_ON_SUBJECT_PROPERTY_SECTIONS.siteDetails,
        route: subjectPropertyDataRouts.siteDetails
    },
    {
        specName: "[QA-6445]",
        sectionName: Enums.EDIT_ON_SUBJECT_PROPERTY_SECTIONS.asIsBuildingDescription,
        route: subjectPropertyDataRouts.propertyDescription
    }
];

export default {
    reportCreationData: reportCreationFixture(),
    onFeatureFlag: 0,
    offFeatureFlag: 1,
    sections
};