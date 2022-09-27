import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5083");
};

const residentialUnits = 3;
const grossBuildingArea = 3000;
const customCategoryUppercase = "HEATING";
const customCategoryDiffCase = "HeATinG";
const customCategoryName = "Heating";

const _customCategory: BoweryReports.ForecastItem = {
    name: customCategoryName,
    basis: Enums.UNIT_SF.unit,
    forecast: 4
};

export default {
    reportCreationData: reportCreationFixture(),
    customCategory: _customCategory,
    residentialUnits,
    grossBuildingArea,
    customCategoryUppercase,
    customCategoryDiffCase,
    customCategoryName
};