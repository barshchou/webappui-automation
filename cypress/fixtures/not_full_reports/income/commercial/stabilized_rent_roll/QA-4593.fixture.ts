import enums from "../../../../../enums/enums";
import reportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    reportCreationData: reportDataCreator.getReportData("4583_84", {
        incomeValue: enums.INCOME_TYPE.BOTH
    }),
    numberOfCommercialUnits: 2,
    isInspected: [ true, true ],
    leaseStatuses: [ "Occupied", "Vacant" ] as BoweryReports.LeaseStatus[],
    rentToBe: [ 100, 150 ]
};