import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const comparableFixture = () => {
    return {
        sizeAdjustment: 20,
        conditionAdjustment: -30,
        otherAdjustment: 40
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4103_13", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    comparable: Object.freeze(comparableFixture()),
    existColumns: [ "Cumulative Price Per Unit", "Adjusted Price Per Unit" ],
    featureFlagKey: Enums.FEATURE_FLAG_KEYS.enableFlexibleGbaAnalysis,
    onFeatureFlag: 0,
    calculationUnits: [ Enums.CALCULATION_UNITS.perResidentialUnits, Enums.CALCULATION_UNITS.perTotalUnits ] as BoweryReports.SalesAdjustmentGrid.CalculationUnits[],
};