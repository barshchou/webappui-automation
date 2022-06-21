import scopePage from "../../pages/final/scope.page";
import BaseActionsExt from "../base/base.actions.ext";

class ScopeActions extends BaseActionsExt<typeof scopePage> {
    get defaultNumberOfItems() {return 11;}

    verifyNumberOfItems(number = this.defaultNumberOfItems): ScopeActions {
        scopePage.itemsTextAreas.should("have.length", number);
        return this;
    }

}

export default new ScopeActions(scopePage);