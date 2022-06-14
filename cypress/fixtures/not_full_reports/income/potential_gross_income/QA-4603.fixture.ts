import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types";

const leaseStatusesFixture: BoweryReports.LeaseStatus[] = [ "Occupied", "Occupied" ];

export default {
    reportCreationData: ReportDataCreator.getReportData("4603", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    numberOfCommercialUnits: 2,
    listOfUnitsSF: [ 1000, 2000 ],
    leaseStatuses: leaseStatusesFixture,
    rentsPsf: [ 100, 120 ],
    useValue: "undetermined",
    vcLossPercentage: 3,
    vacancyRate: 5,
    subjectSuitabilityValue: "Average",
    changedVCLossPercentage: 10,
    changedVacancyRate: 1
};