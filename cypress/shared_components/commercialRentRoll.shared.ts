class CommercialRentRollSharedComponent {

    get leaseStatusCells() {return cy.get("[data-qa^=leaseStatus].htAutocomplete");}

    get tenantNameCells() {return cy.xpath("(//*[contains(@data-qa, 'tenantName')])[position() < last()]");}

    get useCells() {return cy.xpath("(//*[contains(@data-qa, 'use')])[position() < last()]");}

    get squareFeetCells() {return cy.xpath("(//*[contains(@data-qa, 'squareFeet')])[position() < last()]");}

    get squareFeetTotal() {return cy.get("[data-qa^=squareFeet]").last();}

    get annualRentCells() {return cy.xpath("(//*[contains(@data-qa, 'annualRent-')])[position() < last()]");}

    get annualRentTotal() {return cy.get("[data-qa^=annualRent-]").last();}
}

export default CommercialRentRollSharedComponent;