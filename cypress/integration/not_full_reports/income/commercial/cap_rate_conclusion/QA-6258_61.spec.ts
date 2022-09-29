import { _NavigationSection } from '../../../../../actions/base';
import testData from 
    "../../../../../fixtures/not_full_reports/income/commercial/cap_rate_conclusion/QA-6258_61.fixture";
import { DataCollections, Income, Property } from "../../../../../actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";

// ToDo: Test fails due to problem with rounding: https://bowery.atlassian.net/browse/QA-6954
describe("Validation of Market Values Amount and Per SF for AS STABILIZED reports", 
    { tags:[ "@income", "@commercial", "@cap_rate_conclusion", "@QA-6954", "@bug", "@WEB-7050" ] }, () => {
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
        });

        it("[QA-6258][QA-6261]", () => {
            cy.stepInfo(`5. Set Cap Rate value`);
            _NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.capRate);

            cy.stepInfo(`6. Make Sure Prospective Market Value As Stabilized (Amount) = NOI / Concluded Cap Rate`);
            Income._CapRateConclusion.verifyAsStabilizedAmountCell(testData.valueConclusionAsStabilized);

            cy.stepInfo(`7.Make Sure Prospective Market Value As Stabilized (Final Value) is Prospective Market Value 
                        As Stabilized (Amount) rounded according to “Round to nearest” value`);
            Income._CapRateConclusion.verifyFinalValueCalculated(testData.valueConclusionAsStabilized);

            cy.stepInfo(`8. Add New Residential Rent Loss on As Stabilized tab and 
                        New Commercial Rent Loss on As Stabilized tab`);
            Income._CapRateConclusion.addNewRentLoss(testData.residentialUnitType, testData.residentialUnits, 
                testData.conclusionValueAsStabilized);
            Income._CapRateConclusion.addNewRentLoss(testData.commercialUnitType, testData.commercialUnits, 
                testData.conclusionValueAsStabilized);
                
            cy.stepInfo(`9. Fill in with valid numeric values:
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

            cy.stepInfo(`10. Make sure Prospective Market Value As Is (Amount) =  
                        Prospective Market Value As Stabilized (Amount) - Less Residential Rent Loss - 
                        Less Commercial Rent Loss - Less Undetermined Commercial Rent Loss - 
                        Less Commission Fee - Less Entrepreneurial Profit*`);
            Income._CapRateConclusion
                .verifyProspectiveMarketValueAsIsAsCompleteCalculated(testData.valueConclusionKeyAsStabilized, 
                    testData.valueConclusionAsIs);

            cy.stepInfo(`11. Make sure As Is Market Value (Final Value) = As Is Market Value (Amount) 
                        rounded according to “Round to nearest” value`);
            Income._CapRateConclusion.verifyFinalValueCalculated(testData.valueConclusionAsIs);
        
            cy.stepInfo(`12. Verify if As Is Market Value Per SF is calculated with correct formula 
                        based on selected Basis for Square Foot Analysis`);
            Income._CapRateConclusion.verifyMarketValuePerSFCalculated(testData.squareFootAnalysisArea, 
                testData.valueConclusionAsIs);
        });
    });