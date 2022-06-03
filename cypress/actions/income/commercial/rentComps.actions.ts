import BaseActionsExt from "../../base/base.actions.ext";
import rentCompsPage from "../../../pages/income/commercial/rentComps.page";

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

    verifyRentPerSFCellValue(value: number, rowNumber = 0): CommercialRentCompsActions {
        rentCompsPage.getRentPerSFCellByRowNumber(rowNumber).should("have.text", `$${value}.00`);
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
            if (i == 0){
                target = rentCompsPage.getDropableArea(groupName);
            } else {
                target = rentCompsPage.getDropableAreaDropped(groupName);
            }
            
            commercialUnit.dragAndDrop(subject, target);
        }
        return this;
    }
}

export default new CommercialRentCompsActions(rentCompsPage);