import laundryPage from "../../../pages/income/miscellaneous/laundry.page";
import { numberWithCommas } from "../../../../utils/numbers.utils";
import BaseActionsExt from "../../base/base.actions.ext";
import { BoweryReports } from "../../../types";

class LaundryActions extends BaseActionsExt<typeof laundryPage>{


    verifyThatPageIsOpened(): this {
        laundryPage.laundryheaderSection.should("be.visible");
        cy.url().then(url => {
            let urlObj = new URL(url);
            cy.log("Check whether current URL ends with '/laundry-income'");
            cy.wrap(urlObj.pathname.endsWith("/laundry-income")).should("be.true");
        });
        return this;
    }

    verifyNoLaundryButtonExists(): LaundryActions {
        laundryPage.noLaundryButton.should("exist");
        return this;
    }

    enterLaundryIncome(income: number): LaundryActions {
        const valueToBe = typeof income === "string" ? income : numberWithCommas(income);
        laundryPage.laundryIncomeInput.clear().type(income.toString()).should("have.value", valueToBe);
        return this;
    }

    checkLaundryVCLossRadio(value: string): LaundryActions {
        laundryPage.laundryVCLossRadio.check(value).should("be.checked");
        return this;
    }

    enterLaundryVCLossPercentage(percentage: number, type: BoweryReports.LaundryVcLossType): LaundryActions {
        this.checkLaundryVCLossRadio(type);
        laundryPage.laundryVCLossPercentage.clear().type(percentage.toString()).should("have.value", percentage);
        if (percentage > 100) {
            cy.contains("Max value is 100").should("exist");
        }
        return this;
    }
}

export default new LaundryActions(laundryPage);
