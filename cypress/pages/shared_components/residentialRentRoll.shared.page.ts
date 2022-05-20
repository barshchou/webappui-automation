import BasePage from "../base/base.page";

export default class ResidentialRentRollSharedPage extends BasePage {

    get isInspectedInputs() {return cy.get("[data-qa^=isInspected][data-qa$=cell] input");}

    get isInspectedColumnCells() {return cy.get("*[data-qa^='isInspected']");}

    get unitNumberCells() {return cy.get("[data-qa^=number][data-qa$=cell],[data-qa^=unitNumber][data-qa$=cell]");}

    get roomsCells() {return cy.get("[data-qa^=rooms][data-qa$=cell]");}

    get rentTypeCells() {return cy.get("[data-qa^=rentType][data-qa$=cell]");}

    get rentForecastCells() {return cy.get("[data-qa^=rentForecast-]");}

    get monthlyTotalForecast() {return cy.get("[data-qa=monthlyTotal-rentForecast],[data-qa=total-monthly-forecast-cell]");}

    get totalAnnualForecast() {return cy.get("[data-qa=total-annual-forecast-cell],[data-qa=annualTotal-rentForecast]");}

    get bedroomsCells() {return cy.get("[data-qa^=bedrooms]");}

    get leaseStatusCells() {return cy.get("[data-qa^=leaseStatus]");}

    get monthlyTotalRent() {return cy.get("[data-qa='monthlyTotal-rent'],[data-qa=total-monthly-cell]");}

    get annualTotalRent() {return cy.get("[data-qa=annualTotal-rent],[data-qa=total-annual-cell]");}

}