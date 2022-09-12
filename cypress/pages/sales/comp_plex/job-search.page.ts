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

    jobSearchGetFilterInput(isMinOrMax:string, filterName: string) {
        return cy.get(`[data-qa="${filterName}-${isMinOrMax}-input"]`);
    }
}