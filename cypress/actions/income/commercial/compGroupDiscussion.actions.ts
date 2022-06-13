import compGroupsDiscussionPage from "../../../pages/income/commercial/compGroupsDiscussion.page";
import BaseActionsExt from "../../base/base.actions.ext";
import Columns from "../../../enums/compGroupsColumns.enum";

class CompGroupsDiscussionActions extends BaseActionsExt<typeof compGroupsDiscussionPage> {

    verifyCompGroupUnitValue(compGroupName: string, columnName: string, expectedValue: string | number, index = 0): CompGroupsDiscussionActions {
        let valueToBe = typeof expectedValue === "number" ? `${expectedValue}` : expectedValue;
        if (columnName == Columns.rentSF) valueToBe = `$${valueToBe}`;
        compGroupsDiscussionPage.compGroupDataByRow(compGroupName, columnName, index).should('have.text', valueToBe);
        return this;
    }
}

export default new CompGroupsDiscussionActions(compGroupsDiscussionPage);