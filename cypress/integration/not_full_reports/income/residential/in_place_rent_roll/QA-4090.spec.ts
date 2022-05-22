import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4090.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";
import { Tag } from "../../../../../utils/tags.utils";

describe('Verify if "Per Year" radiobutton is selected by default',
    { tags: [ Tag.income, Tag.residential, Tag.in_place_rent_roll ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("1. Go to Income > Residential > In-Place Rent Roll.");
            _NavigationSection.navigateToResInPlaceRentRoll();

            cy.stepInfo(`2. Verify if "What time period should PSF rent be based on?" question appears + 
         "Per Year" radiobutton is selected by default, 
         when checkbox "Yes" is selected under question line "Do you know per unit square footage?"`);
            Income._Residential.InPlaceRentRoll.Page.getPerUnitSFRadio('false').should("be.checked");
            Income._Residential.InPlaceRentRoll.checkPerUnitSquareFootage('true');
            Income._Residential.InPlaceRentRoll.Page.radioButtonLabelByText(testData.labelText).should("exist");
            Income._Residential.InPlaceRentRoll.Page.getPSFRadio(testData.psfRadioValue).should("be.checked");

            deleteReport(testData.reportCreationData.reportNumber);
        });
    });