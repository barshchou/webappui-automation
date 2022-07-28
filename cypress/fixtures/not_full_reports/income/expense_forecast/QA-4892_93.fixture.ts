import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _units = 3;
const _basis = "unit" as BoweryReports.UnitSF;
const _grossBuildingArea = 5000;
const _buildingDescription: BoweryReports.BuildingDescription = { 
    grossArea: _grossBuildingArea, numberOfUnits: _units 
};

const expenseForecastElectricityFixture = (_basis: 'sf' | 'unit'): BoweryReports.ForecastItem => {
    return {
        name: "electricity",
        basis: _basis,
        forecast: 10500
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4892_93"),
    expenseForecastElectricity: expenseForecastElectricityFixture,
    grossBuildingArea: _grossBuildingArea,
    basis: _basis,
    units: _units,
    buildingDescription: _buildingDescription
};
