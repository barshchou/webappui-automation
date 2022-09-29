import { numberWithCommas } from './../../../../../utils/numbers.utils';
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5073");
};

const _customCategory: BoweryReports.ForecastItem = {
    name: "Heating",
    basis: Enums.UNIT_SF.unit,
    forecast: 4
};

const _customCategoryUpdated: BoweryReports.ForecastItem = {
    name: "Heating",
    basis: Enums.UNIT_SF.sf,
    forecast: 5
};

const residentialUnits = 3;
const grossBuildingArea = 3000;
const residentialUnitsUpdated = 10;
const grossBuildingAreaUpdated = 1500;

const customCategoryGeneratedCommentary = () => {
    return {
        generatedPerUnit: 
        "We have projected this expense at $"+ _customCategory.forecast +
        " per unit, or $"+ residentialUnits * _customCategory.forecast +" annually."
    };
};

const updatedCustomCategoryGeneratedCommentary = () => {
    return {
        generatedPerSf: 
        "We have projected this expense at $"+ _customCategoryUpdated.forecast.toFixed(2) +
        " per square foot, or $"
        + numberWithCommas(grossBuildingAreaUpdated * _customCategoryUpdated.forecast) +" annually."
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    customCategory: _customCategory,
    customCategoryUpdated: _customCategoryUpdated,
    customCategoryGeneratedCommentary: Object.freeze(customCategoryGeneratedCommentary()),
    updatedCustomCategoryGeneratedCommentary: Object.freeze(updatedCustomCategoryGeneratedCommentary()),
    residentialUnits,
    grossBuildingArea,
    residentialUnitsUpdated,
    grossBuildingAreaUpdated
};