import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryAutomation } from "../../../../../types/boweryAutomation.type";
import { BoweryReports } from "../../../../../types/boweryReports.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5397-98", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _leaseStatuses: BoweryReports.LeaseStatus[] = [ "Occupied", "Occupied" ];
const _rentPSFs: number[] = [ 100, 200 ];

const _leaseTermsAdjustments = (): number[] => {
    return [ 2, 3.00, -11.42 ];
};
const _marketConditionAdjustments = (): number[] => {
    return [ 5, -6.51, 30.01 ];
};

const _sectionsToExport: BoweryReports.SectionsToIncludeInExport[] = [
    Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.salesComparisonApproach,
    Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.reconciliationAndFinalValueOpinion
];

export default {
    reportCreationData: _reportCreationData,
    leaseStatuses: _leaseStatuses,
    unitsNumber: 2,
    numberOfComparables: 3,
    rentPSFs: _rentPSFs,
    compGroupName: "TestCompGroup_5397-98",
    rentPSFLabelName: "Rent/SF/Month",
    unitsOfMeasure: Enums.UNITS_OF_MEASURE.perSquareFootPerYear,
    calculationTypePercent: Enums.CALCULATION_TYPE.percent,
    calculationTypeSF: Enums.CALCULATION_TYPE.dollarPerSF,
    leaseTermsAdjustments: _leaseTermsAdjustments(),
    marketConditionAdjustments: _marketConditionAdjustments(),
    sectionsToExport: _sectionsToExport
};