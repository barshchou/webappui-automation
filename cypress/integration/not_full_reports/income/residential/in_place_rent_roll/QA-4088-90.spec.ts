import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4088-90.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";

describe("[QA-4088], [QA-4089], [QA-4090] 'What time period should rent PSF be based on?' radiobuttons and label functionality",
    { tags: [ "@income", "@residential", "@in_place_rent_roll" ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("1. Go to Income > Residential > In-Place Rent Roll.");
            _NavigationSection.navigateToResInPlaceRentRoll();

            cy.stepInfo(`2. [QA-4088] Verify if "What time period should rent PSF be based on?" question with 2 radiobuttons ( Per year and Per Month) 
            appears under the question "Do you know per unit square footage?
            when checkbox "Yes" is selected under question field "Do you know per unit square footage?"`);
            Income._Residential.InPlaceRentRoll.Page.getPerUnitSFRadio('false').should("be.checked");
            Income._Residential.InPlaceRentRoll.checkPerUnitSquareFootage('true');
            Income._Residential.InPlaceRentRoll.Page.getPSFRadio(testData.psfRadioValuePerAnnually).should("exist");
            Income._Residential.InPlaceRentRoll.Page.getPSFRadio(testData.psfRadioValuePerMonthly).should("exist");
            Income._Residential.InPlaceRentRoll.Page.radioButtonLabelByText(testData.labelText).should("exist");

            cy.stepInfo(`3. [QA-4089] Verify if "What time period should PSF rent be based on?" question is not displayed 
            if "No" radiobutton is selected in "Do you know per unit square footage?"`);
            Income._Residential.InPlaceRentRoll.checkPerUnitSquareFootage('false');
            Income._Residential.InPlaceRentRoll.Page.radioButtonLabelByText(testData.labelText).should("not.exist");

            cy.stepInfo(`4. [QA-4090] "Verify if  'Per Year' radiobutton is selected by default" `);
            Income._Residential.InPlaceRentRoll.checkPerUnitSquareFootage('true');
            Income._Residential.InPlaceRentRoll.Page.getPSFRadio(testData.psfRadioValuePerAnnually).should("be.checked");

            deleteReport(testData.reportCreationData.reportNumber);
        });
    });