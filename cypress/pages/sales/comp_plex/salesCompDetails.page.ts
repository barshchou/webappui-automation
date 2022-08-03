export default class SalesCompsDetailsForm {
    get propertyInfoEditBtn() {
        return cy.get('[data-qa="property-info-edit-btn"]');
    }

    get SaleInfoEditBtn() {
        return cy.get('[data-qa="sale-info-edit-btn"]', { includeShadowDom: true });
    }
}