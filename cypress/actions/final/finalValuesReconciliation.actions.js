import BaseActions from "../base/base.actions";
import finalValuesPage from "../../pages/final/finalValuesReconciliation.page";

class FinalValuesReconciliationActions extends BaseActions {

    /**
     *
     * @returns {FinalValuesReconciliationActions}
     */
    checkPerUnitCheckbox() {
        finalValuesPage.perUnitCheckbox.check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {string} date
     * @returns {FinalValuesReconciliationActions}
     */
    verifyIncomeStabDate(date) {
        finalValuesPage.incomeStabilizedDate.should("have.text", date);
        return this;
    }

    /**
     *
     * @param {string} date
     * @returns {FinalValuesReconciliationActions}
     */
    verifyIncomeCompleteDate(date) {
        finalValuesPage.incomeCompleteDate.should("have.text", date);
        return this;
    }

    /**
     *
     * @param {string} date
     * @returns {FinalValuesReconciliationActions}
     */
    verifyIncomeMarketDate(date) {
        finalValuesPage.incomeMarketDate.should("have.text", date);
        return this;
    }

    /**
     *
     * @param {string} date
     * @returns {FinalValuesReconciliationActions}
     */
    verifySalesStabilizedDate(date) {
        finalValuesPage.salesStabilizedDate.should("have.text", date);
        return this;
    }

    /**
     *
     * @param {string} date
     * @returns {FinalValuesReconciliationActions}
     */
    verifySalesCompleteDate(date) {
        finalValuesPage.salesCompleteDate.should("have.text", date);
        return this;
    }

    /**
     *
     * @param {string} date
     * @returns {FinalValuesReconciliationActions}
     */
    verifySalesMarketDate(date) {
        finalValuesPage.salesMarketDate.should("have.text", date);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {FinalValuesReconciliationActions}
     */
    checkFinalValueApproachRadio(value) {
        finalValuesPage.finalValueApproachRadio.check(value);
        finalValuesPage.getElementToVerifyRadio(value).should("exist");
        return this;
    }

    /**
     *
     * @param {string} date
     * @returns {FinalValuesReconciliationActions}
     */
    verifyFinalValueAsStabDate(date) {
        finalValuesPage.finalValueAsStabDate.should("have.text", date);
        return this;
    }

    /**
     *
     * @param {string} date
     * @returns {FinalValuesReconciliationActions}
     */
    verifyFinalValueAsCompleteDate(date) {
        finalValuesPage.finalValueAsCompleteDate.should("have.text", date);
        return this;
    }

    /**
     *
     * @param {string} date
     * @returns {FinalValuesReconciliationActions}
     */
    verifyFinalValueAsIsDate(date) {
        finalValuesPage.finalValueAsIsDate.should("have.text", date);
        return this;
    }

}

export default new FinalValuesReconciliationActions();