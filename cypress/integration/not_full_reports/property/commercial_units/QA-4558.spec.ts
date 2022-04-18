import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4558.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import {_NavigationSection} from "../../../../actions/base";
import {Income, Property} from "../../../../actions";

describe("Verify the functionality of the Use* radio button", () => {

    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
        cy.stepInfo("1. Navigate to property summary and enter commercial units");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        cy.stepInfo("2. Navigate to commercial units");
        _NavigationSection.navigateToCommercialUnits();
    });

    it("Commercial Unit SF Discussion text", () => {
        cy.stepInfo("3. Verify each Use* radio affects commercialUnitSFDiscussion");
        Property._CommercialUnits.verifyRadioIsChecked(testData.groupName, testData.defaultUse);
        testData.useRadios.forEach((value, index) => {
            let valueToContainDiscussion: string = value;
            Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(testData.groupName, value);
            if(value === "other") {
                Property._CommercialUnits.enterOtherValueByGroupName(testData.groupName, testData.otherValue, 0);
                valueToContainDiscussion = testData.otherValue.toLowerCase();
            }
            Property._CommercialUnits.clickSaveButton()
                .verifyProgressBarNotExist();
            cy.reload();
            Property._CommercialUnits.verifyProgressBarNotExist()
                .verifyRadioIsChecked(testData.groupName, value)
                .verifyCommercialUnitSFDiscussionTextAreaContains(valueToContainDiscussion);
            if (index === 0) {
                Property._CommercialUnits.verifyCommercialUnitSFDiscussionTextAreaNotContains(testData.defaultUse);
            } else {
                Property._CommercialUnits.verifyCommercialUnitSFDiscussionTextAreaNotContains(testData.useRadios[index - 1]);
            }
        });
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it(`Verify radio buttons affect Income > Commercial > In Place RR page and 
    Income > Commercial > Stabilized Rent Roll pages`, () => {
        cy.stepInfo(`Verify radio buttons affect Income > Commercial > In Place RR page and 
    Income > Commercial > Stabilized Rent Roll pages`);
        testData.useRadios.forEach((radio, index) => {
            Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(testData.groupName, radio);
            if (radio === "other") Property._CommercialUnits.enterOtherValueByGroupName(testData.groupName, testData.otherValue);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll.verifyUseCellTextByRowNumber(testData.useTexts[index])
                .chooseLeaseStatusByRowNumber("Occupied");
            _NavigationSection.openCommercialStabilizedRentRollInCommercial();
            Income._CommercialManager.StabilizedRentRoll.verifyUseCellByRow(testData.useTexts[index])
                .verifyProgressBarNotExist()
                .clickEditDiscussionButton()
                .clickCancelEditDiscussionButton();
            _NavigationSection.navigateToCommercialUnits();
        });
        deleteReport(testData.reportCreationData.reportNumber);
    });
});