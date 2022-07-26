import BasePage from "../../base/base.page";

class RentReconciliationPage extends BasePage {
    get arrowCommercialRentReconciliation() {
        return cy.get('[data-icon="exchange"]');
    }

    get RentReconciliationHeader() {
        return cy.get('[data-qa="rentReconciliation"]');
    }

    get GeneratedCommentary() {
        return cy.get('[data-qa="commercialRentCompsReconciliationDiscussion.commentary-generated-text"]');
    }

    getMarketRentConclusion(index = 0) { 
        return cy.get(`[name="reconciliationGroups.items[${index}].summary.marketRentConclusion"]`); 
    }

    get rentPerSfRow() { return cy.get('[data-qa="rent-per-sf-row"]'); }

    get leaseTermsAdjustmentRow() { return cy.get('[data-qa="lease-terms-adjustments-row"]'); }

    get leaseTermsAdjustmentSubTotalRow() { return cy.get('[data-qa="trended-price-per-sf-row"]').eq(0); }

    get marketConditionsAdjustmentRow() { return cy.get('[data-qa="market-adjustments-row"]'); }

    get trendedRentPerSfRow() { return cy.get('[data-qa="trended-price-per-sf-row"]').eq(1); }

    get rentTypeLabel() { return this.rentPerSfRow.find('[data-qa="row-label-cell"]'); } 

    get baseUnitRentSfMonth() { return this.rentPerSfRow.find('[data-qa="base-unit-cell"]'); }

    get baseUnitTrendedRentSfMonth() { return this.trendedRentPerSfRow.find('[data-qa="base-unit-cell"]'); }

    subjectUnitRentSfMonth(unit = 0) { return this.rentPerSfRow.find(`[data-qa="subject-unit-${unit}-cell"]`); }

    compRent(compIndex = 0) { return this.rentPerSfRow.find(`[data-qa="rent-comp-${compIndex}-cell"]`); }

    get baseUnitCell() { return cy.get('[data-qa="base-unit-cell"]'); }

    get calculationDropdown() { return this.baseUnitCell.find('[data-qa="select-value"]'); }

    calculationOption(leaseTermsCalculationType: string, index = 0) {
        return cy.get(`[data-qa="reconciliationGroups.items[${index}].summary.leaseTermsCalcType-`+
        `${leaseTermsCalculationType}-select-option"]`);
    }

    leaseTermsAdjustments(compIndex = 0) { 
        return cy.get(`[name="reconciliationGroups.items[0].summary.rentComps[${compIndex}].adjustments.leaseTerms"]`);
    }

    leaseTermsAdjustmentsPlaceholder(compIndex = 0) { 
        return cy.get(`[name="reconciliationGroups.items[0]` + 
        `.summary.rentComps[${compIndex}].adjustments.leaseTerms"]+div p`);
    }

    marketConditionsAdjustments(compIndex = 0) { 
        return cy.get(`[name="reconciliationGroups.items[0].summary.rentComps[${compIndex}].adjustments.dateSigned"]`);
    }

    getTrendedRentSF(compIndex = 0) {
        return compIndex != 0 ? this.trendedRentPerSfRow.find(`[data-qa="subject-unit-${compIndex}-cell"]`) :
            this.trendedRentPerSfRow.find(`[data-qa="subject-unit-${compIndex}-cell"]`).eq(1);
    }

    getLeaseTermsAdjustmentSubTotal(compIndex = 0) {
        return compIndex != 0 
            ? this.leaseTermsAdjustmentSubTotalRow.find(`[data-qa="subject-unit-${compIndex}-cell"]`) 
            : this.leaseTermsAdjustmentSubTotalRow.find(`[data-qa="subject-unit-${compIndex}-cell"]`).eq(1);
    }
}

export default new RentReconciliationPage();