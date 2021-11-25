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
        cy.get("@address").type(address, {force:true}).should("have.value", address);
    }

    enterLocationByColumnIndex(location, index = 0) {
        compExpensesPage.compLocationCells.eq(index).as("location");
        cy.get("@location").scrollIntoView();
        cy.get("@location").clear({force:true});
        cy.get("@location").type(location, {force:true}).should("have.value", location);
    }

    chooseExpensePeriodByColumnIndex(periodValue, index = 0) {
        compExpensesPage.expensePeriodDropdowns.eq(index).as("period");
        cy.get("@period").scrollIntoView().click();
        compExpensesPage.getDropdownOptionByValue(periodValue).scrollIntoView().click();
    }

    enterExpenseYearByColumnIndex(year, index = 0) {
        compExpensesPage.expenseYearCells.eq(index).as("year");
        cy.get("@year").scrollIntoView();
        cy.get("@year").clear({force:true});
        cy.get("@year").type(year, {force:true}).should("have.value", year);
    }

    enterExpenseMonthByColumnIndex(month, index = 0) {
        compExpensesPage.expenseMonthCells.eq(index).as("month");
        cy.get("@month").scrollIntoView();
        cy.get("@month").clear({force:true});
        cy.get("@month").type(month, {force:true}).type("{enter}", {force:true})
            .should("have.value", month);
    }

    enterSquareFeetByColumnIndex(value, index = 0) {
        compExpensesPage.squareFeetCells.eq(index).as("squareFeet");
        cy.get("@squareFeet").scrollIntoView();
        cy.get("@squareFeet").clear({force:true});
        cy.get("@squareFeet").type(value, {force:true}).should("have.value", `${numberWithCommas(value)}`);
    }

    enterResidentialUnitsByColumnIndex(value, index = 0) {
        compExpensesPage.residentialUnitsCells.eq(index).as("units");
        cy.get("@units").scrollIntoView();
        cy.get("@units").clear({force:true});
        cy.get("@units").type(value, {force:true}).should("have.value", value);
    }

    enterInsuranceByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.insuranceCells.eq(index).as("insurance");
        cy.get("@insurance").scrollIntoView();
        cy.get("@insurance").clear({force:true});
        cy.get("@insurance").type(value, {force:true}).should("have.value", valueToBe);
    }

    enterElectricityByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.electricityCells.eq(index).as("electricity");
        cy.get("@electricity").scrollIntoView();
        cy.get("@electricity").clear({force:true});
        cy.get("@electricity").type(value, {force:true}).should("have.value", valueToBe);
    }

    enterRepairsMaintenanceByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.repairsCells.eq(index).as("repairs");
        cy.get("@repairs").scrollIntoView();
        cy.get("@repairs").clear({force:true});
        cy.get("@repairs").type(value, {force:true}).should("have.value", valueToBe);
    }

    enterPayrollBenefitsByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.payrollCells.eq(index).as("payroll");
        cy.get("@payroll").scrollIntoView();
        cy.get("@payroll").clear({force:true});
        cy.get("@payroll").type(value, {force:true}).should("have.value", valueToBe);
    }

    enterGeneralAdministrativeByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.generalCells.eq(index).as("general");
        cy.get("@general").scrollIntoView();
        cy.get("@general").clear({force:true});
        cy.get("@general").type(value, {force:true}).should("have.value", valueToBe);
    }

    enterManagementFeesByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.managementFeesCells.eq(index).as("management");
        cy.get("@management").scrollIntoView();
        cy.get("@management").clear({force:true});
        cy.get("@management").type(value, {force:true}).should("have.value", valueToBe);
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
           const averageTextToBe = numberWithCommas(Math.round(this.getAverageValueFromInputs(elements)));
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
        if (counterOfElements === 0) {
            return 0;
        }
        return sum / counterOfElements;
    }

    verifyEGIAverage() {
        compExpensesPage.egiCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = averageNumber === 0 ? "-" : `$${numberWithCommas(averageNumber.toFixed(2))}`;
            compExpensesPage.egiAverage.should("have.text", textToBe);
        });
    }

    verifyInsuranceAverage() {
        compExpensesPage.insuranceCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.insuranceAverage.should("have.text", textToBe);
        });
    }

    getCellTextForNumberCells(averageNumber) {
        return averageNumber === 0 ? "$0.00" : `$${numberWithCommas(averageNumber.toFixed(2))}`;
    }

    verifyElectricityAverage() {
        compExpensesPage.electricityCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.electricityAverage.should("have.text", textToBe);
        });
    }

    verifyFuelAverage() {
        compExpensesPage.fuelCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.fuelAverage.should("have.text", textToBe);
        });
    }

    verifyWaterSewerAverage() {
        compExpensesPage.waterSewerCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.waterSewerAverage.should("have.text", textToBe);
        });
    }

    verifyRepairsMaintenanceAverage() {
        compExpensesPage.repairsCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.repairsAverage.should("have.text", textToBe);
        });
    }

    verifyPayrollBenefitsAverage() {
        compExpensesPage.payrollCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.payrollBenefitsAverage.should("have.text", textToBe);
        });
    }

    verifyGeneralAdministrativeAverage() {
        compExpensesPage.generalCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.generalAdministrativeAverage.should("have.text", textToBe);
        });
    }

    verifyLegalProFeesAverage() {
        compExpensesPage.legalProFeesCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.legalProFeesAverage.should("have.text", textToBe);
        });
    }

    verifyMiscellaneousAverage() {
        compExpensesPage.miscellaneousCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.miscellaneousAverage.should("have.text", textToBe);
        });
    }

    verifyManagementAverage() {
        compExpensesPage.managementFeesCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.managementAverage.should("have.text", textToBe);
        });
    }

    verifyReservesAverage() {
        compExpensesPage.reservesCells.then(elements => {
           const averageNumber = this.getAverageValueFromInputs(elements);
           const textToBe = this.getCellTextForNumberCells(averageNumber);
           compExpensesPage.reservesAverage.should("have.text", textToBe);
        });
    }

    verifyTableAverageValues() {
        this.verifySquareFeetAverage();
        this.verifyUnitsNumberAverage();
        this.verifyEGIAverage();
        this.verifyInsuranceAverage();
        this.verifyElectricityAverage();
        this.verifyFuelAverage();
        this.verifyWaterSewerAverage();
        this.verifyRepairsMaintenanceAverage();
        this.verifyPayrollBenefitsAverage();
        this.verifyGeneralAdministrativeAverage();
        this.verifyLegalProFeesAverage();
        this.verifyMiscellaneousAverage();
        this.verifyManagementAverage();
        this.verifyReservesAverage();
    }
}

export default new ComparableExpensesActions();
