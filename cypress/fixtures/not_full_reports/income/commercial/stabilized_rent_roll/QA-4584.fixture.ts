import enums from "../../../../../enums/enums";
import reportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    reportCreationData: reportDataCreator.getReportData("4584", {
        incomeValue: enums.INCOME_TYPE.BOTH
    }),
    numberOfCommercialUnits: 2,
    rentSF: 500,
    isInspected: [ true, true ],
    leaseStatuses: [ "Occupied", "Vacant" ] as BoweryReports.LeaseStatus[],
    rentToBe: [ 100, 150 ]
};