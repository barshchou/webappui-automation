class UnitGroupsPage {
    get pageHeaderSection() {return cy.get("*[data-qa='unitGroups']")}
}

export default new UnitGroupsPage()