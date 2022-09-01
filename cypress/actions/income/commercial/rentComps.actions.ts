import BaseActionsExt from "../../base/base.actions.ext";
import rentCompsPage from "../../../pages/income/commercial/rentComps.page";
import { BoweryReports } from "../../../types/boweryReports.type";
import {
    cutDecimalPartToNumberOfDigits, cutDotFromNumber,
    getNumberFromDollarNumberWithCommas,
    isDecimal, numberWithCommas
} from "../../../../utils/numbers.utils";
import { _map } from "../../../support/commands";
import mapKeysUtils from "../../../utils/mapKeys.utils";
import { getTodayDateString, isDateHasCorrectFormat } from "../../../../utils/date.utils";
import { Alias } from "../../../utils/alias.utils";

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
        if (option == "Newest") {
            rentCompsPage.sortByDropdown.should("contain.text", option);
        } else {
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

    fillInRentCompFieldInput(fieldName: string, value: string | number,
        isRequired = false): CommercialRentCompsActions {
        const requiredAttrMatcher = isRequired ? "have.attr" : "not.have.attr";
        rentCompsPage.getRentCompInputField(fieldName).clear().type(`${value}{enter}`)
            .should(requiredAttrMatcher, "required");
        return this;
    }

    chooseRentCompFieldDropdownOption(fieldName: string, option: string): CommercialRentCompsActions {
        this.clickRentCompDropdownField(fieldName)
            .selectRentCompDropdownOption(option);
        return this;
    }

    clickRentCompDropdownField(fieldName: string): CommercialRentCompsActions {
        rentCompsPage.getRentCompDropdownField(fieldName).click();
        return this;
    }

    selectRentCompDropdownOption(option: string): CommercialRentCompsActions {
        rentCompsPage.getRentCompDropdownOption(option).click();
        return this;
    }

    enterLeaseDate(leaseDate = getTodayDateString()): CommercialRentCompsActions {
        rentCompsPage.leaseDatePicker.type(leaseDate).should("have.attr", "required");
        this.verifyLeaseDate(leaseDate);
        return this;
    }

    clickRemoveButtonByRowNumber(rowNumber = 0): CommercialRentCompsActions {
        rentCompsPage.getRemoveCompButton(rowNumber).click();
        return this;
    }

    verifyRentPerMonthCellValue(value: number, group = "Unsorted", rowNumber = 0): CommercialRentCompsActions {
        rentCompsPage.getRentPerSFCellByRowNumberAndGroup(group, rowNumber)
            .should("have.text", `$${numberWithCommas(value.toFixed(2))}`);
        return this;
    }

    verifyRentPerMonthCellPSFValue(group = "Unsorted", rowNumber = 0): CommercialRentCompsActions {
        this.clickEditButtonByRowNumber(rowNumber);
        const baseRent = rentCompsPage.getRentCompInputField("baseRent").invoke("val");
        baseRent.then(baseRent => {
            const rentValue = getNumberFromDollarNumberWithCommas(baseRent);
            const perSquareFootValue = `$${(rentValue / 12).toFixed(2)}`;
            rentCompsPage.cancelModalButton.click();
            rentCompsPage.getRentPerSFCellByRowNumberAndGroup(group, rowNumber).should("have.text", perSquareFootValue);
        });
        return this;
    }

    verifyRentPerMonthCellMonthlyOrAnnuallyValue(name: BoweryReports.UnitsOfMeasure = "monthly",
        group = "Unsorted", rowNumber = 0): CommercialRentCompsActions {
        this.clickEditButtonByRowNumber(rowNumber);
        const baseRent = rentCompsPage.getRentCompInputField("baseRent").invoke("val");
        const squareFeet = rentCompsPage.getRentCompInputField("squareFeet").invoke("val");
        baseRent.then(baseRent => {
            const baseRentNum = getNumberFromDollarNumberWithCommas(baseRent);
            squareFeet.then(squareFeet => {
                const squareFeetNum = getNumberFromDollarNumberWithCommas(squareFeet);
                const perSquareFootValue = (name === "monthly") ? `$${(baseRentNum / squareFeetNum).toFixed(2)}`
                    : `$${(baseRentNum / 12 / squareFeetNum).toFixed(2)}`;
                rentCompsPage.cancelModalButton.click();
                rentCompsPage.getRentPerSFCellByRowNumberAndGroup(group, rowNumber)
                    .should("have.text", perSquareFootValue);
            });
        });
        return this;
    }

    verifyLeaseDate(date: string): CommercialRentCompsActions {
        const valueToBe = isDateHasCorrectFormat(date) ? date : "";
        rentCompsPage.leaseDateInputToVerify.should("have.value", valueToBe);
        this.verifyComponentErrorMessageExists(!isDateHasCorrectFormat(date));
        return this;
    }

    verifyComponentErrorMessageExists(isExist = true): CommercialRentCompsActions {
        const matcher = isExist ? "exist" : "not.exist";
        rentCompsPage.componentErrorElement.should(matcher);
        return this;
    }

    clickEditButtonByRowNumber(rowNumber = 0): CommercialRentCompsActions {
        rentCompsPage.getEditCompButton(rowNumber).click();
        return this;
    }

    checkUnitOfMeasureRadioButton(name: BoweryReports.UnitsOfMeasure): CommercialRentCompsActions {
        rentCompsPage.getUnitMeasureRadioByValue(name).click();
        return this;
    }

    verifyRentPerSFCellValue(value: number, group = "Unsorted", rowNumber = 0): CommercialRentCompsActions {
        rentCompsPage.getRentPerSFCellByRowNumberAndGroup(group, rowNumber).should("have.text", `$${value}.00`);
        return this;
    }

    verifyAllItemsDragged(): CommercialRentCompsActions {
        rentCompsPage.draggableUnsortedPlaceholder.should('exist');
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
        let subject = rentCompsPage.getDraggableElement(index);
        let commercialUnit = cy.get(subject);
        let target: string;

        for (let i = 0; i < numberOfUnits; i++) {
            target = i == 0
                ? rentCompsPage.getDroppableArea(groupName)
                : rentCompsPage.getDroppableAreaDropped(groupName);
            commercialUnit.dragAndDrop(subject, target);
            // VB: For more than 2 units Drag and drop is too slow and we need to wait a bit between dnd actions.
            cy.wait(1500);
        }
        return this;
    }

    clickAddRemovedCompByRowButton(rowNumber = 0): CommercialRentCompsActions {
        rentCompsPage.addRemovedCompByRowButton(rowNumber).click().should("not.exist");
        rentCompsPage.getEditCompButton(rowNumber).should("exist");
        return this;
    }

    clickRemoveRemovedCompByRowButton(rowNumber = 0): CommercialRentCompsActions {
        rentCompsPage.removeRemovedCompByRowButton(rowNumber).click().should("not.exist");
        return this;
    }

    clickClearAllButton(title?: string): CommercialRentCompsActions {
        rentCompsPage.clearAllButton.click();
        rentCompsPage.getRemovedCompRows(title).should('not.exist');
        return this;
    }

    verifyComputedSubjectMinCell(rentPSFs: number[], 
        leaseStatuses: BoweryReports.LeaseStatus[]): CommercialRentCompsActions {
        const handledArray = CommercialRentCompsActions.handleRentPSFsArray(rentPSFs, leaseStatuses);
        const textToBe = handledArray.length === 0 
            ? "$0" 
            : `$${Math.round(Math.min(...handledArray))}`;
        rentCompsPage.computedSubjectMinCell.should("have.text", textToBe);
        return this;
    }

    verifyComputedSubjectAvgCell(rentPSFs: number[], 
        leaseStatuses: BoweryReports.LeaseStatus[]): CommercialRentCompsActions {
        const handledArray = CommercialRentCompsActions.handleRentPSFsArray(rentPSFs, leaseStatuses);
        const avgValue = handledArray.length === 0 
            ? 0 
            : handledArray.reduce((sum, current) => sum + current, 0) / handledArray.length;
        const textToBe = `$${Math.round(avgValue)}`;
        rentCompsPage.computedSubjectAvgCell.should("have.text", textToBe);
        return this;
    }

    verifyComputedSubjectMaxCell(rentPSFs: number[], 
        leaseStatuses: BoweryReports.LeaseStatus[]): CommercialRentCompsActions {
        const handledArray = CommercialRentCompsActions.handleRentPSFsArray(rentPSFs, leaseStatuses);
        const textToBe = handledArray.length === 0 
            ? "$0" 
            : `$${Math.round(Math.max(...handledArray))}`;
        rentCompsPage.computedSubjectMaxCell.should("have.text", textToBe);
        return this;
    }

    verifyComputedSubjectColumn(rentPSFs: number[], 
        leaseStatuses: BoweryReports.LeaseStatus[]): CommercialRentCompsActions {
        this.verifyComputedSubjectMinCell(rentPSFs, leaseStatuses)
            .verifyComputedSubjectAvgCell(rentPSFs, leaseStatuses)
            .verifyComputedSubjectMaxCell(rentPSFs, leaseStatuses);
        return this;
    }

    private static handleRentPSFsArray(rentPSFs: number[], leaseStatuses: BoweryReports.LeaseStatus[]): number[] {
        return rentPSFs.filter((_, index) => leaseStatuses[index] !== "Vacant");
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

    saveCompPricePerSFPerYearToAliasByIndex(group = "Unsorted", index = 0): CommercialRentCompsActions {
        rentCompsPage.getRentPerSFCellByRowNumberAndGroup(group, index).invoke("text").then(elText => {
            const numberPriceValue = getNumberFromDollarNumberWithCommas(elText.trim());
            _map.set(`${index + 1}${mapKeysUtils.rentPerSf}`, numberPriceValue);
        });
        return this;
    }

    clickYesNoIfModalExist(yes = true): CommercialRentCompsActions {
        cy.get("body").then($body => {
            if ($body.text().includes("Would you like to select them?")) {
                const button = yes ? rentCompsPage.getModalDialogYesButtons()
                    : rentCompsPage.getModalDialogNoButtons();
                button.click();
                this.verifyProgressBarNotExist();
            }
        });
        return this;
    }

    saveCompPricesPerSFPerYearToAliasNumberFirstComps(numberToSave: number,
        group = "Unsorted"): CommercialRentCompsActions {
        for (let i = 0; i < numberToSave; i++) {
            this.saveCompPricePerSFPerYearToAliasByIndex(group, i);
        }
        return this;
    }

    verifyComputedCompsMinValue(rentPSFs: number[]): CommercialRentCompsActions {
        const textToBe = rentPSFs.length === 0
            ? "$0"
            : `$${Math.round(Math.min(...rentPSFs))}`;
        rentCompsPage.computedCompsMinCell.should("have.text", textToBe);
        return this;
    }

    verifyComputedCompsAvgValue(rentPSFs: number[]): CommercialRentCompsActions {
        const avgValue = rentPSFs.length === 0
            ? 0
            : rentPSFs.reduce((sum, current) => sum + current, 0) / rentPSFs.length;
        const textToBe = `$${Math.round(avgValue)}`;
        rentCompsPage.computedCompsAvgCell.should("have.text", textToBe);
        return this;
    }

    verifyComputedCompsMaxValue(rentPSFs: number[]): CommercialRentCompsActions {
        const textToBe = rentPSFs.length === 0
            ? "$0"
            : `$${Math.round(Math.max(...rentPSFs))}`;
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
            _map.set(mapKeysUtils.computedCompsMin, getNumberFromDollarNumberWithCommas(value));
        });
        rentCompsPage.computedCompsAvgCell.invoke("text").then(value => {
            _map.set(mapKeysUtils.computedCompsAvg, getNumberFromDollarNumberWithCommas(value));
        });
        rentCompsPage.computedCompsMaxCell.invoke("text").then(value => {
            _map.set(mapKeysUtils.computedCompsMax, getNumberFromDollarNumberWithCommas(value));
        });
        return this;
    }

    clickRemoveCompButtonGroupTableByIndex(index = 0, group = "unsorted"): CommercialRentCompsActions {
        rentCompsPage.getRemoveCompButtonsFromGroupTable(group).eq(index).click();
        return this;
    }

    verifyCommercialUnitDetailsUnitMeasureRadioChecked(measureValue: BoweryReports.UnitsOfMeasure):
    CommercialRentCompsActions {
        rentCompsPage.getUnitMeasureRadioByValue(measureValue).parent("[data-qa=checked]").should("exist");
        return this;
    }

    verifyCompGroupColumnExists(column: string, isExists = true, group = "Unsorted"): CommercialRentCompsActions {
        const matcher = isExists ? "exist" : "not.exist";
        rentCompsPage.getCompGroupTableColumn(group, column).should(matcher);
        return this;
    }

    verifyUnitDetailsDropdownText(fieldName: string, text: string): CommercialRentCompsActions {
        rentCompsPage.getRentCompDropdownField(fieldName).should("contain.text", text);
        return this;
    }

    verifySubmitButtonDisabled(isDisabled = true): CommercialRentCompsActions {
        const matcher = isDisabled ? "be.disabled" : "not.be.disabled";
        rentCompsPage.submitButton.should(matcher);
        return this;
    }

    enterUnitDetailsBaseRent(baseRent: number): CommercialRentCompsActions {
        this.fillInRentCompFieldInput("baseRent", baseRent, true)
            .verifyBaseRentInputValue(baseRent);
        return this;
    }

    verifyBaseRentInputValue(baseRent: number): CommercialRentCompsActions {
        const numberToBe = isDecimal(baseRent) ? cutDecimalPartToNumberOfDigits(baseRent) : baseRent;
        const valueToBe = `$${numberWithCommas(numberToBe)}`;
        this.verifyInputFieldValue("baseRent", valueToBe, true);
        return this;
    }

    enterUnitDetailsSquareFeet(squareFeet: number): CommercialRentCompsActions {
        this.fillInRentCompFieldInput("squareFeet", squareFeet, true)
            .verifyUnitDetailsSquareFeet(squareFeet);
        return this;
    }

    verifyUnitDetailsSquareFeet(squareFeet: number): CommercialRentCompsActions {
        const numberToBe = isDecimal(squareFeet) ? cutDotFromNumber(squareFeet) : squareFeet;
        const valueToBe = numberWithCommas(numberToBe);
        this.verifyInputFieldValue("squareFeet", valueToBe, true);
        return this;
    }

    verifyInputFieldValue(fieldName: string, value: string, isRequired = false): CommercialRentCompsActions {
        const matcher = isRequired ? "have.attr" : "not.have.attr";
        rentCompsPage.getRentCompInputField(fieldName).should("have.value", value)
            .and(matcher, "required");
        return this;
    }

    private verifyIncludesPolygon(value: string | number): CommercialRentCompsActions {
        cy.contains("This polygon includes").should("include.text", `${value}`);
        return this;
    }

    /**
     * Draw polygon using coordinates. Need wait to render polygon 
     * @param coordinates Starts from map top left
     * @param dialogTitle Dialog title to click
     * @param isSelect Apply changes or not
     */
    drawPolygon(
        coordinates = [ { x: 0, y: 0 } ],
        dialogTitle = "Finish drawing",
        isSelect = true): CommercialRentCompsActions {
        cy.intercept('POST', '/commercialRentComps/search-units').as(Alias.searchUnits);
        rentCompsPage.mapDrawPolygonButton.click();
        coordinates.forEach(coord => {
            rentCompsPage.mapContainer.click(coord.x, coord.y);
            cy.wait(1000);
        });
        rentCompsPage.getMapDialogButtons(dialogTitle).click();
        cy.wait(`@${Alias.searchUnits}`, { timeout: 10000 }).then(({ response }) => {
            let countUnits = response.body.length;
            cy.log("countUnits", countUnits);
            this.verifyProgressBarNotExist()
                .verifyIncludesPolygon(countUnits)
                .clickYesNoIfModalExist(isSelect);
        });

        return this;
    }


    /**
     * Nikita: Edit only first element in changeable polygon
     * TODO: Need to figure out a way to change all the elements in edit polygon
     * @param coordinates Starts from map top left
     * @param dialogTitle Dialog title to click
     * @param isSelect Apply changes or not
     */

    editDrewPolygon(
        coordinates = [ { x: 0, y: 0 } ],
        dialogTitle = "Save changes",
        isSelect = true): CommercialRentCompsActions {
        cy.intercept('POST', '/commercialRentComps/search-units').as(Alias.searchUnits);
        rentCompsPage.getMapDialogButtons("Edit layers").click();
        coordinates.forEach((coord, index) => {
            rentCompsPage.editingIcon.then($el => {
                let canvas = $el.get(index);
                let rect = canvas.getBoundingClientRect();

                let center = {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                };

                cy.log('mousedown', {
                    clientX: center.x,
                    clientY: center.y
                });
                canvas.dispatchEvent(
                    new MouseEvent('mousedown', {
                        clientX: center.x,
                        clientY: center.y
                    })
                );

                cy.log('mousemove', {
                    clientX: center.x,
                    clientY: center.y + 5
                });
                canvas.dispatchEvent(
                    new MouseEvent('mousemove', {
                        clientX: center.x,
                        clientY: center.y + 5,
                        bubbles: true
                    })
                );

                cy.log('mousemove', {
                    clientX: center.x - coord.x,
                    clientY: center.y - coord.y,
                });
                canvas.dispatchEvent(
                    new MouseEvent('mousemove', {
                        clientX: center.x - coord.x,
                        clientY: center.y - coord.y,
                        bubbles: true
                    })
                );

                cy.log('mouseup', {
                    clientX: center.x - coord.x,
                    clientY: center.y - coord.y,
                });
                requestAnimationFrame(() => {
                    canvas.dispatchEvent(
                        new MouseEvent('mouseup', {
                            clientX: center.x - coord.x,
                            clientY: center.y - coord.y,
                            bubbles: true
                        })
                    );
                });
            });
        });
        rentCompsPage.getMapDialogButtons(dialogTitle).click();
        cy.wait(`@${Alias.searchUnits}`, { timeout: 10000 }).then(({ response }) => {
            let countUnits = response.body.length;
            cy.log("countUnits", countUnits);
            this.verifyProgressBarNotExist()
                .verifyIncludesPolygon(countUnits)
                .clickYesNoIfModalExist(isSelect);
        });

        return this;
    }

}

export default new CommercialRentCompsActions(rentCompsPage);
