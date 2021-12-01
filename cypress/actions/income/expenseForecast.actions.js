import BaseActions from "../base/base.actions";
import expenseForecastPage from "../../pages/income/expenseForecast.page";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../utils/numbers.utils";

class ExpenseForecastActions extends BaseActions {

    chooseForecastItemBasis(item, value) {
        expenseForecastPage.getForecastItemBasisRadio(item).check(value);
        expenseForecastPage.getElementToCheckRadio(item, value).should("exist");
    }

    enterForecastItemForecast(item, forecast) {
        const valueToBe = `$${numberWithCommas(forecast)}`;
        expenseForecastPage.getForecastItemForecastInput(item).clear().type(forecast).should("have.value", valueToBe);
    }

    getAverageValue(...compsValues) {
        let arr = Array.from(compsValues);
        cy.log(arr.toString());
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += Number(arr[i]);
            cy.log(`Current sum value for average: ${sum}`);
        }
        return sum / arr.length;
    }

    getPerUnitValue(numberOfUnits, forecastItem) {
        return Math.round(forecastItem / numberOfUnits);
    }

    getPerSFValue(squareFeet, forecastItem) {
        return (forecastItem / squareFeet).toFixed(2);
    }

    getPerSFArray(forecastItem, comps) {
        let arr = [];
        comps.forEach(comp => arr.push(this.getPerSFValue(comp.squareFeet, getNumberFromDollarNumberWithCommas(comp[forecastItem]))));
        return arr;
    }

    getPerUnitArray(forecastItem, comps) {
        let arr = [];
        comps.forEach(comp => {
            let numberToPush;
            if (forecastItem === "toe") {
                let toeNumber = getNumberFromDollarNumberWithCommas(comp.toe);
                numberToPush = (toeNumber / comp.resUnits).toFixed(2);
            } else {
                numberToPush = this.getPerUnitValue(comp.resUnits, comp[forecastItem]);
            }
            arr.push(numberToPush);
        });
        return arr;
    }

    verifyForecastItemCompMin(item, basisValue, comparables) {
        let minValueToBe;
        if (basisValue === "unit") {
            minValueToBe = Math.min(...this.getPerUnitArray(item, comparables));
        } else {
            minValueToBe = Math.min(...this.getPerSFArray(item, comparables));
        }
        expenseForecastPage.getForecastItemCompMin(this.getItemNameForAverage(item))
            .should("contain.text", `$${numberWithCommas(minValueToBe)}`);
    }

    verifyForecastItemCompAverage(item, basisValue, comparables) {
        let avgValueToBe;
        if (basisValue === "unit") {
            cy.log(`Forecast item ${item.toString()} average function`);
            avgValueToBe = Math.round(this.getAverageValue(...this.getPerUnitArray(item, comparables)));
        } else {
            avgValueToBe = (this.getAverageValue(...this.getPerSFArray(item, comparables))).toFixed(2);
        }
        expenseForecastPage.getForecastItemCompAvg(this.getItemNameForAverage(item))
            .should("contain.text", `$${numberWithCommas(avgValueToBe)}`);
    }

    verifyForecastItemCompMax(item, basisValue, comparables) {
        let maxValueToBe;
        if (basisValue === "unit") {
            maxValueToBe = Math.max(...this.getPerUnitArray(item, comparables));
        } else {
            maxValueToBe = Math.max(...this.getPerSFArray(item, comparables));
        }
        expenseForecastPage.getForecastItemCompMax(this.getItemNameForAverage(item))
            .should("contain.text", `$${numberWithCommas(maxValueToBe)}`);
    }

    verifyForecastItemBasisMoney(item, basisValue, numberOfUnits, grossArea, forecastValue) {
        let textToBe;
        if (basisValue === "unit") {
            textToBe = `Per SF: $${numberWithCommas((forecastValue / (grossArea / numberOfUnits)).toFixed(2))}`;
        } else {
            textToBe = `Per Unit: $${numberWithCommas(Math.round(forecastValue * grossArea / numberOfUnits))}`;
        }
        expenseForecastPage.getForecastItemBasisMoneyValue(this.getItemNameForAverage(item)).should("have.text", textToBe);
    }

    verifyForecastItemOwnerProjection(item, basisValue, itemProjection, numberOfUnits, grossArea) {
        let numberToBe;
        if (basisValue === "unit") {
            numberToBe = numberWithCommas(Math.round(itemProjection / numberOfUnits));
        } else {
            numberToBe = numberWithCommas((itemProjection / grossArea).toFixed(2));
        }
        expenseForecastPage.getForecastItemProjection(this.getItemNameForAverage(item))
            .should("have.text", `Owner's Projection: $${numberToBe}`);
    }

    getItemNameForAverage(itemOriginal) {
        switch (itemOriginal) {
            case "waterAndSewer":
                return "waterSewer";
            case "repairsAndMaintenance":
                return "repairsMaintenance";
            case "payrollAndBenefits":
                return "payrollBenefits";
            case "generalAndAdministrative":
                return "generalAdministrative";
            case "legalAndProfessionalFees":
                return "legalProfessionalFees";
            case "management":
                return "managementFees";
            case "reserves":
                return "replacementReserves";
            default:
                return itemOriginal;
        }
    }

    checkPercentOfEGICheckbox() {
        expenseForecastPage.inputPercentOfEGICheckbox.check().should("have.value", "true");
    }

    enterPercentOfEgi(value) {
        expenseForecastPage.percentOfEgiInput.clear().type(value).should("have.value", value);
    }

    verifyManagementForecast(forecastNumber) {
        const valueToBe = `$${numberWithCommas(forecastNumber)}`;
        expenseForecastPage.getForecastItemForecastInput("management").should("have.value", valueToBe);
    }

    getManagementForecastEgiPercent(basisValue, percentOfEgi, effectiveGrossIncome, numberOfUnits, grossArea) {
        let perBasisEgi;
        if (basisValue === "unit") {
            perBasisEgi = effectiveGrossIncome / numberOfUnits;
        } else {
            perBasisEgi = effectiveGrossIncome / grossArea;
        }
        return  (perBasisEgi / 100 * percentOfEgi).toFixed(2);
    }

    verifyToeCompMinPerBasis(basisValue, comparables) {
        let numberToBe;
        if (basisValue === "unit") {
            numberToBe = Math.min(...this.getPerUnitArray("toe", comparables));
        } else {
            numberToBe = Math.min(...this.getPerSFArray("toe", comparables));
        }
        const textToBe = `Comp Min: $${numberWithCommas(numberToBe)}`;
        expenseForecastPage.toeCompMin.should("have.text", textToBe);
    }

    verifyToeCompAvgPerBasis(basisValue, comparables) {
        let numberToBe;
        if (basisValue === "unit") {
            cy.log("Toe average function");
            numberToBe = (this.getAverageValue(...this.getPerUnitArray("toe", comparables))).toFixed(2);
        } else {
            numberToBe = (this.getAverageValue(...this.getPerSFArray("toe", comparables))).toFixed(2);
        }
        const textToBe = `Comp Avg: $${numberWithCommas(numberToBe)}`;
        expenseForecastPage.toeCompAvg.should("have.text", textToBe);
    }

    verifyToeCompMaxPerBasis(basisValue, comparables) {
        let numberToBe;
        if (basisValue === "unit") {
            numberToBe = Math.max(...this.getPerUnitArray("toe", comparables));
        } else {
            numberToBe = Math.max(...this.getPerSFArray("toe", comparables));
        }
        const textToBe = `Comp Max: $${numberWithCommas(numberToBe)}`;
        expenseForecastPage.toeCompMax.should("have.text", textToBe);
    }

    verifyOwnersProFormaValue() {
        expenseForecastPage.allProjections.then(elements => {
            let sum = 0;
            for (let i = 0; i < elements.length; i++) {
                let elTextArr = elements[i].textContent.split(": ");
                let elNumber = getNumberFromDollarNumberWithCommas(elTextArr[1]);
                sum += elNumber;
            }
            const textToBe = `Owner's Pro Forma: $${numberWithCommas(sum.toFixed(2))}`;
            expenseForecastPage.toeOwnerProjection.should("have.text", textToBe);
        });
    }

    verifyTotalForecast() {
        expenseForecastPage.allForecastsInputs.then(elements => {
            let sum = 0;
            for (let i = 0; i < elements.length; i++) {
                let elNumber = getNumberFromDollarNumberWithCommas(elements[i].getAttribute("value"));
                sum += elNumber;
            }
            const textToBe = `Appraiser's Forecast: $${numberWithCommas(sum.toFixed(2))}`;
            expenseForecastPage.appraisersTotalForecast.should("have.text", textToBe);
        });
    }
}

export default new ExpenseForecastActions();