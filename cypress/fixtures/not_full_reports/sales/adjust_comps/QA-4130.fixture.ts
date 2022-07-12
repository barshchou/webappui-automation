import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _comparableFixture =  {
        address: "45 East 45 Street",
        sizeAdjustment: 20,
        conditionAdjustment: -30,
        otherAdjustment: 40
    };

const _rentRollResidentialUnitFixture: BoweryReports.ResidentialUnit = {
    rooms: 5,
    monthlyRent: 500.01,
    leaseStatus: Enums.LEASE_STATUS.vacant,
    rentType: Enums.RENT_TYPE.marketRate
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4130", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    comparable: _comparableFixture,
    calculationUnits: "Per Total Units",
    existColumns: [ "Cumulative Price Per Unit", "Adjusted Price Per Unit" ],
    featureFlagKey: Enums.FEATURE_FLAG_KEYS.enableFlexibleGbaAnalysis,
    numberUnits: 1,
    onFeatureFlag: 0,
    residentialUnit: _rentRollResidentialUnitFixture,
    concludedCapRate: 10,
    adjustmentName: Enums.SALES_ADJUSTMENT_GRID.market_adjustment
};