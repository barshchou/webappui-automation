import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "4382");
};

export default {
    reportCreationData: reportCreationFixture(),
    leaseStatuses: ["Occupied", "Vacant"]
};