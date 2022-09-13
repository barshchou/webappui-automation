import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const sortSalesCompsDateSold = Enums.SORT_VALUES.dateSold;
const sortSalesCompsCustom = Enums.SORT_VALUES.custom;

const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusContract = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.inContract;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;
const compStatusListing = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.listing;

export default {
    reportCreationData: ReportDataCreator.getReportData("5135", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
    }),
    sortSalesCompsDateSold,
    sortSalesCompsCustom,
    /**
     * Number of sales comps which will be added for test
     */
    compsToAdd: [ 0, 1 ],
    compProperty,
    compStatusContract,
    compStatusDate,
    compStatusListing
};