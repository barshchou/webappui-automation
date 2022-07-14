import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";


const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5759-60", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2500,
    numberOfUnits: 5,
};

const _basis = "unit";

const expenseForecastElectricityFixture = (): BoweryReports.ForecastItem => {
    return {
        name: "waterAndSewer",
        basis: _basis,
        forecast: 4000
    };
};

export default {
    reportCreationData: _reportCreationData,
    buildingDescription: _buildingDescription,
    expenseForecastWaterAndSewer: expenseForecastElectricityFixture(),
    basis: _basis,
    
};