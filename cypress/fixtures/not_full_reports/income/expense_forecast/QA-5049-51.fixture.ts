import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { numberWithCommas } from "../../../../../utils/numbers.utils";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5049-51", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2500,
    numberOfUnits: 3,
};

const perUnitFieldValue = () => {
    let perUnitValue = numberWithCommas(Math.round(_buildingDescription.grossArea * expenseForecastCustomFixture(basis).forecast / _buildingDescription.numberOfUnits));
    let perUnitValueText = `$${perUnitValue}`;
    return perUnitValueText;
};

const perSFFieldValue = () => {
    let perSFValue = numberWithCommas((_buildingDescription.numberOfUnits * expenseForecastCustomFixture(basis).forecast / _buildingDescription.grossArea).toFixed(2));
    let perSFValueText = `$${perSFValue}`;
    return perSFValueText;
};

const expenseForecastCustomFixture = (_basis?: string): BoweryReports.ForecastItem => {
    return {
        name: "Custom Category",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 213.19
    };
};

const basis = "unit";
const numberOfResidentialUnitsZero = 0;
const perUnitValueTextNaN = '$NaN';
const perSFValueTextNaN = '$0.00';
const perUnitSlidingBarBasis = '($/UNIT)';
const perSFSlidingBarBasis = '($/SF)';
const perUnitSlidingBarTitleNameCustom = `${Cypress._.toUpper(expenseForecastCustomFixture(basis).name)}` + ' ' + perUnitSlidingBarBasis;
const perSFSlidingBarTitleNameCustom = `${Cypress._.toUpper(expenseForecastCustomFixture(basis).name)}` + ' ' + perSFSlidingBarBasis;
const slidingBarPerSFSnapshotName = 'slidingBarPerSFSnapshotName';
const slidingBarPerUnitSnapshotName = 'slidingBarPerUnitSnapshotName';


export default {
    reportCreationData: _reportCreationData,
    buildingDescription: _buildingDescription,
    expenseForecastCustomFixture,
    basis,
    perUnitFieldValue,
    perSFFieldValue,
    numberOfResidentialUnitsZero,
    perUnitValueTextNaN,
    perSFValueTextNaN,
    perUnitSlidingBarBasis,
    perSFSlidingBarBasis,
    perUnitSlidingBarTitleNameCustom,
    perSFSlidingBarTitleNameCustom,
    slidingBarPerSFSnapshotName,
    slidingBarPerUnitSnapshotName,
};