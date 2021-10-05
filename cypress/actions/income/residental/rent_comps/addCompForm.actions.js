import addCompFormPage from "../../../../pages/income/residental/rent_comps/addCompForm.page";

class AddCompFormActions {
    clickCloseButton() {
        addCompFormPage.closeButton.should("be.enabled").click();
    }

    verifyPropAddressExist() {
        addCompFormPage.propAddressField.should("be.visible").should("not.be.empty");
    }

    verifyUnitNumbFieldName() {
        addCompFormPage.unitNumbFieldName.should("exist").should("have.text", "Unit Number");
    }

    enterUnitNumber(unitNumber) {
        addCompFormPage.unitNumbInput.clear().type(unitNumber).should("have.value", unitNumber);
    }

    clickUnitTypeDropdown() {
        addCompFormPage.unitTypeDropdown.should("be.visible").click();
    }

    selectUnitTypeByValue(value) {
        addCompFormPage.getUnitTypeByValue(value).scrollIntoView().should("be.visible").click();
    }

    verifyUnitTypeValue(valueToBe) {
        addCompFormPage.unitTypeInputToCheck.should("have.value", valueToBe);
    }

    selectUnitTypeAndVerify(value) {
        this.clickUnitTypeDropdown();
        this.selectUnitTypeByValue(value);
        this.verifyUnitTypeValue(value);
    }

    selectListUnitTypes(values) {
        values.forEach(value => {
           this.selectUnitTypeAndVerify(value);
        });
    }
}

export default new AddCompFormActions();