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
}

export default new StorageActions(storagePage);
