import BaseActions from "../base/base.actions";
import compExpensesPage from "../../pages/income/comparableExpenses.page";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../utils/numbers.utils";

class ComparableExpensesActions extends BaseActions {
    clickAddBlankColumnButton() {
        compExpensesPage.addBlankColumnButton.click();
    }

    enterAddressByColumnIndex(address, index = 0) {
        compExpensesPage.compAddressCells.eq(index).as("address");
        cy.get("@address").scrollIntoView();
        cy.get("@address").type(address).should("have.value", address);
    }

    enterLocationByColumnIndex(location, index = 0) {
        compExpensesPage.compLocationCells.eq(index).as("location");
        cy.get("@location").scrollIntoView();
        cy.get("@location").clear().type(location).should("have.value", location);
    }

    chooseExpensePeriodByColumnIndex(periodValue, index = 0) {
        compExpensesPage.expensePeriodDropdowns.eq(index).as("period");
        cy.get("@period").scrollIntoView().click();
        compExpensesPage.getDropdownOptionByValue(periodValue).scrollIntoView().click();
    }

    enterExpenseYearByColumnIndex(year, index = 0) {
        compExpensesPage.expenseYearCells.eq(index).as("year");
        cy.get("@year").scrollIntoView();
        cy.get("@year").clear().type(year).should("have.value", year);
    }

    enterExpenseMonthByColumnIndex(month, index = 0) {
        compExpensesPage.expenseMonthCells.eq(index).as("month");
        cy.get("@month").scrollIntoView();
        cy.get("@month").clear().type(month).type("{enter}").should("have.value", month);
    }

    enterSquareFeetByColumnIndex(value, index = 0) {
        compExpensesPage.squareFeetCells.eq(index).as("squareFeet");
        cy.get("@squareFeet").scrollIntoView();
        cy.get("@squareFeet").clear().type(value).should("have.value", `${numberWithCommas(value)}`);
    }

    enterResidentialUnitsByColumnIndex(value, index = 0) {
        compExpensesPage.residentialUnitsCells.eq(index).as("units");
        cy.get("@units").scrollIntoView();
        cy.get("@units").clear().type(value).should("have.value", value);
    }

    enterInsuranceByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.insuranceCells.eq(index).as("insurance");
        cy.get("@insurance").scrollIntoView();
        cy.get("@insurance").clear().type(value).should("have.value", valueToBe);
    }

    enterElectricityByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.electricityCells.eq(index).as("electricity");
        cy.get("@electricity").scrollIntoView();
        cy.get("@electricity").clear().type(value).should("have.value", valueToBe);
    }

    enterRepairsMaintenanceByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.repairsCells.eq(index).as("repairs");
        cy.get("@repairs").scrollIntoView();
        cy.get("@repairs").clear().type(value).should("have.value", valueToBe);
    }

    enterPayrollBenefitsByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.payrollCells.eq(index).as("payroll");
        cy.get("@payroll").scrollIntoView();
        cy.get("@payroll").clear().type(value).should("have.value", valueToBe);
    }

    enterGeneralAdministrativeByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.generalCells.eq(index).as("general");
        cy.get("@general").scrollIntoView();
        cy.get("@general").clear().type(value).should("have.value", valueToBe);
    }

    enterManagementFeesByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.managementFeesCells.eq(index).as("management");
        cy.get("@management").scrollIntoView();
        cy.get("@management").clear().type(value).should("have.value", valueToBe);
    }

    verifyTOEByColumnIndex(textToBe, index = 0) {
        compExpensesPage.totalOpExpensesCells.eq(index).should("have.text", textToBe);
    }

    verifyTOEPerSFByColumnIndex(index = 0) {
        compExpensesPage.totalOpExpensesCells.eq(index).then(el => {
           const toeNumber = getNumberFromDollarNumberWithCommas(el.text());
           compExpensesPage.squareFeetCells.eq(index).invoke("attr", "value").then(sfVal => {
              const sfNumber = getNumberFromDollarNumberWithCommas(sfVal);
              const toePerSFTextToBe = `$${numberWithCommas((toeNumber / sfNumber).toFixed(2))}`;
              compExpensesPage.toePerSFCells.eq(index).should("have.text", toePerSFTextToBe);
           });
        });
    }

    verifyToePerUnitByColumnIndex(index = 0) {
        compExpensesPage.totalOpExpensesCells.eq(index).invoke("text").then(toe => {
            const toeNumber = getNumberFromDollarNumberWithCommas(toe);
            compExpensesPage.residentialUnitsCells.eq(index).invoke("attr", "value").then(units => {
                const unitsNumber = getNumberFromDollarNumberWithCommas(units);
                const toePerUnitTextToBe = `$${numberWithCommas((toeNumber / unitsNumber).toFixed(2))}`;
                compExpensesPage.toePerUnitCells.eq(index).should("have.text", toePerUnitTextToBe);
            });
        });
    }

    verifySquareFeetAverage() {
        compExpensesPage.squareFeetCells.then(elements => {
           const averageTextToBe = numberWithCommas(this.getAverageValueFromInputs(elements));
           compExpensesPage.squareFeetAverage.should("have.text", averageTextToBe);
        });
    }

    verifyUnitsNumberAverage() {
        compExpensesPage.residentialUnitsCells.then(elements => {
            const averageTextToBe = numberWithCommas(Math.round(this.getAverageValueFromInputs(elements)));
            compExpensesPage.residentialUnitsAverage.should("have.text", averageTextToBe);
        });
    }

    getAverageValueFromInputs(elements) {
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
        return sum / counterOfElements;
    }
}

export default new ComparableExpensesActions();
