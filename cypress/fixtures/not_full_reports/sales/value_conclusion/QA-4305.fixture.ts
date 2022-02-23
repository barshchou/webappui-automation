import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

export default {
    reportCreationData: ReportDataCreator.getReportSpecificConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE, "4305"),
    numberOfUnits: 1,
    rentType: "Market Rate",
    commissionFee: 12550
};