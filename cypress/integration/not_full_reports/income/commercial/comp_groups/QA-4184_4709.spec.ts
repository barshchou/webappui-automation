import testData from "../../../../../fixtures/not_full_reports/income/commercial/comp_groups/QA-4184_4709.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { Property } from "../../../../../actions";

describe("Verify Comps Groups table", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report, add commercial units", () => {
            createReport(testData.reportCreationData);
            NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.monthlyRentList.length);
        });

        it("[QA-4184][QA-4709]", () => {
            cy.stepInfo(`1. Navigate to Income -> Commercial -> In-place Rent Roll`);
            NavigationSection.navigateToCommercialInPlaceRentRoll();

            cy.stepInfo(`2. Select “Per Square Foot Per Month” tab. 
            Fill in Rent PSF/Month with valid values. 
            Select “Per Square Foot Per Month” tab.`);
            Income.Commercial.InPlaceRentRoll.clickPerSquareFootPerMonthButton();
            testData.monthlyRentList.forEach((unitRent, index) => {
                Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus, index)
                    .enterRentPerSFMonthlyByRowNumber(unitRent, index);
            });
                
            cy.stepInfo(`[QA-4709] 3. Navigate to Comp Groups and verify if Per Square Foot Per Month option 
            is selected on Commercial In-Place Rent Roll page -> Label "Rent per SF" is changed to -> 
            "Rent Per SF/Month" and "Rent PSF/Month" column displays correct values pulled 
            from In-Place Rent Roll page`);
            NavigationSection.navigateToCompGroups();
            Income.Commercial.CompGroups.addCompGroup(testData.compGroupName)
                .verifyCompGroupRentLabel()
                .verifyCompGroupRentLabel(testData.compGroupName);
            
            cy.stepInfo(`[QA-4184] 4. Verify Rent is displayed on the same basis that 
            is selected on In-Place Rent Roll `);
            testData.monthlyRentList.forEach((unitRent, index) => {
                Income.Commercial.CompGroups.verifyRentBasisDisplayedWithDecimals(unitRent, index);
            });
        });
    });