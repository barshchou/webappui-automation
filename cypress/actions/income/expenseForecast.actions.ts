import expenseForecastPage from "../../pages/income/expenseForecast.page";
import { getNumberFromDollarNumberWithCommas, numberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { Alias } from "../../utils/alias.utils";
import { BoweryReports } from "../../types/boweryReports.type";
import enums from "../../enums/enums";

type ForecastItem = BoweryReports.ForecastItem;
type BuildingDescription = BoweryReports.BuildingDescription;
type Comparable = BoweryReports.Comparable;

class ExpenseForecastActions extends BaseActionsExt<typeof expenseForecastPage> {

    chooseForecastItemBasis(forecastItem: ForecastItem, customCategory = false, index = 0): ExpenseForecastActions {
        let expenseName = customCategory ? `customExpenses[${index}]` : forecastItem.name;
        expenseForecastPage.getForecastItemBasisRadio(expenseName).check(forecastItem.basis);
        this.verifyForecastItemBasis(forecastItem, customCategory, index);
        return this;
    }

    verifyForecastItemBasis(forecastItem: ForecastItem, customCategory = false, index = 0): ExpenseForecastActions {
        let expenseName = customCategory ? `customExpenses[${index}]` : forecastItem.name;
        expenseForecastPage.getElementToCheckRadio(expenseName, forecastItem.basis).should("exist");
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
        comps.forEach(comp => 
            arr.push(this.getPerSFValue(comp.squareFeet, getNumberFromDollarNumberWithCommas(comp[forecastItemName]))));
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
        expensePeriodType: string, toeCard = false): ExpenseForecastActions {
        let numberToBe;
        if (forecastItem.basis === "unit") {
            numberToBe = numberWithCommas(Math.round(forecastItem.projection / buildingDescription.numberOfUnits));
        } else {
            numberToBe = numberWithCommas((forecastItem.projection / buildingDescription.grossArea).toFixed(2));
        }
        expenseForecastPage.getForecastItemProjectionByType(this.getItemNameForAverage(forecastItem.name), 
            expensePeriodType, toeCard)
            .should("contain.text", `$${numberToBe}`);
        return this;
    }

    getItemNameForAverage(itemOriginal: string): string {
        return this.itemOriginalObj[`${itemOriginal}`] == undefined
            ? itemOriginal
            : this.itemOriginalObj[`${itemOriginal}`];
    }

    itemOriginalObj = {
        waterAndSewer: enums.EXPENSE_CELL.waterAndSewer,
        repairsAndMaintenance: enums.EXPENSE_CELL.repairAndMaintenance,
        payrollAndBenefits: enums.EXPENSE_CELL.payrollBenefits,
        generalAndAdministrative: enums.EXPENSE_CELL.generalAndAdministrative,
        legalAndProfessionalFees: enums.EXPENSE_CELL.legalAndProfessional,
        management: enums.EXPENSE_CELL.managementFees,
        reserves: enums.EXPENSE_CELL.replacementsAndReserves
    }

    changeStateOfPercentOfEGICheckbox(isToCheck = true): ExpenseForecastActions {
        isToCheck ? expenseForecastPage.inputPercentOfEGICheckbox.check() 
            : expenseForecastPage.inputPercentOfEGICheckbox.uncheck();
        expenseForecastPage.inputPercentOfEGICheckbox.should("have.value", `${isToCheck}`);
        return this;
    }

    changeStateOfIncludeInProFormaCheckbox(forecastItem: string, isToCheck = true): ExpenseForecastActions {
        expenseForecastPage.getCheckboxIncludeInProForma(forecastItem)
            .should("have.value", `${!isToCheck}`).click({ multiple: true }).should("have.value", `${isToCheck}`);
        return this;
    }

    verifyIncludeInProFormaCheckboxIsChecked(forecastItem: string): ExpenseForecastActions {
        expenseForecastPage.getCheckboxIncludeInProForma(forecastItem).should("have.value", "true");
        return this;
    }

    setIncludeInProformaCheckbox(forecastItem: string, check = true): ExpenseForecastActions {
        expenseForecastPage.getCheckboxIncludeInProForma(forecastItem).then(checkbox => {
            if (checkbox.attr('value') !== `${check}`) {
                expenseForecastPage.getCheckboxIncludeInProForma(forecastItem).click();
            }
        });
        return this;
    }

    verifyProFormaTooltip(forecastItem: string): ExpenseForecastActions {
        expenseForecastPage.forecastItemTooltipButton(forecastItem).should("exist");
        expenseForecastPage.tooltip.should('not.exist');
        expenseForecastPage.forecastItemTooltipButton(forecastItem).scrollIntoView().trigger("mouseover", 'right');
        expenseForecastPage.tooltip.should('exist');
        expenseForecastPage.forecastItemTooltipButton(forecastItem).trigger('mouseout', 'right');
        expenseForecastPage.tooltip.should('not.exist');
        return this;
    }

    verifyIncludeInProFormaCheckboxExists(forecastItem: string): ExpenseForecastActions {
        expenseForecastPage.getCheckboxIncludeInProForma(forecastItem).should("exist");
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

    getManagementForecastEgiPercent(expenseForecastData: ForecastItem, effectiveGrossIncomeData: number, 
        percentOfEgi: number, currentDescription: BuildingDescription): string {
        let perBasisEgi: number;
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

    verifyForecastCommentary(textToBe: string, forecastItem: BoweryReports.ForecastItem, 
        index = 1): ExpenseForecastActions {
        expenseForecastPage.getExpenseCommentary(this.getItemNameForAverage(forecastItem.name), index)
            .should("contain.text", textToBe);
        return this;
    }

    editExpenseForecastCommentary(newText: string, forecastItem: BoweryReports.ForecastItem, 
        isWithClear = false, index = 1): ExpenseForecastActions {
        let item = this.getItemNameForAverage(forecastItem.name);
        this.activateTextAreaInput((this.Page.getExpenseCommentary(item,  index)));
        if (isWithClear) {
            expenseForecastPage.getExpenseCommentary(item, index).clear();
        }
        expenseForecastPage.getExpenseCommentary(item, index).type(newText);
        this.inactivateTextAreaInput();
        expenseForecastPage.getExpenseCommentaryModified(item).should("exist");
        return this;
    }

    revertToOriginalExpenseForecastCommentary(forecastItem: BoweryReports.ForecastItem, 
        index = 1): ExpenseForecastActions {
        let item = this.getItemNameForAverage(forecastItem.name);
        this.activateTextAreaInput((this.Page.getExpenseCommentary(item,  index)));
        this.Page.getExpenseCommentaryRevertToOriginal(item, index).click();
        this.verifyProgressBarNotExist();
        expenseForecastPage.formYesRevertBtn.click();
        expenseForecastPage.getExpenseCommentarySaveButton(item).click();
        return this;
    }

    switchExpenseForecastBasis(forecastItem: ForecastItem, customCategory = false, index = 0): ExpenseForecastActions {
        let expenseName = customCategory ? `customExpenses[${index}]` : forecastItem.name;
        expenseForecastPage.getElementBasisToSwitch(expenseName, forecastItem.basis).click();
        return this;
    }

    addCustomExpenseCategory(categoryName: string): ExpenseForecastActions {
        expenseForecastPage.createNewCategoryButton.click();
        expenseForecastPage.newCategoryExpenseName.clear().type(`${categoryName}{downArrow}{enter}`);
        this.Page.formSaveBtn(1).click();
        this.verifyProgressBarNotExist();
        expenseForecastPage.forecastItemCardFull(categoryName).should("exist");
        return this;
    }

    /**
     * 1. Action takes all allForecastsInputs (forecast expense card inputs).
     * 2. In cycle we check all forecast cards does it has checkbox "Include Expense on Pro Forma" or not: 
     * 3. If it does not have checkbox "Include Expense on Pro Forma" - function takes input value, 
     * then calculate and transfer it to value in PSF, then sum into sumPSF 
     * 4. sumPSF value wrapped as alias 'sumPerSFCustomCards' and is used in other actions 
     */

    totalSumInPSFCustomCards(grossBuildingArea: number, resUnits = 0, rooms = 0): ExpenseForecastActions {
        expenseForecastPage.allForecastsInputs.then(inputs => {
            let sumPerSFCustomCards = 0;
            cy.wrap(sumPerSFCustomCards).as(Alias.expenseForecastAliases.sumPerSFCustomCards);
            for (let i = 0; i < inputs.length; i++) {
                this.expenseCard(inputs, i);
                cy.get(`@${Alias.expenseForecastAliases.expenseCard}`).then(expenseCard => {
                    if (expenseCard.find('[label="Include Expense on Pro Forma"]').length === 0) {
                        this.SumPsfDependingOnBasis(inputs, i, resUnits, grossBuildingArea, rooms,
                            Alias.expenseForecastAliases.sumPerSFCustomCards);
                    }
                });
            }
        });
        return this;
    }

    /**
     * 1. Action takes all allForecastsInputs (forecast expense card inputs).
     * 2. In cycle we check all forecast cards does it has checked checkbox "Include Expense on Pro Forma" or not. 
     * 3. If it has checked checkbox "Include Expense on Pro Forma" - then function takes input value, 
     * then calculate and transfer it to value in Per Unit, then sum into sumPSF.
     * 4. sumPSF value wrapped as alias 'sumPerSFCheckedDefaultCards' and is used in other actions 
     */

    totalSumInPSFCheckedDefaultCards(grossBuildingArea: number, resUnits = 0, rooms = 0): ExpenseForecastActions {
        expenseForecastPage.allForecastsInputs.then(inputs => {
            let sumPerSFDefaultCards = 0;
            cy.wrap(sumPerSFDefaultCards).as(Alias.expenseForecastAliases.sumPerSFCheckedDefaultCards);
            for (let i = 0; i < inputs.length; i++) {
                this.expenseCard(inputs, i);
                cy.get(`@${Alias.expenseForecastAliases.expenseCard}`).then(expenseCard => {
                    if (expenseCard.find('[data-qa$=includeInProForma-checked]').length > 0) {
                        this.SumPsfDependingOnBasis(inputs, i, grossBuildingArea, 
                            resUnits, rooms, Alias.expenseForecastAliases.sumPerSFCheckedDefaultCards);
                    }
                });
            }
        });
        return this;
    }

    verifyTotalForecastPSF(grossBuildingArea: number, resUnits = 0, rooms = 0): ExpenseForecastActions {
        this.totalSumForecastPSFAllCards(grossBuildingArea, resUnits, rooms);
        cy.get(`@${Alias.expenseForecastAliases.sumPerSF}`).then(sumPerSF => {
            const textToBe = `Appraiser's Forecast: $${numberWithCommas(Number(sumPerSF).toFixed(2))}`;
            expenseForecastPage.appraisersTotalForecast.should("have.text", textToBe);
        });
        return this;
    }

    totalSumForecastPSFAllCards(grossBuildingArea: number, resUnits = 0, rooms = 0): ExpenseForecastActions {
        this.totalSumInPSFCheckedDefaultCards(grossBuildingArea, resUnits, rooms);
        this.totalSumInPSFCustomCards(grossBuildingArea, resUnits, rooms);
        cy.get(`@${Alias.expenseForecastAliases.sumPerSFCheckedDefaultCards}`).then(sumPerSFCheckedDefaultCards => {
            cy.get(`@${Alias.expenseForecastAliases.sumPerSFCustomCards}`).then(sumPerSFCustomCards => {
                let sumPerSF = Number(sumPerSFCheckedDefaultCards) + Number(sumPerSFCustomCards);
                cy.wrap(sumPerSF).as(Alias.expenseForecastAliases.sumPerSF);
            });
        });
        return this;
    }

    private SumPsfDependingOnBasis(input: JQuery<HTMLElement>, index: number, grossBuildingArea: number, 
        resUnits = 0, rooms = 0, AliasName: string): ExpenseForecastActions {
        cy.get(`@${AliasName}`).then(sum => {
            this.radioButtonBasis(input);
            cy.get(`@${Alias.expenseForecastAliases.basisValue}`).then(basisValue => {
                let sumPSF = Number(sum);
                let expenseBasis = String(basisValue);
                let inputValue = getNumberFromDollarNumberWithCommas(input[index].getAttribute("value"));
                if (expenseBasis === "sf") {
                    sumPSF += inputValue;
                } else if (expenseBasis === "unit") {
                    let inputValuePerSF = (inputValue * resUnits) / grossBuildingArea;
                    sumPSF += inputValuePerSF;
                } else {
                    let inputValuePerSF = (inputValue * rooms) / grossBuildingArea;
                    sumPSF += inputValuePerSF;
                }
                cy.wrap(sumPSF).as(AliasName);
            });
        });
        return this;
    }

    /**
     * 1. Action takes all allForecastsInputs (forecast expense card inputs).
     * 2. In cycle we check all forecast cards does it has checkbox "Include Expense on Pro Forma" or not: 
     * 3. If it does not have checkbox "Include Expense on Pro Forma" - function takes input value, 
     * then calculate and transfer it to value in Per Unit, then sum into sumPerUnit 
     * 4. sumPerUnit value wrapped as alias 'sumPerUnitCustomCards' and is used in other actions 
     */

    totalSumInPerUnitCustomCards(grossBuildingArea: number, resUnits = 0, rooms = 0): ExpenseForecastActions {
        expenseForecastPage.allForecastsInputs.then(inputs => {
            let sumPerUnitCustomCards = 0;
            cy.wrap(sumPerUnitCustomCards).as(Alias.expenseForecastAliases.sumPerUnitCustomCards);
            for (let i = 0; i < inputs.length; i++) {
                this.expenseCard(inputs, i);
                cy.get(`@${Alias.expenseForecastAliases.expenseCard}`).then(expenseCard => {
                    if (expenseCard.find('[label="Include Expense on Pro Forma"]').length === 0) {
                        this.SumPerUnitDependingOnBasis(inputs, i, grossBuildingArea, resUnits, rooms,
                            Alias.expenseForecastAliases.sumPerUnitCustomCards);
                    }
                });
            }
        });
        return this;
    }

    /**
     * 1. Action takes all allForecastsInputs (forecast expense card inputs).
     * 2. In cycle we check all forecast cards does it has checked checkbox "Include Expense on Pro Forma" or not: 
     * 3. If it has checked checkbox "Include Expense on Pro Forma" - then function takes input value, 
     * then calculate and transfer it to value in Per Unit, then sum into sumPerUnit.
     * 4. sumPerUnit value wrapped as alias 'sumPerUnitCheckedDefaultCards' and is used in other actions 
     */

    totalSumInPerUnitCheckedDefaultCards(grossBuildingArea: number, resUnits = 0, rooms = 0): ExpenseForecastActions {
        expenseForecastPage.allForecastsInputs.then(inputs => {
            let sumPerUnitDefaultCards = 0;
            cy.wrap(sumPerUnitDefaultCards).as(Alias.expenseForecastAliases.sumPerUnitCheckedDefaultCards);
            for (let i = 0; i < inputs.length; i++) {
                this.expenseCard(inputs, i);
                cy.get(`@${Alias.expenseForecastAliases.expenseCard}`).then(expenseCard => {
                    if (expenseCard.find('[data-qa$=includeInProForma-checked]').length > 0) {
                        this.SumPerUnitDependingOnBasis(inputs, i, grossBuildingArea, resUnits, 
                            rooms, Alias.expenseForecastAliases.sumPerUnitCheckedDefaultCards);
                    }
                });
            }
        });
        return this;
    }

    verifyTotalForecastPerUnit(grossBuildingArea: number, resUnits = 0, rooms = 0): ExpenseForecastActions {
        this.totalSumForecastPerUnitAllCards(grossBuildingArea, resUnits, rooms);
        cy.get(`@${Alias.expenseForecastAliases.sumPerUnit}`).then(sumPerUnit => {
            const textToBe = `Appraiser's Forecast: $${numberWithCommas(Number(sumPerUnit).toFixed(2))}`;
            expenseForecastPage.appraisersTotalForecast.should("have.text", textToBe);
        });
        return this;
    }

    totalSumForecastPerUnitAllCards(grossBuildingArea: number, resUnits = 0, rooms = 0): ExpenseForecastActions {
        this.totalSumInPerUnitCheckedDefaultCards(grossBuildingArea, resUnits, rooms);
        this.totalSumInPerUnitCustomCards(grossBuildingArea, resUnits, rooms);
        cy.get(`@${Alias.expenseForecastAliases.sumPerUnitCheckedDefaultCards}`).then(sumPerUnitCheckedDefaultCards => {
            cy.get(`@${Alias.expenseForecastAliases.sumPerUnitCustomCards}`).then(sumPerUnitCustomCards => {
                let sumPerUnit = Number(sumPerUnitCheckedDefaultCards) + Number(sumPerUnitCustomCards);
                cy.wrap(sumPerUnit).as(Alias.expenseForecastAliases.sumPerUnit);
            });
        });
        return this;
    }

    private SumPerUnitDependingOnBasis(input: JQuery<HTMLElement>, index: number, grossBuildingArea: number, 
        resUnits = 0, rooms = 0, AliasName: string): ExpenseForecastActions {
        cy.get(`@${AliasName}`).then(sum => {
            this.radioButtonBasis(input);
            cy.get(`@${Alias.expenseForecastAliases.basisValue}`).then(basisValue => {
                let sumPerUnit = Number(sum);
                let expenseBasis = String(basisValue);
                let inputValue = getNumberFromDollarNumberWithCommas(input[index].getAttribute("value"));
                if (expenseBasis === "sf") {
                    let inputValuePerUnit = (inputValue * grossBuildingArea) / resUnits;
                    sumPerUnit += inputValuePerUnit;
                } else if (expenseBasis === "unit") {
                    sumPerUnit += inputValue;
                } else {
                    let inputValuePerUnit = (inputValue * rooms) / resUnits;
                    sumPerUnit += inputValuePerUnit;
                }
                cy.wrap(sumPerUnit).as(AliasName);
            });
        });
        return this;
    }

    private expenseCard(inputs: JQuery<HTMLElement>, index: number): ExpenseForecastActions {
        cy.wrap(inputs[index]).parents('[data-qa$=-forecast-item]').then(expenseCard => {
            cy.wrap(expenseCard).as(Alias.expenseForecastAliases.expenseCard);
        });
        return this;
    }

    private radioButtonBasis(input: JQuery<HTMLElement>,): ExpenseForecastActions {
        cy.wrap(input).parents('[data-qa$=-forecast-item]').find('[data-qa="checked"]').find('[type="radio"]')
            .invoke('prop', 'value').then(basisValue => {
                cy.wrap(basisValue).as(Alias.expenseForecastAliases.basisValue);
            });
        return this;
    }

    /**
     * Action creates Aliases for 2 sum (in PSF + in Per Unit), 
     * that is displayed in total operating expenses card in Generated Commentary field.
     */

    sumsInGeneratedComment(grossBuildingArea: number, resUnits = 0, rooms = 0): ExpenseForecastActions {
        this.totalSumForecastPSFAllCards(grossBuildingArea, resUnits, rooms);
        this.totalSumForecastPerUnitAllCards(grossBuildingArea, resUnits, rooms);
        cy.get(`@${Alias.expenseForecastAliases.sumPerSF}`).then(sumPerSF => {
            cy.get(`@${Alias.expenseForecastAliases.sumPerUnit}`).then(sumPerUnit => {
                let sumPerSFInComment = `$${numberWithCommas(Number(sumPerSF).toFixed(2))}`;
                let sumPerUnitInComment = `$${numberWithCommas(Math.round(Number(sumPerUnit)))}`;
                cy.wrap(sumPerSFInComment).as(Alias.expenseForecastAliases.sumPerSFInComment);
                cy.wrap(sumPerUnitInComment).as(Alias.expenseForecastAliases.sumPerUnitInComment);
            });
        });
        return this;
    }

    sumPerUnitTOEAppraisersForecast(grossBuildingArea: number, resUnits = 0, rooms = 0): ExpenseForecastActions {
        this.totalSumForecastPerUnitAllCards(grossBuildingArea, resUnits, rooms);
        cy.get(`@${Alias.expenseForecastAliases.sumPerUnit}`).then(sumPerUnit => {
            let sumPerUnitTOEAppraisersForecast = numberWithCommas(Math.round(Number(sumPerUnit)));
            cy.wrap(sumPerUnitTOEAppraisersForecast).as(Alias.expenseForecastAliases.sumPerUnitTOEAppraisersForecast);
        });
        return this;
    }

    sumPSFTOEAppraisersForecast(grossBuildingArea: number, resUnits = 0, rooms = 0): ExpenseForecastActions {
        this.totalSumForecastPSFAllCards(grossBuildingArea, resUnits, rooms);
        cy.get(`@${Alias.expenseForecastAliases.sumPerSF}`).then(sumPerSF => {
            let sumPSFTOEAppraisersForecast = numberWithCommas(Number(sumPerSF).toFixed(2));
            cy.wrap(sumPSFTOEAppraisersForecast).as(Alias.expenseForecastAliases.sumPSFTOEAppraisersForecast);
        });
        return this;
    }

}

export default new ExpenseForecastActions(expenseForecastPage);
