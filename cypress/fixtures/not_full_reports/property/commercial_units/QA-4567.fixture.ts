import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4567", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const groupsNamesAndValues = [
    {
        groupName: "Use" as BoweryReports.CommercialUnits.Groups,
        value: "office" as BoweryReports.CommercialUnits.UseValues
    },
    {
        groupName: "State" as BoweryReports.CommercialUnits.Groups,
        value: "unfinished" as BoweryReports.CommercialUnits.StateValues
    },
    {
        groupName: "Location" as BoweryReports.CommercialUnits.Groups,
        value: "mid-block" as BoweryReports.CommercialUnits.LocationValues
    },
    {
        groupName: "Street Type" as BoweryReports.CommercialUnits.Groups,
        value: "side street" as BoweryReports.CommercialUnits.StreetTypeValues
    },
    {
        groupName: "Floor" as BoweryReports.CommercialUnits.Groups,
        value: "other" as BoweryReports.CommercialUnits.FloorValues
    },
    {
        groupName: "Grade" as BoweryReports.CommercialUnits.Groups,
        value: "partiallyBelowGrade" as BoweryReports.CommercialUnits.GradeValues
    },
    {
        groupName: "Facade" as BoweryReports.CommercialUnits.Groups,
        value: "plate glass" as BoweryReports.CommercialUnits.FacadeValues
    },
    {
        groupName: "Ceiling Height" as BoweryReports.CommercialUnits.Groups,
        value: "high" as BoweryReports.CommercialUnits.CeilingHeightValues
    },
    {
        groupName: "Frontage" as BoweryReports.CommercialUnits.Groups,
        value: "medium" as BoweryReports.CommercialUnits.FrontageValues
    },
];

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 2,
    squareFeetList: [ 200, 150 ],
    groupsNamesAndValues,
    otherValue: "Other choice"
};