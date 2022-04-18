import commercialUnitsPage from "../../pages/property/commercialUnits.page";
import {cutDecimalPartToNumberOfDigits, isHasDecimalPartMoreNumberOfDigits, numberWithCommas} from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

class CommercialUnitsActions extends BaseActionsExt<typeof commercialUnitsPage> {

    clickCommercialUnitTabByIndex(index = 0): this {
        commercialUnitsPage.commercialUnitsTabs.eq(index).click();
        return this;
    }

    clickRadioButtonByValueAndUnitIndex(group: string, value: string, index = 0): this {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value, index).click();
        this.verifyRadioIsChecked(group, value, index);
        if (value === "other"){
            commercialUnitsPage.getOtherFieldByGroup(group, index).should("exist")
                .should("have.attr", "required");
        }
        return this;
    }

    verifyRadioIsChecked(group: string, value: string, index = 0): this {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value, index).parent().should("have.class", "Mui-checked");
        return this;
    }

    enterUnitSFByUnitIndex(squareFeet: number | string, index = 0): this {
        let squareFeetToBe: string | number = squareFeet;
        if (isHasDecimalPartMoreNumberOfDigits(squareFeet)) {
            squareFeetToBe = cutDecimalPartToNumberOfDigits(squareFeet);
        }
        squareFeetToBe = numberWithCommas(squareFeetToBe);
        commercialUnitsPage.commercialUnitsSFInputs.eq(index).clear().type(`${squareFeet}`)
            .should("have.value", squareFeetToBe);
        return this;
    }

    enterListUnitSF(squareFeetList: Array<number | string>, numberOfUnits: number): this {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterUnitSFByUnitIndex(squareFeetList[i], i);
        }
        return this;
    }
}

export default new CommercialUnitsActions(commercialUnitsPage);