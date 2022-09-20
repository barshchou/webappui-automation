import { DataCollections, Property } from './../../../../actions/index';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4227.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Sales } from "../../../../actions";

describe(`Check Utility Discussion`, 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        testData.reportCreationData.forEach(reportType => {
            it(`[QA-4227] with ${reportType.reportCreationData.incomeValue}`, () => {
                cy.stepInfo(`1. Create report`);
                createReport(reportType.reportCreationData);

                cy.stepInfo(`2. Add conditions to kitchen, bathroom, bedroom and living room.`);
                _NavigationSection.navigateToPropertyResidentialUnits();
                Property._ResidentialUnits.chooseKitchenCondition(testData.kitchenCondition)
                    .chooseBathroomCondition(testData.bathroomCondition)
                    .chooseBedroomCondition(testData.bedroomCondition)
                    .chooseLivingRoomCondition(testData.livingRoomCondition);

                cy.stepInfo(`3. Add amenity`);
                _NavigationSection.navigateToPropertyAmenities();
                Property._Amenities.checkLaundryRoomCheckbox();

                cy.stepInfo(`4. Set corner building type`);
                _NavigationSection.navigateToPropertyMaps();
                Property._Maps.chooseCornerByValue(reportType.corner);

                _NavigationSection.navigateToSubjectPropertyData();
                DataCollections._SubjectPropertyData.setBuildingType(reportType.elevator);

                cy.stepInfo(`5. Navigate to Find Comps and add sales comps`);
                _NavigationSection.navigateToFindComps();
                Sales._FindComps.AddressSearch.openAddressSearchTab()
                    .addCompByParameter(1, testData.compBuildingType, 
                        testData.compBuildingTypeValue);

                cy.stepInfo(`6. Navigate to Adjust Comps and add appropriate Utilities and
                verify generated commentary`);
                _NavigationSection.navigateToAdjustComps();
                Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
                    .clickAddCustomUtilitiesAdjustment()
                    .expandDiscussionSection(testData.discussionSection);
                reportType.compFixture.forEach(utilitiesAdjustment => {
                    Sales._AdjustComps.enterUtilitiesAdjustmentGroup(Object.keys(utilitiesAdjustment.adjustments), 
                        Object.values(utilitiesAdjustment.adjustments))
                        .verifyDiscussionCommentary(testData.utilityDiscussion, 
                            utilitiesAdjustment.utilitiesDiscussionText);
                });
            });
        });
    });