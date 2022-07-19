import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const comparableFixture = () => {
    return {
        address: "200 West 78 Street"
    };
};

export default {
    setupInterceptions:salesInterceptions,
    reportCreationData: ReportDataCreator.getReportData("4248"),
    comparable: Object.freeze(comparableFixture())
};