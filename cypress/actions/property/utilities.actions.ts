import utilitiesPage from "../../pages/property/utilities.page";
import BaseActionsExt from "../base/base.actions.ext";

class UtilitiesActions extends BaseActionsExt<typeof utilitiesPage> {
    checkHeatingSystem(): UtilitiesActions {
        utilitiesPage.heatingSystemCheckbox.check().should("have.value", "true");
        return this;
    }

    selectHeatingSystemType(typeValue: string, systemNumber = 0): UtilitiesActions {
        utilitiesPage.getHeatingSystemTypeDropdownBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(typeValue).click();
        return this;
    }

    selectHeatingSystemLocation(locationValue: string, systemNumber = 0): UtilitiesActions {
        utilitiesPage.getHeatingSystemLocationDropdownBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(locationValue).click();
        return this;
    }

    addHeatingSystemParameters(heatingSystemData: Readonly<{type: string, 
        location: string, systemNumber: number}>): UtilitiesActions {
        this.selectHeatingSystemType(heatingSystemData.type, heatingSystemData.systemNumber)
            .selectHeatingSystemLocation(heatingSystemData.location, heatingSystemData.systemNumber);
        return this;
    }

    checkCoolingSystem(): UtilitiesActions {
        utilitiesPage.coolingSystemCheckbox.check().should("have.value", "true");
        return this;
    }

    selectCoolingSystemType(typeValue: string, systemNumber = 0): UtilitiesActions {
        utilitiesPage.getCoolingSystemTypeDropdownBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(typeValue).click();
        return this;
    }

    selectCoolingSystemLocation(locationValue: string, systemNumber = 0): UtilitiesActions {
        utilitiesPage.getCoolingSystemLocationDropdownBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(locationValue).click();
        return this;
    }

    addCoolingSystemParameters(coolingData: Readonly<{type: string, 
        location: string, systemNumber: number}>): UtilitiesActions {
        this.selectCoolingSystemType(coolingData.type, coolingData.systemNumber)
            .selectCoolingSystemLocation(coolingData.location, coolingData.systemNumber);
        return this;
    }

    verifyHeatingCoolingCommentary(commentaryToBe: string): UtilitiesActions {
        utilitiesPage.heatingCoolingCommentary.should("contain.text", commentaryToBe);
        return this;
    }

    checkGasMeters(): UtilitiesActions {
        utilitiesPage.gasMetersCheckbox.check().should("have.value", "true");
        return this;
    }

    selectGasMetersType(typeValue: string): UtilitiesActions {
        utilitiesPage.gasMetersTypeDropdown.click();
        utilitiesPage.getDropdownOptionByValue(typeValue).click();
        return this;
    }

    selectGasMetersLocation(locationValue: string): UtilitiesActions {
        utilitiesPage.gasMetersLocationDropdown.click();
        utilitiesPage.getDropdownOptionByValue(locationValue).click();
        return this;
    }

    addGasMetersParameters(gasMetersData: Readonly<{type: string, location: string}>): UtilitiesActions {
        this.selectGasMetersType(gasMetersData.type)
            .selectGasMetersLocation(gasMetersData.location);
        return this;
    }

    verifyGasMetersCommentary(commentaryToBe: string): UtilitiesActions {
        utilitiesPage.gasMetersCommentary.should("contain.text", commentaryToBe);
        return this;
    }

    checkElectricMetersCheckbox(): UtilitiesActions {
        utilitiesPage.electricMetersCheckbox.check().should("have.value", "true");
        return this;
    }

    selectElectricMetersType(typeValue: string): UtilitiesActions {
        utilitiesPage.electricMetersTypeDrop.click();
        utilitiesPage.getDropdownOptionByValue(typeValue).click();
        return this;
    }

    selectElectricMetersLocation(locationValue: string): UtilitiesActions {
        utilitiesPage.electricMetersLocationDrop.click();
        utilitiesPage.getDropdownOptionByValue(locationValue).click();
        return this;
    }

    addElectricMetersParameters(electricMetersData: Readonly<{type: string, location: string}>): UtilitiesActions {
        this.selectElectricMetersType(electricMetersData.type)
            .selectElectricMetersLocation(electricMetersData.location);
        return this;
    }

    verifyElectricMetersCommentary(commentaryToBe: string): UtilitiesActions {
        utilitiesPage.electricMetersCommentary.should("contain.text", commentaryToBe);
        return this;
    }

    checkHotWaterSystemsCheckbox(): UtilitiesActions {
        utilitiesPage.hotWaterSystemsCheckbox.check().should("have.value", "true");
        return this;
    }

    selectHotWaterSystemTypeBySystemNumber(typeValue: string, systemNumber = 0): UtilitiesActions {
        utilitiesPage.getHotWaterSystemTypeDropBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(typeValue).click();
        return this;
    }

    selectHotWaterSystemLocationBySystemNumber(locationValue: string, systemNumber = 0): UtilitiesActions {
        utilitiesPage.getHotWaterSystemLocationDropBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(locationValue).click();
        return this;
    }

    addHotWaterSystemParameters(hotWaterSystemData: Readonly<{type: string, 
        location: string, systemNumber: number}>): UtilitiesActions {
        this.selectHotWaterSystemTypeBySystemNumber(hotWaterSystemData.type, hotWaterSystemData.systemNumber)
            .selectHotWaterSystemLocationBySystemNumber(hotWaterSystemData.location, hotWaterSystemData.systemNumber);
        return this;
    }
    
    verifyHotWaterSystemCommentary(commentaryToBe: string): UtilitiesActions {
        utilitiesPage.hotWaterSystemCommentary.should("contain.text", commentaryToBe);
        return this;
    }
}

export default new UtilitiesActions(utilitiesPage);