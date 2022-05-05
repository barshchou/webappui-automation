class CommercialRentRollSharedComponent {

    get leaseStatusCells() {return cy.get("[data-qa^=leaseStatus].htAutocomplete");}

    get tenantNameCells() {return cy.xpath("(//*[contains(@data-qa, 'tenantName')])[position() < last()]");}

    get useCells() {return cy.xpath("(//*[contains(@data-qa, 'use')])[position() < last()]");}

    get squareFeetCells() {return cy.xpath("(//*[contains(@data-qa, 'squareFeet')])[position() < last()]");}

    get squareFeetTotal() {return cy.get("[data-qa^=squareFeet]").last();}

    get annualRentCells() {return cy.xpath("(//*[contains(@data-qa, 'annualRent-')])[position() < last()]");}

    get annualRentTotal() {return cy.get("[data-qa^=annualRent-]").last();}

    get textareaToInput() {return cy.get("div:not([class*='hidden']) > *[class='handsontableInput']");}

    get monthlyRentCells() {return cy.xpath("(//*[contains(@data-qa, 'monthlyRent-')])[position() < last()]");}

    get monthlyRentTotal() {return cy.get("[data-qa^=monthlyRent-]").last();}

    get annualRentPerSFCells() {return cy.xpath("(//*[contains(@data-qa, 'annualRentPsf')])[position() < last()]");}

    get annualRentPerSFTotal() {return cy.get("[data-qa^=annualRentPsf-]").last();}
}

export default CommercialRentRollSharedComponent;