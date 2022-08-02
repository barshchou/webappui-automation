export default class SalesCompsDetailsForm {
    get PropertyInfoEditBtn() {
        return cy.get('[data-qa="property-info-edit-btn"]', { includeShadowDom:true });
    }

    get SaleInfoEditBtn() {
        return cy.get('[data-qa="sale-info-edit-btn"]', { includeShadowDom: true });
    }
}