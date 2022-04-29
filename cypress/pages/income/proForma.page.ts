import BasePage from "../base/base.page";

class ProFormaPage extends BasePage {
    get totalPotentialResIncome() {return cy.get("[data-qa=potentialResidentialIncome-total-cell]");}

    get psfPotentialResIncome() {return cy.get("[data-qa=potentialResidentialIncome-psf-cell]");}

    get perUnitPotentialResIncome() {return cy.get("[data-qa=potentialResidentialIncome-perUnit-cell]");}

    get totalPotGrossIncome() {return cy.get("[data-qa=potentialGrossIncome-total-cell]");}

    get perSFPotGrossIncome() {return cy.get("[data-qa=potentialGrossIncome-psf-cell]");}

    get perUnitPotGrossIncome() {return cy.get("[data-qa=potentialGrossIncome-perUnit-cell]");}

    get totalResVCLoss() {return cy.get("[data-qa=residentialVCLossAmount-total-cell]");}

    get perSfResVCLoss() {return cy.get("[data-qa=residentialVCLossAmount-psf-cell]");}

    get perUnitResVCLoss() {return cy.get("[data-qa=residentialVCLossAmount-perUnit-cell]");}

    get totalEffectiveGrossIncome() {return cy.get("[data-qa=effectiveGrossIncome-total-cell]");}

    get perSFEffectiveGrossIncome() {return cy.get("[data-qa=effectiveGrossIncome-psf-cell]");}

    get perUnitEffectiveGrossIncome() {return cy.get("[data-qa=effectiveGrossIncome-perUnit-cell]");}

    get totalRETaxes() {return cy.get("[data-qa=realEstateTaxes-total-cell]");}

    get perSFRETaxes() {return cy.get("[data-qa=realEstateTaxes-psf-cell]");}

    get perUnitTaxes() {return cy.get("[data-qa=realEstateTaxes-perUnit-cell]");}

    get totalInsurance() {return cy.get("[data-qa=insurance-total-cell]");}

    get perSFInsurance() {return cy.get("[data-qa=insurance-psf-cell]");}

    get perUnitInsurance() {return cy.get("[data-qa=insurance-perUnit-cell]");}

    get totalElectricity() {return cy.get("[data-qa=electricity-total-cell]");}

    get perSFElectricity() {return cy.get("[data-qa=electricity-psf-cell]");}

    get perUnitElectricity() {return cy.get("[data-qa=electricity-perUnit-cell]");}

    get totalRepairs() {return cy.get("[data-qa=repairsAndMaintenance-total-cell]");}

    get perSFRepairs() {return cy.get("[data-qa=repairsAndMaintenance-psf-cell]");}

    get perUnitRepairs() {return cy.get("[data-qa=repairsAndMaintenance-perUnit-cell]");}

    get totalPayroll() {return cy.get("[data-qa=payrollAndBenefits-total-cell]");}

    get perSFPayroll() {return cy.get("[data-qa=payrollAndBenefits-psf-cell]");}

    get perUnitPayroll() {return cy.get("[data-qa=payrollAndBenefits-perUnit-cell]");}

    get totalGeneral() {return cy.get("[data-qa=generalAndAdministrative-total-cell]");}

    get perSFGeneral() {return cy.get("[data-qa=generalAndAdministrative-psf-cell]");}

    get perUnitGeneral() {return cy.get("[data-qa=generalAndAdministrative-perUnit-cell]");}

    get totalManagement() {return cy.get("[data-qa=management-total-cell]");}

    get perSFManagement() {return cy.get("[data-qa=management-psf-cell]");}

    get perUnitManagement() {return cy.get("[data-qa=management-perUnit-cell]");}

    get totalReserves() {return cy.get("[data-qa=reserves-total-cell]");}

    get perSFReserves() {return cy.get("[data-qa=reserves-psf-cell]");}

    get perUnitReserves() {return cy.get("[data-qa=reserves-perUnit-cell]");}

    get totalToe() {return cy.get("[data-qa=totalOperatingExpenses-total-cell]");}

    get perSFToe() {return cy.get("[data-qa=totalOperatingExpenses-psf-cell]");}

    get perUnitToe() {return cy.get("[data-qa=totalOperatingExpenses-perUnit-cell]");}

    get totalToeNetRe() {return cy.get("[data-qa=totalOperatingExpensesNetTaxes-total-cell]");}

    get perSFToeNetRe() {return cy.get("[data-qa=totalOperatingExpensesNetTaxes-psf-cell]");}

    get perUnitToeNetRe() {return cy.get("[data-qa=totalOperatingExpensesNetTaxes-perUnit-cell]");}

    get totalNetOpIncome() {return cy.get("[data-qa=netOperatingIncome-total-cell]");}

    get perSFNetOpIncome() {return cy.get("[data-qa=netOperatingIncome-psf-cell]");}

    get perUnitNetOpIncome() {return cy.get("[data-qa=netOperatingIncome-perUnit-cell]");}

    get operatingExpenseRatio() {return cy.get("[data-qa=operatingExpenseRatio-value-cell]");}

    getCommercialUseVCLossRow(useText) {
        const firstPart = useText === "Undetermined" || useText === "Industrial" ? `${useText} Commercial` : useText;
        return cy.contains(`Less ${firstPart} V/C Loss`);
    }

    getCommercialUseVCLossPerUnitCell(useText) {return this.getCommercialUseVCLossRow(useText).siblings('[col-id="perUnit"]');}

    getCommercialUseVCLossTotal(useText) {return this.getCommercialUseVCLossRow(useText).siblings('[col-id="total"]');}

    getCommercialUseVCLossPerSF(useText) {return this.getCommercialUseVCLossRow(useText).siblings('[col-id="psf"]');}

    get residentialVCLossLabelCell() {
        return cy
        .xpath('(//div[@row-id="Potential Gross Income_2"])[2]//following-sibling::div[@role="row"]')
        .eq(0);
    }

    get residentialVCLossTotal() {
        return this.residentialVCLossLabelCell.children('[col-id="total"]');
    }

    get residentialVCLossPerSF() {
        return this.residentialVCLossLabelCell.children('[col-id="psf"]');
    }

    get residentialVCLossPerUnit() {
        return this.residentialVCLossLabelCell.children('[col-id="perUnit"]');
    }

    getCommercialUseVCLossLabel(useText: string) {
        // const attributeToBe = useText === "Undetermined" || useText === "Industrial" ?
        //     `${useText}Commercial` : useText.replaceAll(" ", "");
        // return cy.get(`[data-qa='less${attributeToBe}VCLoss-label-cell']`);
        // TODO: add more robust method later
        return this.residentialVCLossLabelCell;
    }

    get includeNOIComparisonCheckbox() {return cy.get("[data-qa^=includeNOIComparison] input");}

    customTotal(customCategoryName: string) {return cy.get(`[data-qa=${customCategoryName}-total-cell]`);}

    get getFuelTotal() {return cy.get("[data-qa=fuel-total-cell]");}

    get getWaterAndSewerTotal() {return cy.get("[data-qa=waterAndSewer-total-cell]");}
}

export default new ProFormaPage();