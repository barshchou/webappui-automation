import { numberWithCommas, getNumberFromDollarNumberWithCommas } from './../../../../utils/numbers.utils';
import enums from "../../../enums/enums";
import reimbursementSummary from "../../../pages/income/commercial/reimbursementSummary.page";
import { BoweryReports } from "../../../types/boweryReports.type";
import BaseActionsExt from "../../base/base.actions.ext";

class ReimbursementSummaryActions extends BaseActionsExt<typeof reimbursementSummary> {

    openAddCommercialReimbursementModal(): ReimbursementSummaryActions {
        reimbursementSummary.addReimbursementButton.click();
        reimbursementSummary.reimbursementModal.should('be.visible');
        return this;
    }

    verifyAddReimbursementModal(): ReimbursementSummaryActions {
        reimbursementSummary.reimbursementModal.should('be.visible');
        return this;
    }

    selectExpenseType(expense: string, expenseCellName: string): ReimbursementSummaryActions {
        reimbursementSummary.expenseTypeDropdown.click();
        reimbursementSummary.getDropdownOptionByValue(expenseCellName).click();
        reimbursementSummary.expenseTypeSelected.should("contain.text", `${expense}`);
        return this;
    }

    selectReimbursementType(type: string): ReimbursementSummaryActions {
        reimbursementSummary.reimbursementTypeRadioButton(type).click();
        return this;
    }

    selectKnownInformationType(type: string): ReimbursementSummaryActions {
        reimbursementSummary.reimbursementKnownInformation(type).click();
        return this;
    }

    enterCommercialReimbursement(expense: string, expenseCellName: string, 
        reimbursementType: BoweryReports.ReimbursementType, knownType: BoweryReports.KnownInformation, 
        addKnownInformation = true): ReimbursementSummaryActions {
            this.selectExpenseType(expense, expenseCellName)
                .selectReimbursementType(reimbursementType);
            if (reimbursementType != 'percentOfAppraiserForecast' && addKnownInformation){
                this.selectKnownInformationType(knownType);
            }
            return this;
    }

    addNewCommercialReimbursement(expense: string, expenseCellName: string, 
        expenseType: BoweryReports.ReimbursementType, knownType: BoweryReports.KnownInformation, 
        addKnownInformation = true): ReimbursementSummaryActions {
            this.openAddCommercialReimbursementModal()
                .enterCommercialReimbursement(expense, expenseCellName, expenseType, knownType, addKnownInformation)
                .clickSubmitBtn();
            return this;
    }

    fillReimbursementsByRow(value: number, index = 0, columnsId: BoweryReports.ReimbursementColumnsId = enums.REIMBURSEMENT_COLUMN_ID.monthly, reimbursementIndex = 0): ReimbursementSummaryActions {
        let expectedValue = columnsId != enums.REIMBURSEMENT_COLUMN_ID.percentOfAppraiserForecast ? `$${value}` : `${value}`;
        reimbursementSummary.getReimbursementByRow(index, columnsId, reimbursementIndex).click().clear().type(`${value}`)
            .should('have.value', expectedValue);
        return this;
    }

    fillReimbursements(values: number[], columnsId: BoweryReports.ReimbursementColumnsId = enums.REIMBURSEMENT_COLUMN_ID.monthly, reimbursementIndex = 0): ReimbursementSummaryActions {
        values.forEach((value, index) => {
            this.fillReimbursementsByRow(value, index, columnsId, reimbursementIndex);
        });
        return this;
    }

    fillVCLossByRow(value: number, index = 0): ReimbursementSummaryActions {
        reimbursementSummary
            .getVCLossInputByRow(index)
            .click().clear()
            .type(`${value}`)
            .should('have.value', value);
        return this;
    }

    /**
     * Verifies Appraiser Forecast Gross value taken for particular commercial unit row from UI against calculated value
     * @param  {string} expenseUIName Expense UI name e.g. "Water & Sewer"
     * @param  {number} unitRow Commercial unit row
     * @param  {number} expectedForecastGross Expected Forecast Gross value in reimbursement table
     */
    verifyAppraiserForecastGrossByRow(expenseUIName: string, unitRow: number, expectedForecastGross: number): ReimbursementSummaryActions {
        reimbursementSummary.getAppraiserForecastGross(expenseUIName, unitRow).should('have.text', `$${numberWithCommas(expectedForecastGross.toFixed(2))}`);
        return this;
    }

    /**
     * Verifies each Appraiser Forecast Gross value taken for expense type from UI against calculated value
     * @param  {string} expenseUIName Expense UI name e.g. "Water & Sewer"
     * @param  {number} expectedForecastGross Expected Forecast Gross value in reimbursement table
     * @param  {number} unitsAmount Commercial units amount to verify = reimbursement rows in table. Default: 1
     */
    verifyAppraiserForecastGrossByExpenseType(expenseUIName: string, expectedForecastGross: number, unitsAmount = 1): ReimbursementSummaryActions {
        for (let index = 1; index <= unitsAmount; index++) {
            this.verifyAppraiserForecastGrossByRow(expenseUIName, index, expectedForecastGross);
        }
        return this;
    }

    /**
     * Verifies Annual Reimbursement for provided commercial unit in table
     * @param  {string} expenseUIName Expense UI name e.g. "Water & Sewer"
     * @param  {number} unitRow Commercial unit row
     * @param  {BoweryReports.ReimbursementType} reimbursementType Based on Reimbursement type table will change, either adds or removes
     * columns -> Need for computation proper table column id value.
     * @param  {BoweryReports.KnownInformation} knownInformation Part of the inputs locator
     * @param  {number} expectedAnnualReimbursement Calculated value to validate against UI
     * @returns number
     */
    verifyAnnualReimbursementByRow(expenseUIName: string, unitRow: number, reimbursementType: BoweryReports.ReimbursementType, 
        knownInformation: BoweryReports.KnownInformation, expectedAnnualReimbursement: number): ReimbursementSummaryActions {
        reimbursementSummary.getAnnualReimbursement(expenseUIName, unitRow, reimbursementType, knownInformation)
            .should('have.text', `$${numberWithCommas(expectedAnnualReimbursement.toFixed(2))}`);
        return this;
    }
    
    /**
     * Verify each annual reimbursement for each unit in added reimbursement.
     * 1. Gets Forecast Gross value
     * 2. Get percent of total
     * 3. Calculate Annual reimbursement by formula: [Gross * percent / 100]
     * @param  {string} expenseUIName Expense UI name e.g. "Water & Sewer"
     * @param  {BoweryReports.ReimbursementType} reimbursementType Based on Reimbursement type table will change, either adds or removes
     * columns -> Need for computation proper table column id value.
     * @param  {BoweryReports.KnownInformation} knownInformation Part of the inputs locator 
     * @param  {BoweryReports.ReimbursementColumnsId} columnsId Part of the inputs locator 
     * @param  {} unitsAmount Commercial units amount to verify = reimbursement rows in table
     * @param  {} reimbursementIndex Index of added reimbursement 
     */
    verifyAnnualReimbursementByExpenseType(expenseUIName: string, reimbursementType: BoweryReports.ReimbursementType, 
        knownInformation: BoweryReports.KnownInformation, columnsId: BoweryReports.ReimbursementColumnsId, unitsAmount = 1, reimbursementIndex = 0): ReimbursementSummaryActions {
        for (let row = 1; row <= unitsAmount; row++) {
            let expectedAnnualReimbursement: number;
            reimbursementSummary.getAppraiserForecastGross(expenseUIName, row).invoke('text').then(gross => {
                let grossValue = getNumberFromDollarNumberWithCommas(gross);
                reimbursementSummary.getReimbursementByRow(row - 1, columnsId, reimbursementIndex).invoke('attr', 'value').then(percentOfTotal => {
                    expectedAnnualReimbursement = Number(Math.round(grossValue * (Number(percentOfTotal))) / 100);
                    this.verifyAnnualReimbursementByRow(expenseUIName, row, reimbursementType, knownInformation, expectedAnnualReimbursement);
                });
            });
        }
        return this;
    }
}

export default new ReimbursementSummaryActions(reimbursementSummary);
