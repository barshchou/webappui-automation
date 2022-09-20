import { Property } from './../../../../actions/index';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4227.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Sales } from "../../../../actions";

describe(`Check Utility Discussion`, 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Create report`);
            createReport(testData.reportCreationData);

            _NavigationSection.navigateToPropertyResidentialUnits();
            Property._ResidentialUnits.chooseKitchenCondition(testData.kitchenCondition)
                .chooseBathroomCondition(testData.bathroomCondition)
                .chooseBedroomCondition(testData.bedroomCondition)
                .chooseLivingRoomCondition(testData.livingRoomCondition);
        });

        it("[QA-4227]", () => {
            cy.stepInfo(`1. Navigate to Find Comps and add sales comps`);
            _NavigationSection.navigateToFindComps();
            Sales._FindComps.AddressSearch.openAddressSearchTab()
                .addCompByParameter(1, testData.compProperty, testData.compStatusDate);

            cy.stepInfo(`2. Navigate to Adjust Comps and add appropriate Utilities and
            verify generated commentary`);
            _NavigationSection.navigateToAdjustComps();
            Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
                .expandDiscussionSection(testData.discussionSection);
            testData.comparablesAdjustments.forEach(locationAdjustment => {
                Sales._AdjustComps.enterLocationAdjustmentGroup(Object.keys(locationAdjustment.adjustments), 
                    Object.values(locationAdjustment.adjustments))
                    .verifyDiscussionCommentary(testData.locationDiscussionTitle, 
                        locationAdjustment.locationDiscussionDiscussionText);
            });
        });
    });