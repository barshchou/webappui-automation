import BaseActions from "../base/base.actions";
import finalValuesPage from "../../pages/final/finalValuesReconciliation.page";

class FinalValuesReconciliationActions extends BaseActions {

    checkPerUnitCheckbox() {
        finalValuesPage.perUnitCheckbox.check().should("have.value", "true");
        return this;
    }

    verifyIncomeStabDate(date) {
        finalValuesPage.incomeStabilizedDate.should("have.text", date);
        return this;
    }

    verifyIncomeCompleteDate(date) {
        finalValuesPage.incomeCompleteDate.should("have.text", date);
        return this;
    }

    verifyIncomeMarketDate(date) {
        finalValuesPage.incomeMarketDate.should("have.text", date);
        return this;
    }

    verifySalesStabilizedDate(date) {
        finalValuesPage.salesStabilizedDate.should("have.text", date);
        return this;
    }

    verifySalesCompleteDate(date) {
        finalValuesPage.salesCompleteDate.should("have.text", date);
        return this;
    }

    verifySalesMarketDate(date) {
        finalValuesPage.salesMarketDate.should("have.text", date);
        return this;
    }

    checkFinalValueApproachRadio(value) {
        finalValuesPage.finalValueApproachRadio.check(value);
        finalValuesPage.getElementToVerifyRadio(value).should("exist");
        return this;
    }

    verifyFinalValueAsStabDate(date) {
        finalValuesPage.finalValueAsStabDate.should("have.text", date);
        return this;
    }

    verifyFinalValueAsCompleteDate(date) {
        finalValuesPage.finalValueAsCompleteDate.should("have.text", date);
        return this;
    }

    verifyFinalValueAsIsDate(date) {
        finalValuesPage.finalValueAsIsDate.should("have.text", date);
        return this;
    }

    closeSatisfactionSurvey() {
        finalValuesPage.satisfactionSurveyCloseButton.click();
        return this;
    }

}

export default new FinalValuesReconciliationActions();