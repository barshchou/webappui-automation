import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Report from "../../../../actions/report/report.manager";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4638.fixture';

describe(`Verify the suggested text dropdown in the new narrative component added through "=" for the 'Sheriff's sale' option 
    on the Report > Client page for Intended User and Identification of the Client sections.`, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToClientPage();
        Report.Client.verifyProgressBarNotExist()
            .clickEditIntendedUserButton()
            .enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .verifyIntendedUserTextBox(testData.verifyAreaValue);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});