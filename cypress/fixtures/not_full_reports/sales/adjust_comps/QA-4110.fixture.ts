import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData = ReportDataCreator.getReportData("4110", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _cumulativePricePerUnit = "$188,748";

const _compAdjustments = {
    propertyRights: -70,
    financingTerms: 20,
    conditionsOfSale: 5,
    marketConditions: -30,
};

const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusContract = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.inContract;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;
const compStatusListing = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.listing;

export default {
    reportCreationData: _reportCreationData,
    comparablesAdjustments: _compAdjustments,
    calculationUnits: Enums.CALCULATION_UNITS.perTotalUnits,
    basis: "Price per Unit",
    cumulativePricePerUnit: _cumulativePricePerUnit,
    exportSectionName: Enums.EXPORT_TITLES.cumulativePricePerUnit,
    compProperty,
    compStatusContract,
    compStatusDate,
    compStatusListing
};