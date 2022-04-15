import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

export default {
    reportCreationData: ReportDataCreator.getReportData("4558", {
        incomeValue: Enums.INCOME_TYPE.BOTH,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
    }),
    numberOfCommercialUnits: 3
};