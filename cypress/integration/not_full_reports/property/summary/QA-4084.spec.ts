import testData from "../../../../fixtures/not_full_reports/property/summary/QA-4084.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import {_NavigationSection} from "../../../../actions/base";
import {Property} from "../../../../actions";

describe("[QA-4084] Check the Census Tract field", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Property > Summary");
        _NavigationSection.navigateToPropertySummary();

        cy.stepInfo("2. Check the default value");
        Property._Summary.Page.censusTractField.invoke("val").then(text => {
            const fourDigits = text.toString().split(".")[0];
            expect(fourDigits).to.have.length(4);
        });
        Property._Summary.clickSaveButton();

        cy.stepInfo("3. Fill in value starting with any number");
        testData.verifyValues.forEach(value => {
            Property._Summary.Page.censusTractField.clear().type(value);
        }); 
        
        // deleteReport(testData.reportCreationData.reportNumber);
    });
});
