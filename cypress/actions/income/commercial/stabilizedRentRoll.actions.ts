import stabRentRollPage from "../../../pages/income/commercial/stabilizedRentRoll.page";
import { numberWithCommas } from "../../../../utils/numbers.utils";
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

    verifyUseCellByRow(useText: BoweryReports.CommercialUnitsUseTexts, rowNumber = 0): this {
        this.Shared.useCells.eq(rowNumber).should("have.text", useText);
        return this;
    }

    verifyUseCells(useTexts: Array<BoweryReports.CommercialUnitsUseTexts>): this {
        useTexts.forEach((text, index) => {
            this.verifyUseCellByRow(text, index);
        });
        return this;
    }

    verifySfCellByRow(squareFeet: string | number, rowNumber = 0): this {
        const textToBe = typeof squareFeet === "string" ? squareFeet : numberWithCommas(squareFeet);
        this.Shared.squareFeetCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifySFCells(squareFeetValues: Array<string | number>): this {
        squareFeetValues.forEach((value, index) => {
            this.verifySfCellByRow(value, index);
        });
        return this;
    }

    verifyAnnualRentByRow(rentToBe: string, rowNumber: number): this{
        this.Shared.annualRentCells.eq(rowNumber).should("contain.text", rentToBe);
        return this;
    }

    verifyMonthlyRentByRow(rentToBe: string, rowNumber: number): this {
        this.Shared.monthlyRentCells.eq(rowNumber).should("contain.text", rentToBe);
        return this;
    }

    annualRentPsfCellsScroll() {
        cy.contains("Rent/SF").scrollIntoView();
        return this;
    }

    enterAnnualRentPerSFByRowNumber(rentToBe: string | number, rowNumber: number): this {
        this.annualRentPsfCellsScroll();
        this.Shared.annualRentPerSFCells.eq(rowNumber).dblclick({ force: true });
        this.Shared.textareaToInput.clear().type(`${rentToBe}`).type("{enter}");
        this.verifyAnnuallyRentPsf(rentToBe, rowNumber);
        return this;
    }

    enterListPerSF(leaseStatuses: Array<BoweryReports.LeaseStatus>, rentToBe: Array<string | number>): this {
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                this.enterAnnualRentPerSFByRowNumber(rentToBe[i], i);
            }
        }
        return this;
    }

    verifyAnnuallyRentPsf(rentToBe: string | number, rowNumber: number): this {
        this.annualRentPsfCellsScroll();
        this.Shared.annualRentPerSFCells.eq(rowNumber).should("contain.text", rentToBe);
        return this;
    }

    verifyAnnuallyRentPsfByRowNumber(leaseStatuses: Array<BoweryReports.LeaseStatus>, rentToBe: Array<string | number>): this {
        this.annualRentPsfCellsScroll();
        for (let i = 0; i < rentToBe.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                this.verifyAnnuallyRentPsf(rentToBe[i], i);
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

    clickNarrativeSuggestions(verifyListValue: string): StabilizedRentRollActions {
        stabRentRollPage.narrativeSuggestionsList.contains(verifyListValue).click();
        return this;
    }

    verifyStabilizedCommercialIncomeTextArea(verifyAreaValue: string): StabilizedRentRollActions {
        stabRentRollPage.stabilizedCommercialIncomeTextArea.should("contain.text", verifyAreaValue);
        return this;
    }

}

export default new StabilizedRentRollActions(stabRentRollPage, new CommercialRentRollSharedComponent());