import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const comparableFixture = () => {
    return {
        sizeAdjustment: 20,
        conditionAdjustment: -30,
        otherAdjustment: 40
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4113", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    comparable: Object.freeze(comparableFixture())
};