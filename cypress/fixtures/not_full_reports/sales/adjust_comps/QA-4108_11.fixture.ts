import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData = ReportDataCreator.getReportData("4108_11", {
    incomeValue: Enums.INCOME_TYPE.both
});

const comparableFixture = () => {
    return {
        address: "200 West 78 Street",
    };
};

const _compAdjustments = {
    propertyRights: -70,
    financingTerms: 20,
    conditionsOfSale: 5,
    marketConditions: -30,
};

const _locationAdjustments = {
    neighborhoodAdjustment: -30,
    locationInNeighborhoodAdjustment: 20
};

const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusContract = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.inContract;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;
const compStatusListing = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.listing;

export default {
    reportCreationData: _reportCreationData,
    comparablesAdjustments: _compAdjustments,
    locationAdjustments: _locationAdjustments,
    comparable: Object.freeze(comparableFixture()),
    calculationUnits: Enums.CALCULATION_UNITS.perResidentialUnits,
    compProperty,
    compStatusContract,
    compStatusDate,
    compStatusListing
};