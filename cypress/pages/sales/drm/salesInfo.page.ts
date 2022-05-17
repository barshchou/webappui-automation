export default class SaleInformationForm {
    get Source(){
        return cy.get('//div[.="Source*"]//following-sibling::div');
    }
}