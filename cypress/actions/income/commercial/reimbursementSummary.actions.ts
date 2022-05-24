import reimbursementSummary from "../../../pages/income/commercial/reimbursementSummary";
import BaseActionsExt from "../../base/base.actions.ext";

class ReimbursementSummaryActions extends BaseActionsExt<typeof reimbursementSummary> {

    addCommercialReimbursement(): ReimbursementSummaryActions {
        reimbursementSummary.addReimbursementButton.click();
        reimbursementSummary.reimbursementModal.should('be.visible');
        return this;
    }

    verifyAddReimbursementModal(): ReimbursementSummaryActions {
        reimbursementSummary.reimbursementModal.should('be.visible');
        return this;
    }

    selectExpenseType(expense: string): ReimbursementSummaryActions {
        reimbursementSummary.addReimbursementButton.click();
        reimbursementSummary.getDropdownOptionByValue(expense).click();
        reimbursementSummary.expenseTypeSelected.should("have.text", expense);
        return this;
    }

    selectReimbursmentType(type: string): ReimbursementSummaryActions {
        reimbursementSummary.reimbursementTypeRadioButton.check(type);
        return this;
    }

    selectKnownInformationType(type: string): ReimbursementSummaryActions {
        reimbursementSummary.knownInformation.check(type);
        return this;
    }

    enterCommercialReimbursement(expense: string, expenseType: string, knownType: string): ReimbursementSummaryActions {
        this.selectExpenseType(expense);
        this.selectReimbursmentType(expenseType);
        this.selectKnownInformationType(knownType);
        return this;
    }

    addNewCommercialReimbursement(expense: string, expenseType: string, knownType: string): ReimbursementSummaryActions {
        this.addCommercialReimbursement();
        this.enterCommercialReimbursement(expense, expenseType, knownType);
        this.clickSubmitBtn();
        return this;
    }
}

export default new ReimbursementSummaryActions(reimbursementSummary);