import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4560", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const _locationValues: Array<BoweryReports.CommercialUnits.LocationValues> = [ "corner", "mid-block", "through-lot" ];
const _groupName: BoweryReports.CommercialUnits.Groups = "Location";

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 5,
    locationValues: _locationValues,
    groupName: _groupName
};