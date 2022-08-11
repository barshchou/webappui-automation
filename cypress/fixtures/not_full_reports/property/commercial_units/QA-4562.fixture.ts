import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4562", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const _floorValues: Array<BoweryReports.CommercialUnits.FloorValues> = 
    [ "belowGrade", "groundFloor", "upperFloor", "other" ];
const _groupName: BoweryReports.CommercialUnits.Groups = "Floor";

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 5,
    floorValues: _floorValues,
    groupName: _groupName,
    otherValue: "Other choice"
};