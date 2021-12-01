import BasePage from "../base/base.page";

class UnitInspectionPage extends BasePage {
    get generatedCommentary() {return cy.get("*[data-qa='unitInspectionDiscussion.commentary-generated-text']");}
}

export default new UnitInspectionPage();