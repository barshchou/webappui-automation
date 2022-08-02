import { Alias } from "../../../utils/alias.utils";

const { compPlex } = Alias.pageElements;

export default class PropertyInformationForm {
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

    get siteAreaNewComp() {
        return cy.get('[data-qa="Site Area"]')
            .as(compPlex.commercialAreaNewComp);
    }

    get floorNewComp() {
        return cy.get('[data-qa="# Floors"]')
            .as(compPlex.commercialAreaNewComp);
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

    get appraiserCommentaryTextArea() {
        return cy.get('[data-qa="Appraiser Commentary"] [data-qa="text-input"]')
            .as(compPlex.appraiserCommentaryTextArea);
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