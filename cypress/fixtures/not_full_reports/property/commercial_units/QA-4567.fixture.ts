import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4567", {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const groupsNamesAndValues = [
    {
        groupName: "Use" as BoweryReports.CommercialUnitsGroups,
        value: "office" as BoweryReports.CommercialUnitsUseValues
    },
    {
        groupName: "State" as BoweryReports.CommercialUnitsGroups,
        value: "unfinished" as BoweryReports.CommercialUnitsStateValues
    },
    {
        groupName: "Location" as BoweryReports.CommercialUnitsGroups,
        value: "mid-block" as BoweryReports.CommercialUnitsLocationValues
    },
    {
        groupName: "Street Type" as BoweryReports.CommercialUnitsGroups,
        value: "side street" as BoweryReports.CommercialUnitsStreetTypeValues
    },
    {
        groupName: "Floor" as BoweryReports.CommercialUnitsGroups,
        value: "other" as BoweryReports.CommercialUnitsFloorValues
    },
    {
        groupName: "Grade" as BoweryReports.CommercialUnitsGroups,
        value: "partiallyBelowGrade" as BoweryReports.CommercialUnitsGradeValues
    },
    {
        groupName: "Facade" as BoweryReports.CommercialUnitsGroups,
        value: "plate glass" as BoweryReports.CommercialUnitsFacadeValues
    },
    {
        groupName: "Ceiling Height" as BoweryReports.CommercialUnitsGroups,
        value: "high" as BoweryReports.CommercialUnitsCeilingHeightValues
    },
    {
        groupName: "Frontage" as BoweryReports.CommercialUnitsGroups,
        value: "medium" as BoweryReports.CommercialUnitsFrontageValues
    },
];

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 2,
    squareFeetList: [ 200, 150 ],
    groupsNamesAndValues,
    otherValue: "Other choice"
};