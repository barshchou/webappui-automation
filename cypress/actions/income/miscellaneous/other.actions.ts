import { numberWithCommas } from './../../../../utils/numbers.utils';
import otherPage from "../../../pages/income/miscellaneous/other.page";
import BaseActionsExt from "../../base/base.actions.ext";

class OtherActions extends BaseActionsExt<typeof otherPage> {

    verifyPageIsOpened() {
        otherPage.pageHeader.should("exist");
        return this;
    }

    addOtherIncome(otherIncomeItem: BoweryReports.OtherIncomeItem): OtherActions {
        this.clickAddOtherIncome()
            .eneterAnnualAmount(otherIncomeItem.annualAmount)
            .selectLossType(otherIncomeItem.vcLossType)
            .addVCPercentAmount(otherIncomeItem.vcPercent)
            .enterIncomeCategory(otherIncomeItem.incomeCategory);
        return this;
    }

    clickAddOtherIncome(): OtherActions {
        otherPage.addOtherincomeButton.click();
        return this;
    }

    eneterAnnualAmount(value: number, index = 0): OtherActions {
        otherPage.otherIncomeAnnualAmount(index).clear().type(`${value}`)
            .should('have.value', numberWithCommas(value.toFixed(2)));
        return this;
    }

    selectLossType(type: string, index = 0): OtherActions {
        otherPage.vcLossTypeDropdown(index).click();
        otherPage.vcLossTypeDropdownValue(type, index).click();
        return this;
    }

    addVCPercentAmount(percent: number, index = 0): OtherActions {
        otherPage.otherIncomeVc(index).clear().type(`${percent}`).should('have.value', percent);
        return this;
    }

    enterIncomeCategory(categoryName: string, index = 0): OtherActions {
        otherPage.incomeCategoryTextField(index).clear().type(categoryName).should('have.value', categoryName);
        return this;
    }

}

export default new OtherActions(otherPage);
