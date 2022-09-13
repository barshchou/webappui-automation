import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4185-87.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Income } from "../../../../../actions";
import { _IncomeRoutes } from "../../../../../enums/pages_routes";

describe(`[QA-4186] Unit of Measure on Commercial Unit Details modal is defaulted to selection on in-Place RR page
        [QA-4187] Rent/SF/Month is column name if Per Square Foot Per Month is selected on In-Place Rant Roll page
        [QA-4185] Per Square Foot Per Month radio button is displayed on Commercial Unit Details modal`,
{ tags: [ "@income", "@commercial", "@rent_comps" ] }, () => {

    before("Create report, add commercial units, choose Per Square Foot Per Month as basis of rent", () => {
        createReport(testData.reportCreationData);
        cy.stepInfo(`Add ${testData.unitsNumber} commercial units`);
        _NavigationSection.navigateToSubjectPropertyData();
        DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.unitsNumber);
        cy.stepInfo("Choose Per Square Foot Per Month as basis of rent on In-Place Rent Roll Page");
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus)
            .clickBasisOfRentTabByUnitMeasure(testData.unitMeasures[0]);
        cy.stepInfo("Navigate to Rent Comps");
        _NavigationSection.navigateToCommercialRentComps();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("[QA-4187]", () => {
        Income._CommercialManager.RentComps.verifyCompGroupColumnExists("Rent/SF", false)
            .verifyCompGroupColumnExists("Rent/SF/Month");
    });

    testData.unitMeasures.forEach(measure => {
        it(`[QA-4185][QA-4186] with ${measure} rent type`, () => {
            if (measure !== "per square foot per month") {
                cy.stepInfo(`Open commercial in-place rent roll page, choose ${measure} basis of rent`);
                _NavigationSection.openPageByUrl(_IncomeRoutes._CommercialRoutes._InPlaceRentRoll);
                Income._CommercialManager.InPlaceRentRoll.clickBasisOfRentTabByUnitMeasure(measure);
                _NavigationSection.navigateToCommercialRentComps();
            }
            cy.stepInfo(`Open Commercial Unit Details modal with new comp, 
            verify ${measure} Unit of Measure is default`);
            Income._CommercialManager.RentComps.clickManuallyAddANewCompButton()
                .searchNewCompByAddress(testData.reportCreationData.address)
                .verifyCommercialUnitDetailsUnitMeasureRadioChecked(measure);
        });
    });
});