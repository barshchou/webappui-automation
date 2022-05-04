import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

export default {
    reportCreationData: ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "4585"),
    numberOfCommercialUnits: 2,
    listOfUnitsSF: [1000, 2000],
    groupName: "Use" as BoweryReports.CommercialUnitsGroups,
    useRadios: ["retail", "office"] as Array<BoweryReports.CommercialUnitGroupsValues>,
    useTexts: ["Retail", "Office"],
    leaseStatuses: ["Vacant", "Occupied"] as Array<BoweryReports.LeaseStatus>,
    tenantNames: ["vacant name", "test name"],
    rentsPsf: [100, 120],
    annualRent: "$240,000.00",
    monthlyRent: "$20,000.00",
    newTenantName: "new test name"
};