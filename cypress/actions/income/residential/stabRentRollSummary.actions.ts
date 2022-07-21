import stabRentRollSummaryPage from "../../../pages/income/residential/stabRentRollSummary.page";
import BaseActionsExt from "../../base/base.actions.ext";

class StabilizedRentRollSummaryActions extends BaseActionsExt<typeof stabRentRollSummaryPage>{

    verifyAnnualRentByRow(rentToBe: string, rowNumber = 0): StabilizedRentRollSummaryActions {
        stabRentRollSummaryPage.annualRentCells.eq(rowNumber).should("have.text", rentToBe);
        return this;
    }

    verifyTotalAnnualRent(rentToBe: string): StabilizedRentRollSummaryActions {
        stabRentRollSummaryPage.totalAnnualRent.should("have.text", rentToBe);
        return this;
    }

    verifyIncreaseValueByRow(value = 1, rowNumber = 0): StabilizedRentRollSummaryActions {
        stabRentRollSummaryPage.increaseCells.eq(rowNumber).should("have.value", value);
        return this;
    }

    verifyPGICellByRow(pgiToBe: string, rowNumber = 0): StabilizedRentRollSummaryActions {
        stabRentRollSummaryPage.pgiCells.eq(rowNumber).should("have.text", pgiToBe);
        return this;
    }

    verifyPGITotal(pgiToBe: string): StabilizedRentRollSummaryActions {
        stabRentRollSummaryPage.pgiTotal.should("have.text", pgiToBe);
        return this;
    }

    openDiscussionTab(): StabilizedRentRollSummaryActions {
        stabRentRollSummaryPage.summaryDiscussionTab.click();
        return this;
    }

    verifyStabRRSummaryDiscussion(commToBe: string): StabilizedRentRollSummaryActions {
        stabRentRollSummaryPage.stabRRSummaryDiscussion.should("have.text", commToBe);
        return this;
    }

    verifyGrossIncomeDiscussion(commToBe: string): StabilizedRentRollSummaryActions {
        stabRentRollSummaryPage.grossIncomeDiscussion.should("have.text", commToBe);
        return this;
    }

    verifyDistributionSummary(commToBe: string): StabilizedRentRollSummaryActions {
        stabRentRollSummaryPage.distributionSummary.should("have.text", commToBe);
        return this;
    }

    verifyRentTypeIncrease(rentControlledValue: number, rentTypeIndex = 0): StabilizedRentRollSummaryActions {
        stabRentRollSummaryPage.rentTypeIncrease(rentTypeIndex).should('have.value', `${rentControlledValue}`);
        return this;
    }

    verifyRentControlledIncreaseDiscussion(commentaryToBe: string): StabilizedRentRollSummaryActions {
        stabRentRollSummaryPage.rentControlledIncreaseDiscussion.should('have.text', commentaryToBe);
        return this;
    }
}

export default new StabilizedRentRollSummaryActions(stabRentRollSummaryPage);
