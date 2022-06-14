import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const comparableFixture = () => {
    return {
        address: "200 West 78 Street"
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4169", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    compAddress: "140 E 14th St, New York, NY 10003, USA",
    condition: "Shell",
    comparableType: "Mixed-Use",
    source: "Bowery Subject",
    comparable: Object.freeze(comparableFixture())
};