import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-6245.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { DataCollections, Income, Property, Sales } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";

describe(`Prospective Market Value As Complete is calculated with correct formula`,
    { tags:[ "@sales", "@value_conclusion" ] }, () => {

        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Create report`);
            createReport(testData.reportCreationData);

            cy.stepInfo(`2. Set square foot analysis and value for it; 
                        set commercial and residential units; 
                        set commercial units SF`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.selectBasisSquareFootAnalysis(testData.basisForSquareFootAnalysis)
                .fillBasisSquareFootAnalysis(testData.squareFootAnalysisArea)
                .enterNumberOfCommercialUnits(testData.commercialUnits)
                .enterNumberOfResUnits(testData.residentialUnits);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterListUnitSF(testData.commercialUnitsSF, testData.commercialUnits);

            cy.stepInfo(`3. Fill commercial units with valid values`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            testData.commercialMonthlyRent.forEach((commercialUnitRent, index) => {
                Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus, index)
                    .enterRentPerSFAnnuallyByRowNumber(commercialUnitRent, index);
            });

            cy.stepInfo(`4. Fill residential units with valid values`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            testData.residentialMonthlyRent.forEach((residentialUnitRent, index) => {
                Income._Residential.InPlaceRentRoll.enterLeaseStatusByRowNumber(testData.leaseStatus, index)
                    .enterMonthlyRentByRowNumber(residentialUnitRent, index);
            });

            cy.stepInfo(`5. Set Cap Rate value`);
            _NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.capRate)
                .setRoundingFactorValueAlias();

            cy.stepInfo(`6. Add New Residential Rent Loss on As Stabilized tab and 
                        New Commercial Rent Loss on As Stabilized tab`);
            Income._CapRateConclusion.addNewRentLoss(testData.residentialUnitType, testData.residentialUnits, 
                testData.conclusionValueAsStabilized);
            Income._CapRateConclusion.addNewRentLoss(testData.commercialUnitType, testData.commercialUnits, 
                testData.conclusionValueAsStabilized);
                
            cy.stepInfo(`7. Fill in with valid numeric values:
                        - Less Residential Rent Loss
                        - Less Commercial Rent Loss
                        - Less Undetermined Commercial Rent Loss
                        - Less Commission Fee
                        - Less Entrepreneurial Profit`);
            Income._CapRateConclusion.enterAsStabilizedCommissionFeeAmount(testData.lessCommissionFee)
                .enterLessEntrepreneurialProfit(testData.entrepreneurialProfit, testData.valueConclusionKeyAsStabilized)
                .enterLossTimePeriodByRow(testData.rentLossTimePeriod, 
                    testData.valueConclusionKeyAsStabilized, testData.rentLossTypeResidential)
                .enterLossTimePeriodByRow(testData.rentLossTimePeriod, 
                    testData.valueConclusionKeyAsStabilized, testData.rentLossTypeCommercial)
                .enterLossTimePeriodByRow(testData.rentLossTimePeriod, 
                    testData.valueConclusionKeyAsStabilized, testData.rentLossTypeUndetermined);
        });

        it("[QA-6245][QA-6251]", () => {
            cy.stepInfo(`8. As Is Market Value (for As Is, As Stabilized report)-->Should be calculated with formula
                        As Is Market Value (Amount) = Prospective Market Value As Stabilized (Amount) - 
                        Less Residential Rent Loss - Less Commercial Rent Loss - 
                        Less Undetermined Commercial Rent Loss - Less Commission Fee - Less Entrepreneurial Profit*`);
            _NavigationSection.navigateToSalesValueConclusion();
            Sales._ValueConclusion.enterSaleValueConclusion(testData.concludedValuePerSf)
                .verifyProspectiveMarketValueAsIsAsCompleteCalculated(testData.valueConclusionKeyAsStabilized, 
                    testData.valueConclusionAsIs);
            
            cy.stepInfo(`9. Verify that As Is Market Value (Final Value) rounded correctly according to selection 
                        in “Round to nearest” on Income>Cap Rate Conclusion page`);
            Sales._ValueConclusion.verifyFinalValueCalculated(testData.valueConclusionAsIs);

            /*
             * Please refer to 6242, 6248 tests for other parts of QA-6251 test
             */
            cy.stepInfo(`[QA-6251] 10. Verify Sales Value in Header is displayed based on selected Basis for 
                        Square Foot Analysis and pulled from Sales > Value Conclusion page`);
            Sales._ValueConclusion.clickSaveButton().verifyProgressBarNotExist();
            Sales._ValueConclusion.verifyHeaderSalesValue(testData.valueConclusionAsStabilized);
        });
    });