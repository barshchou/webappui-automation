import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4501-03.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from '../../../../actions';
import { Income } from "../../../../actions";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import Enums from "../../../../enums/income/incomeTypesCellNames.enum";

describe("Potential Real Estate Tax Reimbursement", 
    { tags:[ "@income", "@pro_forma" ] }, () => {
     
        before("Login, create report, prepare data", () => {
            cy.stepInfo(`1. Create new report or open the report which is already created. 
                        Make sure that there is at least three commercial units.
                        Set square foot analysis basis to NLA and fill area`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.selectBasisSquareFootAnalysis(testData.basisSquareFootAnalysis.nla)
                .fillBasisSquareFootAnalysis(testData.buildingArea)
                .enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

            cy.stepInfo(`2. Go to Property → Commercial Units and fill in the values of 
            Leasable Area for all commercial units`); 
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterListUnitSF(testData.listOfUnitsSF, testData.numberOfCommercialUnits);

            cy.stepInfo(`3. Go to Income → Commercial → In-Place Rent Roll and fill 
            in all necessary values to the table`); 
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatuses, 
                testData.numberOfCommercialUnits);
            testData.rentsPsf.forEach((rent, index) => {
                Income._CommercialManager.InPlaceRentRoll.enterRentPerSFAnnuallyByRowNumber(rent, index);
            });
        
            cy.stepInfo(`4. Go to Income → Commercial → In-Place Rent Roll and fill 
            in all necessary values to the table`); 
            _NavigationSection.navigateToCommercialReimbursementSummary();
        
            cy.stepInfo(`5. Go to Income → Reimbursement Summary and add Real Estate Taxes 
            Reimbursement for commercial units`); 
            Income._CommercialManager.ReimbursementSummary.addNewCommercialReimbursement(
                testData.expenseType, testData.expenseTypeCellName, 
                testData.reimbursementType, testData.knownInformation)
                .fillReimbursements(testData.monthlyReimbursement, testData.columnsId);

            cy.saveLocalStorage();
        });
    
        beforeEach("Restore local storage", () => {
            cy.restoreLocalStorage();
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();
        });

        it("[QA-4501]", () => {
            cy.stepInfo(`5 Verify that Pro Forma table contains Taxes Reimbursement Total value`);
            Income._ProFormaActions.verifyCategoryTotal(
                `$${numberWithCommas(Math.round(testData.annualReimbursement))}`, 
                proFormaTypes.potentialRealEstateTaxesReimbursement);

            cy.stepInfo(`5.1 Verify that Total is taken from Income → Potential Gross Income 
                    → table → Potential Real Estate Taxes Reimbursement`);
            _NavigationSection.navigateToPotentialGrossIncome();
            Income._PotentialGrossIncome.verifyIncomeTypeUnified(
                Enums.potentialRealEstateTaxesReimbursement, 
                `$${numberWithCommas(testData.annualReimbursement.toFixed(2))}`);
        });

        it("[QA-4502]", () => {
            cy.stepInfo(`5. Verify that Pro Forma table contains Taxes Reimbursement PSF value`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.reimbursementPerSf.toFixed(2))}`, 
                proFormaTypes.potentialRealEstateTaxesReimbursement);
        });

        it("[QA-4503]", () => {
            cy.stepInfo(`5.1. Verify that Pro Forma table contains Taxes Reimbursement Per Unit value`);
            Income._ProFormaActions.verifyCategoryPerUnitTotal(
                `$${numberWithCommas(Math.round(testData.reimbursementPerUnit))}`, 
                proFormaTypes.potentialRealEstateTaxesReimbursement);
        });
    });