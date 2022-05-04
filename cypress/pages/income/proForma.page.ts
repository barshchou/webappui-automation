import enums from "../../enums/enums";
import BasePage from "../base/base.page";

class ProFormaPage extends BasePage {

    get residentialVCLossLabelCell() {return cy.xpath('(//div[@row-id="Potential Gross Income_2"])[2]//following-sibling::div[@role="row"]').eq(0);}

    get residentialVCLossTotal() {return this.residentialVCLossLabelCell.children('[col-id="total"]');}

    get residentialVCLossPerSF() {return this.residentialVCLossLabelCell.children('[col-id="psf"]');}

    get residentialVCLossPerUnit() {return this.residentialVCLossLabelCell.children('[col-id="perUnit"]');}

    get includeNOIComparisonCheckbox() {return cy.get("[data-qa^=includeNOIComparison] input");}

    getCommercialUseVCLossRow(useText) {
        const firstPart = useText === "Undetermined" || useText === "Industrial" ? `${useText} Commercial` : useText;
        return cy.contains(`Less ${firstPart} V/C Loss`);
    }

    getCommercialUseVCLossPerUnitCell(useText) {return this.getCommercialUseVCLossRow(useText).siblings('[col-id="perUnit"]');}

    getCommercialUseVCLossTotal(useText) {return this.getCommercialUseVCLossRow(useText).siblings('[col-id="total"]');}

    getCommercialUseVCLossPerSF(useText) {return this.getCommercialUseVCLossRow(useText).siblings('[col-id="psf"]');}

    getCommercialUseVCLossLabel(useText: string) {
        // const attributeToBe = useText === "Undetermined" || useText === "Industrial" ?
        //     `${useText}Commercial` : useText.replaceAll(" ", "");
        // return cy.get(`[data-qa='less${attributeToBe}VCLoss-label-cell']`);
        // TODO: add more robust method later
        return this.residentialVCLossLabelCell;
    }
    
    categoryCellTotal(categoryName: string) {

        return categoryName == enums.PRO_FORMA_TYPES.totalOperatingExpenses 
            ? cy.get(`[row-id^='${this.capitalizeFirstLetter(categoryName)}'] [role=gridcell][col-id=total]`).first() 
            : cy.get(`[row-id^='${this.capitalizeFirstLetter(categoryName)}'] [role=gridcell][col-id=total]`);
    }

    categoryPSFTotal(categoryName: string) {
        return categoryName == enums.PRO_FORMA_TYPES.totalOperatingExpenses 
            ? cy.get(`[row-id^='${this.capitalizeFirstLetter(categoryName)}'] [role=gridcell][col-id=psf]`).first() 
            : cy.get(`[row-id^='${this.capitalizeFirstLetter(categoryName)}'] [role=gridcell][col-id=psf]`);
    }

    categoryPerUnitTotal(categoryName: string) {
        return categoryName == enums.PRO_FORMA_TYPES.totalOperatingExpenses 
            ? cy.get(`[row-id^='${this.capitalizeFirstLetter(categoryName)}'] [role=gridcell][col-id=perUnit]`).first() 
            : cy.get(`[row-id^='${this.capitalizeFirstLetter(categoryName)}'] [role=gridcell][col-id=perUnit]`);
    }

    private capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);

    }
}

export default new ProFormaPage();