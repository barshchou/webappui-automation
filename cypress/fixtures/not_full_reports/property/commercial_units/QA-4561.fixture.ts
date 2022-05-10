import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4561", false, {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const _streetTypeValues: Array<BoweryReports.CommercialUnitsStreetTypeValues> = ["side street", "avenue"];
const _groupName: BoweryReports.CommercialUnitsGroups = "Street Type";

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 5,
    streetTypeValues: _streetTypeValues,
    groupName: _groupName,
};