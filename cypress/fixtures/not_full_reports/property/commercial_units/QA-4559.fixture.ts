import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4559", {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const _stateValues: Array<BoweryReports.CommercialUnitsStateValues> = [ "finished", "unfinished", "vanilla box", "other" ];
const _groupName: BoweryReports.CommercialUnitsGroups = "State";

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 5,
    stateValues: _stateValues,
    groupName: _groupName,
    otherValue: "Other choice"
};