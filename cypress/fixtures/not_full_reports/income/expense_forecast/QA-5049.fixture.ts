import ReportDataCreator from "../../../data_creator/reportData.creator";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import { BoweryReports } from "../../../../types/boweryReports.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5049-50", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2500,
    numberOfUnits: 3,
};

const _numberOfResidentialUnits = 3;

const expenseForecastCustomFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "Custom Category",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 213.19
    };
};

export default {
    reportCreationData: _reportCreationData,
    buildingDescription: _buildingDescription,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    expenseForecastCustomFixture
    
};