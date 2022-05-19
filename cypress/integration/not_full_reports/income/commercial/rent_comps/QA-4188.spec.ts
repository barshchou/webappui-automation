import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4188.fixture";
import { Income } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../../utils/tags.utils";

describe("[Income>Commercial>Rent Comps] Rent/SF/Month is calculated with correct formula",
    { tags:[ Tag.income, Tag.commercial, Tag.rent_comps ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Income -> Commercial -> In-Place Rent Roll and choose 'Per Square Foot Per Month' as Basis of Rent");
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income._CommercialManager.InPlaceRentRoll.clickPerSquareFootPerMonthButton().
            chooseLeaseStatusByRowNumber("Occupied");

        cy.stepInfo("2. Navigate to Income -> Commercial -> Rent Comps and add new comp manually");
        _NavigationSection.navigateToCommercialRentComps();
        Income._CommercialManager.RentComps.
            clickManuallyAddANewCompButton().
            searchNewCompByAddress(testData.address);
        testData.rentCompFields.forEach(field => {
            if(field.type == "input") {
                Income._CommercialManager.RentComps.fillInRentCompFieldInput(field.name, field.value);
            } else {
                Income._CommercialManager.RentComps.chooseRentCompFieldDropdownOption(field.name, field.value);
            }
        });
        Income._CommercialManager.RentComps.enterLeaseDate(testData.leaseDate).clickSubmitButton();

        cy.stepInfo(`4. Verify if Per Square Foot Per Month is selected on In-Place RR page 
            and as Unit of Measure on Commercial Unit Details modal -> Rent/SF/Month in 
            selected rent comps table = Rent/12/SF, where Rent = base rent*12*SF`);
        
        const baseRent: number = +testData.rentCompFields[0].value;
        const squareFeet: number = +testData.rentCompFields[1].value;

        const rentPerSFValue1 = baseRent * 12 * squareFeet / 12 / squareFeet;
        Income._CommercialManager.RentComps.clickEditButtonByRowNumber().
            checkUnitOfMeasureRadioButton(testData.unitsOfMeasure[1]).
            clickSubmitButton().
            verifyRentPerSFCellValue(rentPerSFValue1);

        cy.stepInfo(`5. Verify if Per Square Foot Per Month is selected on In-Place RR page and 
        Per Square Foot is selected as Unit of Measure on Commercial Unit Details modal -> Rent/SF/Month 
        in selected rent comps table = Rent/12/SF, where Rent = base rent*SF`);
        const rentPerSFValue2 = baseRent * squareFeet / 12 / squareFeet;
        Income._CommercialManager.RentComps.clickEditButtonByRowNumber().
            checkUnitOfMeasureRadioButton(testData.unitsOfMeasure[0]).
            clickSubmitButton().
            verifyRentPerSFCellValue(rentPerSFValue2);

        cy.stepInfo(`6. Verify if  Per Square Foot is selected on In-Place RR page and 
        Per Square Foot Per Month is selected as Unit of Measure on Commercial Unit Details modal -> Rent/SF 
        in selected rent comps table = Rent/SF, where Rent = base rent*12*SF`);
        const rentPerSFValue3 = baseRent * 12 * squareFeet / squareFeet;
        _NavigationSection.clickCommercialRentRollButton().clickYesButton();
        Income._CommercialManager.InPlaceRentRoll.clickPerSquareFootButton(false);
        _NavigationSection.navigateToCommercialRentComps();
        Income._CommercialManager.RentComps.clickEditButtonByRowNumber().
            checkUnitOfMeasureRadioButton(testData.unitsOfMeasure[1]).
            clickSubmitButton().
            verifyRentPerSFCellValue(rentPerSFValue3);

        cy.stepInfo(`7. Verify if  Per Square Foot is selected on In-Place RR page and 
        as Unit of Measure on Commercial Unit Details modal -> Rent/SF 
        in selected rent comps table = Rent/SF, where Rent = base rent*SF`);
        const rentPerSFValue4 = baseRent * squareFeet / squareFeet;
        Income._CommercialManager.RentComps.clickEditButtonByRowNumber().
            checkUnitOfMeasureRadioButton(testData.unitsOfMeasure[0]).
            clickSubmitButton().
            verifyRentPerSFCellValue(rentPerSFValue4);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});