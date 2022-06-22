import expenseStructurePage from "../../../pages/income/residential/expenseStructure.page";
import BaseActionsExt from "../../base/base.actions.ext";

class ExpenseStructureActions extends BaseActionsExt<typeof expenseStructurePage> {

    checkHeatExpensesByValue(value: string): ExpenseStructureActions {
        expenseStructurePage.heatExpensesRadio.check(value);
        expenseStructurePage.getHeatExpensesToCheck(value).should("exist");
        return this;
    }

    checkElectricityByValue(value: string): ExpenseStructureActions {
        expenseStructurePage.electricityRadio.check(value);
        expenseStructurePage.getElectricityToCheck(value).should("exist");
        return this;
    }

    checkCommonElectricityByValue(value: string): ExpenseStructureActions {
        expenseStructurePage.commonElectricityRadio.check(value);
        expenseStructurePage.getCommonElectricityToCheck(value).should("exist");
        return this;
    }

    checkGasByValue(value: string): ExpenseStructureActions {
        expenseStructurePage.gasExpensesRadio.check(value);
        expenseStructurePage.getGasToCheck(value).should("exist");
        return this;
    }

    checkRefuseRemovalByValue(value: string): ExpenseStructureActions {
        expenseStructurePage.refuseRemovalRadio.check(value);
        expenseStructurePage.getRefuseRemovalToCheck(value).should("exist");
        return  this;
    }

    checkWaterSewerByValue(value: string): ExpenseStructureActions {
        expenseStructurePage.waterSewerRadio.check(value);
        expenseStructurePage.getWaterSewerToCheck(value).should("exist");
        return  this;
    }

    checkAreaMaintenanceByValue(value: string): ExpenseStructureActions {
        expenseStructurePage.areaMaintenanceRadio.check(value);
        expenseStructurePage.getAreaMaintenanceToCheck(value).should("exist");
        return this;
    }

    verifyTenantObligationsCommentary(commToBe: string): ExpenseStructureActions {
        expenseStructurePage.tenantObligationsDiscussion.should("have.text", commToBe);
        return this;
    }

    verifyOwnerObligationsCommentary(commToBe: string): ExpenseStructureActions {
        expenseStructurePage.ownerObligationsDiscussion.should("have.text", commToBe);
        return this;
    }
}


export default new ExpenseStructureActions(expenseStructurePage);
