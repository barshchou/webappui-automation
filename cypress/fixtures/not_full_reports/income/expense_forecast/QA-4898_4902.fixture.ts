import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getCurrentMonthName, getYearFromDate } from "../../../../../utils/date.utils";
import { BoweryReports } from "../../../../types/boweryReports.type";
import enums from "../../../../enums/enums";


const _actualWaterAndSewerItem = (_basis: BoweryReports.UnitSF ): BoweryReports.ForecastItem => {
    return {
        name: enums.EXPENSE_CELL.waterAndSewer,
        basis: _basis,
        projection: 10000
    };
}; 

const _t12WaterAndSewerItem = (_basis: BoweryReports.UnitSF): BoweryReports.ForecastItem => {
    return {
        name: enums.EXPENSE_CELL.waterAndSewer,
        basis: _basis,
        projection: 13000
    };
};

const _historicalWaterAndSewerItem= (_basis: BoweryReports.UnitSF): BoweryReports.ForecastItem => {
    return {
        name: enums.EXPENSE_CELL.waterAndSewer,
        basis: _basis,
        projection: 15000
    };
};

const _ownerProjectionWaterAndSewerItem = (_basis: BoweryReports.UnitSF): BoweryReports.ForecastItem => {
    return {
        name: enums.EXPENSE_CELL.waterAndSewer,
        basis: _basis,
        projection: 17000
    };
};

const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2500,
    numberOfUnits: 5,
};

const basisUnit: BoweryReports.UnitSF = enums.UNIT_SF.unit;
const basisSF: BoweryReports.UnitSF = enums.UNIT_SF.sf;

export default {
    reportCreationData: ReportDataCreator.getReportData("4898_4902"),
    actualWaterAndSewerItem: _actualWaterAndSewerItem,
    t12WaterAndSewerItem: _t12WaterAndSewerItem,
    historicalWaterAndSewerItem: _historicalWaterAndSewerItem,
    ownerProjectionWaterAndSewerItem: _ownerProjectionWaterAndSewerItem,
    basisUnit,
    basisSF,
    buildingDescription: _buildingDescription,
    periods: [
        {
            expensePeriodType: "Actual",
            year: Number(getYearFromDate()) - 1,
            waterAndSewer: 10000,
        },
        {
            expensePeriodType: "Projection",
            year: Number(getYearFromDate()) + 1,
            waterAndSewer: 17000,
        },
    ],
    periodsMonth: [
        {
            expensePeriodType: "Actual T12",
            month:getCurrentMonthName(),
            year: getYearFromDate(),
            waterAndSewer: 13000,
        },
        {
            expensePeriodType: "Annualized Historical",
            month: getCurrentMonthName(),
            year: getYearFromDate(),
            waterAndSewer: 15000,
        },
    ],

    waterAndSewerPerSfCardSnapshotName: "WaterAndSewer_PerSF_Forecast_Item_Component",
    waterAndSewerPerUnitCardSnapshotName: "WaterAndSewer_PerUnit_Forecast_Item_Component",
};