import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4586.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Property } from "../../../../../actions";
import { Income } from "../../../../../actions";

describe("[QA-4586] Verify the Commercial Stabilized Rent Roll table", 
    { tags: [ "@income", "@commercial", "@stabilized_rent_roll" ] }, () => {
        
        beforeEach(`Login, create report, 
            - add commercial units;
            - add comp groups and drag units into it;
            - add rent comps and drag units into comp group
            - add market reconciliation`, () => {
            cy.stepInfo(`Create a mixed report with several Commercial Units (e.g. 2).`);
            createReport(testData.reportCreationData);

            cy.stepInfo(`Proceed to the Property > Commercial Units and fill the Commercial Unit # SF field 
                    and select the Use* radio button (e.g. Retail), save it.`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterListUnitSF(testData.listOfUnitsSF, testData.numberOfCommercialUnits);
            for (let i = 0; i < testData.numberOfCommercialUnits; i++) {
                Property._CommercialUnits.clickCommercialUnitTabByIndex(i)
                    .clickRadioButtonByValueAndUnitIndex(testData.groupName, testData.useRadios[i], i);
            }

            cy.stepInfo(`Add new comp group and add commercial units into it`);
            _NavigationSection.navigateToCommercialCompGroups();
            Income._CommercialManager.CompGroups
                .addCompGroup(testData.compGroup)
                .dragAllCommercialUnitsIntoGroup(testData.compGroup, testData.numberOfCommercialUnits);

            cy.stepInfo(`On the Commercial > Rent Comps several comps have been added for comparison 
                    into a new created group from previous step`);
            _NavigationSection.navigateToCommercialRentComps();
            Income._CommercialManager.RentComps.clickManuallyAddANewCompButton().
                searchNewCompByAddress(testData.comparableFirst.address);
            testData.rentCompFields.forEach(field => {
                if (field.type == "input") {
                    Income._CommercialManager.RentComps.fillInRentCompFieldInput(field.name, field.value, true);
                } else {
                    Income._CommercialManager.RentComps.chooseRentCompFieldDropdownOption(field.name, field.value);
                }
            });
            Income._CommercialManager.RentComps.enterLeaseDate(testData.leaseDate)
                .checkUnitOfMeasureRadioButton(testData.unitMeasureMonthly)
                .clickSubmitButton();
            /**
             * Note: Do not change window focus while debugging in headless mode
             */
            Income._CommercialManager.RentComps
                .dragAllCommercialUnitsIntoGroup(testData.compGroup, testData.numberOfCommercialUnits);

            cy.stepInfo(`5. Navigate to Reconciliation and add market reconciliation`);
            _NavigationSection.navigateToRentReconciliation();
            Income._CommercialManager.RentReconciliation.addMarketRentConclusion(testData.marketRentConclusion);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Proceed to the Income > Commercial > In-Place Rent Roll page 
                    and fill the Commercial In-Place Rent Roll Table, save it.`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatusesOccupied, testData.numberOfCommercialUnits);
            testData.rentsPsf.forEach((rent, index) => {
                Income._CommercialManager.InPlaceRentRoll.enterRentPerSFAnnuallyByRowNumber(rent, index);
            });

            cy.stepInfo(`2. Proceed to the Income > Commercial > Stabilized Rent Roll page.`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll();

            cy.stepInfo(`3. Click on the Autofill Vacant Units button and verify 
                    that nothing happens (Note: Annual, Monthly Rent, Rent PSF columns are disabled).`);
            Income._CommercialManager.StabilizedRentRoll.clickAutoFillButton();
            testData.leaseStatusesOccupied.forEach((leaseStatus, index) => {
                Income._CommercialManager.StabilizedRentRoll.verifyLeaseStatusByRow(leaseStatus)
                    .verifySfCellByRow(testData.listOfUnitsSF[index], index)
                    .verifyAnnualRentCellPerSFBasisByRow(testData.rentsPsf[index], testData.listOfUnitsSF[index], 
                        testData.unitsOfMeasure, index)
                    .verifyMonthlyRentPerSFByRow(testData.rentsPsf[index], testData.listOfUnitsSF[index], 
                        testData.unitsOfMeasure, index)
                    .verifyRentPsfAnnuallyByRow(testData.rentsPsf[index], index);
            });

            cy.stepInfo(`4. Proceed back to the  Income > Commercial > In-Place Rent Roll and 
                    select the “Vacant“ value in the Lease Status column for all Commercial Units, save it.`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatusesVacant, testData.numberOfCommercialUnits);

            cy.stepInfo(`5. Proceed to the Income > Commercial > Stabilized Rent Roll page.`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll();

            cy.stepInfo(`6. Click on the Autofill Vacant Units button and verify the Rent PSF column 
                    is auto-filled (Note: Annual and Monthly Rent columns are disabled).`);
            Income._CommercialManager.StabilizedRentRoll.clickAutoFillButton();
            testData.leaseStatusesVacant.forEach((_unit, index) => {
                Income._CommercialManager.StabilizedRentRoll
                    .verifyRentPerSFAnnuallyCellTextByRow(`$${testData.marketRentConclusion.toFixed(2)}`, index);
            });

            cy.stepInfo(`7. Proceed to the Income > Commercial > In-Place Rent Roll page and select 
                    for some units the “Occupied“ value and for some units “Vacant“ value, save it.`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();

            // Change lease status to reset to default set values -> set required lease status
            Income._CommercialManager.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatusesOccupied, testData.numberOfCommercialUnits)
                .chooseListLeaseStatuses(testData.leaseStatusesMixed, testData.numberOfCommercialUnits);
            testData.leaseStatusesMixed.forEach((leaseStatus, index) => {
                if (leaseStatus != "Vacant") {
                    Income._CommercialManager.InPlaceRentRoll
                        .enterRentPerSFAnnuallyByRowNumber(testData.rentsPsf[index], index);
                }
            });

            cy.stepInfo(`8. Proceed to the Income > Commercial > Stabilized Rent Roll page.`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll();

            cy.stepInfo(`9. Click on the Autofill Vacant Units button and verify the Rent PSF column 
                    is auto-filled only for Vacant units. The Occupied units remain untouched.`);
            Income._CommercialManager.StabilizedRentRoll.clickAutoFillButton();
            testData.leaseStatusesMixed.forEach((_unit, index) => {
                if (testData.leaseStatusesMixed[index] == "Vacant") {
                    Income._CommercialManager.StabilizedRentRoll
                        .verifyRentPerSFAnnuallyCellTextByRow(`$${testData.marketRentConclusion.toFixed(2)}`, index);
                } else {
                    Income._CommercialManager.StabilizedRentRoll
                        .verifyRentPsfAnnuallyByRow(testData.rentsPsf[index], index);
                }
            });
        });
    });