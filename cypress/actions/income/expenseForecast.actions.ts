import BaseActions from "../base/base.actions";
import expenseForecastPage from "../../pages/income/expenseForecast.page";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../utils/numbers.utils";

type ForecastItem = Readonly<{ name: string, basis: string, forecast?: number, projection?: number }>;

class ExpenseForecastActions extends BaseActions {

    chooseForecastItemBasis(forecastItem: ForecastItem): ExpenseForecastActions {
        expenseForecastPage.getForecastItemBasisRadio(forecastItem.name).check(forecastItem.basis);
        this.verifyForecastItemBasis(forecastItem);
        return this;
    }

    verifyForecastItemBasis(forecastItem: ForecastItem): ExpenseForecastActions {
        expenseForecastPage.getElementToCheckRadio(forecastItem.name, forecastItem.basis).should("exist");
        return this;
    }

    enterForecastItemForecast(forecastItem: ForecastItem): ExpenseForecastActions {
        const valueToBe = `$${numberWithCommas(forecastItem.forecast)}`;
        expenseForecastPage.getForecastItemForecastInput(forecastItem.name).clear()
            .type(`${forecastItem.forecast}`).should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {string | number} compsValues
     * @returns {number}
     */
    getAverageValue(...compsValues) {
        let arr = Array.from(compsValues);
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += Number(arr[i]);
        }
        return sum / arr.length;
    }

    /**
     * @private
     * @param {number} numberOfUnits
     * @param {number} forecastItemValue
     * @returns {number}
     */
    getPerUnitValue(numberOfUnits, forecastItemValue) {
        return Math.round(forecastItemValue / numberOfUnits);
    }

    /**
     * @private
     * @param {number} squareFeet
     * @param {number} forecastItemValue
     * @returns {string}
     */
    getPerSFValue(squareFeet, forecastItemValue) {
        return (forecastItemValue / squareFeet).toFixed(2);
    }

    /**
     * @private
     * @param {string} forecastItemName
     * @param {Array<{address: string, location: string, period: string, squareFeet: number, resUnits: number,
     * insurance: number, electricity: number, repairsAndMaintenance: number, payrollAndBenefits: number,
     * generalAndAdministrative: number, management: number, toe: string}>} comps
     * @returns {Array<string, number>}
     */
    getPerSFArray(forecastItemName, comps) {
        let arr = [];
        comps.forEach(comp => arr.push(this.getPerSFValue(comp.squareFeet, getNumberFromDollarNumberWithCommas(comp[forecastItemName]))));
        return arr;
    }

    /**
     * @private
     * @param {string} forecastItemName
     * @param {Array<{address: string, location: string, period: string, squareFeet: number, resUnits: number,
     * insurance: number, electricity: number, repairsAndMaintenance: number, payrollAndBenefits: number,
     * generalAndAdministrative: number, management: number, toe: string}>} comps
     * @returns {Array<number>}
     */
    getPerUnitArray(forecastItemName, comps) {
        let arr = [];
        comps.forEach(comp => {
            let numberToPush;
            if (forecastItemName === "toe") {
                let toeNumber = getNumberFromDollarNumberWithCommas(comp.toe);
                numberToPush = (toeNumber / comp.resUnits).toFixed(2);
            } else {
                numberToPush = this.getPerUnitValue(comp.resUnits, comp[forecastItemName]);
            }
            arr.push(numberToPush);
        });
        return arr;
    }

    /**
     *
     * @param {Readonly<{name: string, basis: string, [forecast]: number | string}>} forecastItem
     * @param {Array<{address: string, location: string, period: string, squareFeet: number, resUnits: number,
     * insurance: number, electricity: number, repairsAndMaintenance: number, payrollAndBenefits: number,
     * generalAndAdministrative: number, management: number, toe: string}>} comparables
     * @returns {ExpenseForecastActions}
     */
    verifyForecastItemCompMin(forecastItem, comparables) {
        let minValueToBe;
        if (forecastItem.basis === "unit") {
            minValueToBe = Math.min(...this.getPerUnitArray(forecastItem.name, comparables));
        } else {
            minValueToBe = Math.min(...this.getPerSFArray(forecastItem.name, comparables));
        }
        expenseForecastPage.getForecastItemCompMin(this.getItemNameForAverage(forecastItem.name))
            .should("contain.text", `$${numberWithCommas(minValueToBe)}`);
        return this;
    }

    /**
     *
     * @param {Readonly<{name: string, basis: string, [forecast]: number | string}>} forecastItem
     * @param {Array<{address: string, location: string, period: string, squareFeet: number, resUnits: number,
     * insurance: number, electricity: number, repairsAndMaintenance: number, payrollAndBenefits: number,
     * generalAndAdministrative: number, management: number, toe: string}>} comparables
     * @returns {ExpenseForecastActions}
     */
    verifyForecastItemCompAverage(forecastItem, comparables) {
        let avgValueToBe;
        if (forecastItem.basis === "unit") {
            avgValueToBe = Math.round(this.getAverageValue(...this.getPerUnitArray(forecastItem.name, comparables)));
        } else {
            avgValueToBe = (this.getAverageValue(...this.getPerSFArray(forecastItem.name, comparables))).toFixed(2);
        }
        expenseForecastPage.getForecastItemCompAvg(this.getItemNameForAverage(forecastItem.name))
            .should("contain.text", `$${numberWithCommas(avgValueToBe)}`);
        return this;
    }

    /**
     *
     * @param {Readonly<{name: string, basis: string, [forecast]: number | string}>} forecastItem
     * @param {Array<{address: string, location: string, period: string, squareFeet: number, resUnits: number,
     * insurance: number, electricity: number, repairsAndMaintenance: number, payrollAndBenefits: number,
     * generalAndAdministrative: number, management: number, toe: string}>} comparables
     * @returns {ExpenseForecastActions}
     */
    verifyForecastItemCompMax(forecastItem, comparables) {
        let maxValueToBe;
        if (forecastItem.basis === "unit") {
            maxValueToBe = Math.max(...this.getPerUnitArray(forecastItem.name, comparables));
        } else {
            maxValueToBe = Math.max(...this.getPerSFArray(forecastItem.name, comparables));
        }
        expenseForecastPage.getForecastItemCompMax(this.getItemNameForAverage(forecastItem.name))
            .should("contain.text", `$${numberWithCommas(maxValueToBe)}`);
        return this;
    }

    /**
     *
     * @param {Readonly<{name: string, basis: string, forecast: number | undefined}>} forecastItem
     * @param {Readonly<{grossArea: number, numberOfUnits: number}>} currentDescription
     * @param {string} [forecastEgi]
     * @returns {ExpenseForecastActions}
     */
    verifyForecastItemBasisMoney(forecastItem, currentDescription, forecastEgi) {
        let forecastToBe;
        if (forecastEgi) {
            forecastToBe = forecastEgi;
        } else {
            forecastToBe = forecastItem.forecast;
        }
        let textToBe;
        if (forecastItem.basis === "unit") {
            textToBe = `Per SF: $${numberWithCommas((forecastToBe / 
                (currentDescription.grossArea / currentDescription.numberOfUnits)).toFixed(2))}`;
        } else {
            textToBe = `Per Unit: $${numberWithCommas(Math.round(forecastToBe * 
                currentDescription.grossArea / currentDescription.numberOfUnits))}`;
        }
        expenseForecastPage.getForecastItemBasisMoneyValue(this.getItemNameForAverage(forecastItem.name))
            .should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{name: string, basis: string, projection: number}>} forecastItem
     * @param {Readonly<{grossArea: number, numberOfUnits: number}>} currentDescription
     * @returns {ExpenseForecastActions}
     */
    verifyForecastItemOwnerProjection(forecastItem, currentDescription) {
        let numberToBe;
        if (forecastItem.basis === "unit") {
            numberToBe = numberWithCommas(Math.round(forecastItem.projection / currentDescription.numberOfUnits));
        } else {
            numberToBe = numberWithCommas((forecastItem.projection / currentDescription.grossArea).toFixed(2));
        }
        expenseForecastPage.getForecastItemProjectionByType(this.getItemNameForAverage(forecastItem.name), "Owner's Projection")
            .should("contain.text", `$${numberToBe}`);
        return this;
    }

    /**
     * @private
     * @param {string} itemOriginal
     * @returns {string}
     */
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

    /**
     *
     * @returns {ExpenseForecastActions}
     */
    checkPercentOfEGICheckbox() {
        expenseForecastPage.inputPercentOfEGICheckbox.check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {string | number} value
     * @returns {ExpenseForecastActions}
     */
    enterPercentOfEgi(value) {
        expenseForecastPage.percentOfEgiInput.clear().type(value).should("have.value", value);
        return this;
    }

    /**
     *
     * @param {string} forecastNumber
     * @returns {ExpenseForecastActions}
     */
    verifyManagementForecast(forecastNumber) {
        const valueToBe = `$${numberWithCommas(forecastNumber)}`;
        expenseForecastPage.getForecastItemForecastInput("management").should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{effectiveGrossIncome: number, management: {basis: string}, percentOfEgi: number}>} expenseForecastData
     * @param {Readonly<{grossArea: number, numberOfUnits: number}>} currentDescription
     * @returns {string}
     */
    getManagementForecastEgiPercent(expenseForecastData, currentDescription) {
        let perBasisEgi;
        if (expenseForecastData.management.basis === "unit") {
            perBasisEgi = expenseForecastData.effectiveGrossIncome / currentDescription.numberOfUnits;
        } else {
            perBasisEgi = expenseForecastData.effectiveGrossIncome / currentDescription.grossArea;
        }
        return (perBasisEgi / 100 * expenseForecastData.percentOfEgi).toFixed(2);
    }

    /**
     *
     * @param {string} basisValue
     * @param {Array<{address: string, location: string, period: string, squareFeet: number, resUnits: number,
     * insurance: number, electricity: number, repairsAndMaintenance: number, payrollAndBenefits: number,
     * generalAndAdministrative: number, management: number, toe: string}>} comparables
     * @returns {ExpenseForecastActions}
     */
    verifyToeCompMinPerBasis(basisValue, comparables) {
        let numberToBe;
        if (basisValue === "unit") {
            numberToBe = Math.min(...this.getPerUnitArray("toe", comparables));
        } else {
            numberToBe = Math.min(...this.getPerSFArray("toe", comparables));
        }
        const textToBe = `Comp Min: $${numberWithCommas(numberToBe)}`;
        expenseForecastPage.toeCompMin.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} basisValue
     * @param {Array<{address: string, location: string, period: string, squareFeet: number, resUnits: number,
     * insurance: number, electricity: number, repairsAndMaintenance: number, payrollAndBenefits: number,
     * generalAndAdministrative: number, management: number, toe: string}>} comparables
     * @returns {ExpenseForecastActions}
     */
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
        return this;
    }

    /**
     *
     * @param {string} basisValue
     * @param {Array<{address: string, location: string, period: string, squareFeet: number, resUnits: number,
     * insurance: number, electricity: number, repairsAndMaintenance: number, payrollAndBenefits: number,
     * generalAndAdministrative: number, management: number, toe: string}>} comparables
     * @returns {ExpenseForecastActions}
     */
    verifyToeCompMaxPerBasis(basisValue, comparables) {
        let numberToBe;
        if (basisValue === "unit") {
            numberToBe = Math.max(...this.getPerUnitArray("toe", comparables));
        } else {
            numberToBe = Math.max(...this.getPerSFArray("toe", comparables));
        }
        const textToBe = `Comp Max: $${numberWithCommas(numberToBe)}`;
        expenseForecastPage.toeCompMax.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @returns {ExpenseForecastActions}
     */
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
        return this;
    }

    /**
     *
     * @returns {ExpenseForecastActions}
     */
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
        return this;
    }

    /**
     * @param {string} textToBe
     * @returns {ExpenseForecastActions}
     */
    verifyTOECommentary(textToBe) {
        expenseForecastPage.toeCommentary.should("contain.text", textToBe);
        return this;
    }

    editTOECommentary(newText, isWithClear = false) {
        expenseForecastPage.toeCommentaryEditButton.click();
        if (isWithClear) {
            expenseForecastPage.toeCommentary.clear();
        }
        expenseForecastPage.toeCommentary.type(newText);
        expenseForecastPage.toeCommentarySaveButton.click();
        expenseForecastPage.toeCommentaryModified.should("exist");
        return this;
    }
}

export default new ExpenseForecastActions();