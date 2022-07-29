import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4613_14_16_20.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";

describe("Commercial Unit Details Use Other value tests", 
    { tags: [ "@income", "@commercial", "@rent_comps", "@unit_details" ] }, () => {

        before("Create report, open Commercial Unit Details", () => {
            createReport(testData.reportCreationData);
        });

        it("Tests body", () => {
            cy.stepInfo("1. Navigate to commercial rent comps, open commercial unit details form");
            _NavigationSection.navigateToCommercialRentComps();
            Income._CommercialManager.RentComps.clickManuallyAddANewCompButton()
                .searchNewCompByAddress(testData.reportCreationData.address);

            cy.stepInfo("2. [QA-4613] 'Other' option exists in 'Use' Dropdown");
            Income._CommercialManager.RentComps.clickRentCompDropdownField(testData.otherUse.name)
                .Page
                .getDropdownOptionsByFieldName(testData.otherUse.name).last()
                .should("have.text", testData.otherUseText);

            cy.stepInfo("3. [QA-4614] 'Use-Other*' text field is displayed if 'Other' is selected");
            Income._CommercialManager.RentComps.Page
                .getRentCompInputField(testData.otherUseInput.name).should("not.exist");
            Income._CommercialManager.RentComps
                .selectRentCompDropdownOption(testData.otherUse.value)
                .verifyUnitDetailsDropdownText(testData.otherUse.name, testData.otherUseText);

            cy.stepInfo("4. [QA-4620] 'Use-Other*' field is required");
            Income._CommercialManager.RentComps
                .checkUnitOfMeasureRadioButton(testData.unitOfMeasure)
                .enterUnitDetailsBaseRent(testData.baseRent)
                .enterUnitDetailsSquareFeet(testData.squareFeet)
                .fillInRentCompFieldInput(testData.tenantName.name, testData.tenantName.value, true)
                .enterLeaseDate()
                .chooseRentCompFieldDropdownOption(testData.sourceOfInfo.name, testData.sourceOfInfo.value)
                .verifySubmitButtonDisabled()
                .fillInRentCompFieldInput(testData.otherUseInput.name, testData.otherUseInput.value, true)
                .verifySubmitButtonDisabled(false);

            cy.stepInfo("5. [QA-4616] Changing 'Other' to another Use collapses 'Use-Other*' field");
            Income._CommercialManager.RentComps
                .chooseRentCompFieldDropdownOption(testData.industrialUse.name, testData.industrialUse.value)
                .Page.getRentCompInputField(testData.otherUseInput.name).should("not.exist");
            Income._CommercialManager.RentComps
                .chooseRentCompFieldDropdownOption(testData.otherUse.name, testData.otherUse.value)
                .verifyInputFieldValue(testData.otherUseInput.name, testData.otherUseInput.value, true);
        });
    });
