import BasePage from "../../base/base.page";

class CompGroupsPage extends BasePage {
    
    get compGroupsPageHeaderSection() {return cy.get("*[data-qa='commercialCompGroupsDiscussion']");}

    get addCompGroupButton() {return cy.get("[data-qa=add-comp-group-btn]");}

    get compGroupNameInput() {return cy.get("[data-qa=group-name-text-field] input");}

    get dialogAddCompGroupButton() {return cy.get("[data-qa=add-comp-group-dialog] [data-qa=add-comp-group-btn]");}

    getCompGroupSection(groupName) {return cy.get(`[data-qa='${groupName}-comp-group']`);}

    getDragableElement(index: number) { return `[data-qa="row-${index}"] [data-react-beautiful-dnd-drag-handle="1"]`;}

    getDropableArea(compGroup: string) {return `[data-qa="${compGroup}-comp-group"] tbody[data-react-beautiful-dnd-droppable="1"] tr td`;}

    getDropableAreaDropped(compGroup: string) {return `[data-qa="${compGroup}-comp-group"] [data-qa="row-0"]`;}

    get draggablePlaceholder() {return cy.xpath(`//*[@data-qa="unsorted_group"]//td[contains(text(), 'Drop any rent roll unit here')]`);}
}

export default new CompGroupsPage();