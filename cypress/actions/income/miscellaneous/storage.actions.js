import BaseActions from "../../base/base.actions";
import storagePage from "../../../pages/income/miscellaneous/storage.page";

class StorageActions extends BaseActions {
    verifyNoStorageButtonExists() {
        storagePage.noStorageButton.should("exist");
    }
}

export default new StorageActions();
