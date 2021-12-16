import BaseActions from "../base/base.actions";
import utilitiesPage from "../../pages/property/utilities.page";

class UtilitiesActions extends BaseActions{

    /**
     *
     * @returns {UtilitiesActions}
     */
    checkHeatingSystem() {
        utilitiesPage.heatingSystemCheckbox.check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {string} typeValue
     * @param {number} systemNumber
     * @returns {UtilitiesActions}
     */
    selectHeatingSystemType(typeValue, systemNumber = 0) {
        utilitiesPage.getHeatingSystemTypeDropdownBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(typeValue).click();
        return this;
    }

    /**
     *
     * @param {string} locationValue
     * @param {number} systemNumber
     * @returns {UtilitiesActions}
     */
    selectHeatingSystemLocation(locationValue, systemNumber = 0) {
        utilitiesPage.getHeatingSystemLocationDropdownBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(locationValue).click();
        return this;
    }

    /**
     * @param {Readonly<{type: string, location: string, systemNumber: number}>} heatingSystemData
     * @returns {UtilitiesActions}
     */
    addHeatingSystemParameters(heatingSystemData) {
        this.selectHeatingSystemType(heatingSystemData.type, heatingSystemData.systemNumber)
            .selectHeatingSystemLocation(heatingSystemData.location, heatingSystemData.systemNumber);
        return this;
    }

    /**
     *
     * @returns {UtilitiesActions}
     */
    checkCoolingSystem() {
        utilitiesPage.coolingSystemCheckbox.check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {string} typeValue
     * @param {number} systemNumber
     * @returns {UtilitiesActions}
     */
    selectCoolingSystemType(typeValue, systemNumber = 0) {
        utilitiesPage.getCoolingSystemTypeDropdownBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(typeValue).click();
        return this;
    }

    /**
     *
     * @param {string} locationValue
     * @param {number} systemNumber
     * @returns {UtilitiesActions}
     */
    selectCoolingSystemLocation(locationValue, systemNumber = 0) {
        utilitiesPage.getCoolingSystemLocationDropdownBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(locationValue).click();
        return this;
    }

    /**
     *
     * @param {Readonly<{type: string, location: string, systemNumber: number}>} coolingData
     * @returns {UtilitiesActions}
     */
    addCoolingSystemParameters(coolingData) {
        this.selectCoolingSystemType(coolingData.type, coolingData.systemNumber)
            .selectCoolingSystemLocation(coolingData.location, coolingData.systemNumber);
        return this;
    }

    /**
     *
     * @param {string} commentaryToBe
     * @returns {UtilitiesActions}
     */
    verifyHeatingCoolingCommentary(commentaryToBe) {
        utilitiesPage.heatingCoolingCommentary.should("contain.text", commentaryToBe);
        return this;
    }

    /**
     *
     * @returns {UtilitiesActions}
     */
    checkGasMeters() {
        utilitiesPage.gasMetersCheckbox.check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {string} typeValue
     * @returns {UtilitiesActions}
     */
    selectGasMetersType(typeValue) {
        utilitiesPage.gasMetersTypeDropdown.click();
        utilitiesPage.getDropdownOptionByValue(typeValue).click();
        return this;
    }

    /**
     *
     * @param {string} locationValue
     * @returns {UtilitiesActions}
     */
    selectGasMetersLocation(locationValue) {
        utilitiesPage.gasMetersLocationDropdown.click();
        utilitiesPage.getDropdownOptionByValue(locationValue).click();
        return this;
    }

    /**
     *
     * @param {Readonly<{type: string, location: string}>} gasMetersData
     * @returns {UtilitiesActions}
     */
    addGasMetersParameters(gasMetersData) {
        this.selectGasMetersType(gasMetersData.type)
            .selectGasMetersLocation(gasMetersData.location);
        return this;
    }

    /**
     *
     * @param {string} commentaryToBe
     * @returns {UtilitiesActions}
     */
    verifyGasMetersCommentary(commentaryToBe) {
        utilitiesPage.gasMetersCommentary.should("contain.text", commentaryToBe);
        return this;
    }

    /**
     *
     * @returns {UtilitiesActions}
     */
    checkElectricMetersCheckbox() {
        utilitiesPage.electricMetersCheckbox.check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {string} typeValue
     * @returns {UtilitiesActions}
     */
    selectElectricMetersType(typeValue) {
        utilitiesPage.electricMetersTypeDrop.click();
        utilitiesPage.getDropdownOptionByValue(typeValue).click();
        return this;
    }

    /**
     *
     * @param {string} locationValue
     * @returns {UtilitiesActions}
     */
    selectElectricMetersLocation(locationValue) {
        utilitiesPage.electricMetersLocationDrop.click();
        utilitiesPage.getDropdownOptionByValue(locationValue).click();
        return this;
    }

    /**
     *
     * @param {Readonly<{type: string, location: string}>} electricMetersData
     * @returns {UtilitiesActions}
     */
    addElectricMetersParameters(electricMetersData) {
        this.selectElectricMetersType(electricMetersData.type)
            .selectElectricMetersLocation(electricMetersData.location);
        return this;
    }

    /**
     *
     * @param {string} commentaryToBe
     * @returns {UtilitiesActions}
     */
    verifyElectricMetersCommentary(commentaryToBe) {
        utilitiesPage.electricMetersCommentary.should("contain.text", commentaryToBe);
        return this;
    }

    /**
     *
     * @returns {UtilitiesActions}
     */
    checkHotWaterSystemsCheckbox() {
        utilitiesPage.hotWaterSystemsCheckbox.check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {string} typeValue
     * @param {number} systemNumber
     * @returns {UtilitiesActions}
     */
    selectHotWaterSystemTypeBySystemNumber(typeValue, systemNumber = 0) {
        utilitiesPage.getHotWaterSystemTypeDropBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(typeValue).click();
        return this;
    }

    /**
     *
     * @param {string} locationValue
     * @param {number} systemNumber
     * @returns {UtilitiesActions}
     */
    selectHotWaterSystemLocationBySystemNumber(locationValue, systemNumber = 0) {
        utilitiesPage.getHotWaterSystemLocationDropBySystemNumber(systemNumber).click();
        utilitiesPage.getDropdownOptionByValue(locationValue).click();
        return this;
    }


    /**
     *
     * @param {Readonly<{type: string, location: string, systemNumber: number}>} hotWaterSystemData
     * @returns {UtilitiesActions}
     */
    addHotWaterSystemParameters(hotWaterSystemData) {
        this.selectHotWaterSystemTypeBySystemNumber(hotWaterSystemData.type, hotWaterSystemData.systemNumber)
            .selectHotWaterSystemLocationBySystemNumber(hotWaterSystemData.location, hotWaterSystemData.systemNumber);
        return this;
    }

    /**
     *
     * @param {string} commentaryToBe
     * @returns {UtilitiesActions}
     */
    verifyHotWaterSystemCommentary(commentaryToBe) {
        utilitiesPage.hotWaterSystemCommentary.should("contain.text", commentaryToBe);
        return this;
    }
}

export default new UtilitiesActions();