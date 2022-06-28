import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4569", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

type groupValue = {
    group:BoweryReports.CommercialUnits.Groups, 
    value: BoweryReports.CommercialUnits.GroupsValues,
}

const _arrayValuesAndGroup: Array<groupValue> = [
    {
        group: "Use",
        value: "retail"
    },
    {
        group: "State",
        value: "finished"
    },
    {
        group: "Location",
        value: "corner"
    },
    {
        group: "Street Type",
        value: "side street"
    },
    {
        group: "Floor",
        value: "belowGrade"
    },
    {
        group: "Grade",
        value: "atGrade"
    },
    {
        group: "Facade",
        value: "plate glass"
    },
    {
        group: "Ceiling Height",
        value: "low"
    },
    {
        group: "Frontage",
        value: "small"
    },
];

export default {
    reportCreationData: _reportCreationData,
    arrayValuesAndGroup: _arrayValuesAndGroup
};