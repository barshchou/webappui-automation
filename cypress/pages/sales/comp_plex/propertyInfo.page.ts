import { CompPlex } from "../../../types/compplex.type";
import { Alias } from "../../../utils/alias.utils";

const { compPlex } = Alias.pageElements;

export default class PropertyInformationForm {
    get gbaNewComp() {
        return cy.get('[data-qa="GBA"]')
            .as(compPlex.gbaNewComp);
    }

    get PropertyInfoCancelBtn() {
        return cy.get('[data-qa="info-cancel-btn"]');
    }

    get PropertyInfoDoneBtn() {
        return cy.get('[data-qa="info-done-btn"]');
    }

    get conditionDropdown() {
        return cy.get('[data-qa="Condition"]')
            .as(compPlex.conditionDropdown);
    }

    getDropdownOption(title: string) {
        return cy.get(`.ant-select-item-option[title='${title}']`)
            .as(compPlex.getDropdownOption);
    }

    get errorMessageNewComp() {
        return cy.get('[data-qa="error-text"]')
            .as(compPlex.errorMessage);
    }

    get newCompContinueButton() {
        return cy.get('[data-qa="Continue"]')
            .as(compPlex.newCompContinueButton);
    }

    get comparableTypeDropdown() {
        return cy.get('[data-qa="Comparable Type"]')
            .as(compPlex.comparableTypeDropdown);
    }

    get createCompNumberCommercialUnits() {
        return cy.get('[data-qa="# Commercial Units"]')
            .as(compPlex.createCompNumberCommercialUnits);
    }

    get createCompNumberResidentialUnits() {
        return cy.get('[data-qa="# Residential Units"]')
            .as(compPlex.createCompNumberResidentialUnits);
    }

    get commercialAreaNewComp() {
        return cy.get('[data-qa="Commercial Area"]')
            .as(compPlex.commercialAreaNewComp);
    }

    get netRentableAreaNewComp() {
        return cy.get('[data-qa="Net Rentable Area"]')
            .as(compPlex.netRentableAreaNewComp);
    }

    get averageUnitSizeNewComp() {
        return cy.get('[data-qa="Average Unit Size"]')
            .as(compPlex.averageUnitSizeNewComp);
    }

    get internalNotesTextArea() {
        return cy.get('[data-qa="Internal notes"]')
            .as(compPlex.internalNotesTextArea);
    }

    get siteAreaNewComp() {
        return cy.get('[data-qa="Site Area"]')
            .as(compPlex.siteAreaNewComp);
    }

    get yearBuiltNewComp() {
        return cy.get('[data-qa="Year Built"]')
            .as(compPlex.yearBuiltNewComp);
    }

    get floorsNewComp() {
        return cy.get('[data-qa="# Floors"]')
            .as(compPlex.floorsNewComp);
    }

    getBuildingType(buildingType: CompPlex.PropertyInfo.BuildingType) {
        return cy.get(`[value="${buildingType}"]`);
    }

    get saveAndCloseButton() {
        return cy.get('[data-qa="Save & Close"]');
    }

    get streetAddressInput() {
        return cy.get('[data-qa="street-address"] input');
    }

    get cityInput() {
        return cy.get('[data-qa="city"] input');
    }

    get stateInput() {
        return cy.get('[data-qa="state"] input');
    }

    get postalCodeInput() {
        return cy.get('[data-qa="postal-code"] input');
    }

    get propertyIdInput() {
        return cy.get('[data-qa="property-id"] input');
    }

    get propertyIdTypeInput() {
        return cy.get('[data-qa="property-id-type"] input');
    }

    get editContentArrow() {
        return cy.get('[aria-controls="property_info_edit-content"]');
    }
}