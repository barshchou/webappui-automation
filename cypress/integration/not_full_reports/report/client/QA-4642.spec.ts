import testData from "../../../../fixtures/not_full_reports/report/client/QA-4642.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Report from "../../../../actions/report/report.manager";

const checkChipsOptions = (suggestion: string,optionName: string, textBoxName: "IntendedUserTextBox" | "IdentificationOfClientTextBox") => {
    const interactWithText = (textBox: Cypress.Chainable, indexForElement: number) => {
        return textBox.click().type(`{enter}{enter}=${suggestion}`).focus()
        .xpath(`//li[contains(text(),"${optionName}")]`).eq(0)
        .should("be.visible").click()
        .xpath("//button[contains(text(),'Revert to Original')]").eq(indexForElement).click({force:true})
        .get('[role="dialog"] button').eq(2).click();
    };

    if(textBoxName == "IntendedUserTextBox"){
        return interactWithText(Report.Client.Page.intendedUserTextBox, 0);
    }
    else if(textBoxName == "IdentificationOfClientTextBox"){
        return interactWithText(Report.Client.Page.identificationOfClientTextBox, 1);
    }
    
};

/**
 * ernst: WARN: remove skip after fixing this test
 */
describe.skip("Verify the Client Guidelines Discussion on the page", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToClientPage().verifyProgressBarNotExist();

        Report.Client.Page.formEditBtn(0).click();
        Report.Client.Page.formEditBtn(0).click();

        for(let [suggestion, option] of testData.linkedChipsDropdownOptions){
            checkChipsOptions(suggestion,option,"IntendedUserTextBox");
        }
        for(let [suggestion, option] of testData.linkedChipsDropdownOptions){
            checkChipsOptions(suggestion,option,"IdentificationOfClientTextBox");
        }

        deleteReport(testData.reportCreationData.reportNumber);
    });
});