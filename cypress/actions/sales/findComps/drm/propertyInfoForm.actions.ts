import { findCompsPage } from "../../../../pages/sales/findComps.page";

class PropertyInfoFormActions {

    Page: typeof findCompsPage;

    constructor(page: typeof findCompsPage){
        this.Page = page;
    }

    setCommercialArea(area: string){
        this.Page.commercialAreaNewComp.type(area);
        return this;
    }
            
    setCommercialUnits(units: string) {
        this.Page.createCompNumberCommercialUnits.type(units);
        return this;
    }
}
export default new PropertyInfoFormActions(findCompsPage);