import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const comparableFixture = () => {
    return {
        address: "200 West 78 Street",
        sizeAdjustment: 20,
        conditionAdjustment: -30,
        otherAdjustment: 40
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4103_13", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    comparable: Object.freeze(comparableFixture()),
    calculationUnits: [ "Per Residential Units", "Per Total Units" ],
    existColumns: [ "Cumulative Price Per Unit", "Adjusted Price Per Unit" ]
};