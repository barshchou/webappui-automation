class CompPlexBasePage {
    /**
     * Get `Details` btn by selected comps's address
     */
    getSalesCompDetails(address: string) {
        return cy.get('[id="selectedComps"]').find("tr")
            .contains(address).parent().find("a");
    }

    get btnCreateComp() {
        return cy.get('[id="createComp"]');
    }
}
export default new CompPlexBasePage();