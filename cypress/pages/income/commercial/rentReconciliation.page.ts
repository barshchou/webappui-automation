import BasePage from "../../base/base.page";

class RentReconciliationPage extends BasePage {
    get arrowCommercialRentReconciliation(){
        return cy.get('[data-icon="exchange"]');
    }

    get RentReconcillationHeader(){
        return cy.get('[data-qa="rentReconciliation"]');
    }

    get GeneratedCommentary(){
        return cy.get('[data-qa="commercialRentCompsReconciliationDiscussion.commentary-generated-text"]');
    }

    getMarketRentConclusion(index = 0) { return cy.get(`[name="reconciliationGroups.items[${index}].summary.marketRentConclusion"]`);}

    get rentPerSfRow() {return cy.get('[data-qa="rent-per-sf-row"]');}

    get rentTypeLabel() {return this.rentPerSfRow.find('[data-qa="row-label-cell"]');} 

    get baseUnitRentSfMonth() {return this.rentPerSfRow.find('[data-qa="base-unit-cell"]');}

    subjectUnitRentSfMonth(unit = 0) {return this.rentPerSfRow.find(`[data-qa="subject-unit-${unit}-cell"]`);}

    getCompRent(compIndex = 0) {return this.rentPerSfRow.find(`[data-qa="rent-comp-${compIndex}-cell"]`);}

    get calculationDropdown() {return cy.xpath('//*[@data-qa="reconciliationGroups.items[0].summary.leaseTermsCalcType-select-list"]//input');}

    calculationOption(leaseTermsCalculationType: string, index = 0) {
        return cy.get(`[data-qa="reconciliationGroups.items[${index}}].summary.leaseTermsCalcType-${leaseTermsCalculationType}-select-option"]`);
    }

    leaseTermsAdjustments(compIndex = 0) {return cy.get(`[name="reconciliationGroups.items[0].summary.rentComps[${compIndex}].adjustments.leaseTerms"]`);}
}

export default new RentReconciliationPage();