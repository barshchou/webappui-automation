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
        reimbursementSummary.expenseTypeSelected.should("contain.text", `${expense}`);
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
        this.selectExpenseType(expense, expenseCellName)
            .selectReimbursmentType(expenseType)
            .selectKnownInformationType(knownType);
        return this;
    }

    addNewCommercialReimbursement(expense: string, expenseCellName: string, expenseType: string, knownType: string): ReimbursementSummaryActions {
        this.openAddCommercialReimbursementModal()
            .enterCommercialReimbursement(expense, expenseCellName, expenseType, knownType)
            .clickSubmitBtn();
        return this;
    }

    fillReimbursementsByRow(value: number, index = 0, knownInformation = "monthly"): ReimbursementSummaryActions {
        reimbursementSummary.getReimbursementByRow(index, knownInformation).click().clear().type(`${value}`)
            .should('have.value', `$${value}`);
        return this;
    }

    fillReimbursements(values: number[]): ReimbursementSummaryActions {
        values.forEach((reimbursement, index) => {
            this.fillReimbursementsByRow(reimbursement, index);
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
}

export default new ReimbursementSummaryActions(reimbursementSummary);
