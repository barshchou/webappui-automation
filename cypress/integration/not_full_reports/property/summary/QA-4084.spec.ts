import testData from "../../../../fixtures/not_full_reports/property/summary/QA-4084.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";

describe("[QA-4084] Check the Census Tract field", { tags: [ "@property", "@summary" ] }, () => {
    beforeEach("Login, create report", () => {
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
            Property._Summary.clickSaveButton()
                .verifyCensusTract(value);
        }); 

        cy.stepInfo("4. The Census Tract field is empty");
        Property._Summary.Page.censusTractField.clear();
        Property._Summary.clickSaveButton()
            .verifyCensusTract("");

        cy.stepInfo("5. Fill in value using incorrect format and try to Save");
        Property._Summary.Page.censusTractField.clear().type(testData.incorrectValue);
        Property._Summary.clickSaveButton(false);
        Property._Summary.Page.censusTractFieldValidationText(testData.validationText).should("be.visible");
    });
});
