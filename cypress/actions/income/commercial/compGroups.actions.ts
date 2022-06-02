import compGroupsPage from "../../../pages/income/commercial/compGroups.page";
import BaseActionsExt from "../../base/base.actions.ext";

class CompGroupsActions extends BaseActionsExt<typeof compGroupsPage> {

    clickAddCompGroupButton() {
        compGroupsPage.addCompGroupButton.click();
        return this;
    }

    enterGroupName(name: string) {
        compGroupsPage.compGroupNameInput.type(name).should("have.value", name);
        return this;
    }

    clickDialogAddCompGroupButton() {
        compGroupsPage.dialogAddCompGroupButton.click();
        return this;
    }

    verifyCompGroupExists(groupName: string) {
        compGroupsPage.getCompGroupSection(groupName).should("exist");
        return this;
    }

    addCompGroup(groupName: string) {
        this.clickAddCompGroupButton()
            .enterGroupName(groupName)
            .clickDialogAddCompGroupButton()
            .verifyCompGroupExists(groupName);
        return this;
    }

    verifyThatPageIsOpened(): CompGroupsActions {
        compGroupsPage.compGroupsPageHeaderSection.should("be.visible");
        cy.url().then(url => {
            let urlObj = new URL(url);
            cy.log("Check whether current URL ends with '/commercial-comp-groups-discussion'");
            cy.wrap(urlObj.pathname.endsWith("/commercial-comp-groups-discussion")).should("be.true");
        });
        return this;
    }
}

export default new CompGroupsActions(compGroupsPage);