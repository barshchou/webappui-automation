import BasePage from "../../base/base.page";

class RentReconciliationPage extends BasePage {
    get introCommentary() { return cy.get("[data-qa*='introduction.commentary']"); }

    getBedReconByBedNumb(number: number) { 
        return cy.get(`[data-qa='bedrooms_${number}-bedroom-rent-reconciliation']`); 
    }

    getBedReconByBedNumContainer(num: number) { return cy.get(`[data-qa^='bedrooms_${num}'][data-qa$='container']`); }

    getBedMinForecastByNum(number: number) { 
        return this.getBedReconByBedNumContainer(number).find("[data-qa$='forecast-min']"); 
    }

    getBedAvgForecastByNum(num: number) { 
        return this.getBedReconByBedNumContainer(num).find("[data-qa$='forecast-avg']"); 
    }

    getBedMaxForecastByNum(num: number) { 
        return this.getBedReconByBedNumContainer(num).find("[data-qa$='forecast-max']"); 
    }

    getBedMinCompByNum(num: number) { 
        return this.getBedReconByBedNumContainer(num).find("[data-qa$='comparables-min']"); 
    }

    getBedAvgCompByNum(num: number) { 
        return this.getBedReconByBedNumContainer(num).find("[data-qa$='comparables-avg']"); 
    }

    getBedMaxCompByNum(num: number) { 
        return this.getBedReconByBedNumContainer(num).find("[data-qa$='comparables-max']"); 
    }

    getMarketConclusionBedByNumb(num: number) { 
        return this.getBedReconByBedNumContainer(num).find("[name$=marketConclusion]"); 
    }

    getMarketBreakdownDropBedByNum(num: number) {
        return this.getBedReconByBedNumContainer(num)
            .find("[data-qa$=marketBreakdown-select-list] [data-qa=select-value]");
    }

    getDropdownOptionByValue(value: string) { return cy.get(`li[role=option][data-value='${value}']`); }

    getMarketBreakdownBedInputCheckByNum(num: number) {
        return this.getBedReconByBedNumContainer(num).find("[data-qa$=marketBreakdown-select-list] input");
    }

    getBedCommentaryEditButtonByBedNum(num: number) {
        return this.getBedReconByBedNumContainer(num).find("[data-qa=generated-commentary-edit-btn]");
    }

    getBedCommentaryByBedNum(num: number) { return this.getBedReconByBedNumContainer(num).find("[name$=commentary]"); }
}

export default new RentReconciliationPage();
