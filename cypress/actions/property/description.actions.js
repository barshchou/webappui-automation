import BaseActions from "../base/base.actions";
import descriptionPage from "../../pages/property/description.page";

class DescriptionActions extends BaseActions {

    /**
     *
     * @param {string} conditionValue
     * @returns {DescriptionActions}
     */
    selectGeneralPropertyCondition(conditionValue) {
        descriptionPage.selectGeneralConditionButton.click();
        descriptionPage.getDropdownOptionByValue(conditionValue).should("exist").click();
        descriptionPage.selectGeneralConditionButton.should("have.text", conditionValue);
        return this;
    }

    /**
     *
     * @param {string} conditionValue
     * @returns {DescriptionActions}
     */
    selectAsStabilizedPropertyCondition(conditionValue) {
        descriptionPage.selectAsStabilizedConditionButton.click();
        descriptionPage.getDropdownOptionByValue(conditionValue).should("exist").click();
        descriptionPage.selectAsStabilizedConditionButton.should("have.text", conditionValue);
        return this;
    }

    /**
     *
     * @param {string} label
     * @returns {DescriptionActions}
     */
    checkCheckboxByLabel(label) {
        descriptionPage.getCheckboxByLabel(label).check().should("have.value", "true");
        if (label === "Stairs") {
            descriptionPage.stairsConditionContainer.should("exist");
        } else if (label === "Interior Hallways") {
            descriptionPage.interiorHallwaysConditionContainer.should("exist");
        }
        return this;
    }

    /**
     *
     * @param {Array<string>} labels
     * @returns {DescriptionActions}
     */
    checkListCheckboxesByLabels(labels) {
        labels.forEach(label => {
            this.checkCheckboxByLabel(label);
        });
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {DescriptionActions}
     */
    checkStairConditionByValue(value) {
        descriptionPage.stairsConditionRadios.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @return {DescriptionActions}
     */
    verifyRadioIsChecked(value) {
        descriptionPage.getElementToCheckRadio(value).should("exist");
        return this;
    }

    /**
     *
     * @param {string} value
     * @return {DescriptionActions}
     */
    checkFoundationByValue(value) {
        descriptionPage.foundationRadios.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @return {DescriptionActions}
     */
    checkStructuralSystemByValue(value) {
        descriptionPage.structuralSystem.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @return {DescriptionActions}
     */
    checkFramingByValue(value) {
        descriptionPage.framingRadios.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @return {DescriptionActions}
     */
    checkRoofTypeByValue(value) {
        descriptionPage.roofTypeRadios.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @return {DescriptionActions}
     */
    checkSprinklersByValue(value) {
        descriptionPage.sprinklersRadios.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @return {DescriptionActions}
     */
    checkContainsBasement() {
        descriptionPage.containsBasementCheckbox.check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {string} value
     * @return {DescriptionActions}
     */
    checkBasementStateByValue(value) {
        descriptionPage.basementStateRadios.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} lifeToBe
     * @return {DescriptionActions}
     */
    verifyTotalEconomicLife(lifeToBe) {
        descriptionPage.totalEconomicLifeField.should("have.value", lifeToBe);
        return this;
    }

    /**
     *
     * @param {string} value
     * @return {DescriptionActions}
     */
    enterAgeEffective(value) {
        descriptionPage.effectiveAge.clear().type(value).should("have.value", value);
        return this;
    }
}

export default new DescriptionActions();