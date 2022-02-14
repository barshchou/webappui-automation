import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4604.fixture";
import {createReport} from "../../../../actions/base/baseTest.actions";

describe("Less [USE (Property>Commercial Units)] Commercial V/C Loss @ X% -> Total", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });


});