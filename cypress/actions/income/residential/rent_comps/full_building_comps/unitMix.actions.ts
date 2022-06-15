import BaseActionsExt from "../../../../base/base.actions.ext";
import unitMixPage from "../../../../../pages/income/residential/rent_comps/full_building_comps/unitMix.page";
import {
    getValueDecimalCommasInput,
    getValueNotDecimalNotCommasInput
} from "../../../../../../utils/numbers.utils";

class UnitMixActions extends BaseActionsExt<typeof unitMixPage> {

    openNavigationTab(): UnitMixActions {
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
        const valueToBe = getValueNotDecimalNotCommasInput(number);
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

    checkUncheckIncludeToggle(isToCheck = true, index = 0): UnitMixActions {
        isToCheck ? unitMixPage.includeToggles.eq(index).check() : unitMixPage.includeToggles.eq(index).uncheck();
        this.verifyIncludeToggleCheckState(isToCheck, index);
        return this;
    }

    verifyIncludeToggleCheckState(isChecked = false, index = 0): UnitMixActions {
        const assertion = isChecked ? "have.class" : "not.have.class";
        unitMixPage.includeToggles.eq(index).parent().should(assertion, "Mui-checked");
        return this;
    }

    enterBedroomsNumber(number: number | string, row = 0): UnitMixActions {
        unitMixPage.bedroomsNumberInputs.eq(row).clear().type(`${number}`);
        this.verifyBedroomsNumber(number, row);
        return this;
    }

    verifyBedroomsNumber(number: number | string, row = 0): UnitMixActions {
        const valueToBe = getValueNotDecimalNotCommasInput(number);
        unitMixPage.bedroomsNumberInputs.eq(row).should("have.value", valueToBe);
        return this;
    }

    enterRoomsNumber(number: number, row = 0): UnitMixActions {
        unitMixPage.roomsNumberInputs.eq(row).clear().type(`${number}`);
        this.verifyRoomsNumber(number, row);
        return this;
    }

    verifyRoomsNumber(number: number | string, row = 0): UnitMixActions {
        const valueToBe = getValueNotDecimalNotCommasInput(number);
        unitMixPage.roomsNumberInputs.eq(row).should("have.value", valueToBe);
        return this;
    }

    enterSquareFeet(value: number | string, row = 0): UnitMixActions {
        unitMixPage.squareFeetInputs.eq(row).clear().type(`${value}`);
        this.verifySquareFeet(value);
        return this;
    }

    verifySquareFeet(value: number | string, row = 0): UnitMixActions {
        const valueToBe = getValueDecimalCommasInput(value);
        unitMixPage.squareFeetInputs.eq(row).should("have.value", valueToBe);
        return this;
    }

    enterMonthlyRent(value: number | string, row = 0): UnitMixActions {
        unitMixPage.monthlyRentInputs.eq(row).clear().type(`${value}`);
        this.verifyMonthlyRent(value);
        return this;
    }

    verifyMonthlyRent(value: number | string, row = 0): UnitMixActions {
        const valueToBe = getValueDecimalCommasInput(value);
        unitMixPage.monthlyRentInputs.eq(row).should("have.value", valueToBe);
        return this;
    }

    verifyNumberCellValue(valueToBe: number, row = 0): UnitMixActions {
        unitMixPage.numberCells.eq(row).should("have.text", valueToBe);
        return this;
    }

    enterUnitNumber(text: string | number, row = 0): UnitMixActions {
        unitMixPage.unitNumberInputs.eq(row).clear().type(`${text}`);
        this.verifyUnitNumberCell(text, row);
        return this;
    }

    verifyUnitNumberCell(textToBe: string | number, row = 0): UnitMixActions {
        unitMixPage.unitNumberInputs.eq(row).should("have.value", textToBe);
        return this;
    }

}

export default new UnitMixActions(unitMixPage);