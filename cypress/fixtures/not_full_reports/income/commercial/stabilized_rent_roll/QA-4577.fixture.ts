import enums from "../../../../../enums/enums";
import reportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    reportCreationData: reportDataCreator.getReportData("4577", {
        incomeValue: enums.INCOME_TYPE.BOTH,
    }),
    numberOfCommercialUnits: 2,
    headerText:"Rent Reconciliation"
};