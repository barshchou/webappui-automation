import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4387", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

export default {
    reportCreationData: reportCreationFixture(),
    value:"=un",
    unchangeRenovation: "Unchanged Renovations",
    verifyAreaValue: "Upon renovation, the subject unit count and gross building area will remain unchanged."
};