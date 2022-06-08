import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4562", {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const _floorValues: Array<BoweryReports.CommercialUnitsFloorValues> = [ "belowGrade", "groundFloor", "upperFloor", "other" ];
const _groupName: BoweryReports.CommercialUnitsGroups = "Floor";

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 5,
    floorValues: _floorValues,
    groupName: _groupName,
    otherValue: "Other choice"
};