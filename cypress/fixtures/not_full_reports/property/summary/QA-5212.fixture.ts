import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("2100014394", { 
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS }, true);
};

export default {
    reportCreationData: reportCreationFixture(),
    buildingName: "testname"
};