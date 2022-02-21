import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

export default {
    reportCreationData: ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "4585"),
    numberOfCommercialUnits: 2,
    listOfUnitsSF: [1000, 2000],
    useRadios: ["retail", "office"],
    useTexts: ["Retail", "Office"],
    leaseStatuses: ["Vacant", "Occupied"],
    tenantNames: ["vacant name", "test name"],
    rentsPsf: [100, 120],
    annualRents: ["some placeholder", "$240,000.00"]
};