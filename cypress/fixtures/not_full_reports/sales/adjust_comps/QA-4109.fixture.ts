import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _compAdjustments = {
    propertyRights: 10,
    financingTerms: 2,
    conditionsOfSale: -5,
    marketConditions: 0,
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4109", {
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED
    }),
    comparableAdjustment: _compAdjustments,
    calculationUnits: Enums.CALCULATION_UNITS.psf,
    basis:"Price per SF",
    exportSectionName: Enums.EXPORT_TITLES.cumulativePricePerUnit,
    sectionToExport: Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.salesComparisonApproach
};