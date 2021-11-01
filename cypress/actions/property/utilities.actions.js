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
}

export default new UtilitiesActions();