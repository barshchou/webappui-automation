import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import expensesCellNames from "../../../../enums/expense/expenseCellNames";


const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5761-62", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2300,
    numberOfUnits: 3,
};

const expenseForecastGeneralAdministrativeFixture = (_basis: 'sf' | 'unit'): BoweryReports.ForecastItem => {
    return {
        name: expensesCellNames.generalAndAdministrative,
        basis: _basis,
        forecast: 4599.19
    };
};

export default {
    reportCreationData: _reportCreationData,
    buildingDescription: _buildingDescription,
    expenseForecastGeneralAdministrativeFixture,
};