import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5057");
};

const residentialUnits = 3;
const grossBuildingArea = 3000;
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
    customCategoryName
};