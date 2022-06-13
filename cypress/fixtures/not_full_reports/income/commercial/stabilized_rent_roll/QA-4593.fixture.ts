import enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types";
import reportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    reportCreationData: reportDataCreator.getReportData("4593", {
        incomeValue: enums.INCOME_TYPE.BOTH
    }),
    numberOfCommercialUnits: 2,
    isInspected: [ true, true ],
    leaseStatuses: [ "Occupied", "Vacant" ] as BoweryReports.LeaseStatus[],
    rentToBe: [ 100, 150 ]
};