import { numberWithCommas } from './../../../../utils/numbers.utils';
import storagePage from "../../../pages/income/miscellaneous/storage.page";
import BaseActionsExt from "../../base/base.actions.ext";

class StorageActions extends BaseActionsExt<typeof storagePage> {

    verifyNoStorageButtonExists(): StorageActions {
        storagePage.noStorageButton.should("exist");
        return this;
    }

    addStorageIncome(income: number): StorageActions {
        storagePage.storageIncomeTextField.clear().type(`${income}`);
        storagePage.storageIncomeTextField.should("have.value", `$${numberWithCommas(income)}`);
        return this;
    }

    checkStorageVCLossRadio(value: string): StorageActions {
        storagePage.storageVCLossRadio.check(value).should("be.checked");
        return this;
    }

    enterStorageVCLossPercentage(percentage: number, type: BoweryReports.StorageVcLossType): StorageActions {
        this.checkStorageVCLossRadio(type);
        storagePage.storageVCLossPercentage.clear().type(percentage.toString()).should("have.value", percentage);
        if (percentage > 100) {
            cy.contains("Max value is 100").should("exist");
        }
        return this;
    }
}

export default new StorageActions(storagePage);
