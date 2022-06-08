import { Alias } from "../../../utils/alias.utils";

const { comp_plex } = Alias.pageElements;

export default class PropertyInformationForm {
    get conditionDropdown() {
        return cy.get('[data-qa="Condition"]', { includeShadowDom: true })
        .as(comp_plex.conditionDropdown);
    }

    getDropdownOption(title: string) {
        return cy.get(`.ant-select-item-option[title='${title}']`, { includeShadowDom: true })
        .as(comp_plex.getDropdownOption);
    }

    get errorMessageNewComp() {
        return cy.get('[data-qa="error-text"]', { includeShadowDom: true })
        .as(comp_plex.errorMessage);
    }

    get newCompContinueButton() {
        return cy.get('[data-qa="Continue"]', { includeShadowDom: true })
        .as(comp_plex.newCompContinueButton);
    }

    get comparableTypeDropdown() {
        return cy.get('[data-qa="Comparable Type"]', { includeShadowDom: true })
        .as(comp_plex.comparableTypeDropdown);
    }

    get createCompNumberCommercialUnits() {
        return cy.get('[data-qa="# Commercial Units"]', { includeShadowDom:true })
        .as(comp_plex.createCompNumberCommercialUnits);
    }

    get createCompNumberResidentialUnits() {
        return cy.get('[data-qa="# Residential Units"]', { includeShadowDom: true })
        .as(comp_plex.createCompNumberResidentialUnits);
    }

    get commercialAreaNewComp() {
        return cy.get('[data-qa="Commercial Area"]', { includeShadowDom:true })
        .as(comp_plex.commercialAreaNewComp);
    }

    get netRentableAreaNewComp() {
        return cy.get('[data-qa="Net Rentable Area"]', { includeShadowDom: true })
        .as(comp_plex.netRentableAreaNewComp);
    }

    get averageUnitSizeNewComp() {
        return cy.get('[data-qa="Average Unit Size"]', { includeShadowDom: true })
        .as(comp_plex.averageUnitSizeNewComp);
    }

    get internalNotesTextArea() {
        return cy.get('[data-qa="Internal notes"]', { includeShadowDom:true })
        .as(comp_plex.internalNotesTextArea);
    }

    get appraiserCommentaryTextArea() {
        return cy.get('[data-qa="Appraiser Commentary"] [data-qa="text-input"]', { includeShadowDom: true })
        .as(comp_plex.appraiserCommentaryTextArea);
    }
}