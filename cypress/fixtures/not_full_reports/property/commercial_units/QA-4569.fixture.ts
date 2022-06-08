import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4569", {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

type groupValue = {
    group:BoweryReports.CommercialUnitsGroups, 
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
    titleValue: "Utilities Description",
    arrayValuesAndGroup: _arrayValuesAndGroup
};