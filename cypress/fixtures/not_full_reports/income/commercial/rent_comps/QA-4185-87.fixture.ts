import { BoweryAutomation } from "../../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4185-87", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _leaseStatus: BoweryReports.LeaseStatus = "Occupied";

const _unitMeasures: BoweryReports.UnitsOfMeasure[] =
    [ Enums.UNITS_OF_MEASURE.perSquareFootPerMonth, Enums.UNITS_OF_MEASURE.annually, Enums.UNITS_OF_MEASURE.monthly,
        Enums.UNITS_OF_MEASURE.perSquareFootPerYear ];

export default {
    reportCreationData: _reportCreationData,
    unitsNumber: 1,
    leaseStatus: _leaseStatus,
    unitMeasures: _unitMeasures
};