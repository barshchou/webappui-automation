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

    get jobSearchFilterInputPricePerUnitMin() {
        return this.jobSearchFilterCommercialUnits.find('input');
    }

    get jobSearchFilterPricePerUnitMax() {
        return cy.get('[data-qa="pricePerUnit-max-input"]');
    }

    get jobSearchFilterInputPricePerUnitMax() {
        return this.jobSearchFilterPricePerUnitMax.find('input');
    }

    get jobSearchFilterPricePerSF() {
        return cy.get('[data-qa="filter-pricePerSf"]');
    }

    get jobSearchFilterInputMinPricePerSF() {
        return cy.get('[data-qa="pricePerSF-min-input"]').find('input');
    }

    get jobSearchFilterInputMaxPricePerSF() {
        return cy.get('[data-qa="pricePerSF-max-input"]').find('input');
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

    get jobSearchFilterInputResidentialUnitsMin() {
        return cy.get('[data-qa="residentialUnits-min-input"]').find('input');
    }

    get jobSearchFilterInputResidentialUnitsMax() {
        return cy.get('[data-qa="residentialUnits-min-input"]').find('input');
    }

    get jobSearchFilterCommercialUnits() {
        return cy.get('[data-qa="filter-commercialUnits"]');
    }

    get jobSearchFilterInputCommercialUnitsMin() {
        return cy.get('[data-qa="commercialUnits-min-input"]').find('input');
    }

    get jobSearchFilterInputCommercialUnitsMax() {
        return cy.get('[data-qa="commercialUnits-max-input"]').find('input');
    }

    get jobSearchFilterCapRate() {
        return cy.get('[data-qa="filter-capRate"]');
    }

    get jobSearchFilterInputCapRateMin() {
        return cy.get('[data-qa="capRate-min-input"]').find('input');
    }

    get jobSearchFilterInputCapRateMax() {
        return cy.get('[data-qa="capRate-max-input"]').find('input');
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

    jobSearchGetFilterInput(isMinOrMax:string, filterName: string) {
        return cy.get(`[data-qa="${filterName}-${isMinOrMax}-input"]`);
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