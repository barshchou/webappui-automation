import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const comparableFixture = () => {
    return {
        address: "337 Smith Street"
    };
};

const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusContract = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.inContract;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;
const compStatusListing = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.listing;

export default {
    reportCreationData: ReportDataCreator.getReportData("4171", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    comparable: Object.freeze(comparableFixture()),
    compProperty,
    compStatusContract,
    compStatusDate,
    compStatusListing
};