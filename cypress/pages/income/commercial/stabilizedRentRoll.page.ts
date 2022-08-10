import CommercialRentRollSharedComponentPage from "../../shared_components/commercialRentRoll.shared.page";

class StabilizedRentRollPage extends CommercialRentRollSharedComponentPage {

    get pageHeader() { return cy.xpath("//h5[text()='Stabilized Rent Roll']"); }

    get stabilizedRRPanel() { return cy.get('[id="STICKY_FORM_PANEL_WRAPPER_ID"] + div'); }

    get stabilizedRentRollHeaderSection() { return cy.get("*[data-qa='stabilizedRentRoll']"); }

    get autoFillButton() { return cy.get(`[data-qa=autofill-button]`); }

    commercialCompGroupName(groupName: string ) { 
        return cy.xpath(`//table[@class = 'htCore']//td[text()='${groupName}']`); 
    }

    get commercialCompGroupHeader() { 
        return cy.xpath(`//div[@class='ht_master handsontable']//` + 
        `table[@class = 'htCore']//span[text() = 'Commercial Comp Group']`); 
    }

    commercialCompGroupForecastRent(forecast: string) { 
        return cy.xpath(`//table[@class = 'htCore']//td[text()='$${forecast}']`); 
    }
}

export default new StabilizedRentRollPage();
