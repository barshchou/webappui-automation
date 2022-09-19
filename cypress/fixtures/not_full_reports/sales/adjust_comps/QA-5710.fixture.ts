import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;

const _comparableAdjustments = {
    propertyRights: -10,
    financingTerms: -20,
    conditionsOfSale: -50,
    marketConditions: -99,
};

export default {
    reportCreationData: ReportDataCreator.getReportData("5710", { 
        incomeValue: Enums.INCOME_TYPE.commercial 
    }),
    comparableAdjustment: _comparableAdjustments,
    compProperty,
    compStatusDate
};