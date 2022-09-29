import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { numberWithCommas } from "../../../../../utils/numbers.utils";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5071");
};

const _customCategory: BoweryReports.ForecastItem = {
    name: "Heating",
    basis: Enums.UNIT_SF.sf,
    forecast: 4
};

const residentialUnits = 3;
const grossBuildingArea = 3000;

const customCategoryGeneratedCommentary = () => {
    return {
        generatedPerSf: 
        "We have projected this expense at $"+ _customCategory.forecast.toFixed(2) +
        " per square foot, or $"
        + numberWithCommas(grossBuildingArea * _customCategory.forecast) +" annually."
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    customCategory: _customCategory, 
    customCategoryGeneratedCommentary: Object.freeze(customCategoryGeneratedCommentary()),
    residentialUnits,
    grossBuildingArea
};