export default class SalesCompsDetailsForm {
    get salesCompDetailModal() {
        return cy.get('[class="ant-modal-content"]');
    }

    get propertyInfoEditBtn() {
        return cy.get('[data-qa="property-info-edit-btn"]');
    }

    //TODO add a qa-data attr
    get saleInfoEditBtn() {
        return cy.get('[data-icon="pencil"]').eq(1).parent().contains('EDIT');
    }

    get saveChangesBtn() {
        return cy.get('[class="ant-modal-footer"]').contains('button', 'SAVE CHANGES');
    }









    
}