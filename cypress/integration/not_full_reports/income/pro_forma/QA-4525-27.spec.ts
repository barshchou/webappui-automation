import { _ResidentialUnits } from './../../../../actions/property/index';
import { numberWithCommas } from './../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4525-27.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from '../../../../actions/index';
import { Income } from "../../../../actions";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import Enums from "../../../../enums/incomeTypesCellNames.enum";

describe("Potential Gross Income", 
    { tags:[ "@income", "@pro_forma" ] }, () => {
    
    before("Login, create report, prepare data", () => {
        cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterGrossBuildingArea(testData.grossBuildingArea)
            .enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

        cy.stepInfo("2. Go to Income → Residential → In-Place Rent Role and fill in all necessary values to the table"); 
        _NavigationSection.navigateToResInPlaceRentRoll();
        Income._Residential.InPlaceRentRoll.enterMonthlyRents(testData.residentialMonthlyRent);

        cy.stepInfo("3. Go to Property → Commercial Units and fill in the values of Leasable Area for all commercial units"); 
        _NavigationSection.navigateToCommercialUnits();
        Property._CommercialUnits.enterListUnitSF(testData.listOfUnitsSF, testData.numberOfCommercialUnits);

        cy.stepInfo("4. Go to Income → Commercial → In-Place Rent Role and fill in all necessary values to the table"); 
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

    it(`[QA-4525]`, () => {
        cy.stepInfo(`5 Total = [Total_PotentialResidentialIncome] + [Total_Potential[USE]Income](up to 5 uses) + 
                    [Total_RealEstateTaxReimbursement] + [Total_ParkingIncome] + [Total_LaundryIncome] + 
                    [Total_StorageIncome] + [Total_OtherIncome]`);
        Income._ProFormaActions.verifyCategoryTotal(
            `$${numberWithCommas(Math.round(testData.potentialGrossIncomeTotal))}`, 
            proFormaTypes.potentialGrossIncome);

        cy.stepInfo(`5.1 Verify that Total is taken from Income → Potential Gross Income 
                    → table → Potential Gross Income`);
        _NavigationSection.navigateToPotentialGrossIncome();
        Income._PotentialGrossIncome.verifyIncomeTypeUnified(
            Enums.potentialGrossIncome, `$${numberWithCommas(testData.potentialGrossIncomeTotal.toFixed(2))}`);
    });

    it(`[QA-4526]`, () => {
        cy.stepInfo(`5. Verify that Pro Forma table contains Taxes Reimbursement PSF value`);
        Income._ProFormaActions.verifyCategoryPSFTotal(
            `$${numberWithCommas(testData.potentialGrossIncomePerSf.toFixed(2))}`, 
            proFormaTypes.potentialGrossIncome);
    });

    it(`[QA-4527]`, () => {
        cy.stepInfo(`5. Verify that Pro Forma table contains Taxes Reimbursement Per Unit value`);
        Income._ProFormaActions.verifyCategoryPerUnitTotal(
            `$${numberWithCommas(Math.round(testData.potentialGrossIncomePerUnit))}`, 
            proFormaTypes.potentialGrossIncome);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});