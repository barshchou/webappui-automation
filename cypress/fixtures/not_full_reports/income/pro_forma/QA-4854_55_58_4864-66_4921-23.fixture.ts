import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _numberOfRooms = 2;
const _name = Enums.EXPENSE_CELL.fuel;
const _basis = "sf" as BoweryReports.UnitSF;
const _projection = 567.89;
const _forecast = 322;
const _perRoomAnalysis = Enums.RENT_ROLL_OPTIONS_CHECKBOXES.include;
const _residentialRooms = Array(_numberOfResidentialUnits).fill(_numberOfRooms);

const _forecastItem = (): BoweryReports.ForecastItem => {
    return {
        name: _name,
        basis: _basis,
        projection: _projection,
        forecast: _forecast
    };
};

const _fuelSfTotal = _forecast * _grossBuildingArea;
const _fuelSfPerSf = _forecast;
const _fuelSfPerUnit = _fuelSfTotal / _numberOfResidentialUnits;

const _fuelUnitTotal = _forecast * _numberOfResidentialUnits;
const _fuelUnitPerSf = _fuelUnitTotal / _grossBuildingArea;
const _fuelUnitPerUnit = _forecast;

const _fuelRoomTotal = _forecast * _numberOfResidentialUnits * _numberOfRooms;
const _fuelRoomPerSf = _fuelRoomTotal / _grossBuildingArea;
const _fuelRoomPerUnit = _forecast * _numberOfRooms;


const _reportCreationData = ReportDataCreator.getReportData("QA-4854_55_58_4864-66_4921-23", {
    incomeValue: Enums.INCOME_TYPE.both
});

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    forecastItem: _forecastItem(),
    fuelSfTotal: _fuelSfTotal,
    fuelSfPerSf: _fuelSfPerSf,
    fuelSfPerUnit: _fuelSfPerUnit,
    fuelUnitTotal: _fuelUnitTotal,
    fuelUnitPerSf: _fuelUnitPerSf,
    fuelUnitPerUnit: _fuelUnitPerUnit,
    fuelRoomTotal: _fuelRoomTotal,
    fuelRoomPerSf: _fuelRoomPerSf,
    fuelRoomPerUnit: _fuelRoomPerUnit,
    perRoomAnalysis: _perRoomAnalysis,
    residentialRooms: _residentialRooms
};