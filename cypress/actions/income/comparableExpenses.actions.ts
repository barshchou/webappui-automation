import BaseActions from "../base/base.actions";
import compExpensesPage from "../../pages/income/comparableExpenses.page";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../utils/numbers.utils";

class ComparableExpensesActions extends BaseActions {

    /**
     *
     * @returns {ComparableExpensesActions}
     */
    clickAddBlankColumnButton() {
        compExpensesPage.addBlankColumnButton.click();
        return this;
    }

    /**
     *
     * @param {string} address
     * @param {number} index
     * @returns {ComparableExpensesActions}
     */
    enterAddressByColumnIndex(address, index = 0) {
        compExpensesPage.compAddressCells.eq(index).as("address");
        cy.get("@address").scrollIntoView();
        cy.get("@address").type(address, {force:true}).should("have.value", address);
        return this;
    }

    /**
     *
     * @param {string} location
     * @param {number} index
     * @returns {ComparableExpensesActions}
     */
    enterLocationByColumnIndex(location, index = 0) {
        compExpensesPage.compLocationCells.eq(index).as("location");
        cy.get("@location").scrollIntoView();
        cy.get("@location").clear({force:true});
        cy.get("@location").type(location, {force:true}).should("have.value", location);
        return this;
    }

    /**
     *
     * @param {string} periodValue
     * @param {number} index
     * @returns {ComparableExpensesActions}
     */
    chooseExpensePeriodByColumnIndex(periodValue, index = 0) {
        compExpensesPage.expensePeriodDropdowns.eq(index).as("period");
        cy.get("@period").scrollIntoView().click();
        compExpensesPage.getDropdownOptionByValue(periodValue).scrollIntoView().click();
        return this;
    }

    /**
     *
     * @param {string | number} year
     * @param index
     * @returns {ComparableExpensesActions}
     */
    enterExpenseYearByColumnIndex(year, index = 0) {
        compExpensesPage.expenseYearCells.eq(index).as("year");
        cy.get("@year").scrollIntoView();
        cy.get("@year").clear({force:true});
        cy.get("@year").type(year, {force:true}).should("have.value", year);
        return this;
    }

    /**
     *
     * @param {string} month
     * @param {number} index
     * @returns {ComparableExpensesActions}
     */
    enterExpenseMonthByColumnIndex(month, index = 0) {
        compExpensesPage.expenseMonthCells.eq(index).as("month");
        cy.get("@month").scrollIntoView();
        cy.get("@month").clear({force:true});
        cy.get("@month").type(month, {force:true}).type("{enter}", {force:true})
            .should("have.value", month);
        return this;
    }

    /**
     *
     * @param {number | string} value
     * @param {number} index
     * @returns {ComparableExpensesActions}
     */
    enterSquareFeetByColumnIndex(value, index = 0) {
        compExpensesPage.squareFeetCells.eq(index).as("squareFeet");
        cy.get("@squareFeet").scrollIntoView();
        cy.get("@squareFeet").clear({force:true});
        cy.get("@squareFeet").type(value, {force:true}).should("have.value", `${numberWithCommas(value)}`);
        return this;
    }

    /**
     *
     * @param {number | string} value
     * @param {number} index
     * @returns {ComparableExpensesActions}
     */
    enterResidentialUnitsByColumnIndex(value, index = 0) {
        compExpensesPage.residentialUnitsCells.eq(index).as("units");
        cy.get("@units").scrollIntoView();
        cy.get("@units").clear({force:true});
        cy.get("@units").type(value, {force:true}).should("have.value", value);
        return this;
    }

    /**
     *
     * @param {number | string} value
     * @param {number} index
     * @returns {ComparableExpensesActions}
     */
    enterInsuranceByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.insuranceCells.eq(index).as("insurance");
        cy.get("@insurance").scrollIntoView();
        cy.get("@insurance").clear({force:true});
        cy.get("@insurance").type(value, {force:true}).should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {number | string} value
     * @param {number} index
     * @returns {ComparableExpensesActions}
     */
    enterElectricityByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.electricityCells.eq(index).as("electricity");
        cy.get("@electricity").scrollIntoView();
        cy.get("@electricity").clear({force:true});
        cy.get("@electricity").type(value, {force:true}).should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {number | string} value
     * @param {number} index
     * @returns {ComparableExpensesActions}
     */
    enterRepairsMaintenanceByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.repairsCells.eq(index).as("repairs");
        cy.get("@repairs").scrollIntoView();
        cy.get("@repairs").clear({force:true});
        cy.get("@repairs").type(value, {force:true}).should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {number | string} value
     * @param {number} index
     * @returns {ComparableExpensesActions}
     */
    enterPayrollBenefitsByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.payrollCells.eq(index).as("payroll");
        cy.get("@payroll").scrollIntoView();
        cy.get("@payroll").clear({force:true});
        cy.get("@payroll").type(value, {force:true}).should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {string | number} value
     * @param {number} index
     * @returns {ComparableExpensesActions}
     */
    enterGeneralAdministrativeByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.generalCells.eq(index).as("general");
        cy.get("@general").scrollIntoView();
        cy.get("@general").clear({force:true});
        cy.get("@general").type(value, {force:true}).should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {string | number} value
     * @param {number} index
     * @returns {ComparableExpensesActions}
     */
    enterManagementFeesByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.managementFeesCells.eq(index).as("management");
        cy.get("@management").scrollIntoView();
        cy.get("@management").clear({force:true});
        cy.get("@management").type(value, {force:true}).should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @param {number} index
     * @returns {ComparableExpensesActions}
     */
    verifyTOEByColumnIndex(textToBe, index = 0) {
        compExpensesPage.totalOpExpensesCells.eq(index).should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {number} index
     * @returns {ComparableExpensesActions}
     */
    verifyTOEPerSFByColumnIndex(index = 0) {
        compExpensesPage.totalOpExpensesCells.eq(index).then(el => {
           const toeNumber = getNumberFromDollarNumberWithCommas(el.text());
           compExpensesPage.squareFeetCells.eq(index).invoke("attr", "value").then(sfVal => {
              const sfNumber = getNumberFromDollarNumberWithCommas(sfVal);
              const toePerSFTextToBe = `$${numberWithCommas((toeNumber / sfNumber).toFixed(2))}`;
              compExpensesPage.toePerSFCells.eq(index).should("have.text", toePerSFTextToBe);
           });
        });
        return this;
    }

    /**
     *
     * @param {number} index
     * @returns {ComparableExpensesActions}
     */
    verifyToePerUnitByColumnIndex(index = 0) {
        compExpensesPage.totalOpExpensesCells.eq(index).invoke("text").then(toe => {
            const toeNumber = getNumberFromDollarNumberWithCommas(toe);
            compExpensesPage.residentialUnitsCells.eq(index).invoke("attr", "value").then(units => {
                const unitsNumber = getNumberFromDollarNumberWithCommas(units);
                const toePerUnitTextToBe = `$${numberWithCommas((toeNumber / unitsNumber).toFixed(2))}`;
                compExpensesPage.toePerUnitCells.eq(index).should("have.text", toePerUnitTextToBe);
            });
        });
        return this;
    }

    /**
     *
     * @returns {ComparableExpensesActions}
     */
    verifySquareFeetAverage() {
        compExpensesPage.squareFeetCells.then(elements => {
           const averageTextToBe = numberWithCommas(Math.round(this.getAverageValueFromInputs(elements)));
           compExpensesPage.squareFeetAverage.should("have.text", averageTextToBe);
        });
        return this;
    }

    /**
     *
     * @returns {ComparableExpensesActions}
     */
    verifyUnitsNumberAverage() {
        compExpensesPage.residentialUnitsCells.then(elements => {
            const averageTextToBe = numberWithCommas(Math.round(this.getAverageValueFromInputs(elements)));
            compExpensesPage.residentialUnitsAverage.should("have.text", averageTextToBe);
        });
        return this;
    }

    /**
     * @private
     * @param {JQuery<HTMLElement>} elements
     * @returns {number}
     */
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

    /**
     *
     * @returns {ComparableExpensesActions}
     */
    verifyEGIAverage() {
        compExpensesPage.egiCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = averageNumber === 0 ? "-" : `$${numberWithCommas(averageNumber.toFixed(2))}`;
            compExpensesPage.egiAverage.should("have.text", textToBe);
        });
        return this;
    }

    /**
     *
     * @returns {ComparableExpensesActions}
     */
    verifyInsuranceAverage() {
        compExpensesPage.insuranceCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.insuranceAverage.should("have.text", textToBe);
        });
        return this;
    }

    /**
     * @private
     * @param {number} averageNumber
     * @returns {string}
     */
    getCellTextForNumberCells(averageNumber) {
        return averageNumber === 0 ? "$0.00" : `$${numberWithCommas(averageNumber.toFixed(2))}`;
    }

    /**
     *
     * @returns {ComparableExpensesActions}
     */
    verifyElectricityAverage() {
        compExpensesPage.electricityCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.electricityAverage.should("have.text", textToBe);
        });
        return this;
    }

    /**
     *
     * @returns {ComparableExpensesActions}
     */
    verifyFuelAverage() {
        compExpensesPage.fuelCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.fuelAverage.should("have.text", textToBe);
        });
        return this;
    }

    /**
     *
     * @returns {ComparableExpensesActions}
     */
    verifyWaterSewerAverage() {
        compExpensesPage.waterSewerCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.waterSewerAverage.should("have.text", textToBe);
        });
        return this;
    }

    /**
     *
     * @returns {ComparableExpensesActions}
     */
    verifyRepairsMaintenanceAverage() {
        compExpensesPage.repairsCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.repairsAverage.should("have.text", textToBe);
        });
        return this;
    }

    /**
     *
     * @returns {ComparableExpensesActions}
     */
    verifyPayrollBenefitsAverage() {
        compExpensesPage.payrollCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.payrollBenefitsAverage.should("have.text", textToBe);
        });
        return this;
    }

    /**
     *
     * @returns {ComparableExpensesActions}
     */
    verifyGeneralAdministrativeAverage() {
        compExpensesPage.generalCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.generalAdministrativeAverage.should("have.text", textToBe);
        });
        return this;
    }

    /**
     *
     * @returns {ComparableExpensesActions}
     */
    verifyLegalProFeesAverage() {
        compExpensesPage.legalProFeesCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.legalProFeesAverage.should("have.text", textToBe);
        });
        return this;
    }

    /**
     *
     * @returns {ComparableExpensesActions}
     */
    verifyMiscellaneousAverage() {
        compExpensesPage.miscellaneousCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.miscellaneousAverage.should("have.text", textToBe);
        });
        return this;
    }

    /**
     *
     * @returns {ComparableExpensesActions}
     */
    verifyManagementAverage() {
        compExpensesPage.managementFeesCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.managementAverage.should("have.text", textToBe);
        });
        return this;
    }

    /**
     *
     * @returns {ComparableExpensesActions}
     */
    verifyReservesAverage() {
        compExpensesPage.reservesCells.then(elements => {
           const averageNumber = this.getAverageValueFromInputs(elements);
           const textToBe = this.getCellTextForNumberCells(averageNumber);
           compExpensesPage.reservesAverage.should("have.text", textToBe);
        });
        return this;
    }

    /**
     *
     * @returns {ComparableExpensesActions}
     */
    verifyTableAverageValues() {
        this.verifySquareFeetAverage()
            .verifyUnitsNumberAverage()
            .verifyEGIAverage()
            .verifyInsuranceAverage()
            .verifyElectricityAverage()
            .verifyFuelAverage()
            .verifyWaterSewerAverage()
            .verifyRepairsMaintenanceAverage()
            .verifyPayrollBenefitsAverage()
            .verifyGeneralAdministrativeAverage()
            .verifyLegalProFeesAverage()
            .verifyMiscellaneousAverage()
            .verifyManagementAverage()
            .verifyReservesAverage();
        return this;
    }
}

export default new ComparableExpensesActions();
