import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("6275", {
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
    residentialUnitType: Enums.UNIT_INCOME_TYPE.residential,
    lessCommissionFee: 1234,
    entrepreneurialProfit: 2,
    valueConclusionAsComplete: Enums.VALUE_CONCLUSION_NAME.asComplete,
    valueConclusionAsStabilized: Enums.VALUE_CONCLUSION_NAME.asStabilized,
    valueConclusionAsIs: Enums.VALUE_CONCLUSION_NAME.asIs,
    lessBuyoutCost: 153789,
    valueConclusionKeyAsComplete: Object.keys(Enums.VALUE_CONCLUSION_NAME)[2] as BoweryReports.ValueConclusionKeys,
    valueConclusionKeyAsStabilized: Object.keys(Enums.VALUE_CONCLUSION_NAME)[1] as BoweryReports.ValueConclusionKeys,
    rentLossTypeResidential: Enums.RENT_LOSS_TYPE.resRentLossItems,
    rentLossTypeCommercial: Enums.RENT_LOSS_TYPE.commercialRentLossItems,
    rentLossTypeUndetermined: Enums.RENT_LOSS_TYPE.lossItems,
    conclusionValueAsComplete: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE,
    concludedValuePerSf: 1532.98,
    finalValueApproachSales: Enums.FINAL_VALUES_APPROACH.sales,
    valueConclusions: [  
        Enums.VALUE_CONCLUSION_MARKET_VALUE_NAMES.prospectiveMarketValueAsCompleted,
        Enums.VALUE_CONCLUSION_MARKET_VALUE_NAMES.prospectiveMarketValueAsStabilized,
        Enums.VALUE_CONCLUSION_MARKET_VALUE_NAMES.asIsMarketValue,
    ],
    sectionToExport: [ Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.summaryOfSalientFactsAndConclusions ]
};