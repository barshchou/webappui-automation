import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData = ReportDataCreator.getReportData("4110", {
    incomeValue: Enums.INCOME_TYPE.both
});

const comparableFixture = () => {
    return {
        address: "200 West 78 Street",
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
    calculationUnits: "Per Total Units",
    basis: "Price per Unit"
};