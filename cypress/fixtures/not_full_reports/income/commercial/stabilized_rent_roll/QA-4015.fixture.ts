import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";

const groupNameFixture: BoweryReports.CommercialUnits.Groups = "Use";
const useRadiosFixture: BoweryReports.CommercialUnits.UseValues[] = [ "retail", "office" ];
const useTextFixture: BoweryReports.CommercialUnits.UseTexts[] = [ "Retail", "Office" ];
const leaseStatusesFixture: BoweryReports.LeaseStatus[] = [ "Vacant", "Occupied" ];

export default {
    reportCreationData: ReportDataCreator.getReportData("4015", {
        incomeValue: Enums.INCOME_TYPE.both,
    }),
    numberOfCommercialUnits: 2,
    listOfUnitsSF: [ 1000, 2000 ],
    groupName: groupNameFixture,
    useRadios: useRadiosFixture,
    useTexts: useTextFixture,
    leaseStatuses: leaseStatusesFixture,
    tenantNames: [ "vacant name", "test name" ],
    rentsPsf: [ 100, 120 ],
    annualRent: "$240,000.00",
    monthlyRent: "$20,000.00",
    newTenantName: "new test name",
    exportSectionName: Enums.EXPORT_TITLES.leaseStructure
};