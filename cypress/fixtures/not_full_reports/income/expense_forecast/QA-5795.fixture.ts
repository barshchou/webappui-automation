import ReportDataCreator from "../../../data_creator/reportData.creator";
import { BoweryReports } from "../../../../types/boweryReports.type";
import expensesForecastCardNamesEnum from "../../../../enums/expense/expensesForecastCardNames.enum";
import Enums from "../../../../enums/enums";

const _fuelPerUnitItem: BoweryReports.ForecastItem = {
    name: expensesForecastCardNamesEnum.fuel,
    basis: Enums.UNIT_SF.unit,
    forecast: 1234
};

const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2300,
    numberOfUnits: 3,
};

export default {
    reportCreationData: ReportDataCreator.getReportData("5795"),
    basisSquareFootAnalysis: Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossLeasableArea,
    fuelPerUnitItem: _fuelPerUnitItem,
    buildingDescription: _buildingDescription
};