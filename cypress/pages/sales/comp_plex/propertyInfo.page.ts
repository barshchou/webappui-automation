import { Alias } from "../../../utils/alias.utils";

const { compPlex } = Alias.pageElements;

export default class PropertyInformationForm {
    get conditionDropdown() {
        return cy.get('[data-qa="Condition"]', { includeShadowDom: true })
            .as(compPlex.conditionDropdown);
    }

    getDropdownOption(title: string) {
        return cy.get(`.ant-select-item-option[title='${title}']`, { includeShadowDom: true })
            .as(compPlex.getDropdownOption);
    }

    get errorMessageNewComp() {
        return cy.get('[data-qa="error-text"]', { includeShadowDom: true })
            .as(compPlex.errorMessage);
    }

    get newCompContinueButton() {
        return cy.get('[data-qa="Continue"]', { includeShadowDom: true })
            .as(compPlex.newCompContinueButton);
    }

    get comparableTypeDropdown() {
        return cy.get('[data-qa="Comparable Type"]', { includeShadowDom: true })
            .as(compPlex.comparableTypeDropdown);
    }

    get createCompNumberCommercialUnits() {
        return cy.get('[data-qa="# Commercial Units"]', { includeShadowDom:true })
            .as(compPlex.createCompNumberCommercialUnits);
    }

    get createCompNumberResidentialUnits() {
        return cy.get('[data-qa="# Residential Units"]', { includeShadowDom: true })
            .as(compPlex.createCompNumberResidentialUnits);
    }

    get commercialAreaNewComp() {
        return cy.get('[data-qa="Commercial Area"]', { includeShadowDom:true })
            .as(compPlex.commercialAreaNewComp);
    }

    get netRentableAreaNewComp() {
        return cy.get('[data-qa="Net Rentable Area"]', { includeShadowDom: true })
            .as(compPlex.netRentableAreaNewComp);
    }

    get averageUnitSizeNewComp() {
        return cy.get('[data-qa="Average Unit Size"]', { includeShadowDom: true })
            .as(compPlex.averageUnitSizeNewComp);
    }

    get internalNotesTextArea() {
        return cy.get('[data-qa="Internal notes"]', { includeShadowDom:true })
            .as(compPlex.internalNotesTextArea);
    }

    get appraiserCommentaryTextArea() {
        return cy.get('[data-qa="Appraiser Commentary"] [data-qa="text-input"]', { includeShadowDom: true })
            .as(compPlex.appraiserCommentaryTextArea);
    }

    get streetAddressInput() {
        return cy.get('[data-qa="street-address"] input', { includeShadowDom:true });
    }

    get cityInput() {
        return cy.get('[data-qa="city"] input', { includeShadowDom:true });
    }

    get stateInput() {
        return cy.get('[data-qa="state"] input', { includeShadowDom:true });
    }

    get postalCodeInput() {
        return cy.get('[data-qa="postal-code"] input', { includeShadowDom:true });
    }

    get propertyIdInput() {
        return cy.get('[data-qa="property-id"] input', { includeShadowDom:true });
    }

    get propertyIdTypeInput() {
        return cy.get('[data-qa="property-id-type"] input', { includeShadowDom:true });   
    }

    get editContentArrow() {
        return cy.get('[aria-controls="property_info_edit-content"]', { includeShadowDom: true });
    }
}