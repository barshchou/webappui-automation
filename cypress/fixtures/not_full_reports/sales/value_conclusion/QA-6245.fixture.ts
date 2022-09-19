import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("6245", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED
    });
};

export default {
    reportCreationData: reportCreationFixture(),
    leaseStatus: Enums.LEASE_STATUS.occupied,
    basisForSquareFootAnalysis: Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossLeasableArea,
    squareFootAnalysisArea: 1000, 
    residentialUnits: 2,
    commercialUnits: 3,
    commercialMonthlyRent: [ 123.45, 321.01, 44 ],
    residentialMonthlyRent: [ 64.19, 1234.76 ],
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
    conclusionValueAsStabilized: Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED
};