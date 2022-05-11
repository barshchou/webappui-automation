import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4602&04&05&10", {
        incomeValue: Enums.INCOME_TYPE.BOTH
    });

const _leaseStatuses: Array<BoweryReports.LeaseStatus> = ["Occupied", "Occupied"];

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: 3150,
    numberOfResidentialUnits: 2,
    numberOfCommercialUnits: 2,
    listOfUnitsSF: [1000, 2000],
    leaseStatuses: _leaseStatuses,
    rentsPsf: [100, 120],
    useValue: "undetermined",
    useText: "Undetermined",
    comUseVCLossPercentage: 3,
    totalCommercialUseVCLoss: "-$10,200"
};