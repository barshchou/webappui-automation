import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _rentRollResidentialUnitFixture: BoweryReports.ResidentialUnit[] = [
    {
        monthlyRent: 2000000,
        leaseStatus: Enums.LEASE_STATUS.occupied,
        rentType: Enums.RENT_TYPE.marketRate
    },
    {
        monthlyRent: 1500000,
        leaseStatus: Enums.LEASE_STATUS.occupied,
        rentType: Enums.RENT_TYPE.marketRate
    }
];

export default {
    reportCreationData: ReportDataCreator.getReportData("6190", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    calculationUnits: Enums.CALCULATION_UNITS.psf,
    featureFlagKey: Enums.FEATURE_FLAG_KEYS.enableFlexibleGbaAnalysis,
    numberUnits: 2,
    onFeatureFlag: 0,
    residentialUnit: _rentRollResidentialUnitFixture,
    concludedCapRate: 10,
    adjustmentName: Enums.SALES_ADJUSTMENT_GRID.marketAdjustment,
    squareFootAnalysisBasis: Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossLeasableArea,
    squareFootAnalysisArea: 1000,
    grossBuildingArea: 2000
};