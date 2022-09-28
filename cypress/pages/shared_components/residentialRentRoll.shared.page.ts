import BasePage from "../base/base.page";

export default class ResidentialRentRollSharedPage extends BasePage {

    get isInspectedInputs() { return cy.get("[data-qa^=isInspected][data-qa$=cell]"); }

    get isInspectedColumnCells() { return cy.get("*[data-qa^='isInspected']"); }

    get unitNumberCells() { return cy.get("[data-qa^=number][data-qa$=cell],[data-qa^=unitNumber][data-qa$=cell]"); }

    get roomsCells() { return cy.get("[data-qa^=rooms][data-qa$=cell]"); }

    get rentTypeCells() { return cy.get("[data-qa^=rentType][data-qa$=cell]"); }

    get rentForecastCells() { return cy.get("[data-qa^=rentForecast-]"); }

    get monthlyTotalForecast() { 
        return cy.get("[data-qa=monthlyTotal-rentForecast],[data-qa=total-monthly-forecast-cell]"); 
    }

    get totalAnnualForecast() { 
        return cy.get("[data-qa=total-annual-forecast-cell],[data-qa=annualTotal-rentForecast]"); 
    }

    get bedroomsCells() { return cy.get("[data-qa^=bedrooms]"); }

    get leaseStatusCells() { return cy.get("[data-qa^=leaseStatus]"); }

    get monthlyTotalRent() { return cy.get("[data-qa='monthlyTotal-rent'],[data-qa=total-monthly-cell]"); }

    get annualTotalRent() { return cy.get("[data-qa=annualTotal-rent],[data-qa=total-annual-cell]"); }

    get closeIcon() { return cy.get("[data-qa=close-icon]"); }

    get numberCells() { return cy.get("[data-qa^='#'],[data-qa=order-cell]"); }

    get outdoorSpaceCells() { return cy.get("[data-qa^=outdoor][data-qa$=cell]"); }

    get squareFootageCells() { return cy.get("[data-qa^=squareFootage][data-qa$=cell]"); }

    get bathroomsCells() { return cy.get("[data-qa^=bathrooms][data-qa$=cell]"); }

    get unitTypeCells() { return cy.get("[data-qa^=unitLayout][data-qa$=cell]"); }

    get rentPerRoomCells() { return cy.get("[data-qa^='rent/room'],[data-qa=rentPerRoom-cell]"); }

    get monthlyRentCells() { return cy.get("[data-qa^=rent-][data-qa$=cell]"); }

    get stabilizedMonthlyRentCells() { return cy.get("[name^='units['][name$='.rent']"); }

    get rentSFCell() { return cy.xpath("//*[contains(@class, 'readOnly') and (contains(@data-qa,'rent/SF'))]"); }

}