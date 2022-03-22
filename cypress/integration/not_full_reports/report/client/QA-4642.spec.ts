import testData from "../../../../fixtures/not_full_reports/report/client/QA-4642.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Report from "../../../../actions/report/report.manager";

const checkChipsOptions = (suggestion: string,optionName: string) => {
    return Report.Client.Page.IntendedUserTextBox.click().focus().type(`{enter}{enter}=${suggestion}`)
        .xpath(`//li[contains(text(),"${optionName}")]`).eq(0)
        .should("be.visible").click()
        .xpath("//button[contains(text(),'Revert to Original')]").eq(0).click()
        .get('[role="dialog"] button').eq(2).click()
}

describe("Verify the Client Guidelines Discussion on the page", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToClientPage().pause();

        Report.Client.Page.EditIntendedUserBtn.click();
        Report.Client.Page.EditIdentificationOfClientBtn.click().pause();

        for(let [suggestion, option] of testData.linkedChipsDropdownOptions){
            checkChipsOptions(suggestion,option);
        }

        deleteReport(testData.reportCreationData.reportNumber);
    });
});