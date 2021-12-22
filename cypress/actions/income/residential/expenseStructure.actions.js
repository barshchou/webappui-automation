import BaseActions from "../../base/base.actions";
import expenseStructurePage from "../../../pages/income/residential/expenseStructure.page";

class ExpenseStructureActions extends BaseActions {

    /**
     *
     * @param {string} value
     * @returns {ExpenseStructureActions}
     */
    checkHeatExpensesByValue(value) {
        expenseStructurePage.heatExpensesRadio.check(value);
        expenseStructurePage.getHeatExpensesToCheck(value).should("exist");
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ExpenseStructureActions}
     */
    checkElectricityByValue(value) {
        expenseStructurePage.electricityRadio.check(value);
        expenseStructurePage.getElectricityToCheck(value).should("exist");
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ExpenseStructureActions}
     */
    checkCommonElectricityByValue(value) {
        expenseStructurePage.commonElectricityRadio.check(value);
        expenseStructurePage.getCommonElectricityToCheck(value).should("exist");
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ExpenseStructureActions}
     */
    checkGasByValue(value) {
        expenseStructurePage.gasExpensesRadio.check(value);
        expenseStructurePage.getGasToCheck(value).should("exist");
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ExpenseStructureActions}
     */
    checkRefuseRemovalByValue(value) {
        expenseStructurePage.refuseRemovalRadio.check(value);
        expenseStructurePage.getRefuseRemovalToCheck(value).should("exist");
        return  this;
    }

    /**
     *
     * @param {string} value
     * @returns {ExpenseStructureActions}
     */
    checkWaterSewerByValue(value) {
        expenseStructurePage.waterSewerRadio.check(value);
        expenseStructurePage.getWaterSewerToCheck(value).should("exist");
        return  this;
    }

    /**
     *
     * @param {string} value
     * @returns {ExpenseStructureActions}
     */
    checkAreaMaintenanceByValue(value) {
        expenseStructurePage.areaMaintenanceRadio.check(value);
        expenseStructurePage.getAreaMaintenanceToCheck(value).should("exist");
        return this;
    }

    /**
     *
     * @param {string} commToBe
     * @returns {ExpenseStructureActions}
     */
    verifyTenantObligationsCommentary(commToBe) {
        expenseStructurePage.tenantObligationsDiscussion.should("have.text", commToBe);
        return this;
    }

    /**
     *
     * @param {string} commToBe
     * @returns {ExpenseStructureActions}
     */
    verifyOwnerObligationsCommentary(commToBe) {
        expenseStructurePage.ownerObligationsDiscussion.should("have.text", commToBe);
        return this;
    }
}


export default new ExpenseStructureActions();
