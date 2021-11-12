import BaseActions from "../../base/base.actions";
import rentReconciliationPage from "../../../pages/income/residential/rentReconciliation.page";
import {numberWithCommas} from "../../../../utils/numbers.utils";

class RentReconciliationActions extends BaseActions{
    verifyIntroCommentary(commToBe) {
        rentReconciliationPage.introCommentary.should("have.text", commToBe);
    }

    expandBedroomReconByNumber(bedroomNumber) {
        rentReconciliationPage.getBedReconByBedNumb(bedroomNumber).click();
    }

    verifyBedroomMinForecastByNumber(bedroomNumber, ...forecasts) {
        const minValue = Math.min(forecasts);
        const textToBe = `$${numberWithCommas(minValue.toFixed(2))}`;
        rentReconciliationPage.getBedMinForecastByNum(bedroomNumber).should("have.text", textToBe);
    }

    verifyBedroomAvgForecastByNumber(bedroomNumber, numberOfUnits, ...forecasts) {
        let forecastSum = 0;
        let forecastsArray = [];
        if (forecasts.length === 1 && numberOfUnits !== 1) {
            for (let i = 0; i < numberOfUnits; i++) {
                forecastsArray.push(forecasts[0]);
            }
        } else {
            forecasts.forEach(el => forecastsArray.push(el));
        }
        forecastsArray.forEach(el => forecastSum += el);
        const avgValue = forecastSum / numberOfUnits;
        const textToBe = `$${numberWithCommas(avgValue.toFixed(2))}`;
        rentReconciliationPage.getBedAvgForecastByNum(bedroomNumber).should("have.text", textToBe);
    }

    verifyBedroomMaxForecastByNumber(bedroomNumber, ...forecasts) {
        const maxValue = Math.max(forecasts);
        const textToBe = `$${numberWithCommas(maxValue.toFixed(2))}`;
        rentReconciliationPage.getBedMaxForecastByNum(bedroomNumber).should("have.text", textToBe);
    }

    verifyBedroomMinCompByNumber(bedroomNumber, ...comparableRents) {
        const minValue = Math.min(comparableRents);
        const textToBe = `$${numberWithCommas(minValue.toFixed(2))}`;
        rentReconciliationPage.getBedMinCompByNum(bedroomNumber).should("have.text", textToBe);
    }

    verifyBedroomAvgCompByNumber(bedroomNumber, ...comparableRents) {
        let comparableSum = 0;
        comparableRents.forEach(el => comparableSum += el);
        const avgValue = comparableSum / comparableRents.length;
        const textToBe = `$${numberWithCommas(avgValue.toFixed(2))}`;
        rentReconciliationPage.getBedAvgCompByNum(bedroomNumber).should("have.text", textToBe);
    }

    verifyBedroomMaxCompByNumber(bedroomNumber, ...comparableRents) {
        const maxValue = Math.max(comparableRents);
        const textToBe = `$${numberWithCommas(maxValue.toFixed(2))}`;
        rentReconciliationPage.getBedMaxCompByNum(bedroomNumber).should("have.text", textToBe);
    }

    enterBedroomMarketConclusionByNumber(bedroomNumber, conclusionValue) {
        const textToBe = numberWithCommas(conclusionValue);
        rentReconciliationPage.getMarketConclusionBedByNumb(bedroomNumber).clear().type(conclusionValue)
            .should("have.value", textToBe);
    }
}

export default new RentReconciliationActions();