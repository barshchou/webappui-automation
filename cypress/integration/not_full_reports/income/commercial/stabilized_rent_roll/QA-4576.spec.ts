import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4576.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import { Base, Property, Income, Sales } from "../../../../../actions";

describe("Verify the display of the Stabilized Rent Roll page", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {  
        cy.stepInfo(`
        1. Verify the display of the Stabilized Rent Roll page if there are > 0 Commercial Units with Comp Groups.
        `);
        Base._NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(0).clickSaveButton();
        Base._NavigationSection.clickIncomeApproachButton()
        .clickCommercialArrow().clickCommercialStabRentRollButton().clickYesButton()
        .verifyProgressBarNotExist();

        Income._CommercialManager.StabilizedRentRoll.Actions.matchElementSnapshot(
            cy.get('[id="STICKY_FORM_PANEL_WRAPPER_ID"] + div'),
            "StabilizedRentRoll_Panel",
            {capture:"fullPage", scale: true}
        );


        cy.stepInfo(`
        2. Verify the display of the Stabilized Rent Roll page 
        if there are > 0 Commercial Units without Comp Groups.`);
        cy.pause();
        Base._NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        Base._NavigationSection.navigateToCommercialUnits();
        Property._CommercialUnits.enterListUnitSF(testData.listOfUnitsSF, testData.numberOfCommercialUnits);
        for (let i = 0; i < testData.numberOfCommercialUnits; i++) {
            Property._CommercialUnits.clickCommercialUnitTabByIndex(i)
                .clickRadioButtonByValueAndUnitIndex(testData.groupName, testData.useRadios[i], i);
        }
        Base._NavigationSection.clickIncomeApproachButton()
        .clickCommercialArrow().clickCommercialStabRentRollButton().clickYesButton()
        .verifyProgressBarNotExist();
        
        Income._CommercialManager.StabilizedRentRoll.Actions.matchElementSnapshot(
            cy.get('[id="STICKY_FORM_PANEL_WRAPPER_ID"] + div'),
            "StabilizedRentRoll_Panel-several_comps",
            {capture:"fullPage", scale: true}
        );
        
        cy.stepInfo(`
        3. Verify the display of the Stabilized Rent Roll page 
        if there are > 0 Commercial Units with Comp Groups.`);
        cy.pause();

        deleteReport(testData.reportCreationData.reportNumber);
    });
});