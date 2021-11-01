import BasePage from "../base/base.page";

class MapsPage extends BasePage{
    get propertyFrontage() {return cy.get("*[name=propertyFrontage]");}
}

export default new MapsPage();