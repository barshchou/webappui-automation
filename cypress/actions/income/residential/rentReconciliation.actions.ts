import rentReconciliationPage from "../../../pages/income/residential/rentReconciliation.page";
import { numberWithCommas } from "../../../../utils/numbers.utils";
import BaseActionsExt from "../../base/base.actions.ext";

class RentReconciliationActions extends BaseActionsExt<typeof rentReconciliationPage>{

     verifyIntroCommentary(commToBe: string): RentReconciliationActions {
        rentReconciliationPage.introCommentary.should("have.text", commToBe);
        return this;
    }

    expandBedroomReconByNumber(bedroomNumber: number): RentReconciliationActions {
        rentReconciliationPage.getBedReconByBedNumb(bedroomNumber).click();
        return this;
    }

    verifyBedroomMinForecastByNumber(bedroomNumber: number, ...forecasts: Array<number>): RentReconciliationActions {
        const minValue = Math.min(...forecasts);
        const textToBe = `$${numberWithCommas(minValue.toFixed(2))}`;
        rentReconciliationPage.getBedMinForecastByNum(bedroomNumber).should("have.text", textToBe);
        return this;
    }

    verifyBedroomAvgForecastByNumber(rentRollData: Readonly<{numberOfUnits: number | string, bedroomsNumber: number}>, 
        ...forecasts: Array<number>): RentReconciliationActions {
        let forecastSum = 0;
        let forecastsArray = [];
        if (forecasts.length === 1 && rentRollData.numberOfUnits !== 1) {
            for (let i = 0; i < rentRollData.numberOfUnits; i++) {
                forecastsArray.push(forecasts[0]);
            }
        } else {
            forecasts.forEach(el => forecastsArray.push(el));
        }
        forecastsArray.forEach(el => forecastSum += el);
        const avgValue = forecastSum / Number(rentRollData.numberOfUnits);
        const textToBe = `$${numberWithCommas(avgValue.toFixed(2))}`;
        rentReconciliationPage.getBedAvgForecastByNum(rentRollData.bedroomsNumber).should("have.text", textToBe);
        return this;
    }

    verifyBedroomMaxForecastByNumber(bedroomNumber: number, ...forecasts: Array<number>): RentReconciliationActions {
        const maxValue = Math.max(...forecasts);
        const textToBe = `$${numberWithCommas(maxValue.toFixed(2))}`;
        rentReconciliationPage.getBedMaxForecastByNum(bedroomNumber).should("have.text", textToBe);
        return this;
    }

    verifyBedroomMinCompByNumber(bedroomNumber: number, comparables: Array<{monthly: number}>): RentReconciliationActions {
        const minValue = Math.min(...this.getRentsArray(comparables));
        const textToBe = `$${numberWithCommas(minValue.toFixed(2))}`;
        rentReconciliationPage.getBedMinCompByNum(bedroomNumber).should("have.text", textToBe);
        return this;
    }

     private getRentsArray(comparables: Array<{monthly: number}>): Array<number> {
        let rentsArray = [];
        comparables.forEach(comp => {
            rentsArray.push(comp.monthly);
        });
        return rentsArray;
    }

    verifyBedroomAvgCompByNumber(bedroomNumber: number, comparables: Array<{monthly: number}>): RentReconciliationActions {
        let comparableSum = 0;
        const rentsArray = this.getRentsArray(comparables);
        rentsArray.forEach(el => comparableSum += el);
        const avgValue = comparableSum / rentsArray.length;
        const textToBe = `$${numberWithCommas(avgValue.toFixed(2))}`;
        rentReconciliationPage.getBedAvgCompByNum(bedroomNumber).should("have.text", textToBe);
        return this;
    }

    verifyBedroomMaxCompByNumber(bedroomNumber: number, comparables: Array<{monthly: number}>): RentReconciliationActions {
        const maxValue = Math.max(...this.getRentsArray(comparables));
        const textToBe = `$${numberWithCommas(maxValue.toFixed(2))}`;
        rentReconciliationPage.getBedMaxCompByNum(bedroomNumber).should("have.text", textToBe);
        return this;
    }

    enterBedroomMarketConclusionByNumber(bedroomNumber: number, conclusionValue: number): RentReconciliationActions {
        const textToBe = numberWithCommas(conclusionValue);
        rentReconciliationPage.getMarketConclusionBedByNumb(bedroomNumber).clear().type(`${conclusionValue}`)
            .should("have.value", textToBe);
        return this;
    }

    selectBedroomMarketBreakdownBedByNumber(bedroomsNumber: number, value: string): RentReconciliationActions {
        rentReconciliationPage.getMarketBreakdownDropBedByNum(bedroomsNumber).click();
        rentReconciliationPage.getDropdownOptionByValue(value).click();
        rentReconciliationPage.getMarketBreakdownBedInputCheckByNum(bedroomsNumber).should("have.value", value);
        return this;
    }

    editBedroomCommentaryByBedNum(bedroomsNumber: number, newCommentary: string): RentReconciliationActions {
        rentReconciliationPage.getBedCommentaryEditButtonByBedNum(bedroomsNumber).click();
        rentReconciliationPage.getBedCommentaryByBedNum(bedroomsNumber).clear().type(newCommentary)
            .should("have.text", newCommentary);
        return this;
    }
}

export default new RentReconciliationActions(rentReconciliationPage);
