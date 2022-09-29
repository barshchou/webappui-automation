import { DataCollections } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4040-49_51_68.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";
import Enums from "../../../../enums/enums";

describe(`Verify that Generated Commentary are updated on the Expense Forecast page`,
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
                .verifyFormCommentTextBoxText(testData.expenseForecastWaterAndSewer.discussionName,
                    testData.commentariesWaterAndSewer.generatedPerSF)
                .clearFormCommentTextBox(testData.expenseForecastWaterAndSewer.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastWaterAndSewer.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastWaterAndSewer.discussionName,
                    testData.editedCommentary);
            cy.stepInfo(`[QA-4042] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalCommentarySectionByName(testData.expenseForecastWaterAndSewer.discussionName);
            testData.expenseForecastWaterAndSewer.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastWaterAndSewer)
                .enterForecastItemForecast(testData.expenseForecastWaterAndSewer)
                .verifyFormCommentTextBoxText(testData.expenseForecastWaterAndSewer.discussionName,
                    testData.commentariesWaterAndSewer.generatedPerUnit)
                .clearFormCommentTextBox(testData.expenseForecastWaterAndSewer.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastWaterAndSewer.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastWaterAndSewer.discussionName,
                    testData.editedCommentary);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4040] Verify the generated commentary and inputs for Insurance", () => {
            cy.stepInfo(`[QA-4040] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4040] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastInsurance)
                .verifyFormCommentTextBoxText(testData.expenseForecastInsurance.discussionName,
                    testData.commentariesInsurance.generatedPerSF)
                .verifyProgressBarNotExist()
                .clearFormCommentTextBox(testData.expenseForecastInsurance.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastInsurance.discussionName, testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastInsurance.discussionName,
                    testData.editedCommentary);

            cy.stepInfo(`[QA-4040] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalCommentarySectionByName(testData.expenseForecastInsurance.discussionName);
            testData.expenseForecastInsurance.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastInsurance)
                .enterForecastItemForecast(testData.expenseForecastInsurance)
                .verifyFormCommentTextBoxText(testData.expenseForecastInsurance.discussionName,
                    testData.commentariesInsurance.generatedPerUnit)
                .clearFormCommentTextBox(testData.expenseForecastInsurance.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastInsurance.discussionName, testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastInsurance.discussionName,
                    testData.editedCommentary);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4041] Verify the generated commentary and inputs for Electricity", () => {
            cy.stepInfo(`[QA-4041] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4041] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastElectricity)
                .verifyFormCommentTextBoxText(testData.expenseForecastElectricity.discussionName,
                    testData.commentariesElectricity.generatedPerSF)
                .verifyProgressBarNotExist()
                .clearFormCommentTextBox(testData.expenseForecastElectricity.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastElectricity.discussionName, testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastElectricity.discussionName,
                    testData.editedCommentary);

            cy.stepInfo(`[QA-4041] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalCommentarySectionByName(testData.expenseForecastElectricity.discussionName);
            testData.expenseForecastElectricity.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastElectricity)
                .enterForecastItemForecast(testData.expenseForecastElectricity)
                .verifyFormCommentTextBoxText(testData.expenseForecastElectricity.discussionName,
                    testData.commentariesElectricity.generatedPerUnit)
                .clearFormCommentTextBox(testData.expenseForecastElectricity.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastElectricity.discussionName, testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastElectricity.discussionName,
                    testData.editedCommentary);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4043] Verify the generated commentary and inputs for PayRoll & Benefits", () => {
            cy.stepInfo(`[QA-4043] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4043] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastPayrollAndBenefits)
                .verifyFormCommentTextBoxText(testData.expenseForecastPayrollAndBenefits.discussionName,
                    testData.commentariesPayrollAndBenefits.generatedPerSF)
                .verifyProgressBarNotExist()
                .clearFormCommentTextBox(testData.expenseForecastPayrollAndBenefits.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastPayrollAndBenefits.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastPayrollAndBenefits.discussionName,
                    testData.editedCommentary);

            cy.stepInfo(`[QA-4043] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalCommentarySectionByName(testData.expenseForecastPayrollAndBenefits.discussionName);
            testData.expenseForecastPayrollAndBenefits.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastPayrollAndBenefits)
                .enterForecastItemForecast(testData.expenseForecastPayrollAndBenefits)
                .verifyFormCommentTextBoxText(testData.expenseForecastPayrollAndBenefits.discussionName,
                    testData.commentariesPayrollAndBenefits.generatedPerUnit)
                .clearFormCommentTextBox(testData.expenseForecastPayrollAndBenefits.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastPayrollAndBenefits.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastPayrollAndBenefits.discussionName,
                    testData.editedCommentary);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4044] Verify the generated commentary and inputs for General & Administrative", () => {
            cy.stepInfo(`[QA-4044] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4044] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastGeneralAndAdministrative)
                .verifyFormCommentTextBoxText(testData.expenseForecastGeneralAndAdministrative.discussionName,
                    testData.commentariesGeneralAndAdministrative.generatedPerSF)
                .verifyProgressBarNotExist()
                .clearFormCommentTextBox(testData.expenseForecastGeneralAndAdministrative.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastGeneralAndAdministrative.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastGeneralAndAdministrative.discussionName,
                    testData.editedCommentary);

            cy.stepInfo(`[QA-4044] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalCommentarySectionByName(
                    testData.expenseForecastGeneralAndAdministrative.discussionName);
            testData.expenseForecastGeneralAndAdministrative.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastGeneralAndAdministrative)
                .enterForecastItemForecast(testData.expenseForecastGeneralAndAdministrative)
                .verifyFormCommentTextBoxText(testData.expenseForecastGeneralAndAdministrative.discussionName,
                    testData.commentariesGeneralAndAdministrative.generatedPerUnit)
                .verifyProgressBarNotExist()
                .clearFormCommentTextBox(testData.expenseForecastMiscellaneous.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastGeneralAndAdministrative.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastGeneralAndAdministrative.discussionName,
                    testData.editedCommentary);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4045] Verify the generated commentary and inputs for Miscellaneous", () => {
            cy.stepInfo(`[QA-4045] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4045] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastMiscellaneous)
                .verifyFormCommentTextBoxText(testData.expenseForecastMiscellaneous.discussionName,
                    testData.commentariesMiscellaneous.generatedPerSF)
                .verifyProgressBarNotExist()
                .clearFormCommentTextBox(testData.expenseForecastMiscellaneous.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastMiscellaneous.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastMiscellaneous.discussionName,
                    testData.editedCommentary);

            cy.stepInfo(`[QA-4045] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalCommentarySectionByName(testData.expenseForecastMiscellaneous.discussionName);
            testData.expenseForecastMiscellaneous.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastMiscellaneous)
                .enterForecastItemForecast(testData.expenseForecastMiscellaneous)
                .verifyFormCommentTextBoxText(testData.expenseForecastMiscellaneous.discussionName,
                    testData.commentariesMiscellaneous.generatedPerUnit)
                .clearFormCommentTextBox(testData.expenseForecastMiscellaneous.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastMiscellaneous.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastMiscellaneous.discussionName,
                    testData.editedCommentary);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4047] [QA-4068] Verify the generated commentary and inputs for Fuel", () => {
            cy.stepInfo(`[QA-4047] [QA-4068] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4047] [QA-4068] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastFuel)
                .verifyFormCommentTextBoxText(testData.expenseForecastFuel.discussionName,
                    testData.commentariesFuel.generatedPerSF)
                .verifyProgressBarNotExist()
                .clearFormCommentTextBox(testData.expenseForecastFuel.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastFuel.discussionName, testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastFuel.discussionName, testData.editedCommentary)
                .verifyFormCommentTextBoxText(Enums.EXPENSE_DISCUSSION_NAMES.electricityAndFuel,
                    testData.commentariesFuel.generatedElectricityAndFuelPerSf)
                .clearFormCommentTextBox(Enums.EXPENSE_DISCUSSION_NAMES.electricityAndFuel)
                .enterFormCommentTextBox(Enums.EXPENSE_DISCUSSION_NAMES.electricityAndFuel, testData.editedCommentary)
                .verifyFormCommentTextBoxText(Enums.EXPENSE_DISCUSSION_NAMES.electricityAndFuel,
                    testData.editedCommentary);

            cy.stepInfo(`[QA-4047] [QA-4068] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalCommentarySectionByName(testData.expenseForecastFuel.discussionName);
            cy.wait(2500);
            Income._ExpenseForecastActions
                .revertToOriginalCommentarySectionByName(Enums.EXPENSE_DISCUSSION_NAMES.electricityAndFuel);
            testData.expenseForecastFuel.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastFuel)
                .enterForecastItemForecast(testData.expenseForecastFuel)
                .verifyFormCommentTextBoxText(testData.expenseForecastFuel.discussionName,
                    testData.commentariesFuel.generatedPerUnit)
                .verifyProgressBarNotExist()
                .clearFormCommentTextBox(testData.expenseForecastFuel.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastFuel.discussionName, testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastFuel.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(Enums.EXPENSE_DISCUSSION_NAMES.electricityAndFuel,
                    testData.commentariesFuel.generatedElectricityAndFuelPerUnit)
                .clearFormCommentTextBox(Enums.EXPENSE_DISCUSSION_NAMES.electricityAndFuel)
                .enterFormCommentTextBox(Enums.EXPENSE_DISCUSSION_NAMES.electricityAndFuel, testData.editedCommentary)
                .verifyFormCommentTextBoxText(Enums.EXPENSE_DISCUSSION_NAMES.electricityAndFuel,
                    testData.editedCommentary);
        
            cy.stepInfo(`[QA-4047] [QA-4068] => 4. Revert commentary value, switch to room basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalCommentarySectionByName(testData.expenseForecastFuel.discussionName);
            cy.wait(2500);
            Income._ExpenseForecastActions
                .revertToOriginalCommentarySectionByName(Enums.EXPENSE_DISCUSSION_NAMES.electricityAndFuel);
            testData.expenseForecastFuel.basis = "room";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastFuel)
                .enterForecastItemForecast(testData.expenseForecastFuel)
                .verifyFormCommentTextBoxText(testData.expenseForecastFuel.discussionName,
                    testData.commentariesFuel.generatedPerRoom)
                .verifyProgressBarNotExist()
                .clearFormCommentTextBox(testData.expenseForecastFuel.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastFuel.discussionName, testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastFuel.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(Enums.EXPENSE_DISCUSSION_NAMES.electricityAndFuel,
                    testData.commentariesFuel.generatedElectricityAndFuelPerRoom)
                .clearFormCommentTextBox(Enums.EXPENSE_DISCUSSION_NAMES.electricityAndFuel)
                .enterFormCommentTextBox(Enums.EXPENSE_DISCUSSION_NAMES.electricityAndFuel, testData.editedCommentary)
                .verifyFormCommentTextBoxText(Enums.EXPENSE_DISCUSSION_NAMES.electricityAndFuel,
                    testData.editedCommentary);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4048] Verify the generated commentary and inputs for Legal & Professional fees", () => {
            cy.stepInfo(`[QA-4048] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4048] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastLegalAndProfessional)
                .verifyFormCommentTextBoxText(testData.expenseForecastLegalAndProfessional.discussionName,
                    testData.commentariesLegalAndProfessional.generatedPerSF)
                .verifyProgressBarNotExist()
                .clearFormCommentTextBox(testData.expenseForecastLegalAndProfessional.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastLegalAndProfessional.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastLegalAndProfessional.discussionName,
                    testData.editedCommentary);

            cy.stepInfo(`[QA-4048] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalCommentarySectionByName(testData.expenseForecastLegalAndProfessional.discussionName);
            testData.expenseForecastLegalAndProfessional.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastLegalAndProfessional)
                .enterForecastItemForecast(testData.expenseForecastLegalAndProfessional)
                .verifyFormCommentTextBoxText(testData.expenseForecastLegalAndProfessional.discussionName,
                    testData.commentariesLegalAndProfessional.generatedPerUnit)
                .clearFormCommentTextBox(testData.expenseForecastLegalAndProfessional.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastLegalAndProfessional.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastLegalAndProfessional.discussionName,
                    testData.editedCommentary);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4049] Verify the generated commentary and inputs for Management & Fees", () => {
            cy.stepInfo(`[QA-4049] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();
            cy.stepInfo(`[QA-4049] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastManagement)
                .verifyFormCommentTextBoxText(testData.expenseForecastManagement.discussionName,
                    testData.commentariesManagement.generatedPerSF)
                .verifyProgressBarNotExist()
                .clearFormCommentTextBox(testData.expenseForecastManagement.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastManagement.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastManagement.discussionName,
                    testData.editedCommentary);

            cy.stepInfo(`[QA-4049] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalCommentarySectionByName(testData.expenseForecastManagement.discussionName);
            testData.expenseForecastManagement.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastManagement)
                .enterForecastItemForecast(testData.expenseForecastManagement)
                .verifyFormCommentTextBoxText(testData.expenseForecastManagement.discussionName,
                    testData.commentariesManagement.generatedPerUnit)
                .clearFormCommentTextBox(testData.expenseForecastManagement.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastManagement.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastManagement.discussionName,
                    testData.editedCommentary);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4051] Verify the generated commentary and inputs for Repairs & Maintenance", () => {
            cy.stepInfo(`[QA-4051] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4051] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastRepairAndMaintenance)
                .verifyFormCommentTextBoxText(testData.expenseForecastRepairAndMaintenance.discussionName,
                    testData.commentariesRepairAndMaintenance.generatedPerSF)
                .verifyProgressBarNotExist()
                .clearFormCommentTextBox(testData.expenseForecastRepairAndMaintenance.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastRepairAndMaintenance.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastRepairAndMaintenance.discussionName,
                    testData.editedCommentary);

            cy.stepInfo(`[QA-4051] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalCommentarySectionByName(testData.expenseForecastRepairAndMaintenance.discussionName);
            testData.expenseForecastRepairAndMaintenance.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastRepairAndMaintenance)
                .enterForecastItemForecast(testData.expenseForecastRepairAndMaintenance)
                .verifyFormCommentTextBoxText(testData.expenseForecastRepairAndMaintenance.discussionName,
                    testData.commentariesRepairAndMaintenance.generatedPerUnit)
                .clearFormCommentTextBox(testData.expenseForecastRepairAndMaintenance.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastRepairAndMaintenance.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastRepairAndMaintenance.discussionName,
                    testData.editedCommentary);
            Income._ExpenseForecastActions.clickSaveButton()
                .verifyProgressBarNotExist();
        });

        it("[QA-4046] Verify the generated commentary and inputs for Replacement & Reserve", () => {
            cy.stepInfo(`[QA-4046] => 1. Go to Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`[QA-4046] => 2. Fill Forecast value for SF basis and verify commentary`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastReplacementReserve)
                .verifyFormCommentTextBoxText(testData.expenseForecastReplacementReserve.discussionName,
                    testData.commentariesReplacementReserve.generatedPerSF)
                .verifyProgressBarNotExist()
                .clearFormCommentTextBox(testData.expenseForecastReplacementReserve.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastReplacementReserve.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastReplacementReserve.discussionName,
                    testData.editedCommentary);

            cy.stepInfo(`[QA-4046] => 3. Revert commentary value, switch to unit basis 
            and fill Forecast value and verify commentary`);
            Income._ExpenseForecastActions
                .revertToOriginalCommentarySectionByName(testData.expenseForecastReplacementReserve.discussionName);
            testData.expenseForecastReplacementReserve.basis = "unit";
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastReplacementReserve)
                .enterForecastItemForecast(testData.expenseForecastReplacementReserve)
                .verifyFormCommentTextBoxText(testData.expenseForecastReplacementReserve.discussionName,
                    testData.commentariesReplacementReserve.generatedPerUnit)
                .clearFormCommentTextBox(testData.expenseForecastReplacementReserve.discussionName)
                .enterFormCommentTextBox(testData.expenseForecastReplacementReserve.discussionName,
                    testData.editedCommentary)
                .verifyFormCommentTextBoxText(testData.expenseForecastReplacementReserve.discussionName,
                    testData.editedCommentary);
        });
    });