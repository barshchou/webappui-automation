import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4152", {
        incomeValue: Enums.INCOME_TYPE.BOTH,
    });
};

const sortByOptions = () => {
    return [
        "Newest", "Oldest", "Largest", "Smallest"];
};

export default {
    reportCreationData: reportCreationFixture(),
    sortByOptions: Object.freeze(sortByOptions())
};