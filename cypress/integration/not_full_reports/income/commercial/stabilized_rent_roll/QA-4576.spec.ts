/// <reference types="cypress-grep" />

import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4576.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import { Base, Property, Income } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { getTodayDateString } from "../../../../../../utils/date.utils";
import stabilizedRentRollPage from "../../../../../pages/income/commercial/stabilizedRentRoll.page";


describe("Verify the display of the Stabilized Rent Roll page", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", { tags: '@snapshot_tests' },  () => {  
        cy.stepInfo(`
        1. Verify the display of the Stabilized Rent Roll page if there are > 0 Commercial Units with Comp Groups.
        `);

        Base._NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(0).clickSaveButton();
        Base._NavigationSection.clickIncomeApproachButton()
        .clickCommercialArrow().clickCommercialStabRentRollButton().clickYesButton()
        .verifyProgressBarNotExist();

        Income._CommercialManager.StabilizedRentRoll.Actions.matchElementSnapshot(
            stabilizedRentRollPage.stabelizedRRPanel,
            testData.snapshotNames.stabilizedRRPanel,
            {capture:"fullPage", scale: true}
        );


        cy.stepInfo(`2. Verify the display of the Stabilized Rent Roll page 
        if there are > 0 Commercial Units without Comp Groups.`);
        
        Base._NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        Base._NavigationSection.navigateToCommercialUnits();
        Property._CommercialUnits.enterListUnitSF(testData.listOfUnitsSF, testData.numberOfCommercialUnits);
        for (let i = 0; i < testData.numberOfCommercialUnits; i++) {
            Property._CommercialUnits.clickCommercialUnitTabByIndex(i)
                .clickRadioButtonByValueAndUnitIndex(testData.groupName, testData.useRadios[i], i);
        }
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        for (let index = 0; index < testData.numberOfCommercialUnits; index++) {
            Income._CommercialManager.InPlaceRentRoll
            .enterTenantNameByRowNumber(testData.newTenantName,index)
            .chooseLeaseStatusByRowNumber("Occupied", index)
            .enterLeaseDateByRowNumber("Start", getTodayDateString("/"), index)
            .verifyLeaseDateByRowNumber("Start", testData.occupiedLease, getTodayDateString("/"), index)
            .enterLeaseDateByRowNumber("Expiry", getTodayDateString("/"), index)
            .verifyLeaseDateByRowNumber("Expiry", testData.occupiedLease, getTodayDateString("/"), index);
        }
        Income._CommercialManager.InPlaceRentRoll
        .clickSaveButton();  
        
        Base._NavigationSection
        .clickCommercialStabRentRollButton()
        .verifyProgressBarNotExist();
        Income._CommercialManager.StabilizedRentRoll.Actions.matchElementSnapshot(
            stabilizedRentRollPage.stabelizedRRPanel,
            testData.snapshotNames.stabilizedRRPanel_severalUnits,
            {capture:"runner"}
        );
        
        cy.stepInfo(`3. Verify the display of the Stabilized Rent Roll page 
        if there are > 0 Commercial Units with Comp Groups.`);

        cy.log("next section includes drag-and-drop interaction, so we can't go further for now.");
        /**
         * Automate behavior desribed by Alesia.
         * ernst: next section includes drag-and-drop interaction, so we can't go further for now.
         */
        // _NavigationSection.openCompGroupsInCommercial();
        // testData.compGroupName.forEach(groupName => {
        //     Income._CommercialManager.CompGroups.Actions.addCompGroup(groupName);
        // });
        // _NavigationSection.clickCommercialRentComps().clickYesButton().verifyProgressBarNotExist();
        // [testData.comparableFirst.address, testData.comparableSecond.address].forEach(address => {
        //     Income._CommercialManager.RentComps.addCompFromMapByAddress(address);
        // });
        // Income._CommercialManager.RentComps.clickSaveButton().verifyProgressBarNotExist();
        // _NavigationSection.clickCommercialStabRentRollButton().verifyProgressBarNotExist();
        // cy.pause();
        
        deleteReport(testData.reportCreationData.reportNumber);
    });
});