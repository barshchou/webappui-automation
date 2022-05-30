import BasePage from "../../base/base.page";

class StabilizedLeaseStructurePage extends BasePage {
    
    get stabilizedLeaseStructureHeaderSection() {return cy.get("*[data-qa='stabilizedLeaseStructure']");}

}

export default new StabilizedLeaseStructurePage();