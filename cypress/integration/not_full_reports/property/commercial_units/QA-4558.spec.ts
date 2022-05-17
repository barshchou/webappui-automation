import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4558.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, Property } from "../../../../actions";
import { Tag } from "../../../../utils/tags.utils";

describe("Verify the functionality of the Use* radio button", 
    { tags:[ Tag.property, Tag.commercial_units ] }, () => {

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
        cy.stepInfo(`3. Verify radio buttons affect Income > Commercial > In Place RR page and 
    Income > Commercial > Stabilized Rent Roll pages`);
        testData.useRadios.forEach((radio, index) => {
            Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(testData.groupName, radio);
            if (radio === "other") Property._CommercialUnits.enterOtherValueByGroupName(testData.groupName, testData.otherValue);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll.verifyUseCellTextByRowNumber(testData.useTexts[index])
                .chooseLeaseStatusByRowNumber("Occupied");
            _NavigationSection.navigateToStabilizedRentRollInCommercial();
            Income._CommercialManager.StabilizedRentRoll.verifyUseCellByRow(testData.useTexts[index])
                .verifyProgressBarNotExist()
                .Page.formEditBtn(0).click();
            Income._CommercialManager.StabilizedRentRoll.Page.formCancelButton(0).click();
            _NavigationSection.navigateToCommercialUnits();
        });
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Verify that the radio button selection affects the Income > Potential Gross Income page", () => {
        testData.useRadios.forEach((radio, index) => {
            Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(testData.groupName, radio);
            if (radio === "other") Property._CommercialUnits.enterOtherValueByGroupName(testData.groupName, testData.otherValue);
            _NavigationSection.navigateToPotentialGrossIncome();
            if (radio === "other") {
                cy.contains(`${testData.otherValue} vacancy and collection loss`).should("exist");
                Income._PotentialGrossIncome.Page.getCommercialVCLossPercentage(testData.otherValue).should("exist");
                Income._PotentialGrossIncome.Page.getCommercialSubjectSuitabilityRadio(testData.otherValue).should("exist");
                Income._PotentialGrossIncome.Page.getSubjectAreaCommercialVacancy(testData.otherValue).should("exist");
                Income._PotentialGrossIncome.enterCommercialVCLossPercentage(testData.vcLossPercentages[index], testData.otherValue);
            } else {
                cy.contains(`${testData.useTexts[index]} vacancy and collection loss`).should("exist");
                Income._PotentialGrossIncome.Page.getCommercialVCLossPercentage(testData.useRadios[index]).should("exist");
                Income._PotentialGrossIncome.Page.getCommercialSubjectSuitabilityRadio(testData.useRadios[index]).should("exist");
                Income._PotentialGrossIncome.Page.getSubjectAreaCommercialVacancy(testData.useRadios[index]).should("exist");
                Income._PotentialGrossIncome.enterCommercialVCLossPercentage(testData.vcLossPercentages[index], testData.useRadios[index]);
            }
            _NavigationSection.navigateToCommercialUnits();
        });
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Verify that the radio button selection affects the Income > Pro Forma page", () => {
        testData.useRadios.forEach((radio, index) => {
            Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(testData.groupName, radio);
            if (radio === "other") Property._CommercialUnits.enterOtherValueByGroupName(testData.groupName, testData.otherValue);
            _NavigationSection.navigateToProForma();
            Income._ProFormaActions.Page.getCommercialUseVCLossLabel(testData.useTexts[index]).should("exist");
            Income._ProFormaActions.Page.getCommercialUseVCLossRow(testData.useTexts[index]).should("exist");
            Income._ProFormaActions.clickIncludeNOIComparisonCheckbox();
            _NavigationSection.navigateToCommercialUnits();
        });
        deleteReport(testData.reportCreationData.reportNumber);
    });
});
