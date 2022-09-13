import testData from "../../../../fixtures/not_full_reports/final/final_values_reconciliation/QA-6275.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from '../../../../actions/base';
import { Income, Property, Sales, Final, ReviewExport } from "../../../../actions";
import { _saveDataInFile } from "../../../../support/commands";
import { pathSpecData } from "../../../../../utils/fixtures.utils";
import valueConclusionKeys from "../../../../utils/mapKeys/sales/valueConclusion.keys";

describe(`Sales Comparison Approach is exported correctly to Final Value Conclusion table`,
    { tags:[ "@final", "@final_values_reconciliation" ] }, () => {
        it("[QA-6275]", () => {
            cy.stepInfo(`1. Create report`);
            createReport(testData.reportCreationData);

            cy.stepInfo(`2. Set square foot analysis and value for it; 
                        set commercial and residential units; 
                        set commercial units SF`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.selectBasisSquareFootAnalysis(testData.basisForSquareFootAnalysis)
                .fillBasisSquareFootAnalysis(testData.squareFootAnalysisArea)
                .enterNumberOfCommercialUnits(testData.commercialUnits)
                .enterNumberOfResUnits(testData.residentialUnits);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterListUnitSF(testData.commercialUnitsSF, testData.commercialUnits);

            cy.stepInfo(`3. Set Gut Renovation budget`);
            _NavigationSection.navigateToRenovation();
            Property._Renovations.chooseRenovationByValue(testData.gutRenovation)
                .clickTotalButton()
                .fillTotalTable(testData.renovationPeriod, testData.renovationTotal);

            cy.stepInfo(`4. Fill commercial units with valid values`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            testData.commercialMonthlyRent.forEach((commercialUnitRent, index) => {
                Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus, index)
                    .enterRentPerSFAnnuallyByRowNumber(commercialUnitRent, index);
            });

            cy.stepInfo(`5. Fill residential units with valid values`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            testData.residentialMonthlyRent.forEach((residentialUnitRent, index) => {
                Income._Residential.InPlaceRentRoll.enterLeaseStatusByRowNumber(testData.leaseStatus, index)
                    .enterMonthlyRentByRowNumber(residentialUnitRent, index);
            });

            cy.stepInfo(`6. Navigate to Sales -> Value Conclusion page and set Concluded value per SF`);
            _NavigationSection.navigateToSalesValueConclusion();
            Sales._ValueConclusion.clickIncomeDeductionCheckbox(false)
                .enterSaleValueConclusion(testData.concludedValuePerSf);

            cy.stepInfo(`7. Add New Residential Rent Loss on As Stabilized tab and 
                        New Commercial Rent Loss on As Stabilized tab`);
            Income._CapRateConclusion.addNewRentLoss(testData.residentialUnitType, testData.residentialUnits, 
                testData.conclusionValueAsComplete, testData.valueConclusionAsStabilized);
            Income._CapRateConclusion.addNewRentLoss(testData.commercialUnitType, testData.commercialUnits, 
                testData.conclusionValueAsComplete, testData.valueConclusionAsStabilized);
                
            cy.stepInfo(`8. Fill in with valid numeric values:
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

            cy.stepInfo(`9. Add New Residential Rent Loss on As Complete tab and New Commercial 
                    Rent Loss on As Complete tab `);
            Income._CapRateConclusion.addNewRentLoss(testData.residentialUnitType, testData.residentialUnits, 
                testData.conclusionValueAsComplete, testData.valueConclusionAsComplete);
            Income._CapRateConclusion.addNewRentLoss(testData.commercialUnitType, testData.commercialUnits, 
                testData.conclusionValueAsComplete, testData.valueConclusionAsComplete);
        
            cy.stepInfo(`10. Fill in with valid numeric values:
                        - Less Residential Rent Loss
                        - Less Commercial Rent Loss
                        - Less Undetermined Commercial Rent Loss
                        - Renovation Budget ( on Property>Renovations page)
                        - Less Buyout Cost
                        - Less Entrepreneurial Profit*`);
            Income._CapRateConclusion.enterLossTimePeriodByRow(testData.rentLossTimePeriod, 
                testData.valueConclusionKeyAsComplete, testData.rentLossTypeResidential)
                .enterLossTimePeriodByRow(testData.rentLossTimePeriod, 
                    testData.valueConclusionKeyAsComplete, testData.rentLossTypeCommercial)
                .enterLossTimePeriodByRow(testData.rentLossTimePeriod, 
                    testData.valueConclusionKeyAsComplete, testData.rentLossTypeUndetermined)
                .enterLessEntrepreneurialProfit(testData.entrepreneurialProfit, testData.valueConclusionKeyAsComplete)
                .enterAsCompleteLessBuyoutCost(testData.lessBuyoutCost);

            cy.stepInfo(`11. Save 'Final Market Value' for further checks`);
            Sales._ValueConclusion.setMarketValueFinal(testData.valueConclusionAsComplete)
                .setMarketValueFinal(testData.valueConclusionAsStabilized)
                .setMarketValueFinal(testData.valueConclusionAsIs);
            
            cy.stepInfo(`12. Save Market values into file for export test`);
            cy._mapGet(valueConclusionKeys.asCompleteFinalAmount).then(valueConclusionAsComplete => {
                cy._mapGet(valueConclusionKeys.asStabilizedFinalAmount).then(valueConclusionAsStabilized => {
                    cy._mapGet(valueConclusionKeys.asIsMarketFinalAmount).then(valueConclusionAsIs => {
                        let values = [];
                        values.push(valueConclusionAsComplete, valueConclusionAsStabilized, valueConclusionAsIs);

                        _saveDataInFile(values, `${Cypress.spec.name}.txt`);
                    });
                });
            });

            cy.stepInfo(`13. Navigate to Final -> Final Values Reconciliation. Check 'Sales' value approach.`);
            _NavigationSection.navigateToFinalValuesReconciliation();
            Final._FinalValuesReconciliation.checkPerSfCheckbox()
                .checkFinalValueApproachRadio(testData.finalValueApproachSales);

            cy.stepInfo("14. Export the report");
            _NavigationSection.Actions.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("Check export", () => {
            cy.task("getFilePath",
                { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" }
            ).then(file => {
                cy.log(<string>file);
                cy.visit(<string>file);

                cy.stepInfo(`15. In exported report go to Summary of Salient Facts > Final Value Conclusion table`);
                cy.readFile(`${pathSpecData()}${Cypress.spec.name}.txt`).then(text => { 
                    cy.log(`As Is Market Value ${JSON.parse(text)[2]}`);
                    cy.log(`As Stabilized ${JSON.parse(text)[1]}`);
                    cy.log(`As Complete ${JSON.parse(text)[1]}`);

                    testData.valueConclusions.forEach((valueConclusion, index) => {
                        cy.xpath(`//h3[.='Value Conclusion']/following-sibling::p[.='Final Value Conclusion'][1]`)
                            .next().within(() => {
                                cy.contains(`${valueConclusion}`)
                                    .parent('td')
                                    .parent('tr')
                                    .within(() => {
                                        cy.get('td').last().should('have.text', `${JSON.parse(text)[index]}`);
                                    });
                            });
                    });
                });
            });
        });
    });