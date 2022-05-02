import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "4153");
};

const checkboxesAttributesFixture = () => {
    return [
        "gross", "modified gross", "tiple-net"];
};

export default {
    reportCreationData: reportCreationFixture(),
    checkboxesAttributes: Object.freeze(checkboxesAttributesFixture())
};