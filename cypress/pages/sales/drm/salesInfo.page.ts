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
}