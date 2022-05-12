import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4567", {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});


//const _groupName: BoweryReports.CommercialUnitsGroups[] = [ "Use", "State", "Location", "Street Type", "Grade", "Facade", "Ceiling Height", "Frontage"];
//const _UnitsGroupsValues = ["office", "unfinished", "mid-block", "side street", "partiallyBelowGrade", "plate glass", "high", "medium"] as;


const groupsNamesAndValues  = [
  {
    groupName :  "Use" as BoweryReports.CommercialUnitsGroups,
 value  :  "office" as BoweryReports.CommercialUnitsCeilingHeightValues
},
  {
    groupName :  "State" as BoweryReports.CommercialUnitsGroups,
    value  :  "unfinished" as BoweryReports.CommercialUnitsStateValues
},
{
    groupName :  "Location" as BoweryReports.CommercialUnitsGroups,
    value  :  "mid-block" as BoweryReports.CommercialUnitsStateValues
},
{
    groupName :  "Street Type" as BoweryReports.CommercialUnitsGroups,
    value  :  "side street" as BoweryReports.CommercialUnitsStateValues
},
{
    groupName :  "Grade" as BoweryReports.CommercialUnitsGroups,
 value  :  "partiallyBelowGrade" as BoweryReports.CommercialUnitsCeilingHeightValues
},
{
    groupName :  "Facade" as BoweryReports.CommercialUnitsGroups,
 value  :  "plate glass" as BoweryReports.CommercialUnitsCeilingHeightValues
},
{
    groupName :  "Ceiling Height" as BoweryReports.CommercialUnitsGroups,
 value  :  "high" as BoweryReports.CommercialUnitsCeilingHeightValues
},
{
    groupName :  "Frontage" as BoweryReports.CommercialUnitsGroups,
 value  :  "medium" as BoweryReports.CommercialUnitsCeilingHeightValues
},
];






export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 2,
    squareFeetList: [200, 150],
 //   floorValues: _floorValues,
// ceilingHeightValues:_ceilingHeightValues
 //UnitsGroupsValues:_UnitsGroupsValues,
 groupsNamesAndValues,
   // groupCeilingHeight,
  //  groupUse,
    
  //  floorgroupName: _floorgroupName,

    otherValue: "Other choice"
};