import BaseActions from "../../base/base.actions";
import rentReconciliationPage from "../../../pages/income/residential/rentReconciliation.page";
import {numberWithCommas} from "../../../../utils/numbers.utils";

class RentReconciliationActions extends BaseActions{

    /**
     *
     * @param {string} commToBe
     * @returns {RentReconciliationActions}
     */
    verifyIntroCommentary(commToBe) {
        rentReconciliationPage.introCommentary.should("have.text", commToBe);
        return this;
    }

    /**
     *
     * @param {number} bedroomNumber
     * @returns {RentReconciliationActions}
     */
    expandBedroomReconByNumber(bedroomNumber) {
        rentReconciliationPage.getBedReconByBedNumb(bedroomNumber).click();
        return this;
    }


    /**
     *
     * @param {number} bedroomNumber
     * @param {ArrayLike<number>} forecasts
     * @returns {RentReconciliationActions}
     */
    verifyBedroomMinForecastByNumber(bedroomNumber, ...forecasts) {
        const minValue = Math.min(...forecasts);
        const textToBe = `$${numberWithCommas(minValue.toFixed(2))}`;
        rentReconciliationPage.getBedMinForecastByNum(bedroomNumber).should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{numberOfUnits: number | string, bedroomsNumber: number}>} rentRollData
     * @param {ArrayLike<number>} forecasts
     * @returns {RentReconciliationActions}
     */
    verifyBedroomAvgForecastByNumber(rentRollData, ...forecasts) {
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
        const avgValue = forecastSum / rentRollData.numberOfUnits;
        const textToBe = `$${numberWithCommas(avgValue.toFixed(2))}`;
        rentReconciliationPage.getBedAvgForecastByNum(rentRollData.bedroomsNumber).should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {number} bedroomNumber
     * @param {ArrayLike<number>} forecasts
     * @returns {RentReconciliationActions}
     */
    verifyBedroomMaxForecastByNumber(bedroomNumber, ...forecasts) {
        const maxValue = Math.max(...forecasts);
        const textToBe = `$${numberWithCommas(maxValue.toFixed(2))}`;
        rentReconciliationPage.getBedMaxForecastByNum(bedroomNumber).should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {number} bedroomNumber
     * @param {Array<{monthly: number}>} comparables
     * @returns {RentReconciliationActions}
     */
    verifyBedroomMinCompByNumber(bedroomNumber, comparables) {
        const minValue = Math.min(...this.getRentsArray(comparables));
        const textToBe = `$${numberWithCommas(minValue.toFixed(2))}`;
        rentReconciliationPage.getBedMinCompByNum(bedroomNumber).should("have.text", textToBe);
        return this;
    }

    /**
     * @private
     * @param {Array<{monthly: number}>} comparables
     * @returns {Array<number>}
     */
    getRentsArray(comparables) {
        let rentsArray = [];
        comparables.forEach(comp => {
            rentsArray.push(comp.monthly);
        });
        return rentsArray;
    }

    /**
     *
     * @param {number} bedroomNumber
     * @param {Array<{monthly: number}>} comparables
     * @returns {RentReconciliationActions}
     */
    verifyBedroomAvgCompByNumber(bedroomNumber, comparables) {
        let comparableSum = 0;
        const rentsArray = this.getRentsArray(comparables);
        rentsArray.forEach(el => comparableSum += el);
        const avgValue = comparableSum / rentsArray.length;
        const textToBe = `$${numberWithCommas(avgValue.toFixed(2))}`;
        rentReconciliationPage.getBedAvgCompByNum(bedroomNumber).should("have.text", textToBe);
        return this;
    }


    /**
     *
     * @param {number} bedroomNumber
     * @param {Array<{monthly: number}>} comparables
     * @returns {RentReconciliationActions}
     */
    verifyBedroomMaxCompByNumber(bedroomNumber, comparables) {
        const maxValue = Math.max(...this.getRentsArray(comparables));
        const textToBe = `$${numberWithCommas(maxValue.toFixed(2))}`;
        rentReconciliationPage.getBedMaxCompByNum(bedroomNumber).should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {number} bedroomNumber
     * @param {number} conclusionValue
     * @returns {RentReconciliationActions}
     */
    enterBedroomMarketConclusionByNumber(bedroomNumber, conclusionValue) {
        const textToBe = numberWithCommas(conclusionValue);
        rentReconciliationPage.getMarketConclusionBedByNumb(bedroomNumber).clear().type(conclusionValue)
            .should("have.value", textToBe);
        return this;
    }

    /**
     *
     * @param {number} bedroomsNumber
     * @param {string} value
     * @returns {RentReconciliationActions}
     */
    selectBedroomMarketBreakdownBedByNumber(bedroomsNumber, value) {
        rentReconciliationPage.getMarketBreakdownDropBedByNum(bedroomsNumber).click();
        rentReconciliationPage.getDropdownOptionByValue(value).click();
        rentReconciliationPage.getMarketBreakdownBedInputCheckByNum(bedroomsNumber).should("have.value", value);
        return this;
    }

    /**
     *
     * @param {number} bedroomsNumber
     * @param {string} newCommentary
     * @returns {RentReconciliationActions}
     */
    editBedroomCommentaryByBedNum(bedroomsNumber, newCommentary) {
        rentReconciliationPage.getBedCommentaryEditButtonByBedNum(bedroomsNumber).click();
        rentReconciliationPage.getBedCommentaryByBedNum(bedroomsNumber).clear().type(newCommentary)
            .should("have.text", newCommentary);
        return this;
    }
}

export default new RentReconciliationActions();
