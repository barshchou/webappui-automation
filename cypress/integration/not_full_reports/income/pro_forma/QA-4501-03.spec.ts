import { numberWithCommas } from './../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4501-03.fixture";
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
        _NavigationSection.navigateToCommercialInPlaceRentRoll()
            .navigateToCommercialReimbursementSummary();
        
        cy.stepInfo("4. Go to Income → Reimbursement Summary and add Real Estate Taxes Reimbursement for commercial units"); 
        Income._CommercialManager.ReimbursementSummary.addNewCommercialReimbursement(
            testData.expenseType, testData.expenceTypeCellName, testData.reimbursementType, testData.knownInformation)
            .fillReimbursements(testData.monthlyReimbursement);

        cy.saveLocalStorage();
    });
    
    beforeEach("Restore local storeage", () => {
        cy.restoreLocalStorage();
        _NavigationSection.navigateToProForma()
            .verifyProgressBarNotExist();
    });

    it(`[QA-4501]: `, () => {
        cy.stepInfo(`5 Verify that Pro Forma table contains Taxes Reimbursement Total value`);
        Income._ProFormaActions.verifyCategoryTotal(
            `$${numberWithCommas(Math.round(testData.annualReimbursement))}`, 
            proFormaTypes.potentialRealEstateTaxesReimbursement);

        cy.stepInfo(`5.1 Verify that Total is taken from Income → Potential Gross Income 
                    → table → Potential Real Estate Taxes Reimbursement`);
        _NavigationSection.navigateToPotentialGrossIncome();
        Income._PotentialGrossIncome.verifyPotentialRealEstateTaxesReimbursement(`$${numberWithCommas(testData.annualReimbursement.toFixed(2))}`);
    });

    it(`[QA-4502]: `, () => {
        cy.stepInfo(`5. Verify that Pro Forma table contains Taxes Reimbursement PSF value`);
        Income._ProFormaActions.verifyCategoryPSFTotal(
            `$${numberWithCommas(testData.reimbursmentPerSf.toFixed(2))}`, 
            proFormaTypes.potentialRealEstateTaxesReimbursement);
    });

    it(`[QA-4503]: `, () => {
        cy.stepInfo(`5. Verify that Pro Forma table contains Taxes Reimbursement Per Unit value`);
        Income._ProFormaActions.verifyCategoryPerUnitTotal(
            `$${numberWithCommas(Math.round(testData.reimbursmentPerUnit))}`, 
            proFormaTypes.potentialRealEstateTaxesReimbursement);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});