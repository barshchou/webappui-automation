import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4501-03.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income, Property } from "../../../../actions";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import Enums from "../../../../enums/enums";

describe("Potential Real Estate Tax Reimbursement", 
    { tags:[ "@income", "@pro_forma" ] }, () => {
    
        before("Login, create report, prepare data with", () => {
            cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.buildingArea)
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

            cy.stepInfo(`4. Go to Income → Reimbursement Summary and add Real Estate Taxes 
                        Reimbursement for commercial units`); 
            _NavigationSection.navigateToCommercialReimbursementSummary();
            Income._CommercialManager.ReimbursementSummary.addNewCommercialReimbursement(
                testData.expenseType, testData.expenseTypeCellName, 
                testData.reimbursementType, testData.knownInformation)
                .fillReimbursements(testData.monthlyReimbursement, testData.columnsId);

            cy.saveLocalStorage();
        });

        beforeEach("Restore local storage", () => {
            cy.restoreLocalStorage();
            _NavigationSection.navigateToSubjectPropertyData();
        });

        testData.basisSquareFootAnalysis.forEach(basis => {
            it(`[QA-4501][QA-4502][QA-4503] with ${basis} set`, () => {
                cy.stepInfo(`Preconditions: Set square foot analysis basis to ${basis} and fill area`);
                if (basis === Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossBuildingArea) {
                    DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.buildingArea);
                } else {
                    DataCollections._SubjectPropertyData.selectBasisSquareFootAnalysis(basis)
                        .fillBasisSquareFootAnalysis(testData.buildingArea);
                }
                cy.stepInfo(`Preconditions: Navigate to ProForma page`);
                _NavigationSection.navigateToProForma()
                    .verifyProgressBarNotExist();
                
                cy.stepInfo(`QA-4501] 4. Verify that Pro Forma table contains Taxes Reimbursement Total value`);
                Income._ProFormaActions.verifyCategoryTotal(
                    `$${numberWithCommas(Math.round(testData.annualReimbursement))}`, 
                    proFormaTypes.potentialRealEstateTaxesReimbursement);

                cy.stepInfo(`QA-4502] 5. Verify that Pro Forma table contains Taxes Reimbursement PSF value`);
                Income._ProFormaActions.verifyCategoryPSFTotal(
                    `$${numberWithCommas(testData.reimbursementPerSf.toFixed(2))}`, 
                    proFormaTypes.potentialRealEstateTaxesReimbursement);

                cy.stepInfo(`[QA-4503] 6. Verify that Pro Forma table contains Taxes Reimbursement Per Unit value`);
                Income._ProFormaActions.verifyCategoryPerUnitTotal(
                    `$${numberWithCommas(Math.round(testData.reimbursementPerUnit))}`, 
                    proFormaTypes.potentialRealEstateTaxesReimbursement);

                cy.stepInfo(`QA-4501] 7. Verify that Total is taken from Income → Potential Gross Income 
                    → table → Potential Real Estate Taxes Reimbursement`);
                _NavigationSection.navigateToPotentialGrossIncome();
                Income._PotentialGrossIncome.verifyIncomeTypeUnified(
                    Enums.INCOME_TYPES_CELL_NAMES.potentialRealEstateTaxesReimbursement, 
                    `$${numberWithCommas(testData.annualReimbursement.toFixed(2))}`);
            });
        });
    });
