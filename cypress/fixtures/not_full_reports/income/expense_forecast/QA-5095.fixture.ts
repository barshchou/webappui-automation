import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5095");
};

const _checkboxNames: string[] = Enums.EXPENSE_FORECAST_ITEMS.expenseCardsIDArray;

const _expenseForecasts: BoweryReports.ForecastItem[] = [
    {
        name: "insurance", 
        forecast: 350
    },
    {
        name: "electricity",
        forecast: 1380
    },
    {
        name: "fuel", 
        forecast: 500
    },
    {
        name: "waterAndSewer",
        forecast: 150
    },
    {
        name: "repairsAndMaintenance",
        forecast: 450
    },
    {
        name: "payrollAndBenefits",
        forecast: 350
    },
    {
        name: "generalAndAdministrative",
        forecast: 200
    },
    {
        name: "legalAndProfessionalFees",
        forecast: 650
    },
    {
        name: "miscellaneous",
        forecast: 200
    },
    {
        name: "management",
        forecast: 850
    },
    {
        name: "reserves",
        forecast: 400
    }
];

const _perUnitBasis: BoweryReports.UnitSF = "unit";
const _perSFBasis: BoweryReports.UnitSF = "sf";
const _perRoomBasis: BoweryReports.UnitSF = "room";

const _fuelForecastPerRoom: BoweryReports.ForecastItem = {
    name: "fuel", 
    basis: "room",
    forecast: 500
};

export default {
    reportCreationData: reportCreationFixture(),
    checkboxNames: _checkboxNames,
    expenseForecasts: _expenseForecasts,
    perUnitBasis: _perUnitBasis,
    perSFBasis: _perSFBasis,
    perRoomBasis: _perRoomBasis,
    fuelForecastPerRoom: _fuelForecastPerRoom
};