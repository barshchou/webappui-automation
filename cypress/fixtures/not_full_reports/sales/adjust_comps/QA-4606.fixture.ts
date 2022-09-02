import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export const createReportData = conclusion => {
    return ReportDataCreator.getReportData("4606", { 
        incomeValue: Enums.INCOME_TYPE.both, conclusionValue: conclusion 
    });
};

const _conclusionValue: Array<BoweryReports.ConclusionValue> = [
    Enums.VALUE_CONCLUSION_TYPE.AS_IS,
    Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED,
    Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
]; 


export default {
    conclusionValue: _conclusionValue,
    propertyCondition: "Satisfactory",
    reportCreationData: ReportDataCreator.getReportData("4606", { incomeValue: Enums.INCOME_TYPE.both }),
    calculationUnits: [ 
        Enums.CALCULATION_UNITS.psf, 
        Enums.CALCULATION_UNITS.perResidentialUnits 
    ] as BoweryReports.SalesAdjustmentGrid.CalculationUnits[],
    adjustmentName: Enums.SALES_ADJUSTMENT_GRID.otherAdjustment,
};