import { numberWithCommas } from "../../../../../utils/numbers.utils";
import { Income, Property, ReviewExport } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4549-54.fixture";

describe(`[QA-4552][QA-4553][QA-4554] Verify the "Linked" chips dropdown in the new narrative component`, 
    { tags: [ "@property", "@commercial_units", "@check_export" ] }, () => {

    const url = `${Cypress.config().baseUrl}`;

    it("[QA-4552] As Is", () => {
        cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
        createReport(testData.reportCreationDataAsIs);

        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits)
            .enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterGrossBuildingArea(testData.grossBuildingArea)
            .enterSiteArea(testData.siteArea)
            .enterBuildingName(testData.buildingName);

        cy.stepInfo("1. Proceed to the Property -> Commercial Units");
        _NavigationSection.navigateToCommercialUnits();

        cy.stepInfo("2. Click on the Edit button in the Stabilized Commercial Income Discussion section.");
        Property._CommercialUnits.clickEditDiscussionButton();

        cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
        testData.asIschips.forEach((chip) => {
            Property._CommercialUnits.editDiscussionTextArea(`=${chip.typeSuggestValue}`, false)
            .clickNarrativeSuggestions(chip.suggestionName)
            .verifyCommentaryContainsText(chip.verifySuggest);
        });
        Property._CommercialUnits.clickSaveDiscussionButton()
            .verifyProgressBarNotExist();

        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationDataAsIs.reportNumber);
        deleteReport(testData.reportCreationDataAsIs.reportNumber);
    });

    it("[QA-4552] Check export", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationDataAsIs.reportNumber, _docx_html: "html" }).then(file => {
            cy.log(<string>file);
            cy.stepInfo("4. Verify the linked chips on export");
            cy.visit(<string>file);
            testData.asIschips.forEach(chip => {
                let expectedText = typeof chip.verifyExport ===  "number" ? `${numberWithCommas(chip.verifyExport)}`: chip.verifyExport;
                cy.contains("Commercial Space").next().scrollIntoView().should("include.text", expectedText);
            });
        }); 
    });

    it("[QA-4553] As Stabilized", () => {
        Cypress.config().baseUrl = url;
        cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
        createReport(testData.reportCreationDataAsIs);

        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits)
            .enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterGrossBuildingArea(testData.grossBuildingArea)
            .enterSiteArea(testData.siteArea)
            .enterBuildingName(testData.buildingName);

        cy.stepInfo("1. Proceed to the Property -> Commercial Units");
        _NavigationSection.navigateToCommercialUnits();

        cy.stepInfo("2. Click on the Edit button in the Stabilized Commercial Income Discussion section.");
        Property._CommercialUnits.clickEditDiscussionButton();

        cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
        testData.asIschips.forEach((chip) => {
            Property._CommercialUnits.editDiscussionTextArea(`=${chip.typeSuggestValue}`, false)
            .clickNarrativeSuggestions(chip.suggestionName)
            .verifyCommentaryContainsText(chip.verifySuggest);
        });
        Property._CommercialUnits.clickSaveDiscussionButton()
            .verifyProgressBarNotExist();

        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationDataAsIs.reportNumber);
        deleteReport(testData.reportCreationDataAsIs.reportNumber);
    });

    it("[QA-4553] Check export", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationDataAsIs.reportNumber, _docx_html: "html" }).then(file => {
            cy.log(<string>file);
            cy.stepInfo("4. Verify the linked chips on export");
            cy.visit(<string>file);
            testData.asIschips.forEach(chip => {
                let expectedText = typeof chip.verifyExport ===  "number" ? `${numberWithCommas(chip.verifyExport)}`: chip.verifyExport;
                cy.contains("Commercial Space").next().scrollIntoView().should("include.text", expectedText);
            });
        }); 
    });

    it("[QA-4554] As Completed", () => {
        Cypress.config().baseUrl = url;
        cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
        createReport(testData.reportCreationDataAsIs);

        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits)
            .enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterGrossBuildingArea(testData.grossBuildingArea)
            .enterSiteArea(testData.siteArea)
            .enterBuildingName(testData.buildingName);

        cy.stepInfo("1. Proceed to the Property -> Commercial Units");
        _NavigationSection.navigateToCommercialUnits();

        cy.stepInfo("2. Click on the Edit button in the Stabilized Commercial Income Discussion section.");
        Property._CommercialUnits.clickEditDiscussionButton();

        cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
        testData.asIschips.forEach((chip) => {
            Property._CommercialUnits.editDiscussionTextArea(`=${chip.typeSuggestValue}`, false)
            .clickNarrativeSuggestions(chip.suggestionName)
            .verifyCommentaryContainsText(chip.verifySuggest);
        });
        Property._CommercialUnits.clickSaveDiscussionButton()
            .verifyProgressBarNotExist();

        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationDataAsIs.reportNumber);
        deleteReport(testData.reportCreationDataAsIs.reportNumber);
    });

    it("[QA-4554] Check export", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationDataAsIs.reportNumber, _docx_html: "html" }).then(file => {
            cy.log(<string>file);
            cy.stepInfo("4. Verify the linked chips on export");
            cy.visit(<string>file);
            testData.asIschips.forEach(chip => {
                let expectedText = typeof chip.verifyExport ===  "number" ? `${numberWithCommas(chip.verifyExport)}`: chip.verifyExport;
                cy.contains("Commercial Space").next().scrollIntoView().should("include.text", expectedText);
            });
        }); 
    });
});