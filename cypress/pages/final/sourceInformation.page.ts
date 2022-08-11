import BasePage from "../base/base.page";

class SourceInformationPage extends BasePage {

    get sourceLabelLocator() { return "[data-qa=source-label]"; }

    get siteSizeSources() { return cy.get(`[data-qa='Site Size-row'] ${this.sourceLabelLocator}`); }

    get excessSurplusLandSources() { return cy.get(`[data-qa='Excess/Surplus Land-row'] ${this.sourceLabelLocator}`); }

    get grossSizeUnitsSources() { return cy.get(`[data-qa='Gross Size/Units-row'] ${this.sourceLabelLocator}`); }

    get residentialSFSources() { return cy.get(`[data-qa='Residential SF-row'] ${this.sourceLabelLocator}`); }

    get numberOfBuildingsSources() { return cy.get(`[data-qa='Number of Buildings-row'] ${this.sourceLabelLocator}`); }

    get amenitiesSources() { return cy.get(`[data-qa='Amenities-row'] ${this.sourceLabelLocator}`); }

    get deferredMaintenanceSources() { 
        return cy.get(`[data-qa='Deferred Maintenance-row'] ${this.sourceLabelLocator}`); 
    }

    get areaAnalysisSources() { return cy.get(`[data-qa='Area Analysis-row'] ${this.sourceLabelLocator}`); }

    get incomeDataSources() { return cy.get(`[data-qa='Income Data-row'] ${this.sourceLabelLocator}`); }

    get expenseDataSources() { return cy.get(`[data-qa='Expense Data-row'] ${this.sourceLabelLocator}`); }

    get architecturalPlansSources() { return cy.get(`[data-qa='Architectural Plans-row'] ${this.sourceLabelLocator}`); }

    get comparableRentalDataSources() { 
        return cy.get(`[data-qa='Comparable Rental Data-row'] ${this.sourceLabelLocator}`); 
    }

    get comparableSalesDataSources() { 
        return cy.get(`[data-qa='Comparable Sales Data-row'] ${this.sourceLabelLocator}`); 
    }
}

export default new SourceInformationPage();