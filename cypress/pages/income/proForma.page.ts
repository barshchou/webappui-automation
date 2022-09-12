import { uppercaseFirstLetterEachWord } from "../../../utils/string.utils";
import enums from "../../enums/enums";
import BasePage from "../base/base.page";

class ProFormaPage extends BasePage {
    columnHeaderItem(columnName: string) { return cy.xpath(`(//div[@role="columnheader"][@col-id='${columnName}'])`); }

    residentialVCLossLabelCell(categoryName: string, colId = 'label') { 
        return cy.get(`[row-id^='Less ${categoryName}'] [role=gridcell][col-id=${colId}]`); 
    }

    residentialVCLossTotal(categoryName: string) { return this.residentialVCLossLabelCell(categoryName, "total"); }

    residentialVCLossPerSF(categoryName: string) { return this.residentialVCLossLabelCell(categoryName, "psf"); }

    residentialVCLossPerUnit(categoryName: string) { return this.residentialVCLossLabelCell(categoryName, "perUnit"); }

    get includeNOIComparisonCheckbox() { return cy.get("[data-qa^=includeNOIComparison] input"); }

    commercialVCLossLabelCell(categoryName: string, colId = 'label') { 
        return cy.get(`[row-id^='Less ${categoryName} Commercial'] [role=gridcell][col-id=${colId}]`); 
    }

    getCommercialUseVCLossPerUnitCell(categoryName: string) { 
        return this.commercialVCLossLabelCell(categoryName, "perUnit"); 
    }

    getCommercialUseVCLossTotal(categoryName: string) { return this.commercialVCLossLabelCell(categoryName, "total"); }

    getCommercialUseVCLossPerSF(categoryName: string) { return this.commercialVCLossLabelCell(categoryName, "psf"); }

    categoryCellTotal(categoryName: string) {
        return categoryName == enums.PRO_FORMA_TYPES.totalOperatingExpenses 
            ? this.getCategoryElementByType(categoryName, "total").first() 
            : this.getCategoryElementByType(categoryName, "total");
    }

    categoryPSFTotal(categoryName: string) {
        return categoryName == enums.PRO_FORMA_TYPES.totalOperatingExpenses 
            ? this.getCategoryElementByType(categoryName, "psf").first() 
            : this.getCategoryElementByType(categoryName, "psf");
    }

    categoryPerUnitTotal(categoryName: string) {
        return categoryName == enums.PRO_FORMA_TYPES.totalOperatingExpenses 
            ? this.getCategoryElementByType(categoryName, "perUnit").first() 
            : this.getCategoryElementByType(categoryName, "perUnit");
    }

    getCategoryElementByType(categoryName: string, colId: string) {
        return cy.get(`[row-id^='${uppercaseFirstLetterEachWord(categoryName)}'] [role=gridcell][col-id=${colId}]`);
    }

    getCustomCategoryIncomeCell(categoryName: string) {
        return cy.get(`[row-id^='${uppercaseFirstLetterEachWord(categoryName)}'] div`);
    }
}

export default new ProFormaPage();
