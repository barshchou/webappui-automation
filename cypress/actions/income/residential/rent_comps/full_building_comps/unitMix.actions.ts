import BaseActionsExt from "../../../../base/base.actions.ext";
import unitMixPage from "../../../../../pages/income/residential/rent_comps/full_building_comps/unitMix.page";
import {
    cutDecimalPartToNumberOfDigits,
    cutDotFromNumber,
    isHasDecimalPartMoreNumberOfDigits,
    isNumber,
    numberWithCommas
} from "../../../../../../utils/numbers.utils";

class UnitMixActions extends BaseActionsExt<typeof unitMixPage>{

    openPage(): UnitMixActions {
        unitMixPage.navigationTab.click();
        return this;
    }

    enterResidentialUnitsNumber(number: number | string, isWithEnter = true): UnitMixActions {
        unitMixPage.residentialUnitsNumberInput.clear().type(`${number}`);
        if (isWithEnter) unitMixPage.residentialUnitsNumberInput.type("{enter}");
        this.verifyResidentialUnitsNumberInput(number);
        return this;
    }

    verifyResidentialUnitsNumberInput(number: number | string): UnitMixActions {
        const valueToBe = UnitMixActions.getValueNotDecimalNotCommasInput(number);
        unitMixPage.residentialUnitsNumberInput.should("have.value", valueToBe);
        return this;
    }

    verifyUnitNumberInputsQuantity(quantity: number): UnitMixActions {
        unitMixPage.unitNumberInputs.should("have.length", quantity);
        return this;
    }

    clickPlusUnitButton(): UnitMixActions {
        unitMixPage.plusUnitButton.click();
        return this;
    }

    clickMinusUnitButton(): UnitMixActions {
        unitMixPage.minusUnitButton.click();
        return this;
    }

    verifyIncludeToggleDisabled(index = 0): UnitMixActions {
        unitMixPage.includeToggles.eq(index).should("be.disabled");
        return this;
    }

    checkUncheckIncludeToggle(isCheck = true, index = 0): UnitMixActions {
        if (isCheck) {
            unitMixPage.includeToggles.eq(index).check();
            this.verifyIncludeToggleCheckState(true, index);
        } else {
            unitMixPage.includeToggles.eq(index).uncheck();
            this.verifyIncludeToggleCheckState(false, index);
        }
        return this;
    }

    verifyIncludeToggleCheckState(isChecked = false, index = 0): UnitMixActions {
        if (isChecked) {
            unitMixPage.includeToggles.eq(index).parent().should("have.class", "Mui-checked");
        } else {
            unitMixPage.includeToggles.eq(index).parent().should("not.have.class", "Mui-checked");
        }
        return this;
    }

    enterBedroomsNumber(number: number | string, row = 0): UnitMixActions {
        unitMixPage.bedroomsNumberInputs.eq(row).clear().type(`${number}`);
        this.verifyBedroomsNumber(number, row);
        return this;
    }

    verifyBedroomsNumber(number: number | string, row = 0): UnitMixActions {
        const valueToBe = UnitMixActions.getValueNotDecimalNotCommasInput(number);
        unitMixPage.bedroomsNumberInputs.eq(row).should("have.value", valueToBe);
        return this;
    }

    enterRoomsNumber(number: number, row = 0): UnitMixActions {
        unitMixPage.roomsNumberInputs.eq(row).clear().type(`${number}`);
        this.verifyRoomsNumber(number, row);
        return this;
    }

    verifyRoomsNumber(number: number | string, row = 0): UnitMixActions {
        const valueToBe = UnitMixActions.getValueNotDecimalNotCommasInput(number);
        unitMixPage.roomsNumberInputs.eq(row).should("have.value", valueToBe);
        return this;
    }

    private static getValueNotDecimalNotCommasInput(number: number | string): string {
        return isNumber(number) ? Number.isInteger(number) ? `${number}` : `${cutDotFromNumber(<number>number)}` : "";
    }

    private static getValueDecimalCommasInput(number: number | string): string {
        if (isNumber(number)) {
            if (Number.isInteger(number)) {
                return numberWithCommas(number);
            } else {
                if (isHasDecimalPartMoreNumberOfDigits(number)) {
                    return `${numberWithCommas(`${cutDecimalPartToNumberOfDigits(number)}`)}`;
                } else {
                    return numberWithCommas(number);
                }
            }
        } else {
            return "";
        }
    }

    enterSquareFeet(value: number | string, row = 0): UnitMixActions {
        unitMixPage.squareFeetInputs.eq(row).clear().type(`${value}`);
        this.verifySquareFeet(value);
        return this;
    }

    verifySquareFeet(value: number | string, row = 0): UnitMixActions {
        const valueToBe = UnitMixActions.getValueDecimalCommasInput(value);
        unitMixPage.squareFeetInputs.eq(row).should("have.value", valueToBe);
        return this;
    }

    enterMonthlyRent(value: number | string, row = 0): UnitMixActions {
        unitMixPage.monthlyRentInputs.eq(row).clear().type(`${value}`);
        this.verifyMonthlyRent(value);
        return this;
    }

    verifyMonthlyRent(value: number | string, row = 0): UnitMixActions {
        const valueToBe = UnitMixActions.getValueDecimalCommasInput(value);
        unitMixPage.monthlyRentInputs.eq(row).should("have.value", valueToBe);
        return this;
    }

}

export default new UnitMixActions(unitMixPage);