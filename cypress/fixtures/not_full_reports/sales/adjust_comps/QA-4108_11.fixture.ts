import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData = ReportDataCreator.getReportData("4108_11", {
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

const _locationAdjustments = {
    neighborhoodAdjustment: -30,
    locationInNeighborhoodAdjustment: 20
};

export default {
    reportCreationData: _reportCreationData,
    comparablesAdjustments: _compAdjustments,
    locationAdjustments: _locationAdjustments,
    comparable: Object.freeze(comparableFixture()),
    calculationUnits: "Per Residential Units",
    compsToAdd: [ 0, 1 ],
};