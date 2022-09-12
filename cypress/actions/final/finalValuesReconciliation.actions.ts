import finalValuesPage from "../../pages/final/finalValuesReconciliation.page";
import BaseActionsExt from "../base/base.actions.ext";

class FinalValuesReconciliationActions extends BaseActionsExt<typeof finalValuesPage> {

    checkPerUnitCheckbox(): FinalValuesReconciliationActions {
        finalValuesPage.perUnitCheckbox.check().should("have.value", "true");
        return this;
    }

    verifyIncomeStabDate(date: string): FinalValuesReconciliationActions {
        finalValuesPage.incomeStabilizedDate.should("have.text", date);
        return this;
    }

    verifyIncomeCompleteDate(date: string): FinalValuesReconciliationActions {
        finalValuesPage.incomeCompleteDate.should("have.text", date);
        return this;
    }

    verifyIncomeMarketDate(date: string): FinalValuesReconciliationActions {
        finalValuesPage.incomeMarketDate.should("have.text", date);
        return this;
    }

    verifySalesStabilizedDate(date: string): FinalValuesReconciliationActions {
        finalValuesPage.salesStabilizedDate.should("have.text", date);
        return this;
    }

    verifySalesCompleteDate(date: string): FinalValuesReconciliationActions {
        finalValuesPage.salesCompleteDate.should("have.text", date);
        return this;
    }

    verifySalesMarketDate(date: string): FinalValuesReconciliationActions {
        finalValuesPage.salesMarketDate.should("have.text", date);
        return this;
    }

    checkFinalValueApproachRadio(value: string): FinalValuesReconciliationActions {
        finalValuesPage.finalValueApproachRadio.check(value);
        finalValuesPage.getElementToVerifyRadio(value).should("exist");
        return this;
    }

    verifyFinalValueAsStabDate(date: string): FinalValuesReconciliationActions {
        finalValuesPage.finalValueAsStabDate.should("have.text", date);
        return this;
    }

    verifyFinalValueAsCompleteDate(date: string): FinalValuesReconciliationActions {
        finalValuesPage.finalValueAsCompleteDate.should("have.text", date);
        return this;
    }

    verifyFinalValueAsIsDate(date: string): FinalValuesReconciliationActions {
        finalValuesPage.finalValueAsIsDate.should("have.text", date);
        return this;
    }

}

export default new FinalValuesReconciliationActions(finalValuesPage);