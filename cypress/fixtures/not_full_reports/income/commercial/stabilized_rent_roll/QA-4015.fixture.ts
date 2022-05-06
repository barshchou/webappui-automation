import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

export default {
    reportCreationData: ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "4015"),
    numberOfCommercialUnits: 2,
    listOfUnitsSF: [1000, 2000],
    groupName: "Use",
    useRadios: ["retail", "office"],
    useTexts: ["Retail", "Office"],
    leaseStatuses: ["Vacant", "Occupied"],
    tenantNames: ["vacant name", "test name"],
    rentsPsf: [100, 120],
    annualRent: "$240,000.00",
    monthlyRent: "$20,000.00",
    newTenantName: "new test name"
}