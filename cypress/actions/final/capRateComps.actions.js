import BaseActions from "../base/base.actions";
import capRateCompsPage from "../../pages/final/capRateComps.page";
import {isDateHasCorrectFormat} from "../../../utils/date.utils";

class CapRateCompsActions extends BaseActions {

    /**
     *
     * @returns {CapRateCompsActions}
     */
    verifyPageIsOpened() {
        capRateCompsPage.headerSection.should("exist");
        return this;
    }

    /**
     *
     * @param {Readonly<{stateValue: string, address: string, id: string, source: string, sourceName: string,
     * sourceUrl: string}>} comparable
     * @returns {CapRateCompsActions}
     */
    addComparable(comparable) {
        capRateCompsPage.addCompButton.click();
        capRateCompsPage.advancedSearchButton.click();
        capRateCompsPage.selectStateDropdown.click();
        capRateCompsPage.getDropdownOptionByValue(comparable.stateValue).click();
        capRateCompsPage.addressInput.type(comparable.address).type("{enter}").should("have.value", comparable.address);
        capRateCompsPage.findCompHeader.click();
        capRateCompsPage.propIDInput.type(comparable.id).should("have.value", comparable.id);
        capRateCompsPage.submitButton.click();
        capRateCompsPage.sourceOfInfoDropdown.click();
        capRateCompsPage.getDropdownOptionByValue(comparable.source).click();
        capRateCompsPage.sourceNameInput.type(comparable.sourceName).should("have.value", comparable.sourceName);
        capRateCompsPage.sourceUrlInput.type(comparable.sourceUrl).should("have.value", comparable.sourceUrl);
        capRateCompsPage.submitButton.click();
        return this;
    }

    /**
     *
     * @param {string} address
     * @param {number} index
     * @returns {CapRateCompsActions}
     */
    verifyCompAddressByRow(address, index = 0) {
        capRateCompsPage.comparablesAddresses.eq(index).as("address");
        cy.get("@address").should("contain.text", address);
        return this;
    }

    /**
     *
     * @param {number | string} gba
     * @param {number} index
     * @returns {CapRateCompsActions}
     */
    enterCompGBAByRow(gba, index = 0) {
        capRateCompsPage.comparablesGBAs.eq(index).as("gba");
        cy.get("@gba").clear().type(gba).should("have.value", gba);
        return this;
    }

    /**
     *
     * @param {string} typeValue
     * @param {number} index
     * @returns {CapRateCompsActions}
     */
    chooseCompTypeByRow(typeValue, index = 0) {
        capRateCompsPage.comparablesTypesDrops.eq(index).as("type").click();
        capRateCompsPage.getDropdownOptionByValue(typeValue).click();
        cy.get("@type").should("have.text", typeValue);
        return this;
    }

    /**
     *
     * @param {number} index
     * @returns {CapRateCompsActions}
     */
    checkElevatoredCheckboxByRow(index = 0) {
        capRateCompsPage.compsElevatoredCheckboxes.eq(index).as("elevatored").check();
        cy.get("@elevatored").should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {number | string} number
     * @param {number} index
     * @returns {CapRateCompsActions}
     */
    enterNumberOfResUnitsByRow(number, index = 0) {
        capRateCompsPage.compsResUnits.eq(index).as("unitsNumber");
        cy.get("@unitsNumber").clear().type(number).should("have.value", `${number}`);
        return this;
    }

    /**
     *
     * @param {number} index
     * @returns {CapRateCompsActions}
     */
    checkListingCheckboxByRow(index = 0) {
        capRateCompsPage.compsListingCheckboxes.eq(index).as("listing").check();
        cy.get("@listing").should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {number} index
     * @returns {CapRateCompsActions}
     */
    checkInContractCheckboxByRow(index = 0) {
        capRateCompsPage.compsInContractCheckboxes.eq(index).as("inContract").check();
        cy.get("@inContract").should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {number} index
     * @returns {CapRateCompsActions}
     */
    verifyInContractDisabledByRow(index = 0) {
        capRateCompsPage.compsInContractCheckboxes.eq(index).as("inContract");
        cy.get("@inContract").should("be.disabled").should("have.value", "false");
        return this;
    }

    /**
     *
     * @param {string} date
     * @param {number} index
     * @returns {CapRateCompsActions}
     */
    enterSaleDateByRow(date, index = 0) {
        capRateCompsPage.compsSaleDates.eq(index).clear().type(date);
        if (isDateHasCorrectFormat(date)) {
            capRateCompsPage.inputsToCheckDate.eq(index).should("have.value", date);
        } else {
            capRateCompsPage.errorMessage.should("exist");
        }
        return this;
    }

    /**
     *
     * @param {number} index
     * @returns {CapRateCompsActions}
     */
    verifySaleDateDisabledByRow(index = 0) {
        capRateCompsPage.compsSaleDates.eq(index).should("be.disabled");
        return this;
    }

    /**
     *
     * @param {number | string} year
     * @param {number} index
     * @returns {CapRateCompsActions}
     */
    enterYearBuiltByRow(year, index = 0) {
        capRateCompsPage.compsYearsBuilt.eq(index).as("year");
        if (year === 0) {
            cy.get("@year").clear();
        } else {
            cy.get("@year").clear().type(year).should("have.value", year);
        }
        return this;
    }

    /**
     *
     * @param {number | string} price
     * @param {number} index
     * @returns {CapRateCompsActions}
     */
    verifyPricePerSFByRow(price, index = 0) {
        capRateCompsPage.compsPricesPerSF.eq(index).should("have.text", price);
        return this;
    }

    /**
     *
     * @param {string | number} rate
     * @param {number} index
     * @returns {CapRateCompsActions}
     */
    enterCapRateByRow(rate, index = 0) {
        capRateCompsPage.compsCapRates.eq(index).as("rate");
        cy.get("@rate").clear().type(rate);
        cy.get("@rate").should("have.value", `${rate}`);
        return this;
    }

    /**
     *
     * @param {string} sourceName
     * @param {string} sourceUrl
     * @param {number} index
     * @returns {CapRateCompsActions}
     */
    verifySourceOfInfoCellByRow(sourceName, sourceUrl, index = 0) {
        capRateCompsPage.compsSourceOfInfoCells.eq(index).as("source");
        cy.get("@source").should("have.text", sourceName);
        cy.get("@source").should("have.attr", "href", sourceUrl);
        return this;
    }

    /**
     *
     * @param {Readonly<{address: string, gba: number, type: string, isElevatored: boolean, numberOfUnits: number,
     * isListing: boolean, isInContract: boolean, saleDate: string, yearBuilt: number, pricePerSF: string, capRate: string,
     * sourceName: string, sourceUrl: string}>} comparable
     * @param {number} index
     * @returns {CapRateCompsActions}
     */
    fillAddedCompWithInfo(comparable, index) {
        this.verifyCompAddressByRow(comparable.address, index)
            .enterCompGBAByRow(comparable.gba, index)
            .chooseCompTypeByRow(comparable.type, index);
        if (comparable.isElevatored) {
            this.checkElevatoredCheckboxByRow(index);
        }
        this.enterNumberOfResUnitsByRow(comparable.numberOfUnits, index);
        if (comparable.isListing) {
            this.checkListingCheckboxByRow(index);
        }
        if (comparable.isInContract && comparable.isListing) {
            this.checkInContractCheckboxByRow(index);
        } else {
            this.verifyInContractDisabledByRow(index);
        }
        if (comparable.isListing) {
            this.verifySaleDateDisabledByRow(index);
        } else {
            this.enterSaleDateByRow(comparable.saleDate, index);
        }
        this.enterYearBuiltByRow(comparable.yearBuilt, index)
            .verifyPricePerSFByRow(comparable.pricePerSF, index)
            .enterCapRateByRow(comparable.capRate, index)
            .verifySourceOfInfoCellByRow(comparable.sourceName, comparable.sourceUrl, index);
        return this;
    }

    /**
     *
     * @param {number} minRate
     * @param {number} maxRate
     * @param {number | string} avgRate
     * @returns {CapRateCompsActions}
     */
    verifyCapRateCommentary(minRate, maxRate, avgRate) {
        capRateCompsPage.capRateCommentary.should("have.text", this.getCapRateCommentary(minRate, maxRate, avgRate));
        return this;
    }

    /**
     * @private
     * @param {number} minRate
     * @param {number} maxRate
     * @param {number} avgRate
     * @returns {string}
     */
    getCapRateCommentary(minRate, maxRate, avgRate) {
        return "We analyzed sales of comparable multifamily " +
            `assets within the subject’s periphery and they exhibit overall capitalization rates from ${minRate}% to ${maxRate}%` +
            ` with an average of ${avgRate}%. We have supplemented our capitalization rate comparables with additional ` +
            "comparables not used in our sales comparison approach. The additional rates are good indicators for capitalization " +
            "rates for the subject and are recent, however, there are differences regarding the comparables which do not " +
            "justify utilizing the comparable in the sales comparison approach (i.e. location, size, etc.).";
    }

    /**
     *
     * @param {string} value
     * @returns {CapRateCompsActions}
     */
    chooseCompIncomePotential(value) {
        capRateCompsPage.comparableIncomePotentialRadio.check(value);
        capRateCompsPage.getElementToCheckRadio(value).should("exist");
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {CapRateCompsActions}
     */
    chooseCompPropertyConditions(value) {
        capRateCompsPage.propertyConditionsRadio.check(value);
        capRateCompsPage.getElementToCheckRadio(value).should("exist");
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {CapRateCompsActions}
     */
    chooseCompPropertyLocations(value) {
        capRateCompsPage.propertyLocationsRadio.check(value);
        capRateCompsPage.getElementToCheckRadio(value).should("exist");
        return this;
    }
}

export default new CapRateCompsActions();