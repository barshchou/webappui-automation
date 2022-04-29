import laundryPage from "../../../pages/income/miscellaneous/laundry.page";
import {numberWithCommas} from "../../../../utils/numbers.utils";
import BaseActionsExt from "../../base/base.actions.ext";

class LaundryActions extends BaseActionsExt<typeof laundryPage>{

    verifyNoLaundryButtonExists() {
        laundryPage.noLaundryButton.should("exist");
        return this;
    }

    enterLaundryIncome(income: string | number): LaundryActions {
        const valueToBe = typeof income === "string" ? income : numberWithCommas(income);
        laundryPage.laundryIncomeInput.clear().type(`${income}`).should("have.value", valueToBe);
        return this;
    }

    checkLaundryVCLossRadio(value) {
        laundryPage.laundryVCLossRadio.check(value).should("be.checked");
        return this;
    }

    enterLaundryVCLossPercentage(percentage: number): LaundryActions {
        laundryPage.laundryVCLossPercentage.clear().type(percentage).should("have.value", percentage);
        if (percentage > 100) {
            cy.contains("Max value is 100").should("exist");
        }
        return this;
    }
}

export default new LaundryActions(laundryPage);
