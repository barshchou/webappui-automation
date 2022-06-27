import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4561", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const _streetTypeValues: Array<BoweryReports.CommercialUnits.StreetTypeValues> = [ "side street", "avenue" ];
const _groupName: BoweryReports.CommercialUnits.Groups = "Street Type";

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 5,
    streetTypeValues: _streetTypeValues,
    groupName: _groupName,
};