import stabRentRollPage from "../../../pages/income/commercial/stabilizedRentRoll.page";
import CommercialRentRollSharedComponent from "../../../shared_components/commercialRentRoll.shared";

class StabilizedRentRollActions extends CommercialRentRollSharedComponent<typeof stabRentRollPage> {

    /**
     * @description Contains elements and actions, identical for In-Place Rent Roll and Stabilized Rent Roll pages
     */
    readonly _Shared: CommercialRentRollSharedComponent<typeof stabRentRollPage>;

    constructor(page: typeof stabRentRollPage, sharedComponent: CommercialRentRollSharedComponent<typeof stabRentRollPage>) {
        super(page);
        this._Shared = sharedComponent;
    }

    get Shared() {
        return this._Shared;
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

    enterListPerSFAnnually(leaseStatuses: Array<BoweryReports.LeaseStatus>, rentToBe: Array<number>): this {
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                this.Shared.enterRentPerSFAnnuallyByRowNumber(rentToBe[i], i);
            }
        }
        return this;
    }

    verifyListRentPsfAnnually(leaseStatuses: Array<BoweryReports.LeaseStatus>, rentToBe: Array<number>): this {
        for (let i = 0; i < rentToBe.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                this.Shared.verifyRentPsfAnnuallyByRow(rentToBe[i], i);
            }
        }
        return this;
    }

    verifyStabilizedCommercialIncomeTextArea(verifyAreaValue: string): StabilizedRentRollActions {
        stabRentRollPage.stabilizedCommercialIncomeTextArea.should("contain.text", verifyAreaValue);
        return this;
    }

    saveStabilizedRentRollCommentary(): StabilizedRentRollActions {
        stabRentRollPage.formSaveBtn(0).click();
        return this;
    }

    verifyModifiedLabelExist(): StabilizedRentRollActions {
        stabRentRollPage.stabilizedRentRollModifiedLabel.should('exist');
        return this;
    }

    revertToOriginalStabilizedRentRollCommentary(): StabilizedRentRollActions {
        this.Shared.clickEditDiscussionButton();
        stabRentRollPage.formRevertToOriginalBtn(0).click();
        this.verifyProgressBarNotExist();
        stabRentRollPage.formYesRevertBtn.click();
        this.saveStabilizedRentRollCommentary();
        return this;
    }

    cancelStabilizedRentRollCommentary(): StabilizedRentRollActions {
        stabRentRollPage.formCancelButton(0).click();
        return this;
    }

    verifyStabRentRollCommentaryButtons(): StabilizedRentRollActions {
        stabRentRollPage.formRevertToOriginalBtn(0).should('exist');
        stabRentRollPage.formCancelButton(0).should('exist');
        stabRentRollPage.formSaveBtn(0).should('exist');
        return this;
    }
}

export default new StabilizedRentRollActions(stabRentRollPage, new CommercialRentRollSharedComponent(stabRentRollPage));