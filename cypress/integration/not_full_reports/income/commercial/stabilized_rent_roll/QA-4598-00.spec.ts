import { Income } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4598-00.fixture";

describe(`Verify the suggested text dropdown in the new narrative component added through "=" for the 'Unchanged Renovation' 
  option in the Generated Commentary on the Stabilized Rent Roll page.`, 
    { tags: [ "@income", "@commercial", "@stabilized_rent_roll", "@check_export" ] }, () => {
      
    it.only("Test body", () => {
        cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
        createReport(testData.reportCreationDataAsIs);

        cy.stepInfo("1. Proceed to the Income > Commercial > Stabilized Rent Roll page.");
        _NavigationSection.navigateToCommercialStabilizedRentRoll();

        cy.stepInfo("2. Click on the Edit button in the Stabilized Commercial Income Discussion section.");
        Income._CommercialManager.StabilizedRentRoll.clickEditDiscussionButton();

        cy.stepInfo("3. Enter the “=“ and select the 'Unchanged Renovation' option.");
        testData.chips.forEach(chip => {
            Income._CommercialManager.StabilizedRentRoll.editDiscussionTextArea(`=${chip.typeSuggestValue}`, true)
            .clickNarrativeSuggestions(chip.typeSuggestValue)
            .verifyCommentaryContainsText(chip.verifySuggest);
        });

        deleteReport(testData.reportCreationDataAsIs.reportNumber);
    });

    // it("Check export", () => {
    //     cy.task("getFilePath",
    //     { _reportName: testData.reportCreationDataAsIs.reportNumber, _docx_html: "html" }
    //     ).then(file => {
    //         cy.log(<string>file);
            
    //         cy.visit(<string>file);
    //         cy.xpath("//h4[.='Current Commercial Rent Roll']/following-sibling::table")
    //             .eq(0).scrollIntoView().within(() => {
    //                 cy.stepInfo("Check that the leading # column removed");
    //                 cy.get("td>p").eq(0).should("not.contain.text", "#");
                        
    //                 cy.stepInfo("Check that Annual Rent represents a whole number");
    //                 cy.get("tr").eq(1).find("p").eq(6).should("have.text", `$${testData.annualRent}`);

    //                 cy.stepInfo("Check that Monthly Rent represents a whole number");
    //                 cy.get("tr").eq(1).find("p").eq(7).should("have.text", `$${testData.monthlyRent}`);

    //                 cy.stepInfo(`Verify that Totals text at the bottom of 
    //                             the new first column is displayed`);
    //                     cy.get("tr").eq(2).find("p").eq(0).should("have.text", "Totals");
    //             });
    //     });
    // });

    it.only("Test body", () => {
        cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
        createReport(testData.reportCreationDataAsStablized);

        cy.stepInfo("1. Proceed to the Income > Commercial > Stabilized Rent Roll page.");
        _NavigationSection.navigateToCommercialStabilizedRentRoll();

        cy.stepInfo("2. Click on the Edit button in the Stabilized Commercial Income Discussion section.");
        Income._CommercialManager.StabilizedRentRoll.clickEditDiscussionButton();

        cy.stepInfo("3. Enter the “=“ and select the 'Unchanged Renovation' option.");
        testData.chips.forEach(chip => {
            Income._CommercialManager.StabilizedRentRoll.editDiscussionTextArea(`=${chip.typeSuggestValue}`, true)
            .clickNarrativeSuggestions(chip.typeSuggestValue)
            .verifyCommentaryContainsText(chip.verifySuggest);
        });

        deleteReport(testData.reportCreationDataAsIs.reportNumber);
    });

    it.only("Test body", () => {
        cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
        createReport(testData.reportCreationDataAsComplete);

        cy.stepInfo("1. Proceed to the Income > Commercial > Stabilized Rent Roll page.");
        _NavigationSection.navigateToCommercialStabilizedRentRoll();

        cy.stepInfo("2. Click on the Edit button in the Stabilized Commercial Income Discussion section.");
        Income._CommercialManager.StabilizedRentRoll.clickEditDiscussionButton();

        cy.stepInfo("3. Enter the “=“ and select the 'Unchanged Renovation' option.");
        testData.chips.forEach(chip => {
            Income._CommercialManager.StabilizedRentRoll.editDiscussionTextArea(`=${chip.typeSuggestValue}`, true)
            .clickNarrativeSuggestions(chip.typeSuggestValue)
            .verifyCommentaryContainsText(chip.verifySuggest);
        });

        deleteReport(testData.reportCreationDataAsIs.reportNumber);
    });
});
