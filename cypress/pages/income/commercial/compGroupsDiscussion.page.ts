import BasePage from "../../base/base.page";

class CompGroupsDiscussionPage extends BasePage {
    
    compGroupDataByRow(compGroupName: string, colName: string, index = 0) {
        return cy.xpath(`//*[@data-qa="${compGroupName}-title"]/following-sibling::div//tr[@data-qa="row-${index}"]//td[@data-qa="col-${colName}"]/span`);
    }
}

export default new CompGroupsDiscussionPage();