import descriptionPage from "../../pages/property/description.page";
import BaseActionsExt from "../base/base.actions.ext";

class DescriptionActions extends BaseActionsExt<typeof descriptionPage> {
    checkCheckboxByLabel(label: string): DescriptionActions {
        descriptionPage.getCheckboxByLabel(label).check().should("have.value", "true");
        if (label === "Stairs") {
            descriptionPage.stairsConditionContainer.should("exist");
        } else if (label === "Interior Hallways") {
            descriptionPage.interiorHallwaysConditionContainer.should("exist");
        }
        return this;
    }

    checkListCheckboxesByLabels(labels: Array<string>): DescriptionActions {
        labels.forEach(label => {
            this.checkCheckboxByLabel(label);
        });
        return this;
    }

    checkStairConditionByValue(value: string): DescriptionActions {
        descriptionPage.stairsConditionRadios.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    verifyRadioIsChecked(value: string): DescriptionActions {
        descriptionPage.getElementToCheckRadio(value).should("exist");
        return this;
    }

    checkFoundationByValue(value: string): DescriptionActions {
        descriptionPage.foundationRadios.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    checkStructuralSystemByValue(value: string): DescriptionActions {
        descriptionPage.structuralSystem.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    checkFramingByValue(value: string): DescriptionActions {
        descriptionPage.framingRadios.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    checkRoofTypeByValue(value: string): DescriptionActions {
        descriptionPage.roofTypeRadios.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    checkSprinklersByValue(value: string): DescriptionActions {
        descriptionPage.sprinklersRadios.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    checkContainsBasement(): DescriptionActions {
        descriptionPage.containsBasementCheckbox.check().should("have.value", "true");
        return this;
    }

    checkBasementStateByValue(value: string): DescriptionActions {
        descriptionPage.basementStateRadios.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    verifyTotalEconomicLife(lifeToBe: string): DescriptionActions {
        descriptionPage.totalEconomicLifeField.should("have.value", lifeToBe);
        return this;
    }

    enterAgeEffective(value: string): DescriptionActions {
        descriptionPage.effectiveAge.clear().type(value).should("have.value", value);
        return this;
    }
}

export default new DescriptionActions(descriptionPage);