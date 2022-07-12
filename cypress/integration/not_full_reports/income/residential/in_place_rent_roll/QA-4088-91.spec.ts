import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4088-91.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";

describe("[QA-4088], [QA-4089], [QA-4090] [QA-4091] 'What time period should rent PSF be based on?' radiobuttons and label functionality",
    { tags: [ "@income", "@residential", "@in_place_rent_roll" ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
            cy.stepInfo("Go to Income > Residential > In-Place Rent Roll.");
            _NavigationSection.navigateToResInPlaceRentRoll();
        });

        it("[QA-4088]", () => {
            cy.stepInfo(`1. Verify if "What time period should rent PSF be based on?" question with 2 radiobuttons 
            ( Per year and Per Month) appears under the question "Do you know per unit square footage?
            when checkbox "Yes" is selected under question field "Do you know per unit square footage?"`);
            Income._Residential.InPlaceRentRoll.Page.getPerUnitSFRadio(false).should("be.checked");
            Income._Residential.InPlaceRentRoll.checkPerUnitSquareFootage();
            Income._Residential.InPlaceRentRoll.Page.getPSFRadio(testData.psfRadioValuePerAnnually).should("exist");
            Income._Residential.InPlaceRentRoll.Page.getPSFRadio(testData.psfRadioValuePerMonthly).should("exist");
            Income._Residential.InPlaceRentRoll.Page.radioButtonLabelByText(testData.labelText).should("exist");
        });

        it("[QA-4089]", () => {
            cy.stepInfo(`1. Verify if "What time period should PSF rent be based on?" question is not displayed 
            if "No" radiobutton is selected in "Do you know per unit square footage?"`);
            Income._Residential.InPlaceRentRoll.checkPerUnitSquareFootage(false);
            Income._Residential.InPlaceRentRoll.Page.radioButtonLabelByText(testData.labelText).should("not.exist");
        });

        it("[QA-4090]", () => {
            cy.stepInfo(`1. "Verify if  'Per Year' radiobutton is selected by default" `);
            Income._Residential.InPlaceRentRoll.checkPerUnitSquareFootage();
            Income._Residential.InPlaceRentRoll.Page.getPSFRadio(testData.psfRadioValuePerAnnually).should("be.checked");
        });

        it("[QA-4091]", () => {
            cy.stepInfo("1. Verify if User selects 'Per Year' time period PSF rent based on -> 'Rent SF' is column name in In-Place RR table");
            Income._Residential.InPlaceRentRoll.Page.getPerUnitSFRadio(true).click().should("be.checked");
            Income._Residential.InPlaceRentRoll.verifyColumnExist(testData.columnName);
            
            deleteReport(testData.reportCreationData.reportNumber);
        });
    });