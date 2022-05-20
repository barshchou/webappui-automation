import { findCompsPage } from "../../../pages/sales/findComps.page";

class PropertyDescriptionFormActions {
    Page: typeof findCompsPage;

    constructor(page: typeof findCompsPage){
        this.Page = page;
    }
}
export default new PropertyDescriptionFormActions(findCompsPage);