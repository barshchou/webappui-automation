import expenseForecastPage from "../../pages/income/expenseForecast.page";
import { getNumberFromDollarNumberWithCommas, numberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

type ForecastItem = BoweryReports.ForecastItem;
type BuildingDescription = BoweryReports.BuildingDescription;
type Comparable = BoweryReports.Comparable;

class ExpenseForecastActions extends BaseActionsExt<typeof expenseForecastPage> {
    
    chooseForecastItemBasis(forecastItem: ForecastItem): ExpenseForecastActions {
        expenseForecastPage.getForecastItemBasisRadio(forecastItem.name).check(forecastItem.basis);
        this.verifyForecastItemBasis(forecastItem);
        return this;
    }

    verifyForecastItemBasis(forecastItem: ForecastItem): ExpenseForecastActions {
        expenseForecastPage.getElementToCheckRadio(forecastItem.name, forecastItem.basis).should("exist");
        return this;
    }

    enterForecastItemForecast(forecastItem: ForecastItem, customCategory = false, index = 0): ExpenseForecastActions {
        const valueToBe = `$${numberWithCommas(forecastItem.forecast)}`;
        if (forecastItem.name != "total") {
            expenseForecastPage.getForecastItemForecastInput(forecastItem.name, customCategory, index).clear()
            .type(`${forecastItem.forecast}`).should("have.value", valueToBe);
        }
        return this;
    }

    getAverageValue(...compsValues: Array<string | number>): number {
        let arr = Array.from(compsValues);
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += Number(arr[i]);
        }
        return sum / arr.length;
    }

    private getPerUnitValue(numberOfUnits: number, forecastItemValue: number): number {
        return Math.round(forecastItemValue / numberOfUnits);
    }

    private getPerSFValue(squareFeet: number, forecastItemValue: number): string {
        return (forecastItemValue / squareFeet).toFixed(2);
    }

    private getPerSFArray(forecastItemName: string, comps: Array<Comparable>): Array<number> {
        let arr = [];
        comps.forEach(comp => arr.push(this.getPerSFValue(comp.squareFeet, getNumberFromDollarNumberWithCommas(comp[forecastItemName]))));
        return arr;
    }

    private getPerUnitArray(forecastItemName: string, comps: Array<Comparable>): Array<number> {
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

    verifyForecastItemCompMin(forecastItem: ForecastItem, comparables: Array<Comparable>): ExpenseForecastActions {
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

    verifyForecastItemCompAverage(forecastItem: ForecastItem, comparables: Array<Comparable>): ExpenseForecastActions {
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

    verifyForecastItemCompMax(forecastItem: ForecastItem, comparables: Array<Comparable>): ExpenseForecastActions {
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

    verifyForecastItemBasisMoney(forecastItem: ForecastItem, currentDescription: BuildingDescription,
                                 forecastEgi?: string): ExpenseForecastActions {
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

    verifyForecastItemByExpensePeriodType(forecastItem: ForecastItem, buildingDescription: BuildingDescription,
                                          expensePeriodType: string): ExpenseForecastActions {
        let numberToBe;
        if (forecastItem.basis === "unit") {
            numberToBe = numberWithCommas(Math.round(forecastItem.projection / buildingDescription.numberOfUnits));
        } else {
            numberToBe = numberWithCommas((forecastItem.projection / buildingDescription.grossArea).toFixed(2));
        }
        expenseForecastPage.getForecastItemProjectionByType(this.getItemNameForAverage(forecastItem.name), expensePeriodType)
            .should("contain.text", `$${numberToBe}`);
        return this;
    }

    private getItemNameForAverage(itemOriginal: string): string {
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

    checkPercentOfEGICheckbox(): ExpenseForecastActions {
        expenseForecastPage.inputPercentOfEGICheckbox.check().should("have.value", "true");
        return this;
    }

    enterPercentOfEgi(value: number): ExpenseForecastActions {
        expenseForecastPage.percentOfEgiInput.clear().type(`${value}`).should("have.value", value);
        return this;
    }

    verifyManagementForecast(forecastNumber: string): ExpenseForecastActions {
        const valueToBe = `$${numberWithCommas(forecastNumber)}`;
        expenseForecastPage.getForecastItemForecastInput("management").should("have.value", valueToBe);
        return this;
    }

    getManagementForecastEgiPercent(expenseForecastData: ForecastItem, effectiveGrossIncomeData: number, percentOfEgi: number, currentDescription: BuildingDescription): string {
        let perBasisEgi;
        if (expenseForecastData.basis === "unit") {
            perBasisEgi = effectiveGrossIncomeData / currentDescription.numberOfUnits;
        } else {
            perBasisEgi = effectiveGrossIncomeData / currentDescription.grossArea;
        }
        return (perBasisEgi / 100 * percentOfEgi).toFixed(2);
    }

    verifyToeCompMinPerBasis(basisValue: string, comparables: Array<Comparable>): ExpenseForecastActions {
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

    verifyToeCompAvgPerBasis(basisValue: string, comparables: Array<Comparable>): ExpenseForecastActions {
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

    verifyToeCompMaxPerBasis(basisValue: string, comparables: Array<Comparable>): ExpenseForecastActions {
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

    verifyOwnersProFormaValue(): ExpenseForecastActions {
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

    verifyTotalForecast(): ExpenseForecastActions {
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

    verifyTOECommentary(textToBe: string): ExpenseForecastActions {
        expenseForecastPage.toeCommentary.should("contain.text", textToBe);
        return this;
    }

    verifyForecastCommentary(textToBe: string, forecastItem: BoweryReports.ForecastItem): ExpenseForecastActions {
        expenseForecastPage.getExpenseCommentary(this.getItemNameForAverage(forecastItem.name)).should("contain.text", textToBe);
        return this;
    }

    editTOECommentary(newText: string, isWithClear = false): ExpenseForecastActions {
        expenseForecastPage.toeCommentaryEditButton.click();
        if (isWithClear) {
            expenseForecastPage.toeCommentary.clear();
        }
        expenseForecastPage.toeCommentary.type(newText);
        expenseForecastPage.toeCommentarySaveButton.click();
        expenseForecastPage.toeCommentaryModified.should("exist");
        return this;
    }

    editExpenseForecastCommentary(newText: string, forecastItem: BoweryReports.ForecastItem, isWithClear = false, ): ExpenseForecastActions {
        let item = this.getItemNameForAverage(forecastItem.name);
        expenseForecastPage.getExpenseCommentaryEditButton(item).click();
        if (isWithClear) {
            expenseForecastPage.getExpenseCommentary(item).clear();
        }
        expenseForecastPage.getExpenseCommentary(item).type(newText);
        expenseForecastPage.getExpenseCommentarySaveButton(item).click();
        expenseForecastPage.getExpenseCommentaryModified(item).should("exist");
        return this;
    }

    revertToOriginalExpenseForecastCommentary(forecastItem: BoweryReports.ForecastItem): ExpenseForecastActions {
        let item = this.getItemNameForAverage(forecastItem.name);
        expenseForecastPage.getExpenseCommentaryEditButton(item).click();
        expenseForecastPage.getExpenseCommentaryRevertToOriginal(item).click();
        this.verifyProgressBarNotExist();
        expenseForecastPage.expenseConfirmRevertButton.click();
        expenseForecastPage.getExpenseCommentarySaveButton(item).click();
        return this;
    }

    switchExpenseForecastBasis(forecastItem: ForecastItem): ExpenseForecastActions {
        expenseForecastPage.getElementBasisToSwitch(forecastItem.name, forecastItem.basis).click();
        return this;
    }

    hideExpenseForecastHeader(): ExpenseForecastActions {
        // ernst: A few hacks to get clear Insurance_Forecast_Item component without overlayed headers
        cy.log('hide');
        if(Cypress.browser.isHeadless == true){
            expenseForecastPage.Header.then(elem => {
                elem.hide();
            });
            expenseForecastPage.expenseForecastHeader.then(elem => {
                elem.hide();
            });
        }
        return this;
    }

    addCustomExpenseCategory(categoryName): ExpenseForecastActions {
        expenseForecastPage.createNewCategoryButton.click();
        expenseForecastPage.newCategoryExpenseName.clear().type(categoryName);
        this.Page.formSaveBtn(1).click();
        this.verifyProgressBarNotExist();
        return this;
    }
}

export default new ExpenseForecastActions(expenseForecastPage);