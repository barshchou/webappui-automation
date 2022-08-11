import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const comparableFixture = () => {
    return {
        address: "626 1 Avenue"
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4171", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    comparable: Object.freeze(comparableFixture())
};