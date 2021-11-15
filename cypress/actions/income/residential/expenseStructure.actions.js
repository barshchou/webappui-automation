import BaseActions from "../../base/base.actions";
import expenseStructurePage from "../../../pages/income/residential/expenseStructure.page";

class ExpenseStructureActions extends BaseActions {
    checkHeatExpensesByValue(value) {
        expenseStructurePage.heatExpensesRadio.check(value);
        expenseStructurePage.getHeatExpensesToCheck(value).should("exist");
    }

    checkElectricityByValue(value) {
        expenseStructurePage.electricityRadio.check(value);
        expenseStructurePage.getElectricityToCheck(value).should("exist");
    }

    checkCommonElectricityByValue(value) {
        expenseStructurePage.commonElectricityRadio.check(value);
        expenseStructurePage.getCommonElectricityToCheck(value).should("exist");
    }

    checkGasByValue(value) {
        expenseStructurePage.gasExpensesRadio.check(value);
        expenseStructurePage.getGasToCheck(value).should("exist");
    }

    checkRefuseRemovalByValue(value) {
        expenseStructurePage.refuseRemovalRadio.check(value);
        expenseStructurePage.getRefuseRemovalToCheck(value).should("exist");
    }

    checkWaterSewerByValue(value) {
        expenseStructurePage.waterSewerRadio.check(value);
        expenseStructurePage.getWaterSewerToCheck(value).should("exist");
    }

    checkAreaMaintenanceByValue(value) {
        expenseStructurePage.areaMaintenanceRadio.check(value);
        expenseStructurePage.getAreaMaintenanceToCheck(value).should("exist");
    }

    verifyTenantObligationsCommentary(commToBe) {
        expenseStructurePage.tenantObligationsDiscussion.should("have.text", commToBe);
    }

    verifyOwnerObligationsCommentary(commToBe) {
        expenseStructurePage.ownerObligationsDiscussion.should("have.text", commToBe);
    }
}


export default new ExpenseStructureActions();
