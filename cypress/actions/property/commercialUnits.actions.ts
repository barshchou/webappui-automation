import commercialUnitsPage from "../../pages/property/commercialUnits.page";
import {cutDecimalPartToNumberOfDigits, isHasDecimalPartMoreNumberOfDigits, numberWithCommas} from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

class CommercialUnitsActions extends BaseActionsExt<typeof commercialUnitsPage> {

    clickCommercialUnitTabByIndex(index = 0): this {
        commercialUnitsPage.commercialUnitsTabs.eq(index).click();
        return this;
    }

    private clickRadioOrCheckbox(group: BoweryReports.CommercialUnitsGroups,
                                 value: BoweryReports.CommercialUnitGroupsValues, index = 0): this {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value, index).click();
        return this;
    }

    clickRadioButtonByValueAndUnitIndex(group: BoweryReports.CommercialUnitsGroups,
                                        value: BoweryReports.CommercialUnitGroupsValues, index = 0): this {
        this.clickRadioOrCheckbox(group, value, index)
            .verifyRadioIsChecked(group, value, index);
        if (value === "other") {
            commercialUnitsPage.getOtherFieldByGroup(group, index).should("exist")
                .should("have.attr", "required");
        }
        return this;
    }

    clickCheckboxToUncheck(group: BoweryReports.CommercialUnitsGroups, value: BoweryReports.CommercialUnitGroupsValues,
                           index = 0): this {
        this.clickRadioOrCheckbox(group, value, index)
            .verifyRadioIsNotChecked(group, value, index);
        if (value === "other") {
            commercialUnitsPage.getOtherFieldByGroup(group, index).should("not.exist");
        }
        return this;
    }

    verifyRadioIsChecked(group: BoweryReports.CommercialUnitsGroups, value: BoweryReports.CommercialUnitGroupsValues, index = 0): this {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value, index).parent().should("have.class", "Mui-checked");
        return this;
    }

    verifyRadioIsNotChecked(group: BoweryReports.CommercialUnitsGroups, value: BoweryReports.CommercialUnitGroupsValues, index = 0): this {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value, index).parent()
            .should("not.have.class", "Mui-checked");
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

    verifyCommercialUnitSFDiscussionTextAreaContains(text: string): this {
        commercialUnitsPage.commercialUnitSFDiscussionTextArea.should("contain.text", text);
        return this;
    }

    verifyCommercialUnitSFDiscussionTextAreaNotContains(text: BoweryReports.CommercialUnitsUseValues): this {
        commercialUnitsPage.commercialUnitSFDiscussionTextArea.should("not.contain.text", text);
        return this;
    }

    enterOtherValueByGroupName(groupName: BoweryReports.CommercialUnitsGroups, value: string, index = 0): this {
        commercialUnitsPage.getOtherFieldByGroup(groupName, index).clear().type(value);
        this.verifyOtherValueByGroupName(groupName, value);
        return this;
    }

    verifyOtherValueByGroupName(groupName: BoweryReports.CommercialUnitsGroups, value: string, index = 0): this {
        commercialUnitsPage.getOtherFieldByGroup(groupName, index).should("have.value", value);
        return this;
    }
}

export default new CommercialUnitsActions(commercialUnitsPage);