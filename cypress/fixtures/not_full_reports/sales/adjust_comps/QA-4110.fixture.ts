import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData = ReportDataCreator.getReportData("4110", {
    incomeValue: Enums.INCOME_TYPE.both
});

const compAddress = "626 1 Avenue";
const _cumulativePricePerUnit = "$237,063";


const _compAdjustments = {
    propertyRights: -70,
    financingTerms: 20,
    conditionsOfSale: 5,
    marketConditions: -30,
};

export default {
    reportCreationData: _reportCreationData,
    comparablesAdjustments: _compAdjustments,
    calculationUnits: Enums.CALCULATION_UNITS.perTotalUnits,
    basis: "Price per Unit",
    cumulativePricePerUnit: _cumulativePricePerUnit,
    compAddress,
    exportSectionName: Enums.EXPORT_TITLES.cumulativePricePerUnit,
    sectionToExport: Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.salesComparisonApproach
};