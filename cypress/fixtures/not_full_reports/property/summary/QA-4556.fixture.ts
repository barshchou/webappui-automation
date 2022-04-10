import enums from "../../../../enums/enums";
import reportDataCreator from "../../../data_creator/reportData.creator";


export default {
    reportCreationData: reportDataCreator.getReportSpecificIncomeValue(enums.INCOME_TYPE.BOTH, "4556"),
    numberOfCommercialUnits: 2,
};