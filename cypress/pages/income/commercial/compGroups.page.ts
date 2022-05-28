import BasePage from "../../base/base.page";

class CompGroupsPage extends BasePage {
    
    get compGroupsPageHeaderSection() {return cy.get("*[data-qa='commercialCompGroupsDiscussion']");}

    get addCompGroupButton() {return cy.get("[data-qa=add-comp-group-btn]");}

    get compGroupNameInput() {return cy.get("[data-qa=group-name-text-field] input");}

    get dialogAddCompGroupButton() {return cy.get("[data-qa=add-comp-group-dialog] [data-qa=add-comp-group-btn]");}

    getCompGroupSection(groupName) {return cy.get(`[data-qa='${groupName}-comp-group']`);}

    getDragableElement(index: number) { return `[data-react-beautiful-dnd-drag-handle="${index}"]`;}

    getDragableArea(compGroup: string, index: number) {return `[data-qa="${compGroup}-comp-group"] tbody[data-react-beautiful-dnd-droppable="${index}"] tr td`;}
}

export default new CompGroupsPage();