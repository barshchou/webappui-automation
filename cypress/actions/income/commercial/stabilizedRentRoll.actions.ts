import stabRentRollPage from "../../../pages/income/commercial/stabilizedRentRoll.page";
import BaseActionsExt from "../../base/base.actions.ext";
import CommercialRentRollSharedComponent from "../../../shared_components/commercialRentRoll.shared";

class StabilizedRentRollActions extends BaseActionsExt<typeof stabRentRollPage>{

    /**
     * @description Contains elements and actions, identical for In-Place Rent Roll and Stabilized Rent Roll pages
     */
    Shared: CommercialRentRollSharedComponent;

    constructor(page: typeof stabRentRollPage, sharedComponent: CommercialRentRollSharedComponent) {
        super(page);
        this.Shared = sharedComponent;
    }

    verifyThatPageIsOpened(): this {
        stabRentRollPage.stabilizedRentRollHeaderSection.should("be.visible");
        cy.url().then(url => {
            let urlObj = new URL(url);
            cy.log("Check whether current URL ends with '/commercial-projected-rent-roll'");
            cy.wrap(urlObj.pathname.endsWith("/commercial-projected-rent-roll")).should("be.true");
        });
        return this;
    }

    annualRentPsfCellsScroll() {
        cy.contains("Rent/SF").scrollIntoView();
        return this;
    }

    enterRentPerSFAnnuallyByRowNumber(rentToBe: string | number, rowNumber: number): this {
        this.annualRentPsfCellsScroll();
        this.Shared.rentPerSFAnnuallyCells.eq(rowNumber).dblclick({ force: true });
        this.Shared.textareaToInput.clear().type(`${rentToBe}`).type("{enter}");
        this.verifyRentPsfAnnuallyByRow(rentToBe, rowNumber);
        return this;
    }

    enterListPerSFAnnually(leaseStatuses: Array<BoweryReports.LeaseStatus>, rentToBe: Array<string | number>): this {
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                this.enterRentPerSFAnnuallyByRowNumber(rentToBe[i], i);
            }
        }
        return this;
    }

    verifyRentPsfAnnuallyByRow(rentToBe: string | number, rowNumber: number): this {
        this.annualRentPsfCellsScroll();
        this.Shared.rentPerSFAnnuallyCells.eq(rowNumber).should("contain.text", rentToBe);
        return this;
    }

    verifyListRentPsfAnnually(leaseStatuses: Array<BoweryReports.LeaseStatus>, rentToBe: Array<string | number>): this {
        this.annualRentPsfCellsScroll();
        for (let i = 0; i < rentToBe.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                this.verifyRentPsfAnnuallyByRow(rentToBe[i], i);
            }
        }
        return this;
    }

    clickEditStabilizedCommercialIncomeDiscussion(): StabilizedRentRollActions {
        stabRentRollPage.formEditBtn(0).click();
        return this;
    }

    typeStabilizedCommercialIncomeTextArea(value: string): StabilizedRentRollActions {
        stabRentRollPage.stabilizedCommercialIncomeTextArea.type(value);
        return this;
    }

    verifyStabilizedCommercialIncomeTextArea(verifyAreaValue: string): StabilizedRentRollActions {
        stabRentRollPage.stabilizedCommercialIncomeTextArea.should("contain.text", verifyAreaValue);
        return this;
    }

}

export default new StabilizedRentRollActions(stabRentRollPage, new CommercialRentRollSharedComponent());