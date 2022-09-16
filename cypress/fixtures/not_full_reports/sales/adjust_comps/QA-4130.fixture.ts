import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _rentRollResidentialUnitFixture: BoweryReports.ResidentialUnit = {
    rooms: 5,
    monthlyRent: 500645544.01,
    leaseStatus: Enums.LEASE_STATUS.occupied,
    rentType: Enums.RENT_TYPE.marketRate
};

const _calculationUnits = [  Enums.CALCULATION_UNITS.perResidentialUnits,  Enums.CALCULATION_UNITS.perTotalUnits ];

const _existColumns = [ "Cumulative Price Per Unit", "Adjusted Price Per Unit" ];

const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusContract = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.inContract;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;
const compStatusListing = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.listing;

export default {
    reportCreationData: ReportDataCreator.getReportData("4130", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    calculationUnits: _calculationUnits,
    existColumns: _existColumns,
    featureFlagKey: Enums.FEATURE_FLAG_KEYS.enableFlexibleGbaAnalysis,
    numberUnits: 2,
    onFeatureFlag: 0,
    residentialUnit: _rentRollResidentialUnitFixture,
    concludedCapRate: 10,
    adjustmentName: Enums.SALES_ADJUSTMENT_GRID.marketAdjustment,
    compProperty,
    compStatusContract,
    compStatusDate,
    compStatusListing
};