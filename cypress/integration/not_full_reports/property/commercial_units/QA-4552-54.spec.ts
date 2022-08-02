import { numberWithCommas } from "../../../../../utils/numbers.utils";
import { Property, ReviewExport } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4549-54.fixture";

describe(`[QA-4552][QA-4553][QA-4554] Verify the "Linked" chips dropdown in the new narrative component`, 
    { tags: [ "@property", "@commercial_units", "@check_export" ] }, () => {

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

            cy.stepInfo("2. Click on the Edit button in the Commercial Unit SF Discussion section.");
            Property._CommercialUnits.clickEditDiscussionButton();

            cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
            testData.asIsChips.forEach((chip) => {
                Property._CommercialUnits.editDiscussionTextArea(`=${chip.typeSuggestValue}`, false)
                    .clickNarrativeSuggestions(chip.suggestionName)
                    .verifyCommentaryContainsText(chip.verifySuggest);
            });
            Property._CommercialUnits.clickSaveDiscussionButton()
                .verifyProgressBarNotExist();

            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationDataAsIs.reportNumber);
        });

        it("[QA-4552] Check export", () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationDataAsIs.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.stepInfo("4. Verify the linked chips on export");
                    cy.visit(<string>file);
                    testData.asIsChips.forEach(chip => {
                        let expectedText = typeof chip.verifyExport ===  "number" 
                            ? `${numberWithCommas(chip.verifyExport)}`
                            : chip.verifyExport;
                        cy.contains("Commercial Space").next().scrollIntoView().should("include.text", expectedText);
                    });
                }); 
        });

        it("[QA-4553] As Stabilized", () => {
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

            cy.stepInfo("2. Click on the Edit button in the Commercial Unit SF Discussion section.");
            Property._CommercialUnits.clickEditDiscussionButton();

            cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
            testData.asIsChips.forEach((chip) => {
                Property._CommercialUnits.editDiscussionTextArea(`=${chip.typeSuggestValue}`, false)
                    .clickNarrativeSuggestions(chip.suggestionName)
                    .verifyCommentaryContainsText(chip.verifySuggest);
            });
            Property._CommercialUnits.clickSaveDiscussionButton()
                .verifyProgressBarNotExist();

            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationDataAsIs.reportNumber);
        });

        it("[QA-4553] Check export", () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationDataAsIs.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.stepInfo("4. Verify the linked chips on export");
                    cy.visit(<string>file);
                    testData.asIsChips.forEach(chip => {
                        let expectedText = typeof chip.verifyExport ===  "number" 
                            ? `${numberWithCommas(chip.verifyExport)}`
                            : chip.verifyExport;
                        cy.contains("Commercial Space").next().scrollIntoView().should("include.text", expectedText);
                    });
                }); 
        });

        it("[QA-4554] As Completed", () => {
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

            cy.stepInfo("2. Click on the Edit button in the Commercial Unit SF Discussion section.");
            Property._CommercialUnits.clickEditDiscussionButton();

            cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
            testData.asIsChips.forEach((chip) => {
                Property._CommercialUnits.editDiscussionTextArea(`=${chip.typeSuggestValue}`, false)
                    .clickNarrativeSuggestions(chip.suggestionName)
                    .verifyCommentaryContainsText(chip.verifySuggest);
            });
            Property._CommercialUnits.clickSaveDiscussionButton()
                .verifyProgressBarNotExist();

            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationDataAsIs.reportNumber);
        });

        it("[QA-4554] Check export", () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationDataAsIs.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.stepInfo("4. Verify the linked chips on export");
                    cy.visit(<string>file);
                    testData.asIsChips.forEach(chip => {
                        let expectedText = typeof chip.verifyExport ===  "number" 
                            ? `${numberWithCommas(chip.verifyExport)}`
                            : chip.verifyExport;
                        cy.contains("Commercial Space").next().scrollIntoView().should("include.text", expectedText);
                    });
                }); 
        });
    });