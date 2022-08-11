import BaseActionsExt from "../../../../base/base.actions.ext";
import compSummaryPage from "../../../../../pages/income/residential/rent_comps/full_building_comps/compSummary.page";

class CompSummaryActions extends BaseActionsExt<typeof compSummaryPage> {

    openNavigationTab(): CompSummaryActions {
        compSummaryPage.navigationTab.click();
        return this;
    }

    clickUnitMixButton(): CompSummaryActions {
        compSummaryPage.unitMixButton.click();
        return this;
    }
}

export default new CompSummaryActions(compSummaryPage);