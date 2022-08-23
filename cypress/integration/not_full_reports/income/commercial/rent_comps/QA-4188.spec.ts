import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4188.fixture";
import { Income } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("[Income>Commercial>Rent Comps] Rent/SF/Month is calculated with correct formula",
    { tags:[ "@income", "@commercial", "@rent_comps" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Navigate to Income -> Commercial -> 
            In-Place Rent Roll and choose 'Per Square Foot Per Month' as Basis of Rent`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll.clickPerSquareFootPerMonthButton().
                chooseLeaseStatusByRowNumber("Occupied");

            cy.stepInfo(`2. Navigate to Income -> Commercial -> Rent Comps and add new comp manually`);
            _NavigationSection.navigateToCommercialRentComps();
            Income._CommercialManager.RentComps.
                clickManuallyAddANewCompButton().
                searchNewCompByAddress(testData.address);
            testData.rentCompFields.forEach(field => {
                if (field.type == "input") {
                    Income._CommercialManager.RentComps.fillInRentCompFieldInput(field.name, field.value, true);
                } else {
                    Income._CommercialManager.RentComps.chooseRentCompFieldDropdownOption(field.name, field.value);
                }
            });
            Income._CommercialManager.RentComps.enterLeaseDate(testData.leaseDate).clickSubmitButton();

            cy.stepInfo(`4. Verify if Per Square Foot Per Month is selected on In-Place RR page 
            and as Unit of Measure on Commercial Unit Details modal -> Rent/SF/Month in 
            selected rent comps table = Rent/12/SF, where Rent = base rent*12*SF and 12 = number of months in year`);

            let rentPerSFValue = testData.baseRent * testData.numberOfMonthsInYear
         * testData.squareFeet / testData.numberOfMonthsInYear / testData.squareFeet;
            Income._CommercialManager.RentComps.clickEditButtonByRowNumber().
                checkUnitOfMeasureRadioButton(testData.perMonth).
                clickSubmitButton().
                verifyRentPerSFCellValue(rentPerSFValue);

            cy.stepInfo(`5. Verify if Per Square Foot Per Month is selected on In-Place RR page and 
            Per Square Foot is selected as Unit of Measure on Commercial Unit Details modal -> Rent/SF/Month 
            in selected rent comps table = Rent/12/SF, where Rent = base rent*SF and 12 = number of months in year`);
            rentPerSFValue = testData.baseRent * testData.squareFeet / 
                testData.numberOfMonthsInYear / testData.squareFeet;
            Income._CommercialManager.RentComps.clickEditButtonByRowNumber().
                checkUnitOfMeasureRadioButton(testData.perYear).
                clickSubmitButton().
                verifyRentPerSFCellValue(rentPerSFValue);

            cy.stepInfo(`6. Verify if  Per Square Foot is selected on In-Place RR page and 
        Per Square Foot Per Month is selected as Unit of Measure on Commercial Unit Details modal -> Rent/SF 
        in selected rent comps table = Rent/SF, where Rent = base rent*12*SF and 12 = number of months in year`);
            rentPerSFValue = testData.baseRent * testData.numberOfMonthsInYear * 
                testData.squareFeet / testData.squareFeet;
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll.clickPerSquareFootButton(false);
            _NavigationSection.navigateToCommercialRentComps();
            Income._CommercialManager.RentComps.clickEditButtonByRowNumber().
                checkUnitOfMeasureRadioButton(testData.perMonth).
                clickSubmitButton().
                verifyRentPerSFCellValue(rentPerSFValue);

            cy.stepInfo(`7. Verify if  Per Square Foot is selected on In-Place RR page and 
        as Unit of Measure on Commercial Unit Details modal -> Rent/SF 
        in selected rent comps table = Rent/SF, where Rent = base rent*SF and 12 = number of months in year`);
            rentPerSFValue = testData.baseRent * testData.squareFeet / testData.squareFeet;
            Income._CommercialManager.RentComps.clickEditButtonByRowNumber().
                checkUnitOfMeasureRadioButton(testData.perYear).
                clickSubmitButton().
                verifyRentPerSFCellValue(rentPerSFValue);
        });
    });