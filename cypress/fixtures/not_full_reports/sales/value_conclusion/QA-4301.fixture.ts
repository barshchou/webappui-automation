import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

export default {
    reportCreationData: ReportDataCreator.getReportData("4301", {
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }),
    numberOfUnits: 1,
    bedrooms: 1,
    rentType: "Market Rate",
    leaseStatus: "Occupied",
    laundryIncome: 15000,
    vcLossValue: "Laundry V/C",
    vcLossPercentage: 5,
    concludedCapRate: 6,
    lossMonths: 2,
    laundryLossesAmount: "-$2,375"
};