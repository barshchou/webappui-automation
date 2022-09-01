import { Income, Property } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4583.fixture";

describe(`Verify the Back button functionality on the Stabilized Rent Roll page`, 
    { tags:[ "@income", "@commercial", "@stabilized_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("Precondition: Navigate to Summary page and set commercial units.");
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

            cy.stepInfo(` 1. Navigate to Commercial Stabilized Rent Roll page`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll()
                .verifyProgressBarNotExist()
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(` 2. Click on the Back button and verify the user is redirected to 
            the previous page (Income > Commercial > Comp Groups Discussion).`);
            Income._CommercialManager.StabilizedRentRoll.Actions.clickBackButton();
            Income._CommercialManager.CompGroups.verifyThatPageIsOpened();
        });
    });
