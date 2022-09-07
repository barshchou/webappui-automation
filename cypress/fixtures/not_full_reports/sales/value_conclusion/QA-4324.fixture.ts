import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _firstCompAdjustment = {
    propertyRights: 10,
    financingTerms: 2,
    conditionsOfSale: -5,
    marketConditions: 0,
};

const _secondCompAdjustment = {
    propertyRights: 20,
    financingTerms: 15,
    conditionsOfSale: -20,
    marketConditions: 10,
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4324", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    compsAmount: 2,
    compGbaInput: 300,
    contractPrice: 150000,
    calculationUnits: Enums.CALCULATION_UNITS.psf,
    compsAdjustments: [
        _firstCompAdjustment,
        _secondCompAdjustment
    ],
    valueConclusion: 1234,
    comparableType: Enums.COMPARABLE_TYPES.multifamily
};