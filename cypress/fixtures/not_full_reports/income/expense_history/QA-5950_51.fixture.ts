import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData = (incomeValue: BoweryReports.IncomeTypes) => {
    return ReportDataCreator.getReportData(`5950_51-${incomeValue}`, {
        incomeValue: incomeValue
    });
};

const _getDataNotProvidedComm = (basis: BoweryReports.BasisSquareFootAnalysisTexts, isCommercial: boolean) => {
    const additionalText = isCommercial ? "" : "residential units and ";
    return "We were not provided with historical expenses, or an owner's pro forma. Therefore, we analyzed expense " +
        "reports of comparable properties in developing our forecast of operating expenses. " +
        `The data, analyzed in terms of ${additionalText}${basis.toLowerCase()}, is presented below.`;
};

const _getDataProvidedComm = (dataProvider: BoweryReports.ExpenseDataProvider,
    basis: BoweryReports.BasisSquareFootAnalysisTexts, isCommercial: boolean) => {
    const additionalText = isCommercial ? "" : "residential units and ";
    return `We were provided with the ${dataProvider.toLowerCase()}'s pro forma for the subject property. ` +
        "Therefore, we analyzed the subject's operating expense projections, as well as expense reports of " +
        "comparable properties, in developing our forecast of operating expenses. " +
        `The data, analyzed in terms of ${additionalText}${basis.toLowerCase()}, is presented below.`;
};

export default {
    reportCreationData: _reportCreationData,
    basisArea: 1000,
    getDataNotProvidedComm: _getDataNotProvidedComm,
    getDataProvidedComm: _getDataProvidedComm
};