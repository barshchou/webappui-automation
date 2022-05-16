import BasePage from "../base/base.page";

class CapRateDiscussionPage extends BasePage {

    get capRateCompsMin() {return cy.get("[data-qa=cap-rate-table] [data-qa=min]");}

    get capRateCompsMax() {return cy.get("[data-qa=cap-rate-table] [data-qa=max]");}

    get capRateCompsAverage() {return cy.get("[data-qa=cap-rate-table] [data-qa=average]");}

    get pwcMin() {return cy.get("[data-qa=PwC] [data-qa=min]");}

    get pwcAverage() {return cy.get("[data-qa=PwC] [data-qa=average]");}

    get pwcMax() {return cy.get("[data-qa=PwC] [data-qa=max]");}

    get situsMin() {return cy.get("[data-qa=rerc-situs] [data-qa=min]");}

    get situsAverage() {return cy.get("[data-qa=rerc-situs] [data-qa=average]");}

    get situsMax() {return cy.get("[data-qa=rerc-situs] [data-qa=max]");}

    get capRateCompsTab() {return cy.get("[data-qa='Cap Rate Comps-tab']");}

    get incomePotentialCell() {return cy.get("[data-qa=income-potential]");}

    get propertyConditionsCell() {return cy.get("[data-qa=property-conditions]");}

    get locationCell() {return cy.get("[data-qa=location]");}

    get incomeSpikesTab() {return cy.get("[data-qa='Income Spikes-tab']");}

    get concludedCapRateCell() {return cy.get("[data-qa=concluded-cap-rate]");}

    get occupancyCell() {return cy.get("[data-qa=occupancy-level]");}

    get percentageMarketRateCell() {return cy.get("[data-qa=percentage-of-market-rent]");}

    get propertyConditionIncomeSpikeCell() {return cy.get("[data-qa=property-condition]");}

    get subjectIncomePotentialRadio() {return cy.get("[name=subjectIncomePotential]");}

    get currentMarketConditionsRadio() {return cy.get("[name=currentMarketConditions]");}

    get cashFlowRiskRadio() {return cy.get("[name=cashFlowRiskProfile]");}

    getElementToCheckRadio(value) {return cy.get(`[data-qa=checked] input[value='${value}']`);}

}

export default new CapRateDiscussionPage();