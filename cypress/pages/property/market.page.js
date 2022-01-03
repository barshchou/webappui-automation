import BasePage from "../base/base.page";

class MarketPage extends BasePage{
    get exposureTimeMin() {return cy.get("*[name='exposureTime.min']");}
    get exposureTimeMax() {return cy.get("*[name='exposureTime.max']");}
    get neighborhood() {return cy.xpath("//label[.='Neighborhood']//following::input[1]");}
    get area() {return cy.xpath("//label[.='Area']//following::input[1]");}
    get marketState() {return cy.xpath("//label[.='State']//following::input[1]");}
    get neighborhoodYear() {return cy.get("*[name=neighborhoodYear]");}
    get macroMarket() {return cy.xpath("//label[.='Market']//following::input[1]");}
    get submarket() {return cy.xpath("//label[.='Submarket']//following::input[1]");}
    get marketQuarter() {return cy.xpath("//label[.='Submarket & Market Quarter']//following::input[1]");}
    get marketYear() {return cy.get("*[name=marketYear]");}
    get pullDropboxButton() {return cy.xpath("//button[.='PULL FROM DROPBOX']");}
    get multifamilySubmarketAnalysisFile() {return cy.get("[data-qa=file-selection-multifamilySubmarketAnalysis-input] input");}
    get pulledFileConfirmation() {return cy.contains("This file will appear after the Introduction.");}
}

export default new MarketPage();