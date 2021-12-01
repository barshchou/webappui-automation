import BaseActions from "../base/base.actions";
import utilitiesPage from "../../pages/property/utilities.page";

class UtilitiesActions extends BaseActions{
    checkHeatingSystem() {
        utilitiesPage.heatingSystemCheckbox.check().should("have.value", "true");
    }

    selectHeatingSystemType(typeValue, systemNumber = 0) {
        utilitiesPage.getHeatingSystemTypeDropdownBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(typeValue).click();
    }

    selectHeatingSystemLocation(locationValue, systemNumber = 0) {
        utilitiesPage.getHeatingSystemLocationDropdownBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(locationValue).click();
    }

    addHeatingSystemParameters(typeValue, locationValue, systemNumber = 0) {
        this.selectHeatingSystemType(typeValue, systemNumber);
        this.selectHeatingSystemLocation(locationValue, systemNumber);
    }

    checkCoolingSystem() {
        utilitiesPage.coolingSystemCheckbox.check().should("have.value", "true");
    }

    selectCoolingSystemType(typeValue, systemNumber = 0) {
        utilitiesPage.getCoolingSystemTypeDropdownBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(typeValue).click();
    }

    selectCoolingSystemLocation(locationValue, systemNumber = 0) {
        utilitiesPage.getCoolingSystemLocationDropdownBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(locationValue).click();
    }

    addCoolingSystemParameters(typeValue, locationValue, systemNumber = 0) {
        this.selectCoolingSystemType(typeValue, systemNumber);
        this.selectCoolingSystemLocation(locationValue, systemNumber);
    }

    verifyHeatingCoolingCommentary(commentaryToBe) {
        utilitiesPage.heatingCoolingCommentary.should("contain.text", commentaryToBe);
    }

    checkGasMeters() {
        utilitiesPage.gasMetersCheckbox.check().should("have.value", "true");
    }

    selectGasMetersType(typeValue) {
        utilitiesPage.gasMetersTypeDropdown.click();
        utilitiesPage.getDropdownOptionByValue(typeValue).click();
    }

    selectGasMetersLocation(locationValue) {
        utilitiesPage.gasMetersLocationDropdown.click();
        utilitiesPage.getDropdownOptionByValue(locationValue).click();
    }

    addGasMetersParameters(typeValue, locationValue) {
        this.selectGasMetersType(typeValue);
        this.selectGasMetersLocation(locationValue);
    }

    verifyGasMetersCommentary(commentaryToBe) {
        utilitiesPage.gasMetersCommentary.should("contain.text", commentaryToBe);
    }

    checkElectricMetersCheckbox() {
        utilitiesPage.electricMetersCheckbox.check().should("have.value", "true");
    }

    selectElectricMetersType(typeValue) {
        utilitiesPage.electricMetersTypeDrop.click();
        utilitiesPage.getDropdownOptionByValue(typeValue).click();
    }

    selectElectricMetersLocation(locationValue) {
        utilitiesPage.electricMetersLocationDrop.click();
        utilitiesPage.getDropdownOptionByValue(locationValue).click();
    }

    addElectricMetersParameters(typeValue, locationValue) {
        this.selectElectricMetersType(typeValue);
        this.selectElectricMetersLocation(locationValue);
    }

    verifyElectricMetersCommentary(commentaryToBe) {
        utilitiesPage.electricMetersCommentary.should("contain.text", commentaryToBe);
    }

    checkHotWaterSystemsCheckbox() {
        utilitiesPage.hotWaterSystemsCheckbox.check().should("have.value", "true");
    }

    selectHotWaterSystemTypeBySystemNumber(typeValue, systemNumber = 0) {
        utilitiesPage.getHotWaterSystemTypeDropBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(typeValue).click();
    }

    selectHotWaterSystemLocationBySystemNumber(locationValue, systemNumber = 0) {
        utilitiesPage.getHotWaterSystemLocationDropBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(locationValue).click();
    }

    addHotWaterSystemParameters(typeValue, locationValue, systemNumber = 0) {
        this.selectHotWaterSystemTypeBySystemNumber(typeValue, systemNumber);
        this.selectHotWaterSystemLocationBySystemNumber(locationValue, systemNumber);
    }

    verifyHotWaterSystemCommentary(commentaryToBe) {
        utilitiesPage.hotWaterSystemCommentary.should("contain.text", commentaryToBe);
    }
}

export default new UtilitiesActions();