import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { Filter } from "mongodb";

const _reportCreationData = ReportDataCreator.getReportData("4102_06", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _compAdjustments = {
    propertyRights: -70,
    financingTerms: 20,
    conditionsOfSale: 5,
    marketConditions: -30,
};

const _cumulativePricePerUnit = "$283,122";
const _compAddress = "626 1 Avenue";

const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusContract = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.inContract;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;
const compStatusListing = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.listing;

const filter: Filter<object> = { $and: [ { [compProperty]:compStatusDate } ] };


export default {
    reportCreationData: _reportCreationData,
    comparablesAdjustments: _compAdjustments,
    calculationUnits: [ 
        "Per Residential Units", "PSF", 
        "Per Total Units" 
    ] as BoweryReports.SalesAdjustmentGrid.CalculationUnits[], 
    basis: "Price per Unit",
    cumulativePricePerUnit: _cumulativePricePerUnit,
    compAddress: _compAddress,
    exportSectionName: Enums.EXPORT_TITLES.cumulativePricePerUnit,
    sectionToExport: [ Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.salesComparisonApproach ],
    compStatusContract,
    compStatusListing,
    filter
};