import { numberWithCommas } from "../../utils/numbers.utils";
import { isDateHasCorrectFormat } from "../../utils/date.utils";

class CommercialRentRollSharedComponent {

    get leaseStatusCells() {return cy.get("[data-qa^=leaseStatus].htAutocomplete");}

    get tenantNameCells() {return cy.xpath("(//*[contains(@data-qa, 'tenantName')])[position() < last()]");}

    get useCells() {return cy.xpath("(//*[contains(@data-qa, 'use')])[position() < last()]");}

    get squareFeetCells() {return cy.xpath("(//*[contains(@data-qa, 'squareFeet')])[position() < last()]");}

    get squareFeetTotal() {return cy.get("[data-qa^=squareFeet]").last();}

    get annualRentCells() {return cy.xpath("(//*[contains(@data-qa, 'annualRent-')])[position() < last()]");}

    get annualRentTotal() {return cy.get("[data-qa^=annualRent-]").last();}

    get textareaToInput() {return cy.get("div:not([class*='hidden']) > *[class='handsontableInput']");}

    get monthlyRentCells() {return cy.xpath("(//*[contains(@data-qa, 'monthlyRent-')])[position() < last()]");}

    get monthlyRentTotal() {return cy.get("[data-qa^=monthlyRent-]").last();}

    get annualRentPerSFCells() {return cy.xpath("(//*[contains(@data-qa, 'annualRentPsf')])[position() < last()]");}

    get annualRentPerSFTotal() {return cy.get("[data-qa^=annualRentPsf-]").last();}

    get monthlyRentPerSFCells() {return cy.xpath("//*[contains(@class, 'htNumeric')]|(//*[contains(@data-qa, 'monthlyRentPsf')])[position() < last()]");}

    get elementToVerifyIsInspected() {return cy.xpath("(//*[contains(@data-qa, 'isInspected')])[position() < last()]//child::span");}

    get unitNumberCells() {return cy.xpath("(//*[contains(@data-qa, '#')])[position() < last()]");}

    getAllCellsByRowNumber(rowNumber) {return cy.get(`*[data-qa*='${rowNumber}-cell']`);}

    getLeaseDateCellsByName(name) {return cy.xpath(`(//*[contains(@data-qa, 'lease${name}Date')])[position() < last()]`);}

    get editDiscussionButton() {return cy.xpath("//button[.='Edit']");}

    get discussionTextInput() {return cy.get("[role=textbox]");}

    get saveDiscussionChanges() {return cy.xpath("//button[.='Save' and not(contains(@data-qa, 'form-save-btn'))]");}

    get modifiedLabel() {return cy.contains("Modified");}

    get revertToOriginalButton() {return cy.xpath("//button[.='Revert to Original']");}

    get changesLostModalHeader() {return cy.contains("Changes will be lost");}

    get commentaryText() {return cy.get("div[data-slate-editor]");}

    get yesRevertButton() {return cy.contains("Yes, revert");}

    get closeButton() {return cy.get("[aria-label=close]");}

    get cancelRevertButton() {return this.yesRevertButton.prev("button");}

    get rentPerSfPerMonthColumnName() {return cy.contains("Rent PSF/Month");}

    verifyIsInspectedChecked(rowNumber = 0): this {
        this.elementToVerifyIsInspected.eq(rowNumber).should("have.css", "background-color", "rgb(66, 96, 211)");
        return this;
    }

    verifyIsInspectedNotChecked(rowNumber = 0): this {
        this.elementToVerifyIsInspected.eq(rowNumber).should("not.have.css", "background-color", "rgb(66, 96, 211)");
        return this;
    }

    verifyIsInspectedCheckedAll(isInspected: boolean[]): this {
        for (let i = 0; i < isInspected.length; i++) {
            if (isInspected[i]) {
                this.verifyIsInspectedChecked(i);
            }
        }
        return this;
    }

    verifyLeaseStatusByRow(leaseStatus: BoweryReports.LeaseStatus, rowNumber = 0): this {
        this.leaseStatusCells.eq(rowNumber).should("contain.text", leaseStatus);
        return this;
    }

    verifyLeaseStatuses(statuses: Array<BoweryReports.LeaseStatus>): this {
        statuses.forEach((status, index) => {
            this.verifyLeaseStatusByRow(status, index);
        });
        return this;
    }

    verifyTenantNameByRow(leaseStatus: BoweryReports.LeaseStatus, name?: string, rowNumber = 0): this {
        let textToBe = leaseStatus === "Vacant" ? `Commercial Unit ${rowNumber + 1}` : name;
        this.tenantNameCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifyTenantNames(names: Array<string>, leaseStatuses: Array<BoweryReports.LeaseStatus>): this {
        names.forEach((name, index) => {
            this.verifyTenantNameByRow(leaseStatuses[index], name, index);
        });
        return this;
    }

    verifyUseCellByRow(useText: BoweryReports.CommercialUnitsUseTexts, rowNumber = 0): this {
        this.useCells.eq(rowNumber).should("have.text", useText).and("have.class", "readOnly");
        return this;
    }

    verifyUseCells(useTexts: Array<BoweryReports.CommercialUnitsUseTexts>): this {
        useTexts.forEach((text, index) => {
            this.verifyUseCellByRow(text, index);
        });
        return this;
    }

    verifySfCellByRow(squareFeet: string | number = 0, rowNumber = 0): this {
        const textToBe = typeof squareFeet === "string" ? squareFeet : numberWithCommas(Math.round(squareFeet));
        this.squareFeetCells.eq(rowNumber).should("have.text", textToBe).and("have.class", "readOnly");
        return this;
    }

    verifySFCells(squareFeetValues: Array<string | number>): this {
        squareFeetValues.forEach((value, index) => {
            this.verifySfCellByRow(value, index);
        });
        return this;
    }

    verifyLeaseDateByRowNumber(cellName: BoweryReports.LeaseDateName, leaseStatus: BoweryReports.LeaseStatus,
                               rentRoll: "stabilized" | "in-place", dateToBe?: string, rowNumber = 0): this {
        dateToBe = dateToBe ?? "";
        if (!isDateHasCorrectFormat(dateToBe, "/")) {
            dateToBe = "";
        }
        let textToBe = leaseStatus === "Vacant" ? rentRoll === "stabilized" ? "" : "-" : dateToBe;
        this.getLeaseDateCellsByName(cellName).eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifyUnitNumberCells(unitNumber = 1): this {
        if (unitNumber === 0) {
            this.unitNumberCells.should("not.exist");
        } else {
            this.unitNumberCells.each(cell => {
                cy.wrap(cell).should("exist").and("be.visible").and("have.class", "readOnly");
            });
            this.unitNumberCells.should("have.length", unitNumber);
        }
        return this;
    }

    verifyAnnualRentCellPerSFBasisByRow(rentPerSF: number, squareFoot: number, calcMethod: string, rowNumber = 0): this {
        let numberToBe;
        if (calcMethod === "annually") {
            numberToBe = rentPerSF * squareFoot;
        } else {
            numberToBe = rentPerSF * squareFoot * 12;
        }
        this.annualRentCells.eq(rowNumber)
            .should("have.text", `$${numberWithCommas(numberToBe.toFixed(2))}`);
        return this;
    }
}

export default CommercialRentRollSharedComponent;