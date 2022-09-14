import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("6447");
};


export default {
    reportCreationData: reportCreationFixture(),
    onFeatureFlag: 0,
    offFeatureFlag: 1,
    sectionName: Enums.EDIT_ON_SUBJECT_PROPERTY_SECTIONS.propertyHistoricalInformation
};