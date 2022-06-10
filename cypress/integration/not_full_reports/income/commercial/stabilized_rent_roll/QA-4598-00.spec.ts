import { numberWithCommas } from "../../../../../../utils/numbers.utils";
import { Income, Property, ReviewExport } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4598-00.fixture";

describe(`Verify the suggested text dropdown in the new narrative component added through "=" for the 'Unchanged Renovation' 
  option in the Generated Commentary on the Stabilized Rent Roll page.`, 
    { tags: [ "@income", "@commercial", "@stabilized_rent_roll", "@check_export" ] }, () => {

    it("As Is", () => {
        cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
        createReport(testData.reportCreationDataAsIs);

        cy.intercept({
            method: 'PATCH',
            url: '/report/*'
        }).as("reportTest");

        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits)
            .enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterGrossBuildingArea(testData.grossBuildingArea)
            .enterSiteArea(testData.siteArea)
            .enterBuildingName(testData.buildingName);

        cy.stepInfo("1. Proceed to the Income > Commercial > Stabilized Rent Roll page.");
        _NavigationSection.navigateToCommercialStabilizedRentRoll();

        cy.stepInfo("2. Click on the Edit button in the Stabilized Commercial Income Discussion section.");
        Income._CommercialManager.StabilizedRentRoll.clickEditDiscussionButton();

        cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
        testData.asIschips.forEach((chip) => {
            Income._CommercialManager.StabilizedRentRoll.editDiscussionTextArea(`=${chip.typeSuggestValue}`, false)
            .clickNarrativeSuggestions(chip.typeSuggestValue)
            .verifyCommentaryContainsText(chip.verifySuggest);
        });
        Income._CommercialManager.StabilizedRentRoll.clickSaveDiscussionButton()
            .verifyProgressBarNotExist();
        
        cy.wait('@reportTest').then( ({ response }) => {
            expect(response.statusCode).equal(200);
            cy.log("Waiting for report to properly save");
        });

        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationDataAsIs.reportNumber);
        deleteReport(testData.reportCreationDataAsIs.reportNumber);
    });

    it("Check export", () => {
        cy.task("getFilePath", { _reportName: testData.reportCreationDataAsIs.reportNumber, _docx_html: "html" }).then(file => {
            cy.log(<string>file);
            cy.stepInfo("3. Verify the linked chips on export");
            cy.visit(<string>file);
            testData.asIschips.forEach(chip => {
                let expectedText = typeof chip.verifyExport ===  "number" ? `${numberWithCommas(chip.verifyExport)}`: chip.verifyExport;
                cy.contains("Commercial Stabilized Rent Roll").next().scrollIntoView().should("include.text", expectedText);
            });
        }); 
    });

    it("As Stabilized", () => {
        cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
        createReport(testData.reportCreationDataAsStablized);

        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits)
            .enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterGrossBuildingArea(testData.grossBuildingArea)
            .enterSiteArea(testData.siteArea)
            .enterBuildingName(testData.buildingName);

        cy.stepInfo("1. Proceed to the Income > Commercial > Stabilized Rent Roll page.");
        _NavigationSection.navigateToCommercialStabilizedRentRoll();

        cy.stepInfo("2. Click on the Edit button in the Stabilized Commercial Income Discussion section.");
        Income._CommercialManager.StabilizedRentRoll.clickEditDiscussionButton();

        cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
        testData.asStabilizedChips.forEach((chip: { typeSuggestValue: string; verifySuggest: string | number; }) => {
            Income._CommercialManager.StabilizedRentRoll.editDiscussionTextArea(`=${chip.typeSuggestValue}`, false)
            .clickNarrativeSuggestions(chip.typeSuggestValue)
            .verifyCommentaryContainsText(chip.verifySuggest);
        });
        Income._CommercialManager.StabilizedRentRoll.clickSaveDiscussionButton()
            .verifyProgressBarNotExist();

        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationDataAsStablized.reportNumber);
        deleteReport(testData.reportCreationDataAsStablized.reportNumber);
    });

    it("Check export", () => {
        cy.task("getFilePath", { _reportName: testData.reportCreationDataAsIs.reportNumber, _docx_html: "html" }).then(file => {
            cy.log(<string>file);
            cy.stepInfo("3. Verify the linked chips on export");
            cy.visit(<string>file);
            testData.asStabilizedChips.forEach(chip => {
                let expectedText = typeof chip.verifyExport ===  "number" ? `${numberWithCommas(chip.verifyExport)}`: chip.verifyExport;
                cy.contains("Commercial Stabilized Rent Roll").next().scrollIntoView().should("include.text", expectedText);
            });
        }); 
    });

    it.only("As Completed", () => {
        cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
        createReport(testData.reportCreationDataAsComplete);

        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits)
            .enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterCurrentNumberOfResUnits(testData.currentNumberOfResidentialUnits)
            .enterCurrentNumberOfCommercialUnits(testData.currentNumberOfCommercialUnits)
            .enterGrossBuildingArea(testData.grossBuildingArea)
            .enterSiteArea(testData.siteArea)
            .enterBuildingName(testData.buildingName);

        cy.stepInfo("1. Proceed to the Income > Commercial > Stabilized Rent Roll page.");
        _NavigationSection.navigateToCommercialStabilizedRentRoll();

        cy.stepInfo("2. Click on the Edit button in the Stabilized Commercial Income Discussion section.");
        Income._CommercialManager.StabilizedRentRoll.clickEditDiscussionButton();

        cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
        testData.asCompletedChips.forEach((chip: { typeSuggestValue: string; verifySuggest: string | number; }) => {
            Income._CommercialManager.StabilizedRentRoll.editDiscussionTextArea(`=${chip.typeSuggestValue}`, false)
            .clickNarrativeSuggestions(chip.typeSuggestValue)
            .verifyCommentaryContainsText(chip.verifySuggest);
        });
        Income._CommercialManager.StabilizedRentRoll.clickSaveDiscussionButton()
            .verifyProgressBarNotExist();

        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationDataAsComplete.reportNumber);
        deleteReport(testData.reportCreationDataAsComplete.reportNumber);
    });

    it.only("Check export", () => {
        cy.task("getFilePath", { _reportName: testData.reportCreationDataAsIs.reportNumber, _docx_html: "html" }).then(file => {
            cy.log(<string>file);
            cy.stepInfo("3. Verify the linked chips on export");
            cy.visit(<string>file);
            testData.asCompletedChips.forEach(chip => {
                let expectedText = typeof chip.verifyExport ===  "number" ? `${numberWithCommas(chip.verifyExport)}`: chip.verifyExport;
                cy.contains("Commercial Stabilized Rent Roll").next().scrollIntoView().should("include.text", expectedText);
            });
        }); 
    });
});
