import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("2100015331", { 
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS }, true);
};

export default {
    reportCreationData: reportCreationFixture(),
    buildingName: "testname",
    yearBuilt: "1910",
    gba: "2,124,441"
};