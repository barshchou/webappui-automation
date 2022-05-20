import { findCompsPage } from "../../../pages/sales/findComps.page";

class PropertyInfoFormActions {
    Page: typeof findCompsPage;

    constructor(page: typeof findCompsPage){
        this.Page = page;
    }
}
export default new PropertyInfoFormActions(findCompsPage);