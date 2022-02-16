import BaseActions from "../../base/base.actions";
import compGroupsPage from "../../../pages/income/commercial/compGroups.page";

class CompGroupsActions extends BaseActions {

    clickAddCompGroupButton() {
        compGroupsPage.addCompGroupButton.click();
        return this;
    }

    /**
     * @param {string} name
     * @returns {CompGroupsActions}
     */
    enterGroupName(name) {
        compGroupsPage.compGroupNameInput.type(name).should("have.value", name);
        return this;
    }

    clickDialogAddCompGroupButton() {
        compGroupsPage.dialogAddCompGroupButton.click();
        return this;
    }

    /**
     * @param {string} groupName
     * @returns {CompGroupsActions}
     */
    verifyCompGroupExists(groupName) {
        compGroupsPage.getCompGroupSection(groupName).should("exist");
        return this;
    }

    /**
     * @param {string} groupName
     * @returns {CompGroupsActions}
     */
    addCompGroup(groupName) {
        this.clickAddCompGroupButton()
            .enterGroupName(groupName)
            .clickDialogAddCompGroupButton()
            .verifyCompGroupExists(groupName);
        return this;
    }
}

export default new CompGroupsActions();