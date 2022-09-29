import { Property } from './../../../../actions/index';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4226.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Sales } from "../../../../actions";

describe(`Check Location Discussion`, 
    { tags: [ "@adjust_comps", "@sales", "@bug", "@WEB-7133" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Create report`);
            createReport(testData.reportCreationData);

            cy.stepInfo(`2. Set up market area and neighborhood`);
            _NavigationSection.navigateToPropertyMarket();
            Property._Market.enterNeighborhood(testData.neighborhood)
                .enterArea(testData.area);
        });

        it("[QA-4226]", () => {
            cy.stepInfo(`3. Navigate to Find Comps and add sales comps`);
            _NavigationSection.navigateToFindComps();
            Sales._FindComps.AddressSearch.openAddressSearchTab()
                .addCompByParameter(testData.filter, 1);

            cy.stepInfo(`4. Navigate to Adjust Comps and add appropriate Location Adjustments and
            verify generated commentary`);
            _NavigationSection.navigateToAdjustComps();
            Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
                .expandDiscussionSection(testData.discussionSection);
            testData.comparablesAdjustments.forEach(locationAdjustment => {
                Sales._AdjustComps.enterLocationAdjustmentGroup(Object.keys(locationAdjustment.adjustments), 
                    Object.values(locationAdjustment.adjustments))
                    .verifyDiscussionCommentary(testData.locationDiscussionTitle, 
                        locationAdjustment.locationDiscussionText);
            });
        });
    });