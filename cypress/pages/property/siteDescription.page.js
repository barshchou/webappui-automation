import BasePage from "../base/base.page";

class SiteDescriptionPage extends BasePage{
    get transportationDiscussionCommEdit() {
        return cy.get("*[data-qa*='transportationDiscussion'] [data-qa='generated-commentary-edit-btn']");
    }

    get transportationCommentary() {return cy.get("*[name='transportationDiscussion.commentary']");}
    get surroundingResidentalCheckbox() {return cy.get("*[data-qa='surroundingUses.residential'] input");}
}

export default new SiteDescriptionPage();