import BaseActionsExt from "../../base/base.actions.ext";
import rentCompsPage from "../../../pages/income/commercial/rentComps.page";
import { BoweryReports } from "../../../types/boweryReports.type";
import { getNumberFromDollarNumberWithCommas } from "../../../../utils/numbers.utils";
import { _map } from "../../../support/commands";
import mapKeysUtils from "../../../utils/mapKeys.utils";

class CommercialRentCompsActions extends BaseActionsExt<typeof rentCompsPage> {

    openMap(): CommercialRentCompsActions {
        rentCompsPage.mapDropdown.click();
        return this;
    }

    verifyFiltersDropdownExist(): CommercialRentCompsActions {
        rentCompsPage.filtersDropdown.should("exist");
        return this;
    }

    clickFiltersDropdown(): CommercialRentCompsActions {
        rentCompsPage.filtersDropdown.click();
        return this;
    }

    verifyLeaseTermsSectionExist(): CommercialRentCompsActions {
        rentCompsPage.leaseTermsSection.should("exist");
        return this;
    }

    checkCheckboxByQAAttr(attribute: string): CommercialRentCompsActions {
        rentCompsPage.getNotCheckedCheckboxByQAAttr(attribute).should("exist").check();
        this.verifyProgressBarNotExist();
        rentCompsPage.getCheckedCheckboxByQAAttr(attribute).should("exist");
        return this;
    }

    uncheckCheckboxByQAAttr(attribute: string): CommercialRentCompsActions {
        rentCompsPage.getCheckedCheckboxByQAAttr(attribute).should("exist").uncheck();
        this.verifyProgressBarNotExist();
        rentCompsPage.getNotCheckedCheckboxByQAAttr(attribute).should("exist");
        return this;
    }

    verifySortBySectionExist(): CommercialRentCompsActions {
        rentCompsPage.sortBySection.should("exist");
        return this;
    }

    selectSortByOption(option: string): CommercialRentCompsActions {
        if(option == "Newest"){
            rentCompsPage.sortByDropdown.should("contain.text", option);
        }
        else{
            rentCompsPage.sortByDropdown.click();
            rentCompsPage.getDropdownOptionByValue(option).should("be.visible").click();
            rentCompsPage.sortByDropdown.should("contain.text", option);
        }
        
        return this;
    }

    verifyMapClosedByDefault(): CommercialRentCompsActions {
        rentCompsPage.mapDropdown.should("have.attr", "aria-expanded", "false");
        return this;
    }

    addCompFromMapByAddress(address: string): CommercialRentCompsActions {
        rentCompsPage.getAddCompButtonByAddress(address).click({ force: true });
        return this;
    }

    clickManuallyAddANewCompButton(): CommercialRentCompsActions {
        rentCompsPage.manuallyAddANewCompButton.click();
        return this;
    }

    enterAddressToSearch(address: string): CommercialRentCompsActions {
        rentCompsPage.addressSearchInput.type(`${address}{enter}`).should("have.value", address);
        return this;
    }

    clickSubmitButton(): CommercialRentCompsActions {
        rentCompsPage.submitButton.should("not.be.disabled").click({ force: true });
        return this;
    }

    clickToSearchResultsRow(): CommercialRentCompsActions {
        rentCompsPage.searchResultsRow.first().should("be.visible").click();
        return this;
    }

    searchNewCompByAddress(address: string): CommercialRentCompsActions {
        this.enterAddressToSearch(address).
            clickSubmitButton().
            clickToSearchResultsRow().
            clickSubmitButton();
        return this;
    }

    fillInRentCompFieldInput(fieldName: string, value: string): CommercialRentCompsActions {
        rentCompsPage.getRentCompInputField(fieldName).clear().type(`${value}{enter}`);
        return this;
    }

    chooseRentCompFieldDropdownOption(fieldName: string, option: string): CommercialRentCompsActions {
        rentCompsPage.getRentCompDropdownField(fieldName).click();
        rentCompsPage.getRentCompDropdownOption(option).click();
        return this;
    }

    enterLeaseDate(leaseDate: string): CommercialRentCompsActions {
        rentCompsPage.leaseDatePicker.type(leaseDate);
        return this;
    }

    clickEditButtonByRowNumber(rowNumber = 0): CommercialRentCompsActions {
        rentCompsPage.getEditButtonByRowNubmer(rowNumber).click();
        return this;
    }

    checkUnitOfMeasureRadioButton(name: string): CommercialRentCompsActions {
        rentCompsPage.getUnitOfMeasureRadioButton(name).click();
        return this;
    }

    verifyRentPerSFCellValue(value: number, group = "unsorted", rowNumber = 0): CommercialRentCompsActions {
        rentCompsPage.getRentPerSFCellByRowNumberAndGroup(group, rowNumber).should("have.text", `$${value}.00`);
        return this;
    }

    verifyAllItemsDragged(): CommercialRentCompsActions {
        rentCompsPage.draggableUnsortedPlaceholder.should('be.visible');
        return this;
    }

    /**
     * Drags ALL elements (units) from unsorted group into <groupName>.
     * 
     * Verifies that after dragging all elements there is no units left in unsorted group
    */
    dragAllCommercialUnitsIntoGroup(groupName: string, numberOfUnits = 1, index = 0): CommercialRentCompsActions {
        this.dragCommercialUnitsIntoGroup(groupName, numberOfUnits, index)
            .verifyAllItemsDragged();
        return this;
    }

    /**
     * Drag N amount of commercial unit into a group.
     * 
     * By default 1st commercial unit in unsorted group is dragged as after dragging indexes are reassigned.
     * 
     * If there is no elements in a drop group we use default locator, in other case we use 1st row of a group.
     */
    dragCommercialUnitsIntoGroup(groupName: string, numberOfUnits = 1, index = 0): CommercialRentCompsActions {
        let subject = rentCompsPage.getDragableElement(index); 
        let commercialUnit = cy.get(subject);
        let target: string;

        for (let i = 0; i < numberOfUnits; i++) {
            target = i == 0 ? rentCompsPage.getDropableArea(groupName) : rentCompsPage.getDropableAreaDropped(groupName);
            commercialUnit.dragAndDrop(subject, target);
        }
        return this;
    }

    verifyComputedSubjectMinCell(rentPSFs: number[], leaseStatuses: BoweryReports.LeaseStatus[]): CommercialRentCompsActions {
        const handledArray = CommercialRentCompsActions.handleRentPSFsArray(rentPSFs, leaseStatuses);
        const textToBe = handledArray.length === 0 ? "$0" : `$${Math.round(Math.min(...handledArray))}`;
        rentCompsPage.computedSubjectMinCell.should("have.text", textToBe);
        return this;
    }

    verifyComputedSubjectAvgCell(rentPSFs: number[], leaseStatuses: BoweryReports.LeaseStatus[]): CommercialRentCompsActions {
        const handledArray = CommercialRentCompsActions.handleRentPSFsArray(rentPSFs, leaseStatuses);
        const avgValue = handledArray.length === 0 ? 0 :
            handledArray.reduce((sum, current) => sum + current, 0) / handledArray.length;
        const textToBe = `$${Math.round(avgValue)}`;
        rentCompsPage.computedSubjectAvgCell.should("have.text", textToBe);
        return this;
    }

    verifyComputedSubjectMaxCell(rentPSFs: number[], leaseStatuses: BoweryReports.LeaseStatus[]): CommercialRentCompsActions {
        const handledArray = CommercialRentCompsActions.handleRentPSFsArray(rentPSFs, leaseStatuses);
        const textToBe = handledArray.length === 0 ? "$0" : `$${Math.round(Math.max(...handledArray))}`;
        rentCompsPage.computedSubjectMaxCell.should("have.text", textToBe);
        return this;
    }

    verifyComputedSubjectColumn(rentPSFs: number[], leaseStatuses: BoweryReports.LeaseStatus[]): CommercialRentCompsActions {
        this.verifyComputedSubjectMinCell(rentPSFs, leaseStatuses)
            .verifyComputedSubjectAvgCell(rentPSFs, leaseStatuses)
            .verifyComputedSubjectMaxCell(rentPSFs, leaseStatuses);
        return this;
    }

    private static handleRentPSFsArray(rentPSFs: number[], leaseStatuses: BoweryReports.LeaseStatus[]): number[] {
        return rentPSFs.filter((value, index) => leaseStatuses[index] !== "Vacant");
    }

    clickAddCompButtonByIndex(index = 0): CommercialRentCompsActions {
        rentCompsPage.addCompButtons.as("rentComps");
        cy.get("@rentComps").eq(index).click({ force: true });
        return this;
    }

    addNumberFirstComparables(numberToAdd: number): CommercialRentCompsActions {
        for (let i = 0; i < numberToAdd; i++) {
            this.clickAddCompButtonByIndex(i);
        }
        return this;
    }

    saveCompPricePerSFPerYearToAliasByIndex(group = "unsorted", index = 0): CommercialRentCompsActions {
        rentCompsPage.getRentPerSFCellByRowNumberAndGroup(group, index).invoke("text").then(elText => {
            const numberPriceValue = getNumberFromDollarNumberWithCommas(elText.trim());
            _map.set(`${index + 1}${mapKeysUtils.rent_per_sf}`, numberPriceValue);
        });
        return this;
    }

    saveCompPricesPerSFPerYearToAliasNumberFirstComps(numberToSave: number, group = "unsorted"): CommercialRentCompsActions {
        for (let i = 0; i < numberToSave; i++) {
            this.saveCompPricePerSFPerYearToAliasByIndex(group, i);
        }
        return this;
    }

    verifyComputedCompsMinValue(rentPSFs: number[]): CommercialRentCompsActions {
        const textToBe = rentPSFs.length === 0 ? "$0" : `$${Math.round(Math.min(...rentPSFs))}`;
        rentCompsPage.computedCompsMinCell.should("have.text", textToBe);
        return this;
    }

    verifyComputedCompsAvgValue(rentPSFs: number[]): CommercialRentCompsActions {
        const avgValue = rentPSFs.length === 0 ? 0 :
            rentPSFs.reduce((sum, current) => sum + current, 0) / rentPSFs.length;
        const textToBe = `$${Math.round(avgValue)}`;
        rentCompsPage.computedCompsAvgCell.should("have.text", textToBe);
        return this;
    }

    verifyComputedCompsMaxValue(rentPSFs: number[]): CommercialRentCompsActions {
        const textToBe = rentPSFs.length === 0 ? "$0" : `$${Math.round(Math.max(...rentPSFs))}`;
        rentCompsPage.computedCompsMaxCell.should("have.text", textToBe);
        return this;
    }

    verifyComputedCompsColumn(rentPSFs: number[]): CommercialRentCompsActions {
        this.verifyComputedCompsMinValue(rentPSFs)
            .verifyComputedCompsAvgValue(rentPSFs)
            .verifyComputedCompsMaxValue(rentPSFs);
        return this;
    }

    saveComputedCompsColumnValues(): CommercialRentCompsActions {
        rentCompsPage.computedCompsMinCell.invoke("text").then(value => {
            _map.set(mapKeysUtils.computed_comps_min, getNumberFromDollarNumberWithCommas(value));
        });
        rentCompsPage.computedCompsAvgCell.invoke("text").then(value => {
            _map.set(mapKeysUtils.computed_comps_avg, getNumberFromDollarNumberWithCommas(value));
        });
        rentCompsPage.computedCompsMaxCell.invoke("text").then(value => {
            _map.set(mapKeysUtils.computed_comps_max, getNumberFromDollarNumberWithCommas(value));
        });
        return this;
    }

    clickRemoveCompButtonGroupTableByIndex(index = 0, group = "unsorted"): CommercialRentCompsActions {
        rentCompsPage.getRemoveCompButtonsFromGroupTable(group).eq(index).click();
        return this;
    }
}

export default new CommercialRentCompsActions(rentCompsPage);