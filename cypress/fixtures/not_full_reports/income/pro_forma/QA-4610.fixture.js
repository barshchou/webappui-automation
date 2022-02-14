import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

export default {
    reportCreationData: ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "4610"),
    numberOfResidentialUnits: 2,
    numberOfCommercialUnits: 2,
    listOfUnitsSF: [1000, 2000],
    leaseStatuses: ["Occupied", "Occupied"],
    rentsPsf: [100, 120],
    useValue: "undetermined",
    useText: "Undetermined",
    undeterminedCommercialVCLossPercentage: 3
};