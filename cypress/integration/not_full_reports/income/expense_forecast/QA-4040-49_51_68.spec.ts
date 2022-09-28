import { DataCollections } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4040-49_51_68.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe.skip(`Verify that Generated Commentary are updated on the Expense Forecast page`,
    { tags: [ "@income", "@expense_forecast" ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            Cypress.config('numTestsKeptInMemory', 0);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.residentialUnits)
                .clickSaveButton()
                .verifyProgressBarNotExist();
            cy.saveLocalStorage();
        });
        beforeEach(() => {
            cy.restoreLocalStorage();
        });

        it("[QA-4042] Verify the generated commentary and inputs for Water And Sewer", () => {
            cy.stepInfo(`[QA-4042] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();
            cy.stepInfo(`[QA-4042] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastWaterAndSewer)
                .verifyForecastCommentary(testData.commentariesWaterAndSewer.generatedPerSF, 
                    testData.expenseForecastWaterAndSewer)
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastWaterAndSewer)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastWaterAndSewer);
            cy.stepInfo(`[QA-4042] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalExpenseForecastCommentary(testData.expenseForecastWaterAndSewer);
            testData.expenseForecastWaterAndSewer.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastWaterAndSewer);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastWaterAndSewer)
                .verifyForecastCommentary(testData.commentariesWaterAndSewer.generatedPerUnit, 
                    testData.expenseForecastWaterAndSewer)
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastWaterAndSewer)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastWaterAndSewer);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4040] Verify the generated commentary and inputs for Insurance", () => {
            cy.stepInfo(`[QA-4040] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4040] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastInsurance)
                .verifyForecastCommentary(testData.commentariesInsurance.generatedPerSF, 
                    testData.expenseForecastInsurance)
                .verifyProgressBarNotExist()
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastInsurance)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastInsurance);

            cy.stepInfo(`[QA-4040] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions.revertToOriginalExpenseForecastCommentary(testData.expenseForecastInsurance);
            testData.expenseForecastInsurance.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastInsurance);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastInsurance)
                .verifyForecastCommentary(testData.commentariesInsurance.generatedPerUnit, 
                    testData.expenseForecastInsurance)
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastInsurance)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastInsurance);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4041] Verify the generated commentary and inputs for Electricity", () => {
            cy.stepInfo(`[QA-4041] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4041] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastElectricity)
                .verifyForecastCommentary(testData.commentariesElectricity.generatedPerSF, 
                    testData.expenseForecastElectricity)
                .verifyProgressBarNotExist()
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastElectricity)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastElectricity);

            cy.stepInfo(`[QA-4041] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalExpenseForecastCommentary(testData.expenseForecastElectricity);
            testData.expenseForecastElectricity.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastElectricity);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastElectricity)
                .verifyForecastCommentary(testData.commentariesElectricity.generatedPerUnit, 
                    testData.expenseForecastElectricity)
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastElectricity)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastElectricity);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4043] Verify the generated commentary and inputs for PayRoll & Benefits", () => {
            cy.stepInfo(`[QA-4043] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4043] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastPayrollAndBenefits)
                .verifyForecastCommentary(testData.commentariesPayrollAndBenefits.generatedPerSF, 
                    testData.expenseForecastPayrollAndBenefits)
                .verifyProgressBarNotExist()
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastPayrollAndBenefits)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastPayrollAndBenefits);

            cy.stepInfo(`[QA-4043] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions.revertToOriginalExpenseForecastCommentary(
                testData.expenseForecastPayrollAndBenefits);
            testData.expenseForecastPayrollAndBenefits.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastPayrollAndBenefits)
                .enterForecastItemForecast(testData.expenseForecastPayrollAndBenefits)
                .verifyForecastCommentary(testData.commentariesPayrollAndBenefits.generatedPerUnit, 
                    testData.expenseForecastPayrollAndBenefits)
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastPayrollAndBenefits)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastPayrollAndBenefits);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4044] Verify the generated commentary and inputs for General & Administrative", () => {
            cy.stepInfo(`[QA-4044] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4044] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastGeneralAndAdministrative)
                .verifyForecastCommentary(testData.commentariesGeneralAndAdministrative.generatedPerSF, 
                    testData.expenseForecastGeneralAndAdministrative)
                .verifyProgressBarNotExist()
                .editExpenseForecastCommentary(testData.editedCommentary, 
                    testData.expenseForecastGeneralAndAdministrative)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastGeneralAndAdministrative);

            cy.stepInfo(`[QA-4044] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalExpenseForecastCommentary(testData.expenseForecastGeneralAndAdministrative);
            testData.expenseForecastGeneralAndAdministrative.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastGeneralAndAdministrative);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastGeneralAndAdministrative)
                .verifyForecastCommentary(testData.commentariesGeneralAndAdministrative.generatedPerUnit, 
                    testData.expenseForecastGeneralAndAdministrative)
                .verifyProgressBarNotExist()
                .editExpenseForecastCommentary(testData.editedCommentary, 
                    testData.expenseForecastGeneralAndAdministrative)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastGeneralAndAdministrative);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4045] Verify the generated commentary and inputs for Miscellaneous", () => {
            cy.stepInfo(`[QA-4045] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4045] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastMiscellaneous)
                .verifyForecastCommentary(testData.commentariesMiscellaneous.generatedPerSF, 
                    testData.expenseForecastMiscellaneous)
                .verifyProgressBarNotExist()
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastMiscellaneous)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastMiscellaneous);

            cy.stepInfo(`[QA-4045] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalExpenseForecastCommentary(testData.expenseForecastMiscellaneous);
            testData.expenseForecastMiscellaneous.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastMiscellaneous);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastMiscellaneous)
                .verifyForecastCommentary(testData.commentariesMiscellaneous.generatedPerUnit, 
                    testData.expenseForecastMiscellaneous)
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastMiscellaneous)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastMiscellaneous);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4047] [QA-4068] Verify the generated commentary and inputs for Fuel", () => {
            cy.stepInfo(`[QA-4047] [QA-4068] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4047] [QA-4068] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastFuel)
                .verifyForecastCommentary(testData.commentariesFuel.generatedPerSF, testData.expenseForecastFuel)
                .verifyProgressBarNotExist()
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastFuel)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastFuel)
                .verifyForecastCommentary(testData.commentariesFuel.generatedElectricityAndFuelPerSf, 
                    testData.expenseForecastFuel, 2)
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastFuel, false, 2)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastFuel, 2);

            cy.stepInfo(`[QA-4047] [QA-4068] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions.revertToOriginalExpenseForecastCommentary(testData.expenseForecastFuel);
            cy.wait(2500);
            Income._ExpenseForecastActions.revertToOriginalExpenseForecastCommentary(testData.expenseForecastFuel, 2);
            testData.expenseForecastFuel.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastFuel);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastFuel)
                .verifyForecastCommentary(testData.commentariesFuel.generatedPerUnit, testData.expenseForecastFuel)
                .verifyProgressBarNotExist()
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastFuel)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastFuel)
                .verifyForecastCommentary(testData.commentariesFuel.generatedElectricityAndFuelPerUnit, 
                    testData.expenseForecastFuel, 2)
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastFuel, false, 2)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastFuel, 2);
        
            cy.stepInfo(`[QA-4047] [QA-4068] => 4. Revert commentary value, switch to room basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions.revertToOriginalExpenseForecastCommentary(testData.expenseForecastFuel);
            cy.wait(2500);
            Income._ExpenseForecastActions.revertToOriginalExpenseForecastCommentary(testData.expenseForecastFuel, 2);
            testData.expenseForecastFuel.basis = "room";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastFuel);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastFuel)
                .verifyForecastCommentary(testData.commentariesFuel.generatedPerRoom, testData.expenseForecastFuel)
                .verifyProgressBarNotExist()
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastFuel)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastFuel)
                .verifyForecastCommentary(testData.commentariesFuel.generatedElectricityAndFuelPerRoom, 
                    testData.expenseForecastFuel, 2)
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastFuel, false, 2)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastFuel, 2);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4048] Verify the generated commentary and inputs for Legal & Professional fees", () => {
            cy.stepInfo(`[QA-4048] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4048] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastLegalAndProfessional)
                .verifyForecastCommentary(testData.commentariesLegalAndProfessional.generatedPerSF, 
                    testData.expenseForecastLegalAndProfessional)
                .verifyProgressBarNotExist()
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastLegalAndProfessional)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastLegalAndProfessional);

            cy.stepInfo(`[QA-4048] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalExpenseForecastCommentary(testData.expenseForecastLegalAndProfessional);
            testData.expenseForecastLegalAndProfessional.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastLegalAndProfessional);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastLegalAndProfessional)
                .verifyForecastCommentary(testData.commentariesLegalAndProfessional.generatedPerUnit, 
                    testData.expenseForecastLegalAndProfessional)
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastLegalAndProfessional)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastLegalAndProfessional);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4049] Verify the generated commentary and inputs for Management & Fees", () => {
            cy.stepInfo(`[QA-4049] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();
            cy.stepInfo(`[QA-4049] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastManagement)
                .verifyForecastCommentary(testData.commentariesManagement.generatedPerSF, 
                    testData.expenseForecastManagement)
                .verifyProgressBarNotExist()
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastManagement)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastManagement);
            cy.stepInfo(`[QA-4049] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalExpenseForecastCommentary(testData.expenseForecastManagement);
            testData.expenseForecastManagement.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastManagement);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastManagement)
                .verifyForecastCommentary(testData.commentariesManagement.generatedPerUnit, 
                    testData.expenseForecastManagement)
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastManagement)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastManagement);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4051] Verify the generated commentary and inputs for Repairs & Maintenance", () => {
            cy.stepInfo(`[QA-4051] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4051] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastRepairAndMaintenance)
                .verifyForecastCommentary(testData.commentariesRepairAndMaintenance.generatedPerSF, 
                    testData.expenseForecastRepairAndMaintenance)
                .verifyProgressBarNotExist()
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastRepairAndMaintenance)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastRepairAndMaintenance);

            cy.stepInfo(`[QA-4051] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalExpenseForecastCommentary(testData.expenseForecastRepairAndMaintenance);
            testData.expenseForecastRepairAndMaintenance.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastRepairAndMaintenance);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastRepairAndMaintenance)
                .verifyForecastCommentary(testData.commentariesRepairAndMaintenance.generatedPerUnit, 
                    testData.expenseForecastRepairAndMaintenance)
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastRepairAndMaintenance)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastRepairAndMaintenance);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4046] Verify the generated commentary and inputs for Replacement & Reserve", () => {
            cy.stepInfo(`[QA-4046] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4046] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastReplacementReserve)
                .verifyForecastCommentary(testData.commentariesReplacementReserve.generatedPerSF, 
                    testData.expenseForecastReplacementReserve)
                .verifyProgressBarNotExist()
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastReplacementReserve)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastReplacementReserve);

            cy.stepInfo(`[QA-4046] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalExpenseForecastCommentary(testData.expenseForecastReplacementReserve);
            testData.expenseForecastReplacementReserve.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastReplacementReserve);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastReplacementReserve)
                .verifyForecastCommentary(testData.commentariesReplacementReserve.generatedPerUnit, 
                    testData.expenseForecastReplacementReserve)
                .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastReplacementReserve)
                .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastReplacementReserve);
        });
    });