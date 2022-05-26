import reimbursementSummary from "../../../pages/income/commercial/reimbursementSummary.page";
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
        reimbursementSummary.expenseTypeSelected.should("have.text", expense);
        return this;
    }

    selectReimbursmentType(type: string): ReimbursementSummaryActions {
        reimbursementSummary.reimbursementTypeRadioButton(type).click();
        return this;
    }

    selectKnownInformationType(type: string): ReimbursementSummaryActions {
        reimbursementSummary.reimbursementKnownInformation(type).click();
        return this;
    }

    enterCommercialReimbursement(expense: string, expenseCellName: string, expenseType: string, knownType: string): ReimbursementSummaryActions {
        this.selectExpenseType(expense, expenseCellName);
        this.selectReimbursmentType(expenseType);
        this.selectKnownInformationType(knownType);
        return this;
    }

    addNewCommercialReimbursement(expense: string, expenseCellName: string, expenseType: string, knownType: string): ReimbursementSummaryActions {
        this.openAddCommercialReimbursementModal();
        this.enterCommercialReimbursement(expense, expenseCellName, expenseType, knownType);
        this.clickSubmitBtn();
        return this;
    }

    fillReimbursementsByRow(value: number, index = 0): ReimbursementSummaryActions {
        reimbursementSummary.getReimbursementByRow(index).click().clear().type(value.toString())
            .should('have.value', `$${value}`);
        return this;
    }

    fillReimbursements(values: number[]): ReimbursementSummaryActions {
        values.forEach((reimbursement, index) => {
            this.fillReimbursementsByRow(reimbursement, index);
        });
        return this;
    }
}

export default new ReimbursementSummaryActions(reimbursementSummary);