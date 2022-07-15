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

    /**
     * Drags ALL elements (units) from unsorted group into <groupName>.
     * 
     * By default 1st commercial unit in unsorted group is dragged as after dragging indexes are reassigned.
     * 
     * If there is no elements in a drop group we use default locator, in other case we use 1st row of a group.
     * 
     * Verifies that after dragging all elements there is no units left in unsorted group
    */
    dragAllCommercialUnitsIntoGroup(groupName: string, numberOfUnits = 1, index = 0): CompGroupsActions {
        let subject = compGroupsPage.getDraggableElement(index); //always selects 1st element in group
        let commercialUnit = cy.get(subject);
        let target: string;

        for (let i = 0; i < numberOfUnits; i++) {
            if (i == 0){
                target = compGroupsPage.getDroppableArea(groupName);
            } else {
                target = compGroupsPage.getDroppableAreaDropped(groupName);
            }
            
            commercialUnit.dragAndDrop(subject, target);
            // VB: For more than 2 units Drag and drop is too slow and we need to wait a bit between dnd actions.
            cy.wait(500);
        }

        this.verifyAllItemsDragged();
        return this;
    }

    verifyAllItemsDragged(): CompGroupsActions {
        compGroupsPage.draggablePlaceholder.should('be.visible');
        return this;
    }
}

export default new CompGroupsActions(compGroupsPage);