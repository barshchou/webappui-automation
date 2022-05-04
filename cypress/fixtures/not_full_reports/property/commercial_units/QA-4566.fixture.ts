import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const groupNameFixture: BoweryReports.CommercialUnitsGroups = "Frontage";
const useRadiosFixture: BoweryReports.CommercialUnitGroupsValues[] = ["small", "medium", "large", "other"];

export default {
    reportCreationData: ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "4566"),
    numberOfCommercialUnits: 1,
    groupName: groupNameFixture,
    useRadios: useRadiosFixture
};