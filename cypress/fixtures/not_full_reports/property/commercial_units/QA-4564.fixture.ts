import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4564", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED
});

const _facadeValues: Array<BoweryReports.CommercialUnits.FacadeValues> = [ "plate glass", "other" ];

const _groupName: BoweryReports.CommercialUnits.Groups = "Facade";

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 1,
    facadeValues: _facadeValues,
    groupName: _groupName,
    otherValue: "Jeronimo"
};