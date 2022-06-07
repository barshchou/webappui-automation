/// <reference types="cypress-grep" />

import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4576_78.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { Base, Property, Income } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { getTodayDateString } from "../../../../../../utils/date.utils";
import stabilizedRentRollPage from "../../../../../pages/income/commercial/stabilizedRentRoll.page";

describe("[QA-4576][QA-4578] Verify the display of the Stabilized Rent Roll page", 
    { tags: [ "@income", "@commercial", "@stabilized_rent_roll", "@snapshot_tests" ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body",  () => {  
        cy.stepInfo(`1. Verify the display of the Stabilized Rent Roll page if there 
                    are > 0 Commercial Units with Comp Groups.`);

        Base._NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(0).clickSaveButton();
        Base._NavigationSection.clickIncomeApproachButton()
            .clickCommercialArrow().clickCommercialStabRentRollButton().clickYesButton()
            .verifyProgressBarNotExist();

        Income._CommercialManager.StabilizedRentRoll.Actions.matchElementSnapshot(
            stabilizedRentRollPage.stabilizedRRPanel,
            testData.snapshotNames.stabilizedRRPanel,
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
                .enterTenantNameByRowNumber(testData.newTenantName, index)
                .chooseLeaseStatusByRowNumber("Occupied", index)
                .enterLeaseDateByRowNumber("Start", getTodayDateString("/"), index)
                .verifyLeaseDateByRowNumber("Start", testData.occupiedLease, "in-place", getTodayDateString("/"), index)
                .enterLeaseDateByRowNumber("Expiry", getTodayDateString("/"), index)
                .verifyLeaseDateByRowNumber("Expiry", testData.occupiedLease, "in-place", getTodayDateString("/"), index);
        }
        Income._CommercialManager.InPlaceRentRoll
            .clickSaveButton();

        Base._NavigationSection
            .clickCommercialStabRentRollButton()
            .verifyProgressBarNotExist();
        Income._CommercialManager.StabilizedRentRoll.Actions.matchElementSnapshot(
            stabilizedRentRollPage.stabilizedRRPanel,
            testData.snapshotNames.stabilizedRRPanel_severalUnits,
        );

        cy.stepInfo(`[QA-4576][QA-4578] Add comp group and a new comp`);
        _NavigationSection.openCompGroupsInCommercial();
        Income._CommercialManager.CompGroups.Actions.addCompGroup(testData.compGroup);
        _NavigationSection.clickCommercialRentComps()
            .clickYesIfExist();
        Income._CommercialManager.RentComps.clickManuallyAddANewCompButton().
                searchNewCompByAddress(testData.comparableFirst.address);
        testData.rentCompFields.forEach(field => {
            if(field.type == "input") {
                Income._CommercialManager.RentComps.fillInRentCompFieldInput(field.name, field.value);
            } else {
                Income._CommercialManager.RentComps.chooseRentCompFieldDropdownOption(field.name, field.value);
            }
        });
        Income._CommercialManager.RentComps.enterLeaseDate(testData.leaseDate)
            .checkUnitOfMeasureRadioButton(testData.unitMeasureMontly)
            .clickSubmitButton();

        cy.stepInfo(`Drag all comps into created group`);
        /**
         * Note: Do not change window focus while debugging in headless mode
         */
        Income._CommercialManager.RentComps.dragAllCommercialUnitsIntoGroup(testData.compGroup, testData.numberOfCommercialUnits);

        cy.stepInfo(`Navigate to Reconcialltion and add market reconcillation`);
        _NavigationSection.clickRentReconcillationButton()
            .clickYesIfExist();
        Income._CommercialManager.RentReconciliation.addMarketRentConclusion(testData.marketRentConclusion);

        cy.stepInfo(`3. Verify the display of the Stabilized Rent Roll page 
                    if there are > 0 Commercial Units with Comp Groups.`);
        _NavigationSection.clickCommercialStabRentRollButton()
            .clickYesIfExist();
        Income._CommercialManager.StabilizedRentRoll.verifyCommercialCompGroupHeaderDisplayed()
            .verifyCommercialCompGroupForecastRentDisplayed(testData.marketRentConclusion)
            .verifyCommercialCompGroupDisplayed(testData.compGroup);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});