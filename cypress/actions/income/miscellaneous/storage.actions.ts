import BaseActions from "../../base/base.actions";
import storagePage from "../../../pages/income/miscellaneous/storage.page";

class StorageActions extends BaseActions {

    /**
     *
     * @returns {StorageActions}
     */
    verifyNoStorageButtonExists() {
        storagePage.noStorageButton.should("exist");
        return this;
    }
}

export default new StorageActions();
