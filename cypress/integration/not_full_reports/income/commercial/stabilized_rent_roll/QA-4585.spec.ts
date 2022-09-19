import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4585.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Property } from "../../../../../actions";
import { Income } from "../../../../../actions";

describe("Verify the Commercial Stabilized Rent Roll table", 
    { tags: [ "@income", "@commercial", "@stabilized_rent_roll" ] }, () => {
         
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Create a mixed report with several Commercial Units (e.g. 2).`);
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`2. Proceed to the Property > Commercial Units and fill the Commercial Unit # SF field 
            and select the Use* radio button (e.g. Retail), save it.`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterListUnitSF(testData.listOfUnitsSF, testData.numberOfCommercialUnits);
            for (let i = 0; i < testData.numberOfCommercialUnits; i++) {
                Property._CommercialUnits.clickCommercialUnitTabByIndex(i)
                    .clickRadioButtonByValueAndUnitIndex(testData.groupName, testData.useRadios[i], i);
            }

            cy.stepInfo(`3. Proceed to the Income > Commercial > In-Place Rent Roll page and fill the Commercial 
            In-Place Rent Roll Table, save it.`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatuses, testData.numberOfCommercialUnits)
                .enterTenantNames(testData.tenantNames, testData.leaseStatuses)
                .verifyUseCells(testData.useTexts);
            testData.rentsPsf.forEach((rent, index) => {
                if (testData.leaseStatuses[index] !== "Vacant") {
                    Income._CommercialManager.InPlaceRentRoll.enterRentPerSFAnnuallyByRowNumber(rent, index);
                }
            });

            cy.stepInfo(`4. Proceed to the Income > Commercial > Stabilized Rent Roll page.`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll()
                .verifyProgressBarNotExist();

            cy.stepInfo(`5. Verify that the data in the Commercial Stabilized Rent Roll are correctly pulled 
            from the In-Place Rent Roll page.`);
            Income._CommercialManager.StabilizedRentRoll.verifyLeaseStatuses(testData.leaseStatuses)
                .verifyTenantNames(testData.tenantNames, testData.leaseStatuses)
                .verifyUseCells(testData.useTexts)
                .verifySFCells(testData.listOfUnitsSF)
                .verifyAnnualRentCellPerSFBasisByRow(testData.rentsPsf[1], testData.listOfUnitsSF[1], 
                    testData.unitsOfMeasure, 1)
                .verifyMonthlyRentPerSFByRow(testData.rentsPsf[1], testData.listOfUnitsSF[1], 
                    testData.unitsOfMeasure, 1)
                .verifyRentPsfAnnuallyByRow(testData.rentsPsf[1], 1)
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(`6. Proceed to the  Income > Commercial > In-Place Rent Roll page, 
            change any data (e.g. Tenant), save it`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll()
                .verifyProgressBarNotExist();
            Income._CommercialManager.InPlaceRentRoll
                .enterTenantNameByRowNumber(testData.newTenantName, 1, testData.leaseStatuses[1]);
        
            cy.stepInfo(`7. Proceed to the Income > Commercial > Stabilized Rent Roll page.`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll()
                .verifyProgressBarNotExist();

            cy.stepInfo(`8. Verify that the data from step 5 is also changed.`);
            Income._CommercialManager.StabilizedRentRoll
                .verifyTenantNameByRow(testData.leaseStatuses[1], testData.newTenantName, 1)
                .clickSaveButton()
                .verifyProgressBarNotExist();
        
            cy.stepInfo(`9. Proceed to the  Income > Commercial > In-Place Rent Roll page, remove 
            any data (e.g. Lease Start Date), save it.`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll()
                .verifyProgressBarNotExist();
            Income._CommercialManager.InPlaceRentRoll.deleteTenantNameByRowNumber(1);
        
            cy.stepInfo(`10. Proceed to the Income > Commercial > Stabilized Rent Roll page.`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll()
                .verifyProgressBarNotExist();
            Income._CommercialManager.StabilizedRentRoll.verifyTenantNameByRow(testData.leaseStatuses[1], "", 1);
        });
    });