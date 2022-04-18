import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4558.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import {_NavigationSection} from "../../../../actions/base";
import {Property} from "../../../../actions";

describe("Verify the functionality of the Use* radio button", () => {

    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        _NavigationSection.navigateToCommercialUnits();
    });

    it("Commercial Unit SF Discussion text", () => {
        Property._CommercialUnits.verifyRadioIsChecked(testData.groupName, testData.defaultUse);
        testData.useRadios.forEach((value, index) => {
            let valueToContainDiscussion = value;
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
});