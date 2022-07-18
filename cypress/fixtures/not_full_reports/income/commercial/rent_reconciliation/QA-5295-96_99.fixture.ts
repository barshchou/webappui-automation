import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryAutomation } from "../../../../../types/boweryAutomation.type";
import { BoweryReports } from "../../../../../types/boweryReports.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5295-96_99", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _leaseStatuses: BoweryReports.LeaseStatus[] = [ "Occupied", "Occupied" ];
const _rentPSFs: number[] = [ 100, 200 ];

const _leaseTermsAdjustments = [ 2, 3.00, -11.42 ];
const _marketConditionAdjustments = [ 5, -6.51, 30.01 ];

export default {
    reportCreationData: _reportCreationData,
    leaseStatuses: _leaseStatuses,
    unitsNumber: 2,
    numberOfComparables: 3,
    rentPSFs: _rentPSFs,
    compGroupName: "TestCompGroup_4189",
    rentPSFLabelName: "Rent/SF/Month",
    unitsOfMeasure: Enums.UNITS_OF_MEASURE.perSquareFootPerYear,
    calculationTypePercent: Enums.CALCULATION_TYPE.percent,
    calculationTypeSF: Enums.CALCULATION_TYPE.dollarPerSF,
    leaseTermsAdjustments: _leaseTermsAdjustments,
    marketConditionAdjustments: _marketConditionAdjustments
};