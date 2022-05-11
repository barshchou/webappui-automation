import BasePage from "../../base/base.page";

class ExpenseStructurePage extends BasePage{
    get heatExpensesRadio() {return cy.get("[name='expenseStructure.fuel']");}

    getHeatExpensesToCheck(value) {return cy.get(`[data-qa*="fuel"] [data-qa=checked] input[value='${value}']`);}

    get electricityRadio() {return cy.get("[name='expenseStructure.electricity']");}

    getElectricityToCheck(value) {return cy.get(`[data-qa*="electricity"] [data-qa=checked] input[value='${value}']`);}

    get commonElectricityRadio() {return cy.get("[name='expenseStructure.commonElectricity']");}

    getCommonElectricityToCheck(value) {return cy.get(`[data-qa*="commonElectricity"] [data-qa=checked] input[value='${value}']`);}

    get gasExpensesRadio() {return cy.get("[name='expenseStructure.gas']");}

    getGasToCheck(value) {return cy.get(`[data-qa*="gas"] [data-qa=checked] input[value='${value}']`);}

    get refuseRemovalRadio() {return cy.get("[name='expenseStructure.refuseRemoval']");}

    getRefuseRemovalToCheck(value) {return cy.get(`[data-qa*="refuseRemoval"] [data-qa=checked] input[value='${value}']`);}

    get waterSewerRadio() {return cy.get("[name='expenseStructure.waterAndSewer']");}

    getWaterSewerToCheck(value) {return cy.get(`[data-qa*="waterAndSewer"] [data-qa=checked] input[value='${value}']`);}

    get areaMaintenanceRadio() {return cy.get("[name='expenseStructure.commonAreaMaintenance']");}

    getAreaMaintenanceToCheck(value) {return cy.get(`[data-qa*="commonAreaMaintenance"] [data-qa=checked] input[value='${value}']`);}

    get tenantObligationsDiscussion() {return cy.get("[data-qa^='tenantObligationsDiscussion.commentary']");}

    get ownerObligationsDiscussion() {return cy.get("[data-qa^='ownerObligationsDiscussion.commentary']");}
}

export default new ExpenseStructurePage();
