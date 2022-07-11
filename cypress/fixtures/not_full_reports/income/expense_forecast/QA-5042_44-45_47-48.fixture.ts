import ReportDataCreator from "../../../data_creator/reportData.creator";
import { BoweryReports } from "../../../../types/boweryReports.type";

const _customCategoryNameValidation: BoweryReports.ForecastItem = {
    name: " _CustomКатегори !№;%: _ "
};

const _firstCustomCategory: BoweryReports.ForecastItem = {
    name: "Plants growing"
};

const _secondCustomCategory: BoweryReports.ForecastItem = {
    name: "Pool cleaning"
};

const _thirdCustomCategory: BoweryReports.ForecastItem = {
    name: "Car parking"
};

const _validationMessage = 'Please fill out this field.';
const _redColor = 'rgb(244, 67, 54)';

export default {
    reportCreationData: ReportDataCreator.getReportData("5042"),
    customCategoryNameValidation: _customCategoryNameValidation,
    firstCustomCategory: _firstCustomCategory,
    secondCustomCategory: _secondCustomCategory,
    thirdCustomCategory: _thirdCustomCategory,
    validationMessage: _validationMessage,
    redColor: _redColor,
};