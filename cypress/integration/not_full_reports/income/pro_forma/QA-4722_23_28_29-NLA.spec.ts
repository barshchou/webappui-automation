import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4722_23_28_29.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from '../../../../actions';
import { Income } from "../../../../actions";

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
        
            cy.stepInfo(`3. Go to Income → Reimbursement Summary and add Real Estate Taxes 
            Reimbursement for commercial units`); 
            _NavigationSection.navigateToCommercialReimbursementSummary();
            Income._CommercialManager.ReimbursementSummary.addNewCommercialReimbursement(
                testData.expenseType, testData.expenseTypeCellName, 
                testData.reimbursementType, testData.knownInformation)
                .fillReimbursements(testData.monthlyReimbursement, testData.columnsId)
                .fillVCLossByRow(testData.reimbursementVcLoss);

            cy.saveLocalStorage();
        });
    
        beforeEach("Restore local storage", () => {
            cy.restoreLocalStorage();
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();
        });

        it("[QA-4722]", () => {
            cy.stepInfo(`4. The value in the Less Real Estate Taxes Reimbursement 
                    V/C Loss @ X% is taken from Income → Commercial → Reimbursement Summary → V/C Loss % cell`);
            Income._ProFormaActions.verifyResidentialVCLossLabel(
                testData.expenseType, 
                testData.reimbursementVcLoss);
        });

        it("[QA-4723]", () => {
            cy.stepInfo(`4. The value in the Less Real Estate Taxes Reimbursement 
                    V/C Loss @ X% is taken from Income → Commercial → Reimbursement Summary → 
                    Gross V/C Loss cell`);
            Income._ProFormaActions.verifyResidentialVCLossTotal(
                testData.expenseType, 
                `-$${numberWithCommas(Math.round(testData.reimbursementLossTotal))}`);
        });

        it("[QA-4728]", () => {
            cy.stepInfo(`4. The value in the Less Real Estate Taxes Reimbursement 
                    V/C Loss @ X% is calculated by formula: 
                    Real Estate Taxes Reimbursement V/C Loss @ X% → PSF [Total/GBA Value]`);
            Income._ProFormaActions.verifyResidentialVCLossPerSF(
                testData.expenseType, testData.buildingArea);
        });

        it("[QA-4729]", () => {
            cy.stepInfo(`4. The value in the Less Real Estate Taxes Reimbursement 
                    V/C Loss @ X% → Per Unit is calculated by the formula: Total / # of Residential Units`);
            Income._ProFormaActions.verifyResidentialVCLossPerUnit(
                testData.expenseType, testData.numberOfResidentialUnits);
        });
    });