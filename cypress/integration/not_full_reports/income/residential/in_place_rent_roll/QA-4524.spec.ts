import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4524.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Income } from "../../../../../actions";

describe(`Verify that if the Outdoor Space value is selected, the proper 
    group can be created on the Unit Groups and Rent Comps pages`, 
{ tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {

    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        _NavigationSection.navigateToSubjectPropertyData();
        DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits);
        _NavigationSection.navigateToResInPlaceRentRoll();
        Income._Residential.InPlaceRentRoll.enterRentTypeCellByRowNumber(testData.rentType)
            .checkCheckboxByLabelAndVerify(testData.labelAndColumn, testData.labelAndColumn);
        testData.spaceOptions.forEach((option, index) => {
            Income._Residential.InPlaceRentRoll.enterOutdoorSpaceByOptionByRow(option)
                .clickSaveContinueButton();
            if (index === 0) {
                Income._Residential.UnitGroups.checkCompGroupRadio(testData.radioValue)
                    .clickChangeButton();
            }
            cy.contains(getOutdoorSpaceGroupByOption(option)).should("exist");
            Income._Residential.UnitGroups.clickSaveContinueButton();
            _NavigationSection.verifyProgressBarNotExist();
            cy.contains(getOutdoorSpaceGroupByOption(option)).should("exist");
            Income._Residential.RentComps.BaseActions.clickSaveButton()
                .verifyProgressBarNotExist();
            _NavigationSection.navigateToResInPlaceRentRoll();
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