import { BoweryReports } from "../../../../types";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _units = 3;
const _basis = "unit";
const _grossBuildingArea = 5000;
const _buildingDescription: BoweryReports.BuildingDescription = { grossArea: _grossBuildingArea, numberOfUnits: _units };

const expenseForecastElectricityFixture = (): BoweryReports.ForecastItem => {
    return {
        name: "waterAndSewer",
        basis: _basis,
        forecast: 4000
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4913_14"),
    buildingDescription: _buildingDescription,
    expenseForecastWaterAndSewer: expenseForecastElectricityFixture(),
    grossBuildingArea: _grossBuildingArea,
    basis: _basis,
    units: _units,
};