import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import enums from "../../../../enums/enums";

const _units = 3;
const basisUnit: BoweryReports.UnitSF = enums.UNIT_SF.unit;
const basisSF: BoweryReports.UnitSF = enums.UNIT_SF.sf;
const _grossBuildingArea = 5000;
const _buildingDescription: BoweryReports.BuildingDescription = { 
    grossArea: _grossBuildingArea, numberOfUnits: _units 
};

const expenseForecastElectricityFixture = (_basis: BoweryReports.UnitSF): BoweryReports.ForecastItem => {
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
    basisUnit,
    basisSF,
    units: _units,
    buildingDescription: _buildingDescription
};
