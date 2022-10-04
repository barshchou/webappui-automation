import { numberWithCommas } from "../../../../../../utils/numbers.utils";
import { DataCollections, Income, ReviewExport } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import testData from 
    "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4598-00.fixture";

describe(`[QA-4598][QA-4599][QA-4600] Verify the suggested text dropdown in the 
new narrative component added through "=" in the Generated Commentary on the Stabilized Rent Roll page.`, 
{ tags: [ "@income", "@commercial", "@stabilized_rent_roll", "@check_export", "@update_test", "@QA-7030" ] }, () => {

    //TODO update test after test-cases updates QA-6543
    it("[QA-4598] As Is", () => {
        cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
        createReport(testData.reportCreationDataAsIs);

        _NavigationSection.navigateToSubjectPropertyData();
        DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits)
            .enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterGrossBuildingArea(testData.grossBuildingArea)
            .enterSiteArea(testData.siteArea)
            .enterBuildingName(testData.buildingName);

        cy.stepInfo("1. Proceed to the Income > Commercial > Stabilized Rent Roll page.");
        _NavigationSection.navigateToCommercialStabilizedRentRoll();

        cy.stepInfo("2. Activate text area in the Stabilized Commercial Income Discussion section.");
        Income._CommercialManager.StabilizedRentRoll.activateTextAreaInput(
            Income._CommercialManager.StabilizedRentRoll.Page.commentaryText);

        cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
        testData.asIsChips.forEach((chip) => {
            Income._CommercialManager.StabilizedRentRoll.editDiscussionTextArea(`=${chip.typeSuggestValue}`, false)
                .clickNarrativeSuggestions(chip.suggestionName)
                .verifyCommentaryContainsText(chip.verifySuggest);
        });
        Income._CommercialManager.StabilizedRentRoll.inactivateTextAreaInput()
            .clickSaveButton()
            .verifyProgressBarNotExist();

        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationDataAsIs.reportNumber);
    });

    it("[QA-4598] Check export", () => {
        cy.task("getFilePath", { _reportName: testData.reportCreationDataAsIs.reportNumber, _docxHtml: "html" })
            .then(file => {
                cy.log(<string>file);
                cy.stepInfo("4. Verify the linked chips on export");
                cy.visit(<string>file);
                testData.asIsChips.forEach(chip => {
                    let expectedText = typeof chip.verifyExport ===  "number" 
                        ? `${numberWithCommas(chip.verifyExport)}`
                        : chip.verifyExport;
                    cy.contains(testData.exportSectionName).next().scrollIntoView()
                        .should("include.text", expectedText);
                });
            }); 
    });

    //TODO update test after test-cases updates QA-6543
    it("[QA-4599] As Stabilized", () => {
        cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
        createReport(testData.reportCreationDataAsStabilized);

        _NavigationSection.navigateToSubjectPropertyData();
        DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits)
            .enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterGrossBuildingArea(testData.grossBuildingArea)
            .enterSiteArea(testData.siteArea)
            .enterBuildingName(testData.buildingName);

        cy.stepInfo("1. Proceed to the Income > Commercial > Stabilized Rent Roll page.");
        _NavigationSection.navigateToCommercialStabilizedRentRoll();

        cy.stepInfo("2. Activate text area in the Stabilized Commercial Income Discussion section.");
        Income._CommercialManager.StabilizedRentRoll.activateTextAreaInput(
            Income._CommercialManager.StabilizedRentRoll.Page.commentaryText);

        cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
        testData.asStabilizedChips.forEach((chip) => {
            Income._CommercialManager.StabilizedRentRoll.editDiscussionTextArea(`=${chip.typeSuggestValue}`, false)
                .clickNarrativeSuggestions(chip.suggestionName)
                .verifyCommentaryContainsText(chip.verifySuggest);
        });
        Income._CommercialManager.StabilizedRentRoll.inactivateTextAreaInput()
            .clickSaveButton()
            .verifyProgressBarNotExist();


        _NavigationSection.openReviewAndExport();
        ReviewExport.selectSectionsToIncludeInExport(testData.sectionToExport)
            .generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationDataAsStabilized.reportNumber);
    });

    it("[QA-4599] Check export", () => {
        cy.task("getFilePath", { _reportName: testData.reportCreationDataAsIs.reportNumber, _docxHtml: "html" })
            .then(file => {
                cy.log(<string>file);
                cy.stepInfo("4. Verify the linked chips on export");
                cy.visit(<string>file);
                testData.asStabilizedChips.forEach(chip => {
                    let expectedText = typeof chip.verifyExport ===  "number" 
                        ? `${numberWithCommas(chip.verifyExport)}`
                        : chip.verifyExport;
                    cy.contains(testData.exportSectionName).next().scrollIntoView()
                        .should("include.text", expectedText);
                });
            }); 
    });

    //TODO update test after test-cases updates QA-6543
    it("[QA-4600] As Completed", () => {
        cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
        createReport(testData.reportCreationDataAsComplete);

        _NavigationSection.navigateToSubjectPropertyData();
        DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits)
            .enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterCurrentNumberOfResUnits(testData.currentNumberOfResidentialUnits)
            .enterCurrentNumberOfCommercialUnits(testData.currentNumberOfCommercialUnits)
            .enterGrossBuildingArea(testData.grossBuildingArea)
            .enterSiteArea(testData.siteArea)
            .enterBuildingName(testData.buildingName);

        cy.stepInfo("1. Proceed to the Income > Commercial > Stabilized Rent Roll page.");
        _NavigationSection.navigateToCommercialStabilizedRentRoll();

        cy.stepInfo("2. Activate text area in the Stabilized Commercial Income Discussion section.");
        Income._CommercialManager.StabilizedRentRoll.activateTextAreaInput(
            Income._CommercialManager.StabilizedRentRoll.Page.commentaryText);

        cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
        testData.asCompletedChips.forEach((chip) => {
            Income._CommercialManager.StabilizedRentRoll.editDiscussionTextArea(`=${chip.typeSuggestValue}`, false)
                .clickNarrativeSuggestions(chip.suggestionName)
                .verifyCommentaryContainsText(chip.verifySuggest);
        });
        Income._CommercialManager.StabilizedRentRoll.inactivateTextAreaInput()
            .clickSaveButton()
            .verifyProgressBarNotExist();

        _NavigationSection.openReviewAndExport();
        ReviewExport.selectSectionsToIncludeInExport(testData.sectionToExport)
            .generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationDataAsComplete.reportNumber);
    });

    it("[QA-4600] Check export", () => {
        cy.task("getFilePath", { _reportName: testData.reportCreationDataAsIs.reportNumber, _docxHtml: "html" })
            .then(file => {
                cy.log(<string>file);
                cy.stepInfo("4. Verify the linked chips on export");
                cy.visit(<string>file);
                testData.asCompletedChips.forEach(chip => {
                    let expectedText = typeof chip.verifyExport ===  "number" 
                        ? `${numberWithCommas(chip.verifyExport)}`
                        : chip.verifyExport;
                    cy.contains(testData.exportSectionName).next().scrollIntoView()
                        .should("include.text", expectedText);
                });
            }); 
    });
});