import ReportDataCreator from "../../../data_creator/reportData.creator";
import { BoweryReports } from "../../../../types/boweryReports.type";
import expensesForecastCardNamesEnum from "../../../../enums/expense/expensesForecastCardNames.enum";
import Enums from "../../../../enums/enums";

const _fuelPerRoomItem: BoweryReports.ForecastItem = {
    name: expensesForecastCardNamesEnum.fuel,
    basis: Enums.UNIT_SF.room,
    forecast: 1234
};

const _rooms = 2;
const _units = 3;

const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2300,
    numberOfUnits: _units,
};

export default {
    reportCreationData: ReportDataCreator.getReportData("5797"),
    basisSquareFootAnalysis: Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossLeasableArea,
    fuelPerRoomItem: _fuelPerRoomItem,
    buildingDescription: _buildingDescription,
    perRoomAnalysis: "Include Per Room Analysis in Report",
    rooms: _rooms,
    allRoomsNumber: _rooms * _units
};