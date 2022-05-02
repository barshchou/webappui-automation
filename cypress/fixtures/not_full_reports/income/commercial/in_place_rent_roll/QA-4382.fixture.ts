import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4382", {
        incomeValue: Enums.INCOME_TYPE.BOTH,
    });
};

export default {
    reportCreationData: reportCreationFixture(),
    leaseStatuses: ["Occupied", "Vacant"]
};