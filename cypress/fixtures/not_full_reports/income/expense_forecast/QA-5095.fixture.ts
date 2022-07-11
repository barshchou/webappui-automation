import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _reportCreationFixturePerSFBasis = () => {
    return ReportDataCreator.getReportData("5095_PSF");
};

const _reportCreationFixturePerUnitBasis = () => {
    return ReportDataCreator.getReportData("5095_PerUnit");
};

const _reportCreationFixturePerRoomBasis = () => {
    return ReportDataCreator.getReportData("5095_PerRoom");
};

const _checkboxNames: string[] = Enums.EXPENSE_FORECAST_ITEMS.expenseCardsIncludeInProFormaCheckboxArray;

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

const _forecastNames: string[] = [
    Enums.PRO_FORMA_TYPES.insurance,
    Enums.PRO_FORMA_TYPES.electricity,
    Enums.PRO_FORMA_TYPES.fuel,
    Enums.PRO_FORMA_TYPES.waterAndSewer,
    Enums.PRO_FORMA_TYPES.repairAndMaintenance,
    Enums.PRO_FORMA_TYPES.payrollBenefits,
    Enums.PRO_FORMA_TYPES.generalAndAdministrative,
    Enums.PRO_FORMA_TYPES.legalAndProfessional,
    Enums.PRO_FORMA_TYPES.miscellaneous,
    Enums.PRO_FORMA_TYPES.managementFees,
    Enums.PRO_FORMA_TYPES.replacementsAndReserves
];

const _perUnitBasis: BoweryReports.UnitSF = "unit";
const _perSFBasis: BoweryReports.UnitSF = "sf";
const _perRoomBasis: BoweryReports.UnitSF = "room";

const _fuelForecastPerRoom: BoweryReports.ForecastItem = {
    name: "fuel", 
    basis: "room",
    forecast: 500
};

const _fuelForecastName: string = Enums.PRO_FORMA_TYPES.fuel;

export default {
    reportCreationDataPerSFBasis: _reportCreationFixturePerSFBasis(),
    reportCreationDataPerUnitBasis: _reportCreationFixturePerUnitBasis(),
    reportCreationDataPerRoomBasis: _reportCreationFixturePerRoomBasis(),
    checkboxNames: _checkboxNames,
    expenseForecasts: _expenseForecasts,
    forecastNames: _forecastNames,
    perUnitBasis: _perUnitBasis,
    perSFBasis: _perSFBasis,
    perRoomBasis: _perRoomBasis,
    fuelForecastPerRoom: _fuelForecastPerRoom,
    fuelForecastName: _fuelForecastName
};