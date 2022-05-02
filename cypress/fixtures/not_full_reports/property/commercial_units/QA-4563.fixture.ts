import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4563", false, {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
});

const _gradeValues: Array<BoweryReports.CommercialUnitsGradeValues> = ["atGrade", "partiallyBelowGrade", "belowGrade", "other"];

const _groupName: BoweryReports.CommercialUnitsGroups = "Grade";

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 1,
    gradeValues: _gradeValues,
    groupName: _groupName,
    otherValue: "Jeronimo"
};