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
        expenseType: BoweryReports.ReimbursementType, knownType: BoweryReports.KnownInformation): ReimbursementSummaryActions {
            this.selectExpenseType(expense, expenseCellName)
                .selectReimbursementType(expenseType)
                .selectKnownInformationType(knownType);
            return this;
    }

    addNewCommercialReimbursement(expense: string, expenseCellName: string, 
        expenseType: BoweryReports.ReimbursementType, knownType: BoweryReports.KnownInformation = enums.KNOWN_INFORMATION.monthly): ReimbursementSummaryActions {
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
