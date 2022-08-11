import { Alias } from "../../../utils/alias.utils";

const { compPlex } = Alias.pageElements;

export default class SalesCompsDetailsForm {
    get propertyInfoEditBtn() {
        return cy.get('[data-qa="property-info-edit-btn"]');
    }

    get SaleInfoEditBtn() {
        return cy.get('[data-qa="sale-info-edit-btn"]');
    }

    get generatedCommentaryTextArea() {
        return cy.get('[data-qa="generated-commentary-text-area"] [data-qa="text-input"]', { timeout: 120000 });
    }

    get appraiserCommentaryTextArea() {
        return cy.get('[data-qa="Appraiser Commentary"] [data-qa="text-input"]')
            .as(compPlex.appraiserCommentaryTextArea);
    }
}