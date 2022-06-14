import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types";

const groupNameFixture: BoweryReports.CommercialUnitsGroups = "Frontage";
const useRadiosFixture: BoweryReports.CommercialUnitGroupsValues[] = [ "small", "medium", "large", "other" ];

export default {
    reportCreationData: ReportDataCreator.getReportData("4566", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    numberOfCommercialUnits: 1,
    groupName: groupNameFixture,
    useRadios: useRadiosFixture
};