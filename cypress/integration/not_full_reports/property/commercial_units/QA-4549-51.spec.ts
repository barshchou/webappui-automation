import { Property } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4549-54.fixture";

describe(`[QA-4549][QA-4550][QA-4551] Verify the "Linked" chips dropdown in the new narrative component`, 
    { tags: [ "@property", "@commercial_units", "@check_export" ] }, () => {

        before('Create report', () => {
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

            cy.saveLocalStorage();
        });

        beforeEach('Restore local storage', () => {
            cy.restoreLocalStorage();
        });

        it(`[QA-4549] Verify the suggested text dropdown in the new narrative component added through "=" 
        for the 'Foreclosure sale' option`, () => {
        
            cy.stepInfo("2. Click on the Edit button in the Commercial Unit SF Discussion section.");
            Property._CommercialUnits.clickEditDiscussionButton();

            cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
            let chip = testData.asIsChips.filter(chip => { return chip.suggestionName == 'Foreclosure Sale'; });
            Property._CommercialUnits.editDiscussionTextArea(`=${chip[0].typeSuggestValue}`, false)
                .clickNarrativeSuggestions(chip[0].suggestionName)
                .verifyCommentaryContainsText(chip[0].verifySuggest);

            Property._CommercialUnits.clickSaveDiscussionButton()
                .verifyProgressBarNotExist();
        });
    
        it(`[QA-4550] Verify the suggested text dropdown in the new narrative component added through "=" 
        for the 'Sheriff's sale' option`, () => {

            cy.stepInfo("2. Click on the Edit button in the Commercial Unit SF Discussion section.");
            Property._CommercialUnits.clickEditDiscussionButton();

            cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
            let chip = testData.asIsChips.filter(chip => { return chip.suggestionName == 'Sherrif\'s Sale'; });
            Property._CommercialUnits.editDiscussionTextArea(`=${chip[0].typeSuggestValue}`, false)
                .clickNarrativeSuggestions(chip[0].suggestionName)
                .verifyCommentaryContainsText(chip[0].verifySuggest);

            Property._CommercialUnits.clickSaveDiscussionButton()
                .verifyProgressBarNotExist();
        });

        it(`[QA-4551] Verify the suggested text dropdown in the new narrative component added through "=" 
        for the 'Unchanged Renovation' option`, () => {

            cy.stepInfo("2. Click on the Edit button in the Commercial Unit SF Discussion section.");
            Property._CommercialUnits.clickEditDiscussionButton();

            cy.stepInfo("3. Enter the “=“ and select the an option. Verify each option.");
            let chip = testData.asIsChips.filter(chip => { return chip.suggestionName == 'Unchanged Renovations'; });
            Property._CommercialUnits.editDiscussionTextArea(`=${chip[0].typeSuggestValue}`, false)
                .clickNarrativeSuggestions(chip[0].suggestionName)
                .verifyCommentaryContainsText(chip[0].verifySuggest);

            Property._CommercialUnits.clickSaveDiscussionButton()
                .verifyProgressBarNotExist();
        });

        after('Delete report', () => {
            deleteReport(testData.reportCreationDataAsIs.reportNumber);
        });
    });