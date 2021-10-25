import BaseActions from "../base/base.actions";
import descriptionPage from "../../pages/property/description.page";

class DescriptionActions extends BaseActions {
    selectGeneralPropertyCondition(conditionValue) {
        descriptionPage.selectGeneralConditionButton.click();
        descriptionPage.getDropdownOptionByValue(conditionValue).should("exist").click();
        descriptionPage.selectGeneralConditionButton.should("have.text", conditionValue);
    }

    selectAsStabilizedPropertyCondition(conditionValue) {
        descriptionPage.selectAsStabilizedConditionButton.click();
        descriptionPage.getDropdownOptionByValue(conditionValue).should("exist").click();
        descriptionPage.selectAsStabilizedConditionButton.should("have.text", conditionValue);
    }

    checkCheckboxByLabel(label) {
        descriptionPage.getCheckboxByLabel(label).check().should("have.value", "true");
        if (label === "Stairs") {
            descriptionPage.stairsConditionContainer.should("exist");
        }
    }

    checkListCheckboxesByLabels(labels) {
        labels.forEach(label => {
            this.checkCheckboxByLabel(label);
        });
    }

    checkStairConditionByValue(value) {
        descriptionPage.stairsConditionRadios.check(value).should("be.checked");
    }

    checkFoundationByValue(value) {
        descriptionPage.foundationRadios.check(value).should("be.checked");
    }

    checkStructuralSystemByValue(value) {
        descriptionPage.structuralSystem.check(value).should("be.checked");
    }

    checkFramingByValue(value) {
        descriptionPage.framingRadios.check(value).should("be.checked");
    }

    checkRoofTypeByValue(value) {
        descriptionPage.roofTypeRadios.check(value).should("be.checked");
    }

    checkSprinklersByValue(value) {
        descriptionPage.sprinklersRadios.check(value).should("be.checked");
    }

    checkContainsBasement() {
        descriptionPage.containsBasementCheckbox.check().should("have.value", "true");
    }

    checkBasementStateByValue(value) {
        descriptionPage.basementStateRadios.check(value).should("be.checked");
    }

    verifyTotalEconomicLife(lifeToBe) {
        descriptionPage.totalEconomicLifeField.should("have.value", lifeToBe);
    }

    enterAgeEffective(value) {
        descriptionPage.effectiveAge.clear().type(value).should("have.value", value);
    }
}

export default new DescriptionActions();