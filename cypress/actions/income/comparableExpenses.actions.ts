import BaseActions from "../base/base.actions";
import compExpensesPage from "../../pages/income/comparableExpenses.page";
import { getNumberFromDollarNumberWithCommas, numberWithCommas } from "../../../utils/numbers.utils";

class ComparableExpensesActions extends BaseActions {

    get Page() {
        return compExpensesPage;
    }

    clickAddBlankColumnButton(): this {
        compExpensesPage.addBlankColumnButton.click();
        return this;
    }

    enterAddressByColumnIndex(address: string, index = 0): this {
        compExpensesPage.getUnifiedEditableAndTotalCells("address").eq(index).realType("something");
        compExpensesPage.getUnifiedEditableAndTotalCells("address").eq(index).dblclick()
            .clear()
            .scrollIntoView()
            .realType(`${address}{enter}`);
        compExpensesPage.getUnifiedEditableAndTotalCells("address").eq(index).children(compExpensesPage.elementToCheckCellTextSelector)
            .should("have.text", address);
        return this;
    }

    enterLocationByColumnIndex(location: string, index = 0): this {
        compExpensesPage.getUnifiedEditableAndTotalCells("location").eq(index).dblclick().scrollIntoView()
            .clear().realType(`${location}{enter}`);
        compExpensesPage.getUnifiedEditableAndTotalCells("location").eq(index).children(compExpensesPage.elementToCheckCellTextSelector)
            .should("have.text", location);
        return this;
    }

    chooseExpensePeriodByColumnIndex(periodValue: string, index = 0): this {
        compExpensesPage.getUnifiedEditableAndTotalCells("expensePeriod").eq(index).type("something")
            .dblclick().clear().type(`${periodValue}{enter}`);
        compExpensesPage.getUnifiedEditableAndTotalCells("expensePeriod").eq(index)
            .children(compExpensesPage.elementToCheckCellTextSelector).should("have.text", periodValue);
        return this;
    }

    enterSquareFeetByColumnIndex(value: number, index = 0): this {
        compExpensesPage.getUnifiedEditableAndTotalCells("squareFeet").eq(index).dblclick().scrollIntoView().clear()
            .realType(`${value}{enter}`);
        compExpensesPage.getUnifiedEditableAndTotalCells("squareFeet").eq(index)
            .children(compExpensesPage.elementToCheckCellTextSelector).should("have.text", `${numberWithCommas(value)}`);
        return this;
    }

    enterResidentialUnitsByColumnIndex(value: number, index = 0): this {
        compExpensesPage.getUnifiedEditableAndTotalCells("residentialUnits").eq(index).dblclick().scrollIntoView()
            .clear().realType(`${value}{enter}`);
        compExpensesPage.getUnifiedEditableAndTotalCells("residentialUnits").eq(index)
            .children(compExpensesPage.elementToCheckCellTextSelector).should("have.text", value);
        return this;
    }

    enterCellDollarValueByColumnIndex(cellsElements: Cypress.Chainable, value: number, index = 0): this {
        const valueToBe = `$${numberWithCommas(value.toFixed(2))}`;
        cellsElements.eq(index).as("cell");
        cy.get("@cell").dblclick().scrollIntoView().clear().realType(`${value}{enter}`);
        cy.get("@cell").children(compExpensesPage.elementToCheckCellTextSelector)
            .should("have.text", valueToBe);
        return this;
    }

    verifyTOEByColumnIndex(textToBe: string, index = 0): this {
        compExpensesPage.getUnifiedEditableAndTotalCells("total").eq(index).should("have.text", textToBe);
        return this;
    }

    verifyTOEPerSFByColumnIndex(index = 0): this {
        compExpensesPage.getUnifiedEditableAndTotalCells("total").eq(index).then(el => {
           const toeNumber = getNumberFromDollarNumberWithCommas(el.text());
           compExpensesPage.getUnifiedEditableAndTotalCells("squareFeet").eq(index).invoke("text").then(sfVal => {
              const sfNumber = getNumberFromDollarNumberWithCommas(sfVal);
              const toePerSFTextToBe = `$${numberWithCommas((toeNumber / sfNumber).toFixed(2))}`;
              compExpensesPage.getUnifiedEditableAndTotalCells("totalPerSF").eq(index)
                  .should("have.text", toePerSFTextToBe);
           });
        });
        return this;
    }

    verifyToePerUnitByColumnIndex(index = 0): this {
        compExpensesPage.getUnifiedEditableAndTotalCells("total").eq(index).invoke("text").then(toe => {
            const toeNumber = getNumberFromDollarNumberWithCommas(toe);
            compExpensesPage.getUnifiedEditableAndTotalCells("residentialUnits").eq(index).invoke("text").then(units => {
                const unitsNumber = getNumberFromDollarNumberWithCommas(units);
                const toePerUnitTextToBe = `$${numberWithCommas((toeNumber / unitsNumber).toFixed(2))}`;
                compExpensesPage.getUnifiedEditableAndTotalCells("totalPerUnit").eq(index)
                    .should("have.text", toePerUnitTextToBe);
            });
        });
        return this;
    }

    verifySquareFeetAverage(): this {
        compExpensesPage.getUnifiedEditableAndTotalCells("squareFeet").then(elements => {
           const averageTextToBe = numberWithCommas(Math.round(this.getAverageValueFromInputs(elements)));
           compExpensesPage.getUnifiedAverageCell("squareFeet").should("have.text", averageTextToBe);
        });
        return this;
    }

    verifyUnitsNumberAverage(): this {
        compExpensesPage.getUnifiedEditableAndTotalCells("residentialUnits").then(elements => {
            const averageTextToBe = numberWithCommas(Math.round(this.getAverageValueFromInputs(elements)));
            compExpensesPage.getUnifiedAverageCell("residentialUnits").should("have.text", averageTextToBe);
        });
        return this;
    }

    private getAverageValueFromInputs(elements: JQuery<HTMLElement>): number {
        let sum = 0;
        let counterOfElements = 0;
        for (let i = 0; i < elements.length; i++) {
            let elValue = elements[i].getAttribute("value");
            if (elValue === "") {
                continue;
            }
            let valueNumber = getNumberFromDollarNumberWithCommas(elValue);
            sum += valueNumber;
            counterOfElements++;
        }
        if (counterOfElements === 0) {
            return 0;
        }
        return sum / counterOfElements;
    }

    verifyEGIAverage(): this {
        compExpensesPage.getUnifiedEditableAndTotalCells("egi").then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = averageNumber === 0 ? "-" : `$${numberWithCommas(averageNumber.toFixed(2))}`;
            compExpensesPage.getUnifiedAverageCell("egi").should("have.text", textToBe);
        });
        return this;
    }

    private getCellTextForNumberCells(averageNumber: number): string {
        return averageNumber === 0 ? "$0.00" : `$${numberWithCommas(averageNumber.toFixed(2))}`;
    }

    verifyDollarCellsAverage(cellsName: string): this {
        compExpensesPage.getUnifiedEditableAndTotalCells(cellsName).then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.getUnifiedAverageCell(cellsName).should("have.text", textToBe);
        });
        return this;
    }

    verifyTableAverageValues(): this {
        this.verifySquareFeetAverage()
            .verifyUnitsNumberAverage()
            .verifyEGIAverage()
            .verifyDollarCellsAverage("insurance")
            .verifyDollarCellsAverage("electricity")
            .verifyDollarCellsAverage("fuel")
            .verifyDollarCellsAverage("waterAndSewer")
            .verifyDollarCellsAverage("repairsAndMaintenance")
            .verifyDollarCellsAverage("payrollAndBenefits")
            .verifyDollarCellsAverage("generalAndAdministrative")
            .verifyDollarCellsAverage("legalAndProfessionalFees")
            .verifyDollarCellsAverage("miscellaneous")
            .verifyDollarCellsAverage("management")
            .verifyDollarCellsAverage("reserves");
        return this;
    }
}

export default new ComparableExpensesActions();
