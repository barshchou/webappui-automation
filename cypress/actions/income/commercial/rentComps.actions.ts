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
        rentCompsPage.searchResultsRow.should("be.visible").click();
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

    verifyRentPerSFCellValue(value: string, rowNumber = 0): CommercialRentCompsActions {
        rentCompsPage.getRentPerSFCellByRowNumber(rowNumber).should("have.text", `$${value}.00`);
        return this;
    }
}

export default new CommercialRentCompsActions(rentCompsPage);