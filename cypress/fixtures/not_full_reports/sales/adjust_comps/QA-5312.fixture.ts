import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData = ReportDataCreator.getReportData("5312", {
    incomeValue: Enums.INCOME_TYPE.both
});

const comparableFixture = () => {
    return {
        addresses: [  "56-45 Main Street", "626 1 Avenue" ],
    };
};

const _compAdjustments = {
    propertyRights: -70,
    financingTerms: 20,
    conditionsOfSale: 5,
    marketConditions: -30,
};

export default {
    reportCreationData: _reportCreationData,
    comparablesAdjustments: _compAdjustments,
    comparable: Object.freeze(comparableFixture()),
    calculationUnits: "Per Residential Units",
    basis: "Price per Unit"
};