import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4565", {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const _ceilingHeightValues: Array<BoweryReports.CommercialUnitsCeilingHeightValues> = ["low", "normal", "high", "other"];
const _groupName: BoweryReports.CommercialUnitsGroups = "Ceiling Height";

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 5,
    ceilingHeightValues: _ceilingHeightValues,
    groupName: _groupName,
    otherValue: "Other choice"
};