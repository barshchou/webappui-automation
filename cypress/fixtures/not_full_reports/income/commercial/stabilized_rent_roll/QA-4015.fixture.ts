import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

const groupNameFixture: BoweryReports.CommercialUnitsGroups = "Use";
const useRadiosFixture: BoweryReports.CommercialUnitsUseValues[] = ["retail", "office"];
const useTextFixture: BoweryReports.CommercialUnitsUseTexts[] = ["Retail", "Office"];
const leaseStatusesFixture: BoweryReports.LeaseStatus[] = ["Vacant", "Occupied"];

export default {
    reportCreationData: ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "4827"),
    numberOfCommercialUnits: 2,
    listOfUnitsSF: [1000, 2000],
    groupName: groupNameFixture,
    useRadios: useRadiosFixture,
    useTexts: useTextFixture,
    leaseStatuses: leaseStatusesFixture,
    tenantNames: ["vacant name", "test name"],
    rentsPsf: [100, 120],
    annualRent: "$240,000.00",
    monthlyRent: "$20,000.00",
    newTenantName: "new test name"
};