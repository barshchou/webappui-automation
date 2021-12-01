import rentRollPage from "../../../pages/income/commercial/rentRoll.page";
import BaseActions from "../../base/base.actions";
import {isDateHasCorrectFormat} from "../../../../utils/date.utils";
import {numberWithCommas} from "../../../../utils/numbers.utils";

class CommercialRentRollActions extends BaseActions {
    verifyBasisOfRentTooltip() {
        rentRollPage.basisOfRentField.should("exist");
        rentRollPage.basisOfRentTooltip.should("exist").trigger("mouseover");
        rentRollPage.basisOfRentTooltip.should("not.exist");
    }

    clickMonthlyBasisButton(backColor = "rgb(65, 96, 211)") {
        rentRollPage.monthlyBasisButton.should("not.have.css", "background-color", backColor)
            .click().should("have.css", "background-color", backColor);
    }

    clickAnnuallyBasisButton(backColor = "rgb(65, 96, 211)") {
        rentRollPage.annuallyBasisButton.should("not.have.css", "background-color", backColor)
            .click().should("have.css", "background-color", backColor);
    }

    clickPerSquareFootButton(isFirstTime, backColor = "rgb(65, 96, 211)") {
        if (isFirstTime) {
            rentRollPage.perSquareBasisButton.should("have.css", "background-color", backColor).click();
        } else {
            rentRollPage.perSquareBasisButton.should("not.have.css", "background-color", backColor)
                .click().should("have.css", "background-color", backColor);
        }
    }

    verifyAllBasisButtons(backColor) {
        this.clickPerSquareFootButton(true, backColor);
        this.clickMonthlyBasisButton(backColor);
        this.clickAnnuallyBasisButton(backColor);
        this.clickPerSquareFootButton(false, backColor);
    }

    chooseLeaseStatusByRowNumber(status, rowNumber = 0) {
        rentRollPage.pageHeader.should("be.visible");
        rentRollPage.leaseStatusArrows.eq(rowNumber).should("be.visible").as("arrow");
        cy.get("@arrow").click({force:true});
        rentRollPage.getLeaseStatusToChooseByValue(status).click();
        rentRollPage.leaseStatusCells.eq(rowNumber).should("have.text", status);
        if (status === "Vacant") {
            rentRollPage.getAllCellsByRowNumber(rowNumber).then(cells => {
                for (let i = 3; i < cells.length; i++) {
                    cy.wrap(cells).eq(i).should("have.class", "readOnly");
                }
            });
        }
    }

    chooseLeaseStatusesByRowNumber(statuses, rowNumber = 0) {
        statuses.forEach(status => {
            this.chooseLeaseStatusByRowNumber(status, rowNumber);
        });
    }

    checkIsInspectedCheckboxByRowNumber(rowNumber = 0) {
        rentRollPage.pageHeader.should("be.visible");
        const backColor = "rgb(65, 96, 211)";
        rentRollPage.elementToVerifyIsInspected.should("not.have.css", "background-color", backColor);
        rentRollPage.isInspectedCheckboxes.eq(rowNumber).as("isInspectedCheckbox");
        cy.get("@isInspectedCheckbox").invoke("show");
        cy.get("@isInspectedCheckbox").check({force:true});
        rentRollPage.elementToVerifyIsInspected.should("have.css", "background-color", backColor);
    }

    uncheckIsInspectedCheckboxByRowNumber(rowNumber = 0) {
        rentRollPage.pageHeader.should("be.visible");
        const backColor = "rgb(65, 96, 211)";
        rentRollPage.elementToVerifyIsInspected.should("have.css", "background-color", backColor);
        rentRollPage.isInspectedCheckboxes.eq(rowNumber).as("checkbox");
        cy.get("@checkbox").invoke("show");
        cy.get("@checkbox").uncheck({force:true});
        rentRollPage.elementToVerifyIsInspected.should("not.have.css", "background-color", backColor);
    }

    verifyUnitNumberCells(unitNumber = 1) {
        rentRollPage.unitNumberCells.each(cell => {
            cy.wrap(cell).should("exist").should("be.visible");
        });
        rentRollPage.unitNumberCells.should("have.length", unitNumber + 1);
    }

    enterTenantNameByRowNumber(name, rowNumber = 0) {
        rentRollPage.tenantNameCells.eq(rowNumber).dblclick();
        rentRollPage.textareaToInput.clear().type(name).type("{enter}");
    }

    verifyTenantNameByRowNumber(leaseStatus, nameToBe, rowNumber = 0) {
        let textToBe = leaseStatus === "Vacant" ? `Commercial Unit ${rowNumber + 1}` : nameToBe;
        rentRollPage.tenantNameCells.eq(rowNumber).should("have.text", textToBe);
    }

    verifyUseCellTextByRowNumber(textToBe, rowNumber = 0) {
        rentRollPage.useCells.eq(rowNumber).should("have.text", textToBe);
    }

    enterLeaseStartDateByRowNumber(cellName, date, rowNumber = 0) {
        rentRollPage.getLeaseDateCellsByName(cellName).eq(rowNumber).dblclick();
        rentRollPage.textareaToInput.clear().type(date).type("{enter}");
    }

    verifyLeaseStartDateByRowNumber(cellName, leaseStatus, dateToBe, rowNumber = 0) {
        dateToBe = dateToBe ?? "";
        if (!isDateHasCorrectFormat(dateToBe, "/")) {
            dateToBe = "";
        }
        let textToBe = leaseStatus === "Vacant" ? "-" : dateToBe;
        rentRollPage.getLeaseDateCellsByName(cellName).eq(rowNumber).should("have.text", textToBe);
    }

    verifySquareFeetByRowNumber(sfToBe, rowNumber = 0) {
        sfToBe = numberWithCommas(Math.round(sfToBe));
        rentRollPage.squareFeetCells.eq(rowNumber).should("have.text", sfToBe);
    }

    enterRentPerSFByRowNumber(value, rowNumber = 0) {
        rentRollPage.rentPerSFCells.eq(rowNumber).as("cell");
        cy.get("@cell").should("not.have.class", "readOnly");
        cy.get("@cell").dblclick({force:true});
        rentRollPage.textareaToInput.clear().type(value).type("{enter}");
        const textToBe = numberWithCommas(value.toFixed(2));
        cy.get("@cell").should("have.text", `$${textToBe}`);
    }

    verifyAnnualRentCellSquareFootByRowNumber(rentPerSF, squareFoot, rowNumber = 0) {
        const textToBe = numberWithCommas((rentPerSF * squareFoot).toFixed(2));
        rentRollPage.annualRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
    }

    clearRentPerSFByRowNumber(rowNumber = 0) {
        rentRollPage.rentPerSFCells.eq(rowNumber).as("cell");
        cy.get("@cell").dblclick({force:true});
        rentRollPage.textareaToInput.clear().type("{enter}");
    }

    enterMonthlyRentByRowNumber(monthlyRent, rowNumber = 0) {
        rentRollPage.monthlyRentCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick();
        rentRollPage.textareaToInput.clear().type(monthlyRent).type("{enter}");
        const textToBe = numberWithCommas(monthlyRent.toFixed(2));
        rentRollPage.monthlyRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
    }

    verifyAnnualRentMonthlyByRowNumber(monthlyRent, rowNumber = 0) {
        const textToBe = numberWithCommas((monthlyRent * 12).toFixed(2));
        rentRollPage.annualRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
    }

    clearMonthlyRentByRowNumber(rowNumber = 0) {
        rentRollPage.monthlyRentCells.eq(rowNumber).dblclick();
        rentRollPage.textareaToInput.clear().type("{enter}");
    }

    enterAnnualRentByRowNumber(annualRent, rowNumber = 0) {
        rentRollPage.annualRentCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick();
        rentRollPage.textareaToInput.clear().type(annualRent).type("{enter}");
        const textToBe = numberWithCommas(annualRent.toFixed(2));
        rentRollPage.annualRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
    }

    clearAnnualRentByRowNumber(rowNumber = 0) {
        rentRollPage.annualRentCells.eq(rowNumber).dblclick();
        rentRollPage.textareaToInput.clear().type("{enter}");
    }

    verifyMonthlyRentPerSFByRowNumber(rentPerSF, squareFoot, rowNumber = 0) {
        const textToBe = numberWithCommas(((rentPerSF * squareFoot) / 12).toFixed(2));
        rentRollPage.monthlyRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
    }

    verifyMonthlyRentAnnuallyByRowNumber(annuallyRent, rowNumber = 0) {
        const textToBe = numberWithCommas((annuallyRent / 12).toFixed(2));
        rentRollPage.monthlyRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
    }

    verifyRentPerSFMonthlyByRowNumber(monthlyRent, squareFoot, rowNumber = 0) {
        const textToBe = numberWithCommas(((monthlyRent * 12) / squareFoot).toFixed(2));
        rentRollPage.rentPerSFCells.eq(rowNumber).should("have.text", `$${textToBe}`);
    }

    verifyRentPerSFAnnuallyByRowNumber(annualRent, squareFoot, rowNumber = 0) {
        const textToBe = numberWithCommas((annualRent / squareFoot).toFixed(2));
        rentRollPage.rentPerSFCells.eq(rowNumber).should("have.text", `$${textToBe}`);
    }

    chooseListLeaseStatuses(statuses, numberOfUnits) {
        for (let i = 0; i < numberOfUnits; i++) {
            this.chooseLeaseStatusByRowNumber(statuses[i], i);
        }
    }

    enterListPerSF(leaseStatuses, perSFList) {
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                continue;
            }
            this.enterRentPerSFByRowNumber(perSFList[i], i);
        }
    }

    verifySFTotal(sfValues) {
        let sfTotalToBe = 0;
        sfValues.forEach(value => sfTotalToBe += value);
        const textToBe = numberWithCommas(Math.round(sfTotalToBe));
        rentRollPage.squareFeetCells.last().should("have.text", `${textToBe}`);
    }

    enterListMonthlyRent(leaseStatuses, monthlyRentList) {
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                continue;
            }
            this.enterMonthlyRentByRowNumber(monthlyRentList[i], i);
        }
    }

    verifyMonthlyRentTotal(leaseStatuses, monthlyRents) {
        const textToBe = this.getTotalRentTextToBe(leaseStatuses, monthlyRents);
        rentRollPage.monthlyRentCells.last().should("have.text", `$${textToBe}`);
    }

    enterListAnnuallyRent(leaseStatuses, annuallyRents) {
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                continue;
            }
            this.enterAnnualRentByRowNumber(annuallyRents[i], i);
        }
    }

    getTotalRentTextToBe(leaseStatuses, rentsValues) {
        let rentTotalToBe = 0;
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                continue;
            }
            rentTotalToBe += rentsValues[i];
        }
        return numberWithCommas(rentTotalToBe.toFixed(2));
    }

    verifyAnnuallyRentTotal(leaseStatuses, annualRents) {
        const textToBe = this.getTotalRentTextToBe(leaseStatuses, annualRents);
        rentRollPage.annualRentCells.last().should("have.text", `$${textToBe}`);
    }

    clearRentCellsByName(leaseStatuses, columnName) {
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                continue;
            }
            switch (columnName) {
                case "perSF":
                    this.clearRentPerSFByRowNumber(i);
                    break;
                case "annually":
                    this.clearAnnualRentByRowNumber(i);
                    break;
                default:
                    this.clearMonthlyRentByRowNumber(i);
            }
        }
    }

    verifyPerSFTotal(leaseStatuses, perSfRents, squareFootList) {
        let totalAnnualRent = 0;
        let totalSF = 0;
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                continue;
            }
            totalSF += squareFootList[i];
            totalAnnualRent += perSfRents[i] * squareFootList[i];
        }
        const textToBe = numberWithCommas((totalAnnualRent / totalSF).toFixed(2));
        rentRollPage.rentPerSFCells.last().should("have.text", `$${textToBe}`);
    }
}

export default new CommercialRentRollActions();
