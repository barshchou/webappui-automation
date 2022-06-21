import capRateCompsPage from "../../pages/final/capRateComps.page";
import { isDateHasCorrectFormat } from "../../../utils/date.utils";
import BaseActionsExt from "../base/base.actions.ext";

class CapRateCompsActions extends BaseActionsExt<typeof capRateCompsPage> {

    verifyPageIsOpened(): CapRateCompsActions {
        capRateCompsPage.headerSection.should("exist");
        return this;
    }

    addComparable(comparable: Readonly<{stateValue: string, 
        address: string, id: string, source: string, 
        sourceName: string, sourceUrl: string}>): CapRateCompsActions  {
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

    verifyCompAddressByRow(address: string, index = 0): CapRateCompsActions {
        capRateCompsPage.comparablesAddresses.eq(index).as("address");
        cy.get("@address").should("contain.text", address);
        return this;
    }

    enterCompGBAByRow(gba: number | string, index = 0): CapRateCompsActions {
        capRateCompsPage.comparablesGBAs.eq(index).as("gba");
        cy.get("@gba").clear().type(`${gba}`).should("have.value", gba);
        return this;
    }

    chooseCompTypeByRow(typeValue: string, index = 0): CapRateCompsActions {
        capRateCompsPage.comparablesTypesDrops.eq(index).as("type").click();
        capRateCompsPage.getDropdownOptionByValue(typeValue).click();
        cy.get("@type").should("have.text", typeValue);
        return this;
    }

    checkElevatoredCheckboxByRow(index = 0): CapRateCompsActions {
        capRateCompsPage.compsElevatoredCheckboxes.eq(index).as("elevatored").check();
        cy.get("@elevatored").should("have.value", "true");
        return this;
    }

    enterNumberOfResUnitsByRow(number: number | string, index = 0): CapRateCompsActions {
        capRateCompsPage.compsResUnits.eq(index).as("unitsNumber");
        cy.get("@unitsNumber").clear().type(`${number}`).should("have.value", `${number}`);
        return this;
    }

    checkListingCheckboxByRow(index = 0): CapRateCompsActions {
        capRateCompsPage.compsListingCheckboxes.eq(index).as("listing").check();
        cy.get("@listing").should("have.value", "true");
        return this;
    }

    checkInContractCheckboxByRow(index = 0): CapRateCompsActions {
        capRateCompsPage.compsInContractCheckboxes.eq(index).as("inContract").check();
        cy.get("@inContract").should("have.value", "true");
        return this;
    }

    verifyInContractDisabledByRow(index = 0): CapRateCompsActions {
        capRateCompsPage.compsInContractCheckboxes.eq(index).as("inContract");
        cy.get("@inContract").should("be.disabled").should("have.value", "false");
        return this;
    }

    enterSaleDateByRow(date: string, index = 0): CapRateCompsActions {
        capRateCompsPage.compsSaleDates.eq(index).clear().type(date);
        if (isDateHasCorrectFormat(date)) {
            capRateCompsPage.inputsToCheckDate.eq(index).should("have.value", date);
        } else {
            capRateCompsPage.errorMessage.should("exist");
        }
        return this;
    }

    verifySaleDateDisabledByRow(index = 0): CapRateCompsActions {
        capRateCompsPage.compsSaleDates.eq(index).should("be.disabled");
        return this;
    }

    enterYearBuiltByRow(year: number | string, index = 0): CapRateCompsActions {
        capRateCompsPage.compsYearsBuilt.eq(index).as("year");
        if (year === 0) {
            cy.get("@year").clear();
        } else {
            cy.get("@year").clear().type(`${year}`).should("have.value", year);
        }
        return this;
    }

    verifyPricePerSFByRow(price: number | string, index = 0): CapRateCompsActions {
        capRateCompsPage.compsPricesPerSF.eq(index).should("have.text", price);
        return this;
    }

    enterCapRateByRow(rate: string | number, index = 0): CapRateCompsActions {
        capRateCompsPage.compsCapRates.eq(index).as("rate");
        cy.get("@rate").clear().type(`${rate}`);
        cy.get("@rate").should("have.value", `${rate}`);
        return this;
    }

    verifySourceOfInfoCellByRow(sourceName: string, sourceUrl: string, index = 0): CapRateCompsActions {
        capRateCompsPage.compsSourceOfInfoCells.eq(index).as("source");
        cy.get("@source").should("have.text", sourceName);
        cy.get("@source").should("have.attr", "href", sourceUrl);
        return this;
    }

    fillAddedCompWithInfo(comparable: Readonly<{address: string, gba: number, type: string, isElevatored: boolean, numberOfUnits: number,
        isListing: boolean, isInContract: boolean, saleDate: string, yearBuilt: number, pricePerSF: string, capRate: string,
        sourceName: string, sourceUrl: string}>, index: number): CapRateCompsActions {
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

    verifyCapRateCommentary(minRate: number, maxRate: number, avgRate: number | string): CapRateCompsActions {
        capRateCompsPage.capRateCommentary.should("have.text", this.getCapRateCommentary(minRate, maxRate, avgRate));
        return this;
    }

    private getCapRateCommentary(minRate: number, maxRate: number, avgRate: number): string {
        return "We analyzed sales of comparable multifamily " +
            `assets within the subject’s periphery and they exhibit overall capitalization rates from ${minRate}% to ${maxRate}%` +
            ` with an average of ${avgRate}%. We have supplemented our capitalization rate comparables with additional ` +
            "comparables not used in our sales comparison approach. The additional rates are good indicators for capitalization " +
            "rates for the subject and are recent, however, there are differences regarding the comparables which do not " +
            "justify utilizing the comparable in the sales comparison approach (i.e. location, size, etc.).";
    }

    chooseCompIncomePotential(value: string): CapRateCompsActions {
        capRateCompsPage.comparableIncomePotentialRadio.check(value);
        capRateCompsPage.getElementToCheckRadio(value).should("exist");
        return this;
    }

    chooseCompPropertyConditions(value: string): CapRateCompsActions {
        capRateCompsPage.propertyConditionsRadio.check(value);
        capRateCompsPage.getElementToCheckRadio(value).should("exist");
        return this;
    }

    chooseCompPropertyLocations(value: string): CapRateCompsActions {
        capRateCompsPage.propertyLocationsRadio.check(value);
        capRateCompsPage.getElementToCheckRadio(value).should("exist");
        return this;
    }
}

export default new CapRateCompsActions(capRateCompsPage);