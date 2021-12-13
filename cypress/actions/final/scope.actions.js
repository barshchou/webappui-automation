import BaseActions from "../base/base.actions";
import scopePage from "../../pages/final/scope.page";

class ScopeActions extends BaseActions {
    get defaultNumberOfItems() {return 11;}

    verifyNumberOfItems(number = this.defaultNumberOfItems) {
        scopePage.itemsTextAreas.should("have.length", number);
        return this;
    }

}

export default new ScopeActions();