export default class JobSearchPage {
    get jobCard() {
        return cy.get('[data-qa="job-card-address"]').parent();
    }

    get jobCardAddress() {
        return cy.get('[data-qa="job-card-address"]');
    }

    get jobSearchFilterCompletedIn() {
        return cy.get('[data-qa="filter-completedInPeriod"]');
    }

    get jobSearchFilterInputCompletedIn() {
        return this.jobSearchFilterCompletedIn.find('input');
    }

    get jobSearchFilterPricePerUnit() {
        return cy.get('[data-qa="filter-pricePerUnit"]');
    }

    get jobSearchFilterPricePerUnitMin() {
        return cy.get('[data-qa="pricePerUnit-min-input"]');
    }

    get jobSearchFilterPricePerUnitMax() {
        return cy.get('[data-qa="pricePerUnit-max-input"]');
    }

    get jobSearchFilterPricePerSF() {
        return cy.get('[data-qa="filter-pricePerSf"]');
    }

    get jobSearchFilterPropertyType() {
        return cy.get('[data-qa="filter-propertyTypes"]');
    }

    get jobSearchFilterInputPropertyType() {
        return this.jobSearchFilterPropertyType.find('input');
    }

    get jobSearchFilterResidentialUnits() {
        return cy.get('[data-qa="filter-residentialUnits"]');
    }

    get jobSearchFilterCommercialUnits() {
        return cy.get('[data-qa="filter-commercialUnits"]');
    }

    get jobSearchFilterCapRate() {
        return cy.get('[data-qa="filter-capRate"]');
    }

    get jobSearchOnAppJobCheckbox() {
        return cy.get('[data-qa="checkbox-onAppJobs"] > [type="checkbox"]');
    }

    get jobSearchFiltersForm() {
        return cy.get('[data-qa="job-search-filters-form"]');
    }

    get jobCardPricePerBasisCapRate() {
        return cy.get('[data-qa="price-per-basis-cap-rate"]');
    }

    jobSearchGetFilter(isMinOrMax:string, filterName: string) {
        return cy.get(`[data-qa="${filterName}-${isMinOrMax}-input"]`);
    }

    jobSearchGetFilterInput(isMinOrMax:string, filterName: string) {
        return this.jobSearchGetFilter(isMinOrMax, filterName).find('input');
    }

    get reportIdInput() {
        return cy.get('input[placeholder="Find a specific Report ID"]');
    }

    get reportIdClearButton() {
        return cy.get('[data-testid="ClearIcon"]');
    }

    get filtersResetAllButton() {
        return cy.get('[data-qa="filter-reset-all-btn"]');
    }
}