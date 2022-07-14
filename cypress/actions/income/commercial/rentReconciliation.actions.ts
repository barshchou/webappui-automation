import rentReconciliationPage from "../../../pages/income/commercial/rentReconciliation.page";
import BaseActionsExt from "../../base/base.actions.ext";

class RentReconciliationActions extends BaseActionsExt<typeof rentReconciliationPage> {
    addMarketRentConclusion(value: number, index = 0): RentReconciliationActions{
        rentReconciliationPage.getMarketRentConclusion(index)
            .clear()
            .type(`${value}`)
            .should('have.value', `$${value}`);
        return this;
    }

    verifyRentLabel(expectedLabelName: string): RentReconciliationActions {
        rentReconciliationPage.rentTypeLabel.should('have.text', expectedLabelName);
        return this;
    }

    verifyBaseUnitRent(expectedRent: number): RentReconciliationActions {
        rentReconciliationPage.baseUnitRentSfMonth.invoke('text').should('deep.equal', `$${expectedRent.toFixed(2)}`);
        return this;
    }

    verifySubjectUnitRent(expectedRent: number, unit = 0): RentReconciliationActions {
        rentReconciliationPage.subjectUnitRentSfMonth(unit).invoke('text').should('deep.equal', `$${expectedRent.toFixed(2)}`);
        return this;
    }

    verifyCompsRent(expectedRent: number, compIndex = 0): RentReconciliationActions {
        rentReconciliationPage.getCompRent(compIndex).should("have.text", `$${expectedRent.toFixed(2)}`);
        return this;
    }

    verifyCalculationInputValue(expectedLeaseTermsCalcType: string): RentReconciliationActions {
        rentReconciliationPage.calculationDropdown.invoke('attr', 'value').should('have.value', expectedLeaseTermsCalcType);
        return this;
    }

    setLeaseTermsCalculationType(leaseTermsCalcType: string): RentReconciliationActions {
        this.openCalculationDropdown()
            .selectLeaseTermsCalculationOption(leaseTermsCalcType);
        return this;
    }

    openCalculationDropdown(): RentReconciliationActions {
        rentReconciliationPage.calculationDropdown.click();
        return this;
    }

    selectLeaseTermsCalculationOption(leaseTermsCalcType: string): RentReconciliationActions {
        rentReconciliationPage.calculationOption(leaseTermsCalcType).click();
        this.verifyCalculationInputValue(leaseTermsCalcType);
        return this;
    }

    setLeaseTermsAdjustment(adjustment: string, compIndex = 0): RentReconciliationActions {
        let expectedAdjustmentValue = adjustment === "%" ? adjustment : `$${adjustment}`;
        rentReconciliationPage.leaseTermsAdjustments(compIndex).clear().type(adjustment)
            .should('have.value', expectedAdjustmentValue);
        return this;
    }

}
export default new RentReconciliationActions(rentReconciliationPage);