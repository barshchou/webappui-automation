import ReportDataCreator from "../../../../data_creator/reportData.creator";
import enums from "../../../../../enums/enums";


const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 200,
    numberOfUnits: 2
};



export default {

reportCreationData: ReportDataCreator.getReportSpecificIncomeValue(enums.INCOME_TYPE.BOTH, "4581"),
buildingDescription: _buildingDescription,

    numberOfCommercialUnits: 2,
    isInspected: [true, false],
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


};