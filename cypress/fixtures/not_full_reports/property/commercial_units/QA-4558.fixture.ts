import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _useRadios: BoweryReports.CommercialUnits.UseValues[] = 
[ "retail", "office", "medical", "community", "industrial", "other", "undetermined" ];

const _useTexts: BoweryReports.CommercialUnits.UseTexts[] = [ "Retail", "Office", "Medical Office",
    "Community Facility", "Industrial", "Jeronimo", "Undetermined" ];

const _defaultUse: BoweryReports.CommercialUnits.UseValues = "undetermined";

const _otherValue: BoweryReports.CommercialUnits.UseTexts = "Jeronimo";

const _groupName: BoweryReports.CommercialUnits.Groups = "Use";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4558", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
});

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 1,
    groupName: _groupName,
    defaultUse: _defaultUse,
    useRadios: _useRadios,
    otherValue: _otherValue,
    useTexts: _useTexts,
    vcLossPercentages: [ 5, 2, 15, 24, 11, 49, 7 ]
};