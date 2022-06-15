import BasePage from "../../../../base/base.page";

class UnitMixPage extends BasePage {

    get navigationTab() {return cy.get("[path=unit-mix] a");}

    get importCsvButton() {return cy.xpath("//button[.='IMPORT CSV']");}

    get isNotReportedSFCheckboxes() {return cy.get("[data-qa$=isNotReportedSquareFeet] input");}

    get isEstimatedUnitMixSFAverageCheckbox() {return cy.get("[data-qa=isEstimatedUnitMixSquareFootage] input");}

    get residentialUnitsNumberInput() {return cy.get("[name=residentialUnitCount]");}

    get unitNumberInputs() {return cy.get("[name$=unitNumber]");}

    get plusUnitButton() {return cy.xpath("//h6[.='Itemized Unit Info']//following::button[1]");}

    get minusUnitButton() {return cy.xpath("//h6[.='Itemized Unit Info']//following::button[2]");}

    get includeToggles() {return cy.get("input.PrivateSwitchBase-input");}

    get bedroomsNumberInputs() {return cy.get("[name$=bedroomCount]");}

    get roomsNumberInputs() {return cy.get("[name$='.roomCount']");}

    get squareFeetInputs() {return cy.get("[name$=sqft]");}

    get monthlyRentInputs() {return cy.get("[name$=rent]");}
}

export default new UnitMixPage();