import rentReconciliationPage from "../../../pages/income/commercial/rentReconciliation.page";
import BaseActionsExt from "../../base/base.actions.ext";

class RentReconciliationActions extends BaseActionsExt<typeof rentReconciliationPage> {
    constructor(){
        super(rentReconciliationPage);
    }
}
export default new RentReconciliationActions();