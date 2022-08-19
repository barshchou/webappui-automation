export default class AddressSearchPage {

    get compAddressInput() {
        return cy.get('input[placeholder="Comp Address"]');
    }

    get searchCompAddressButton() {
        return cy.get("button").not('[role="tab"]')
            .contains("SEARCH");
    }

    get compSearchResults() {
        return cy.get("[data-qa=search-result-form] tbody tr", { timeout: 60000 });
    }

    selectCompButton(index: number) {
        return this.compSearchResults.contains('Select Comp').eq(index);
    }

}