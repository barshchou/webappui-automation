import BasePage from "../base/base.page";
import { BoweryReports } from "../../types/boweryReports.type";

class MarketPage extends BasePage {
    get exposureTimeMin() { return cy.get("*[name='exposureTime.min']"); }

    get exposureTimeMax() { return cy.get("*[name='exposureTime.max']"); }

    get marketingTimeMin() { return cy.get("*[name='marketingTime.min']"); }
    
    get marketingTimeMax() { return cy.get("*[name='marketingTime.max']"); }

    get neighborhood() { return cy.xpath("//label[.='Neighborhood']//following::input[1]"); }

    get area() { return cy.xpath("//label[.='Area']//following::input[1]"); }

    get marketState() { return cy.xpath("//label[.='State']//following::input[1]"); }

    get neighborhoodYear() { return cy.get("*[name=neighborhoodYear]"); }

    getMarketInputByAnalysisUse(marketAnalysisUse: BoweryReports.MarketAnalysisUses) {
        return cy.get(`[data-qa=${marketAnalysisUse}Market-form-control] input`);
    }

    getSubmarketInputByAnalysisUse(marketAnalysisUse: BoweryReports.MarketAnalysisUses) {
        return cy.get(`[data-qa=${marketAnalysisUse}Submarket-form-control] input`);
    }

    get marketQuarter() { return cy.get("[data-qa=marketQuarter-form-control] input"); }

    get marketYear() { return cy.get("*[name=marketYear]"); }

    get pullDropboxButton() { return cy.xpath("//button[.='PULL FROM DROPBOX']"); }

    getSubmarketFileByAnalysisUse(use: BoweryReports.MarketAnalysisUses) {
        return cy.get(`[data-qa=file-selection-${use}SubmarketAnalysis-input] input`);
    }

    getMarketFileByAnalysisUse(use: BoweryReports.MarketAnalysisUses) {
        return cy.get(`[data-qa=file-selection-${use}MarketAnalysis-input] input`);
    }

    get exposureTimeDescription() { 
        return cy.xpath("//*[.='Exposure Time Description']//following::div[@data-slate-editor]"); 
    }

    get marketTimeDescription() { 
        return cy.xpath("//*[.='Marketing Time Description']//following::div[@data-slate-editor]"); 
    }

    get includeMarketTimeCheckbox() { return cy.get("[data-qa^='includeMarketingTime']"); }

    getMarketAnalysisUseCheckbox(useValue: string) { 
        return cy.get(`[data-qa^='marketAnalysisUses.${useValue}-checkbox'] input`); 
    }

    get areaEconomicAnalysisContainer() { return cy.get("[data-qa=file-selection-areaEconomicAnalysis-input]"); }

    get areaEconomicAnalysisFile() { return this.areaEconomicAnalysisContainer.find("input"); }

    get neighborhoodDemographicFile() { 
    	return cy.get("[data-qa=file-selection-neighborhoodDemographicOverview-input] input"); 
    }

    get rentStabilizationFile() { return cy.get("[data-qa=file-selection-summaryOfRentStabilizationLaws-input] input"); }
}

export default new MarketPage();
