import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4524.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";

describe(`Verify that if the Outdoor Space value is selected, the proper 
    group can be created on the Unit Groups and Rent Comps pages`, 
{ tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {

    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfResUnits(testData.numberOfUnits);
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.enterRentTypeCellByRowNumber(testData.rentType)
            .checkCheckboxByLabelAndVerify(testData.labelAndColumn, testData.labelAndColumn);
        testData.spaceOptions.forEach((option, index) => {
            Income.Residential.InPlaceRentRoll.enterOutdoorSpaceByOptionByRow(option)
                .clickSaveContinueButton();
            if (index === 0) {
                Income.Residential.UnitGroups.checkCompGroupRadio(testData.radioValue)
                    .clickChangeButton();
            }
            cy.contains(getOutdoorSpaceGroupByOption(option)).should("exist");
            Income.Residential.UnitGroups.clickSaveContinueButton();
            NavigationSection.verifyProgressBarNotExist();
            cy.contains(getOutdoorSpaceGroupByOption(option)).should("exist");
            Income.Residential.RentComps.BaseActions.clickSaveButton()
                .verifyProgressBarNotExist();
            NavigationSection.navigateToResInPlaceRentRoll();
        });
    });
});

const getOutdoorSpaceGroupByOption = (option) => {
    if (option === "None") {
        return "Studio without Outdoor Space";
    }
    const studioWith = (option) => `Studio with ${option}`;
    return studioWith(option);
};