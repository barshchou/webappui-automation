export default class SalesCompsDetailsForm {
    get propertyInfoEditBtn() {
        return cy.get('[data-qa="property-info-edit-btn"]', { includeShadowDom:true });
    }
}