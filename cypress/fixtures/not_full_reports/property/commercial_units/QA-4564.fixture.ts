import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryAutomation, BoweryReports } from "../../../../types";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4564", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED
});

const _facadeValues: Array<BoweryReports.CommercialUnitsFacadeValues> = [ "plate glass", "other" ];

const _groupName: BoweryReports.CommercialUnitsGroups = "Facade";

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 1,
    facadeValues: _facadeValues,
    groupName: _groupName,
    otherValue: "Jeronimo"
};