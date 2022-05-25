export default class SaleInformationForm {
    get SourceInput(){
        return cy.xpath('//div[.="Source*"]//following-sibling::div');
    }

    get SourceList(){
        return cy.get('[class="rc-virtual-list"]');
    }

    getSourceListOption(optionName = "Bowery Subject"){
        return cy.xpath(`//div[@class="ant-select-item-option-content"]//parent::div[@title="${optionName}"]`);
    }

    get SaleDateCalendarNewComp() {return cy.xpath("//*[text()='Sale Date*']//following::input[1]");}

    get SaleDateToday(){
        return cy.get('[class="ant-picker-today-btn"]');
    }

    get BuyerGranteeNewComp() {return cy.xpath("//*[text()='Buyer (Grantee)*']//following::input[1]");}

    get SellerGrantor() {return cy.xpath("//*[text()='Seller (Grantor)*']//following::input[1]");}
}