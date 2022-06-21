import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4559", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const _stateValues: Array<BoweryReports.CommercialUnits.StateValues> = [ "finished", "unfinished", "vanilla box", "other" ];
const _groupName: BoweryReports.CommercialUnits.Groups = "State";

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 5,
    stateValues: _stateValues,
    groupName: _groupName,
    otherValue: "Other choice"
};