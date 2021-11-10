class UnitGroupsPage {
    get pageHeaderSection() {return cy.get("*[data-qa='unitGroups']");}
    getBedroomEqualTableRowsNoneComp(bedroomsNumber) {return cy.get(`[data-qa='bedrooms_${bedroomsNumber}'] [data-qa^=row]`);}
    get glaPercentage() {return cy.get("[name=grossLeasableAreaPercentage]");}
    get roomSize() {return cy.get("[name=roomSizeDelta]");}
    get glaValue() {return cy.get("[name=grossLeasableArea]");}
    getAvgSFInputByUnitTypeValue(value) {
        return cy.xpath(`//*[.='${value}'][contains(@data-qa, 'Table')]` +
            "//following-sibling::td[contains(@data-qa, 'Sqft')]//descendant::input[not(@type='hidden')]");
    }
    get glaCell() {return cy.get("[data-qa*=grossLeasableArea-cell]");}
    get totalAverageSqftCell() {return cy.get("[data-qa$='averageSqft-total-cell']");}
}

export default new UnitGroupsPage();