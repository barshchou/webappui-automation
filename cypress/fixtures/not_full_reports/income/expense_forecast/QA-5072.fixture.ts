import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5072");
};

const _customCategory: BoweryReports.ForecastItem = {
    name: "Heating",
    basis: Enums.UNIT_SF.unit,
    forecast: 4
};

const residentialUnits = 3;
const grossBuildingArea = 3000;

const customCategoryGeneratedCommentary = () => {
    return {
        generatedPerUnit: 
        "We have projected this expense at $"+ _customCategory.forecast +
        " per unit, or $"+ residentialUnits * _customCategory.forecast +" annually."
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    customCategory: _customCategory, 
    customCategoryGeneratedCommentary: Object.freeze(customCategoryGeneratedCommentary()),
    residentialUnits,
    grossBuildingArea
};