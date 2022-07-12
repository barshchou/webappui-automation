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

    verifyAppraiserForecastGrossByRow(expenseUIName: string, unitRow: number, expectedForecastGross: number): ReimbursementSummaryActions {
        reimbursementSummary.getAppraiserForecastGross(expenseUIName, unitRow).should('have.text', `$${numberWithCommas(expectedForecastGross.toFixed(2))}`);
        return this;
    }

    verifyAppraiserForecastGrossByExpenseType(expenseUIName: string, expectedForecastGross: number, unitsAmount = 1): ReimbursementSummaryActions {
        for (let index = 1; index <= unitsAmount; index++) {
            this.verifyAppraiserForecastGrossByRow(expenseUIName, index, expectedForecastGross);
        }
        return this;
    }

    verifyAnnualReimbursementByRow(expenseUIName: string, unitRow: number, reimbursementType: BoweryReports.ReimbursementType, 
        knownInformation: BoweryReports.KnownInformation, expectedAnnualReimbursement: number): ReimbursementSummaryActions {
        reimbursementSummary.getAnnualReimbursement(expenseUIName, unitRow, reimbursementType, knownInformation)
            .should('have.text', `$${numberWithCommas(expectedAnnualReimbursement.toFixed(2))}`);
        return this;
    }

    verifyAnnualReimbursementByExpenseType(expenseUIName: string, reimbursementType: BoweryReports.ReimbursementType, 
        knownInformation: BoweryReports.KnownInformation, columnsId: BoweryReports.ReimbursementColumnsId, 
        unitsAmount = 1, reimbursementIndex = 0): ReimbursementSummaryActions {
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

    verifyDefaultReimbursementCommentaryByExpenseType(expenseUIName: string, reimbursementIndex = 0): ReimbursementSummaryActions {
        reimbursementSummary.getAnnualReimbursementTotal(expenseUIName).invoke('text').then((total) => {
            reimbursementSummary.getGeneratedCommentaryByExpenseType(expenseUIName, reimbursementIndex)
            .invoke('text').should('deep.equal', `According to our projections, the total utilities reimbursement is ${total} per year.`);
        });
        return this;
    }
}

export default new ReimbursementSummaryActions(reimbursementSummary);
