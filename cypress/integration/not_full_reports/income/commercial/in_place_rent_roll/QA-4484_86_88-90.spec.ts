import { numberWithCommas } from "../../../../../../utils/numbers.utils";
import testData from 
    "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4484_86_88-90.fixture";
import { Income, Property, ReviewExport } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe(`[Income > Commercial > In-Place Rent Roll > Generated Commentary]
        Verify the suggested text dropdown`,
{ tags:[ "@income", "@commercial", "@in_place_rent_roll", "@check_export" ] }, () => {

    const url = `${Cypress.config().baseUrl}`;

    it("[QA-4484], [QA-4486]", () => {
        cy.stepInfo(`1. Login, create report and proceed to the 
                    Income > Commercial > In-Place Rent Roll page.`);
        createReport(testData.reportCreationDataAsIs);
        _NavigationSection.navigateToCommercialInPlaceRentRoll()
            .verifyProgressBarNotExist();
        Income._CommercialManager.InPlaceRentRoll
            .clickEditDiscussionButton();

        testData.suggestionsVerificationData.forEach((data) => {
            cy.stepInfo(`2. Edit discussion and enter '${data.value}'
                        value; click '${data.suggestion}' suggested value`);
            Income._CommercialManager.InPlaceRentRoll.editDiscussionTextArea(data.value)
                .clickNarrativeSuggestions(data.suggestion);
    
            cy.stepInfo(`3. Verify that the following text appears.`);
            Income._CommercialManager.InPlaceRentRoll
                .verifyCommentaryContainsText(data.verifyAreaValue);
        });

        deleteReport(testData.reportCreationDataAsIs.reportNumber);
    });

    it("[QA-4488] As Is", () => {
        cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
        createReport(testData.reportCreationDataAsIs);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits)
            .enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterGrossBuildingArea(testData.grossBuildingArea)
            .enterSiteArea(testData.siteArea)
            .enterBuildingName(testData.buildingName);

        cy.stepInfo("1. Proceed to the Income > Commercial > In-Place Rent Roll page.");
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        for (let i = 0; i < testData.numberOfCommercialUnits; i++) {
            Income._CommercialManager.InPlaceRentRoll
                .chooseLeaseStatusByRowNumber(testData.leaseStatus, i);
        }

        cy.stepInfo("2. Click on the Edit button in the Current Commercial Income Discussion section.");
        Income._CommercialManager.InPlaceRentRoll
            .clickEditDiscussionButton();

        cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
        testData.asIsChips.forEach((chip) => {
            Income._CommercialManager.InPlaceRentRoll.editDiscussionTextArea(`=${chip.typeSuggestValue}`, false)
                .clickNarrativeSuggestions(chip.suggestionName)
                .verifyCommentaryContainsText(chip.verifySuggest);
        });
        Income._CommercialManager.InPlaceRentRoll.clickSaveDiscussionButton()
            .verifyProgressBarNotExist();

        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationDataAsIs.reportNumber);

        deleteReport(testData.reportCreationDataAsIs.reportNumber);
    });

    it("[QA-4488] Check export", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationDataAsIs.reportNumber, _docxHtml: "html" })
            .then(file => {
                cy.log(<string>file);
                cy.stepInfo("4. Verify the linked chips on export");
                cy.visit(<string>file);
                testData.asIsChips.forEach(chip => {
                    let expectedText = typeof chip.verifyExport ===  "number" 
                        ? `${numberWithCommas(chip.verifyExport)}`
                        : chip.verifyExport;
                    cy.contains("Current Commercial Rent Roll")
                        .next().scrollIntoView().should("include.text", expectedText);
                });
            }); 
    });

    it("[QA-4489] As Stabilized", () => {
        Cypress.config().baseUrl = url;
        cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
        createReport(testData.reportCreationDataAsStabilized);

        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits)
            .enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterGrossBuildingArea(testData.grossBuildingArea)
            .enterSiteArea(testData.siteArea)
            .enterBuildingName(testData.buildingName);

        cy.stepInfo("1. Proceed to the Income > Commercial > In-Place Roll page.");
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        for (let i=0; i < testData.numberOfCommercialUnits; i++) {
            Income._CommercialManager.InPlaceRentRoll
                .chooseLeaseStatusByRowNumber(testData.leaseStatus, i);
        }

        cy.stepInfo("2. Click on the Edit button in the Current Commercial Income Discussion section.");
        Income._CommercialManager.InPlaceRentRoll
            .clickEditDiscussionButton();

        cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
        testData.asStabilizedChips.forEach((chip) => {
            Income._CommercialManager.InPlaceRentRoll.editDiscussionTextArea(`=${chip.typeSuggestValue}`, false)
                .clickNarrativeSuggestions(chip.suggestionName)
                .verifyCommentaryContainsText(chip.verifySuggest);
        });
        Income._CommercialManager.InPlaceRentRoll.clickSaveDiscussionButton()
            .verifyProgressBarNotExist();

        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationDataAsStabilized.reportNumber);

        deleteReport(testData.reportCreationDataAsStabilized.reportNumber);
    });

    it("[QA-4489] Check export", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationDataAsIs.reportNumber, _docxHtml: "html" })
            .then(file => {
                cy.log(<string>file);
                cy.stepInfo("4. Verify the linked chips on export");
                cy.visit(<string>file);
                testData.asStabilizedChips.forEach(chip => {
                    let expectedText = typeof chip.verifyExport ===  "number" 
                        ? `${numberWithCommas(chip.verifyExport)}`
                        : chip.verifyExport;
                    cy.contains("Current Commercial Rent Roll").next().scrollIntoView()
                        .should("include.text", expectedText);
                });
            }); 
    });

    it("[QA-4490] As Completed", () => {
        Cypress.config().baseUrl = url;
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

        cy.stepInfo("1. Proceed to the Income > Commercial > In-Place Rent Roll page.");
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        for (let i=0; i < testData.numberOfCommercialUnits; i++) {
            Income._CommercialManager.InPlaceRentRoll
                .chooseLeaseStatusByRowNumber(testData.leaseStatus, i);
        }

        cy.stepInfo("2. Click on the Edit button in the Current Commercial Income Discussion section.");
        Income._CommercialManager.InPlaceRentRoll
            .clickEditDiscussionButton();

        cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
        testData.asCompletedChips.forEach((chip) => {
            Income._CommercialManager.InPlaceRentRoll.editDiscussionTextArea(`=${chip.typeSuggestValue}`, false)
                .clickNarrativeSuggestions(chip.suggestionName)
                .verifyCommentaryContainsText(chip.verifySuggest);
        });
        Income._CommercialManager.InPlaceRentRoll.clickSaveDiscussionButton()
            .verifyProgressBarNotExist();

        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationDataAsComplete.reportNumber);

        deleteReport(testData.reportCreationDataAsComplete.reportNumber);
    });

    it("[QA-4490] Check export", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationDataAsIs.reportNumber, _docxHtml: "html" })
            .then(file => {
                cy.log(<string>file);
                cy.stepInfo("4. Verify the linked chips on export");
                cy.visit(<string>file);
                testData.asCompletedChips.forEach(chip => {
                    let expectedText = typeof chip.verifyExport ===  "number" 
                        ? `${numberWithCommas(chip.verifyExport)}`
                        : chip.verifyExport;
                    cy.contains("Current Commercial Rent Roll").next().scrollIntoView()
                        .should("include.text", expectedText);
                });
            }); 
    });

});