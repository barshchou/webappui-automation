import { findCompsPage } from "../../../../pages/sales/findComps.page";
import { CompPlex } from "../../../../types/compplex.type";

class PropertyInfoFormActions {
    checkBuildingType(value: CompPlex.PropertyInfo.BuildingType): PropertyInfoFormActions {
        this.Page.getBuildingType(value).check();
        return this;
    }

    Page: typeof findCompsPage;

    constructor(page: typeof findCompsPage) {
        this.Page = page;
    }

    setCommercialArea(area: string): PropertyInfoFormActions {
        this.Page.commercialAreaNewComp.type(area, { force: true });
        return this;
    }
    
    setFloor(floors: string): PropertyInfoFormActions {
        this.Page.floorsNewComp.type(floors, { force: true });
        return this;
    }
            
    setCommercialUnits(units: string): PropertyInfoFormActions {
        this.Page.createCompNumberResidentialUnits.type(units, { force: true });
        return this;
    }

    setSiteArea(area: string): PropertyInfoFormActions {
        this.Page.siteAreaNewComp.type(area, { force: true });
        return this;
    }

    setFloors(floors: string): PropertyInfoFormActions {
        this.Page.floorsNewComp.type(floors, { force: true });
        return this;
    }

    setResidentialUnits(units: string): PropertyInfoFormActions {
        this.Page.createCompNumberResidentialUnits.type(units, { force: true });
        return this;
    }
    
    setGBA(gba: string): PropertyInfoFormActions {
        this.Page.gbaNewComp.type(gba, { force: true });
        return this;
    }

    setYearBuild(year: string): PropertyInfoFormActions {
        this.Page.yearBuiltNewComp.type(year, { force: true });
        return this;
    }
}
export default new PropertyInfoFormActions(findCompsPage);