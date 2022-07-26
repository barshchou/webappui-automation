import { findCompsPage } from "../../../../pages/sales/findComps.page";

class PropertyInfoFormActions {

    Page: typeof findCompsPage;

    constructor(page: typeof findCompsPage) {
        this.Page = page;
    }

    setCommercialArea(area: string): PropertyInfoFormActions {
        this.Page.commercialAreaNewComp.type(area, { force: true });
        return this;
    }

    setSiteArea(area: string): PropertyInfoFormActions{
        this.Page.siteAreaNewComp.type(area, { force: true });
        return this;
    }
    
    setFloor(floors: string): PropertyInfoFormActions{
        this.Page.floorNewComp.type(floors, { force: true });
        return this;
    }
            
    setCommercialUnits(units: string): PropertyInfoFormActions {
        this.Page.createCompNumberCommercialUnits.type(units, { force: true });
        return this;
    }

    setResidentialUnits(units: string): PropertyInfoFormActions {
        this.Page.createCompNumberResidentialUnits.type(units, { force: true });
        return this;
    }

    // setComparableType (type: string): PropertyInfoFormActions {
    //     this.Page.createCompNumberCommercialUnits.type(type, { force: true });
    //     return this;
    // }
}
export default new PropertyInfoFormActions(findCompsPage);