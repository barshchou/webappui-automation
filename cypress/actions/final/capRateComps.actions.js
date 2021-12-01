import BaseActions from "../base/base.actions";
import capRateCompsPage from "../../pages/final/capRateComps.page";
import {isDateHasCorrectFormat} from "../../../utils/date.utils";

class CapRateCompsActions extends BaseActions {
    verifyPageIsOpened() {
        capRateCompsPage.headerSection.should("exist");
    }

    addComparable(stateValue, address, id, sourceValue, sourceName, sourceUrl) {
        capRateCompsPage.addCompButton.click();
        capRateCompsPage.advancedSearchButton.click();
        capRateCompsPage.selectStateDropdown.click();
        capRateCompsPage.getDropdownOptionByValue(stateValue).click();
        capRateCompsPage.addressInput.type(address).type("{enter}").should("have.value", address);
        capRateCompsPage.findCompHeader.click();
        capRateCompsPage.propIDInput.type(id).should("have.value", id);
        capRateCompsPage.submitButton.click();
        capRateCompsPage.sourceOfInfoDropdown.click();
        capRateCompsPage.getDropdownOptionByValue(sourceValue).click();
        capRateCompsPage.sourceNameInput.type(sourceName).should("have.value", sourceName);
        capRateCompsPage.sourceUrlInput.type(sourceUrl).should("have.value", sourceUrl);
        capRateCompsPage.submitButton.click();
    }

    verifyCompAddressByRow(address, index = 0) {
        capRateCompsPage.comparablesAddresses.eq(index).as("address");
        cy.get("@address").should("contain.text", address);
    }

    enterCompGBAByRow(gba, index = 0) {
        capRateCompsPage.comparablesGBAs.eq(index).as("gba");
        cy.get("@gba").clear().type(gba).should("have.value", gba);
    }

    chooseCompTypeByRow(typeValue, index = 0) {
        capRateCompsPage.comparablesTypesDrops.eq(index).as("type").click();
        capRateCompsPage.getDropdownOptionByValue(typeValue).click();
        cy.get("@type").should("have.text", typeValue);
    }

    checkElevatoredCheckboxByRow(index = 0) {
        capRateCompsPage.compsElevatoredCheckboxes.eq(index).as("elevatored").check();
        cy.get("@elevatored").should("have.value", "true");
    }

    enterNumberOfResUnitsByRow(number, index = 0) {
        capRateCompsPage.compsResUnits.eq(index).as("unitsNumber");
        cy.get("@unitsNumber").clear().type(number).should("have.value", `${number}`);
    }

    checkListingCheckboxByRow(index = 0) {
        capRateCompsPage.compsListingCheckboxes.eq(index).as("listing").check();
        cy.get("@listing").should("have.value", "true");
    }

    checkInContractCheckboxByRow(index = 0) {
        capRateCompsPage.compsInContractCheckboxes.eq(index).as("inContract").check();
        cy.get("@inContract").should("have.value", "true");
    }

    verifyInContractDisabledByRow(index = 0) {
        capRateCompsPage.compsInContractCheckboxes.eq(index).as("inContract");
        cy.get("@inContract").should("be.disabled").should("have.value", "false");
    }

    enterSaleDateByRow(date, index = 0) {
        capRateCompsPage.compsSaleDates.eq(index).type(date);
        if (isDateHasCorrectFormat(date)) {
            capRateCompsPage.inputsToCheckDate.eq(index).should("have.value", date);
        } else {
            capRateCompsPage.errorMessage.should("exist");
        }
    }

    verifySaleDateDisabledByRow(index = 0) {
        capRateCompsPage.compsSaleDates.eq(index).should("be.disabled");
    }

    enterYearBuiltByRow(year, index = 0) {
        capRateCompsPage.compsYearsBuilt.eq(index).as("year");
        if (year === 0) {
            cy.get("@year").clear();
        } else {
            cy.get("@year").clear().type(year).should("have.value", year);
        }
    }

    verifyPricePerSFByRow(price, index = 0) {
        capRateCompsPage.compsPricesPerSF.eq(index).should("have.text", price);
    }

    enterCapRateByRow(rate, index = 0) {
        capRateCompsPage.compsCapRates.eq(index).as("rate");
        cy.get("@rate").clear().type(rate);
        cy.get("@rate").should("have.value", `${rate}`);
    }

    verifySourceOfInfoCellByRow(sourceName, sourceUrl, index = 0) {
        capRateCompsPage.compsSourceOfInfoCells.eq(index).as("source");
        cy.get("@source").should("have.text", sourceName);
        cy.get("@source").should("have.attr", "href", sourceUrl);
    }

    fillAddedCompWithInfo(address, gba, type, isElevatored, numberOfUnits, isListing, isInContract, saleDate, yearBuilt,
                          pricePerSF, capRate, sourceName, sourceUrl, index) {
        this.verifyCompAddressByRow(address, index);
        this.enterCompGBAByRow(gba, index);
        this.chooseCompTypeByRow(type, index);
        if (isElevatored) {
            this.checkElevatoredCheckboxByRow(index);
        }
        this.enterNumberOfResUnitsByRow(numberOfUnits, index);
        if (isListing) {
            this.checkListingCheckboxByRow(index);
        }
        if (isInContract && isListing) {
            this.checkInContractCheckboxByRow(index);
        } else {
            this.verifyInContractDisabledByRow(index);
        }
        if (isListing) {
            this.verifySaleDateDisabledByRow(index);
        } else {
            this.enterSaleDateByRow(saleDate, index);
        }
        this.enterYearBuiltByRow(yearBuilt, index);
        this.verifyPricePerSFByRow(pricePerSF, index);
        this.enterCapRateByRow(capRate, index);
        this.verifySourceOfInfoCellByRow(sourceName, sourceUrl, index);
    }

    verifyCapRateCommentary(minRate, maxRate, avgRate) {
        capRateCompsPage.capRateCommentary.should("have.text", "We analyzed sales of comparable multifamily " +
            `assets within the subject’s periphery and they exhibit overall capitalization rates from ${minRate}% to ${maxRate}%` +
            ` with an average of ${avgRate}%. We have supplemented our capitalization rate comparables with additional ` +
            "comparables not used in our sales comparison approach. The additional rates are good indicators for capitalization " +
            "rates for the subject and are recent, however, there are differences regarding the comparables which do not " +
            "justify utilizing the comparable in the sales comparison approach (i.e. location, size, etc.).");
    }

    chooseCompIncomePotential(value) {
        capRateCompsPage.comparableIncomePotentialRadio.check(value);
        capRateCompsPage.getElementToCheckRadio(value).should("exist");
    }

    chooseCompPropertyConditions(value) {
        capRateCompsPage.propertyConditionsRadio.check(value);
        capRateCompsPage.getElementToCheckRadio(value).should("exist");
    }

    chooseCompPropertyLocations(value) {
        capRateCompsPage.propertyLocationsRadio.check(value);
        capRateCompsPage.getElementToCheckRadio(value).should("exist");
    }
}

export default new CapRateCompsActions();