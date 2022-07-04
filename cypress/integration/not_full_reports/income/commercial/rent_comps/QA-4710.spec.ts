import { Property, Income } from './../../../../../actions/index';
import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4710.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe("Dropdown 'Filters'- 'Sort by' section", 
    { tags:[ "@income", "@commercial", "@rent_comps" ] }, () => {

    before("Login, create report and add Commercial units", () => {
        createReport(testData.reportCreationData);
        NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.commercialUnits);
    });

    it("Test body", () => {
        cy.stepInfo("1. Go to Income>Commercial >In-Place Rent Roll and Select “Per Square Foot Per Month” tab");
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income._CommercialManager.InPlaceRentRoll.clickPerSquareFootPerMonthButton();
        testData.leaseStatuses.forEach((status, index) => {
            Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(status, index);
        });

        cy.stepInfo("2. Go to Income > Residential > Rent Comps, add comp and click edit");
        NavigationSection.navigateToCommercialRentComps();
        Income._CommercialManager.RentComps.openMap()
            .verifyProgressBarNotExist()
            .verifyFiltersDropdownExist()
            .addCompFromMapByAddress(testData.compAddress);

        cy.stepInfo("3. Select Per Square Foot Per Month radio button on Commercial Unit Details modal and fill valid values");
        testData.baseValue.value.forEach(value => {
            Income._CommercialManager.RentComps.clickEditButtonByRowNumber()
                .checkUnitOfMeasureRadioButton(testData.radioButtonNames[0])
                .fillInRentCompFieldInput(testData.baseValue.name, value)
                .chooseRentCompFieldDropdownOption(testData.sourceValue.name, testData.sourceValue.value)
                .clickSubmitButton()
                .verifyRentPerSFCellValue(value);
        });

        cy.stepInfo("4. Select Per Square Foot radio button on Commercial Unit Details modal on Commercial Unit Details modal and fill valid values");
        testData.baseValue.value.forEach(value => {
            Income._CommercialManager.RentComps.clickEditButtonByRowNumber()
                .checkUnitOfMeasureRadioButton(testData.radioButtonNames[1])
                .fillInRentCompFieldInput(testData.baseValue.name, value)
                .chooseRentCompFieldDropdownOption(testData.sourceValue.name, testData.sourceValue.value)
                .clickSubmitButton()
                .verifyRentPerSFCellValue(value);
        });

        deleteReport(testData.reportCreationData.reportNumber);
    });
});