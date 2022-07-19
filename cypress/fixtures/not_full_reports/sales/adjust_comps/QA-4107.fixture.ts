import ReportDataCreator from "../../../data_creator/reportData.creator";

const comparableFixture = () => {
    return {
        address: "200 West 78 Street",
        sizeAdjustment: 20,
        conditionAdjustment: -30,
        otherAdjustment: 40,
        propertyRights: -70
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4107"),
    calculationUnits: "Per Residential Units",
    comparable: Object.freeze(comparableFixture())
};