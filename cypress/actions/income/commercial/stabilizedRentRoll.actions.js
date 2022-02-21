import BaseActions from "../../base/base.actions";
import stabRenRollPage from "../../../pages/income/commercial/stabilizedRentRoll.page";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../../utils/numbers.utils";

class StabilizedRentRollActions extends BaseActions{

    verifyIsInspectedChecked() {
        stabRenRollPage.elementToVerifyIsInspected.should("have.css", "background-color", "rgb(65, 96, 211)");
        return this;
    }

    /**
     * @param {string} leaseStatus
     * @param {number} rowNumber
     * @returns {StabilizedRentRollActions}
     */
    verifyLeaseStatusByRow(leaseStatus, rowNumber = 0) {
        stabRenRollPage.leaseStatusCells.eq(rowNumber).should("contain.text", leaseStatus);
        return this;
    }

    /**
     * @param {Array<string>} statuses
     * @returns {StabilizedRentRollActions}
     */
    verifyLeaseStatuses(statuses) {
        statuses.forEach((status, index) => {
            this.verifyLeaseStatusByRow(status, index);
        });
        return this;
    }

    /**
     * @param {string} name
     * @param {string} leaseStatus
     * @param {number} rowNumber
     * @returns {StabilizedRentRollActions}
     */
    verifyTenantNameByRow(name, leaseStatus, rowNumber = 0) {
        let textToBe = leaseStatus === "Vacant" ? `Commercial Unit ${rowNumber + 1}` : name;
        stabRenRollPage.tenantNameCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    /**
     * @param {Array<string>} names
     * @param {Array<string>} leaseStatuses
     * @returns {StabilizedRentRollActions}
     */
    verifyTenantNames(names, leaseStatuses) {
        names.forEach((name, index) => {
            this.verifyTenantNameByRow(name, leaseStatuses[index], index);
        });
        return this;
    }

    /**
     * @param {string} useText
     * @param {number} rowNumber
     * @returns {StabilizedRentRollActions}
     */
    verifyUseCellByRow(useText, rowNumber = 0) {
        stabRenRollPage.useCells.eq(rowNumber).should("have.text", useText);
        return this;
    }

    /**
     * @param useTexts
     * @returns {StabilizedRentRollActions}
     */
    verifyUseCells(useTexts) {
        useTexts.forEach((text, index) => {
            this.verifyUseCellByRow(text, index);
        });
        return this;
    }

    /**
     * @param {string | number} squareFeet
     * @param rowNumber
     * @returns {StabilizedRentRollActions}
     */
    verifySfCellByRow(squareFeet, rowNumber = 0) {
        const textToBe = typeof squareFeet === "string" ? squareFeet : numberWithCommas(squareFeet);
        stabRenRollPage.sfCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    /**
     * @param {Array<string | number>} squareFeetValues
     * @returns {StabilizedRentRollActions}
     */
    verifySFCells(squareFeetValues) {
        squareFeetValues.forEach((value, index) => {
            this.verifySfCellByRow(value, index);
        });
        return this;
    }

    /**
     * @param {string} [rentToBe]
     * @param {number} rowNumber
     * @param {string} calcMethod
     * @returns {StabilizedRentRollActions}
     */
    verifyAnnualRentByRow(calcMethod, rowNumber, rentToBe){
        if (rentToBe) {
            this.verifyAnnualRentCellByRowHasText(rentToBe, rowNumber);
        } else {
            stabRenRollPage.sfCells.eq(rowNumber).invoke("text").then(sfText => {
                const sfNumber = getNumberFromDollarNumberWithCommas(sfText);
                if (calcMethod === "monthly") {
                    stabRenRollPage.monthlyRentPsfCells.eq(rowNumber).invoke("text").then(psfText => {
                        const psfNumber = getNumberFromDollarNumberWithCommas(psfText);
                        const textToBe = `$${numberWithCommas((sfNumber * psfNumber * 12).toFixed(2))}`;
                        this.verifyAnnualRentCellByRowHasText(textToBe, rowNumber);
                    });
                } else {
                    stabRenRollPage.annualRentPsfCells.eq(rowNumber).invoke("text").then(annualPsfText => {
                        const annualPsfNumber = getNumberFromDollarNumberWithCommas(annualPsfText);
                        const textToBe = `$${numberWithCommas((sfNumber * annualPsfNumber).toFixed(2))}`;
                        this.verifyAnnualRentCellByRowHasText(textToBe, rowNumber);
                    });
                }
            });
        }
        return this;
    }

    /**
     * @private
     * @param {string} textToBe
     * @param {number} rowNumber
     */
    verifyAnnualRentCellByRowHasText(textToBe, rowNumber) {
        stabRenRollPage.annualRentCells.eq(rowNumber).should("have.text");
    }
}

export default new StabilizedRentRollActions();