import { numberWithCommas } from './../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4499_4500.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from '../../../../actions/index';
import { Income } from "../../../../actions";
import { Tag } from "../../../../utils/tags.utils";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";

describe("Potential Real Estate Tax Reimbursement", 
    { tags:[ Tag.income, Tag.pro_forma ] }, () => {
    
    before("Login, create report, prepare data", () => {
        cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterGrossBuildingArea(testData.grossBuildingArea)
            .enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

        cy.stepInfo("2. Go to Property → Commercial Units and fill in the values of Leasable Area for all commercial units"); 
        _NavigationSection.navigateToCommercialUnits();
        Property._CommercialUnits.enterListUnitSF(testData.listOfUnitsSF, testData.numberOfCommercialUnits);

        cy.stepInfo("3. Go to Income → Commercial → In-Place Rent Role and fill in all necessary values to the table"); 
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatuses, testData.numberOfCommercialUnits);
        testData.rentsPsf.forEach((rent, index) => {
            Income._CommercialManager.InPlaceRentRoll.enterRentPerSFAnnuallyByRowNumber(rent, index);
        });

        cy.stepInfo("3. Go to Income → Commercial → In-Place Rent Role and fill in all necessary values to the table"); 
        _NavigationSection.navigateCommercialToReimbursementSummary();
        Income._CommercialManager.ReimbursementSummary.addNewCommercialReimbursement();
            
            

        _NavigationSection.navigateToProForma()
            .verifyProgressBarNotExist();

        cy.saveLocalStorage();
    });
    
    beforeEach("Restore local storeage", () => {
        cy.restoreLocalStorage();
    });

    it(`[QA-4500]: 4. Go to Income → Pro Forma page.Verify that value in the
        Potential Commercial Income → Per Unit is calculated by the formula: Total / # of ResidentialUnits`, () => {
        Income._ProFormaActions.verifyCategoryPSFTotal(
            `$${numberWithCommas(testData.perUnitCommercialIncome)}`, 
            proFormaTypes.potentialUnderterminedCommercialIncome);
    });

    it(`[QA-4499]: 4. Go to Income → Pro Forma page.Verify that value in the 
        Potential Commercial Income → PSF is calculated by the formula: Total / GBA`, () => {
        cy.log(`${testData.perSfCommercialIncome}`);
        Income._ProFormaActions.verifyCategoryPerUnitTotal(
            `$${numberWithCommas(testData.perSfCommercialIncome)}`, 
            proFormaTypes.potentialUnderterminedCommercialIncome);
    });

    after("Delete report after test suite", () => {
        deleteReport(testData.reportCreationData.reportNumber);
    });
});