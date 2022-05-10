import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const comparableFixture = () => {
    return {
        address: "200 West 78 Street"
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4171", {
        incomeValue: Enums.INCOME_TYPE.BOTH
    }),
    comparable: Object.freeze(comparableFixture())
};