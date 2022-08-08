import Enums from "../../../../enums/enums";
import { SalesAdjustmentGrid } from "../../../../types/sales-adjustment-grid.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const comparableFixture = () => {
    return {
        sizeAdjustment: 20,
        conditionAdjustment: -30,
        otherAdjustment: 40
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4103_13", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    comparable: Object.freeze(comparableFixture()),
    calculationUnits: [ 
        Enums.CALCULATION_UNITS.perResidentialUnits, 
        Enums.CALCULATION_UNITS.perTotalUnits 
    ] as SalesAdjustmentGrid.CalculationUnits[],
    existColumns: [ "Cumulative Price Per Unit", "Adjusted Price Per Unit" ]
};
