import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "4152");
};

const sortByOptions = () => {
    return [
        "Newest", "Oldest", "Largest", "Smallest"];
};

export default {
    reportCreationData: reportCreationFixture(),
    sortByOptions: Object.freeze(sortByOptions())
};