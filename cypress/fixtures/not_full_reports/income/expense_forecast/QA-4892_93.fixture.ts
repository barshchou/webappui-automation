import { BoweryReports } from "../../../../types";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _units = 3;
const _basis = "unit";
const _grossBuildingArea = 5000;
const _buildingDescription: BoweryReports.BuildingDescription = { grossArea: _grossBuildingArea, numberOfUnits: _units };

const expenseForecastElectricityFixture = (): BoweryReports.ForecastItem => {
    return {
        name: "electricity",
        basis: _basis,
        forecast: 10500
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4892_93"),
    expenseForecastElectricity: expenseForecastElectricityFixture(),
    grossBuildingArea: _grossBuildingArea,
    basis: _basis,
    units: _units,
    buildingDescription: _buildingDescription
};
