import compExpensesPage from "../../pages/income/comparableExpenses.page";
import { getNumberFromDollarNumberWithCommas, numberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

class ComparableExpensesActions extends BaseActionsExt<typeof compExpensesPage> {

    clickAddBlankColumnButton(): ComparableExpensesActions {
        compExpensesPage.addBlankColumnButton.click();
        return this;
    }

    enterAddressByColumnIndex(address: string, index = 0): ComparableExpensesActions {
        compExpensesPage.getUnifiedEditableAndTotalCells("address").eq(index).as("addressCell");
        cy.get("@addressCell").invoke('val', "some text placeholder")
            .realClick()
            .realClick()
            .focus()
            .type("something")
            .clear()
            .scrollIntoView()
            .realType(`${address}{enter}`);
        cy.get("@addressCell").children(compExpensesPage.elementToCheckCellTextSelector).should("have.text", address);
        return this;
    }

    enterCityByColumnIndex(location: string, index = 0): ComparableExpensesActions {
        compExpensesPage.getUnifiedEditableAndTotalCells("city").eq(index).realClick().realClick().scrollIntoView()
            .focus().type("something").clear().realType(`${location}{enter}`);
        compExpensesPage.getUnifiedEditableAndTotalCells("city").eq(index)
            .children(compExpensesPage.elementToCheckCellTextSelector)
            .should("have.text", location);
        return this;
    }

    chooseExpensePeriodByColumnIndex(periodValue: string, index = 0): ComparableExpensesActions {
        compExpensesPage.getUnifiedEditableAndTotalCells("expensePeriod").eq(index).type("something")
            .realClick().realClick().focus().type("something").clear().realType(`${periodValue}{enter}`);
        compExpensesPage.getUnifiedEditableAndTotalCells("expensePeriod").eq(index)
            .children(compExpensesPage.elementToCheckCellTextSelector).should("have.text", periodValue);
        return this;
    }

    enterSquareFeetByColumnIndex(value: number, index = 0): ComparableExpensesActions {
        compExpensesPage.getUnifiedEditableAndTotalCells("squareFeet").eq(index)
            .realClick().realClick().scrollIntoView().focus()
            .type("something").clear().realType(`${value}{enter}`);
        compExpensesPage.getUnifiedEditableAndTotalCells("squareFeet").eq(index)
            .children(compExpensesPage.elementToCheckCellTextSelector)
            .should("have.text", `${numberWithCommas(value)}`);
        return this;
    }

    enterResidentialUnitsByColumnIndex(value: number, index = 0): ComparableExpensesActions {
        compExpensesPage.getUnifiedEditableAndTotalCells("residentialUnits").eq(index)
            .realClick().realClick().scrollIntoView()
            .focus().type("something").clear().realType(`${value}{enter}`);
        compExpensesPage.getUnifiedEditableAndTotalCells("residentialUnits").eq(index)
            .children(compExpensesPage.elementToCheckCellTextSelector).should("have.text", value);
        return this;
    }

    enterCellDollarValueByColumnIndex(cellsElements: Cypress.Chainable, value: number, index = 0): 
    ComparableExpensesActions {
        const valueToBe = `$${numberWithCommas(value.toFixed(2))}`;
        cellsElements.eq(index).as("cell");
        cy.get("@cell").realClick().realClick().scrollIntoView().focus()
            .type("something").clear().realType(`${value}{enter}`);
        cy.get("@cell").children(compExpensesPage.elementToCheckCellTextSelector)
            .should("have.text", valueToBe);
        return this;
    }

    verifyTOEByColumnIndex(textToBe: string, index = 0): ComparableExpensesActions {
        compExpensesPage.getUnifiedEditableAndTotalCells("total").eq(index).should("have.text", textToBe);
        return this;
    }

    verifyTOEPerSFByColumnIndex(index = 0): ComparableExpensesActions {
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

    verifyToePerUnitByColumnIndex(index = 0): ComparableExpensesActions {
        compExpensesPage.getUnifiedEditableAndTotalCells("total").eq(index).invoke("text").then(toe => {
            const toeNumber = getNumberFromDollarNumberWithCommas(toe);
            compExpensesPage.getUnifiedEditableAndTotalCells("residentialUnits").eq(index).invoke("text")
                .then(units => {
                    const unitsNumber = getNumberFromDollarNumberWithCommas(units);
                    const toePerUnitTextToBe = `$${numberWithCommas((toeNumber / unitsNumber).toFixed(2))}`;
                    compExpensesPage.getUnifiedEditableAndTotalCells("totalPerUnit").eq(index)
                        .should("have.text", toePerUnitTextToBe);
                });
        });
        return this;
    }

    verifySquareFeetAverage(): ComparableExpensesActions {
        compExpensesPage.getUnifiedEditableAndTotalCells("squareFeet").then(elements => {
            const averageTextToBe = numberWithCommas(Math.round(
                ComparableExpensesActions.getAverageValueFromInputs(elements)
            ));
            compExpensesPage.getUnifiedAverageCell("squareFeet").should("have.text", averageTextToBe);
        });
        return this;
    }

    verifyUnitsNumberAverage(): ComparableExpensesActions {
        compExpensesPage.getUnifiedEditableAndTotalCells("residentialUnits").then(elements => {
            const averageTextToBe = numberWithCommas(Math.round(
                ComparableExpensesActions.getAverageValueFromInputs(elements)
            ));
            compExpensesPage.getUnifiedAverageCell("residentialUnits").should("have.text", averageTextToBe);
        });
        return this;
    }

    private static getAverageValueFromInputs(elements: JQuery<HTMLElement>): number {
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

    verifyEGIAverage(): ComparableExpensesActions {
        compExpensesPage.getUnifiedEditableAndTotalCells("egi").then(elements => {
            const averageNumber = ComparableExpensesActions.getAverageValueFromInputs(elements);
            const textToBe = averageNumber === 0 ? "-" : `$${numberWithCommas(averageNumber.toFixed(2))}`;
            compExpensesPage.getUnifiedAverageCell("egi").should("have.text", textToBe);
        });
        return this;
    }

    private static getCellTextForNumberCells(averageNumber: number): string {
        return averageNumber === 0 ? "$0.00" : `$${numberWithCommas(averageNumber.toFixed(2))}`;
    }

    verifyDollarCellsAverage(cellsName: string): ComparableExpensesActions {
        compExpensesPage.getUnifiedEditableAndTotalCells(cellsName).then(elements => {
            const averageNumber = ComparableExpensesActions.getAverageValueFromInputs(elements);
            const textToBe = ComparableExpensesActions.getCellTextForNumberCells(averageNumber);
            compExpensesPage.getUnifiedAverageCell(cellsName).should("have.text", textToBe);
        });
        return this;
    }

    verifyTableAverageValues(): ComparableExpensesActions {
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

export default new ComparableExpensesActions(compExpensesPage);
