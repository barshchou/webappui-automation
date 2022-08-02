import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5784", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    });
};

export default {
    reportCreationData: reportCreationFixture(),
    leaseStatus: Enums.LEASE_STATUS.occupied,
    featureFlagKey: Enums.FEATURE_FLAG_KEYS.flexibleTaxes,
    onFeatureFlag: 0,
    basisForSquareFootAnalysis: Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossLeasableArea,
    squareFootAnalysisArea: 1000, 
    residentialUnits: 2,
    commercialUnits: 3,
    commercialMonthlyRent: [ 123.45, 321.01, 44 ],
    residentialMonthlyRent: [ 64.19, 1234.76 ],
    gutRenovation: Enums.RENOVATION_TYPE.gutRenovation,
    renovationPeriod: 12,
    renovationTotal: 1111,
    capRate: 5,
    commercialUnitsSF: [ 250, 350, 450 ],
    rentLossTimePeriod: 12,
    commercialUnitType: Enums.UNIT_INCOME_TYPE.commercial,
    residentialUnitType: Enums.UNIT_INCOME_TYPE.residential
};