import rentRollPage from "../../../pages/income/residential/rentRoll.page";
import {
    getNumberFromDollarNumberWithCommas,
    isDecimal,
    isHalfDecimalPart,
    numberWithCommas
} from "../../../../utils/numbers.utils";
import ResidentialRentRollSharedActions from "../../shared_components/residentialRentRoll.shared.actions";
import { BoweryReports } from "../../../types/boweryReports.type";
import { isProdEnv } from "../../../integration/checkIsProd.utils";
import { _NavigationSection } from "../../base";

class InPlaceRentRollActions extends ResidentialRentRollSharedActions<typeof rentRollPage> {

    verifyViaCSVExist(): InPlaceRentRollActions {
        rentRollPage.importViaCSVHeader.scrollIntoView().should("be.visible");
        return this;
    }

    verifyUploadCSVRow(links: Readonly<{prodLink: string, othersLink: string}>): InPlaceRentRollActions {
        let linkToBe;
        if (isProdEnv()) {
            linkToBe = links.prodLink;
        } else {
            linkToBe = links.othersLink;
        }
        rentRollPage.skipManualRentEntryRow.scrollIntoView().should("be.visible");
        rentRollPage.uploadCSVLink.should("be.visible").should("have.attr", "href", linkToBe);
        return this;
    }

    verifyNumberOfResidentialUnits(unitsNumber: number | string): InPlaceRentRollActions {
        rentRollPage.numberOfResidentialUnitsField.should("be.disabled").should("have.value", unitsNumber);
        return this;
    }

    clickGoToPropSummaryButton(): InPlaceRentRollActions {
        rentRollPage.goToPropSummaryButton.should("be.visible").click();
        return this;
    }

    goToPropSummaryWithSaveLeavingFirst(): InPlaceRentRollActions {
        this.clickGoToPropSummaryButton();
        _NavigationSection.submitSaveChangesModal();
        return this;
    }

    goToPropSummaryWithSaveSaveClickFirst(): InPlaceRentRollActions {
        this.clickSaveButton();
        this.clickGoToPropSummaryButton();
        return this;
    }

    goToPropSummaryWithoutSave(): InPlaceRentRollActions {
        this.clickGoToPropSummaryButton()
            .clickNoButton();
        return this;
    }

    verifyColumnExist(columnName: string): InPlaceRentRollActions {
        rentRollPage.getColumnHeader(columnName).should("exist");
        return this;
    }

    verifyColumnNotExist(columnName: string): InPlaceRentRollActions {
        rentRollPage.getColumnHeader(columnName).should("not.exist");
        return this;
    }

    verifyListColumnExist(columnNames: Array<string>): InPlaceRentRollActions {
        columnNames.forEach(column => {
            this.verifyColumnExist(column);
        });
        return this;
    }

    verifyListColumnNotExist(columnNames: Array<string>):InPlaceRentRollActions {
        columnNames.forEach(column => {
            this.verifyColumnNotExist(column);
        });
        return this;
    }

    checkPerUnitSquareFootage(value = true):InPlaceRentRollActions {
        rentRollPage.getPerUnitSFRadio(value).scrollIntoView()
            .click().should("be.checked");
        return this;
    }

    clickPSFRadio(radioName: string): InPlaceRentRollActions {
        rentRollPage.getPSFRadio(radioName).click();
        return this;
    }

    verifyPerUnitSFRadioCheck(radio = true, isChecked = true): InPlaceRentRollActions {
        const element = radio === true ? rentRollPage.getPerUnitSFRadio(radio) : rentRollPage.getPerUnitSFRadio(false);
        if (isChecked === true) {
            element.should("be.checked");
        } else {
            element.should("not.be.checked");
        }
        return this;
    }

    checkCheckboxByLabel(label: string): InPlaceRentRollActions {
        rentRollPage.getCheckboxByLabel(label).scrollIntoView().should("have.value", "false")
            .check().should("have.value", "true");
        return this;
    }

    uncheckCheckboxByLabel(label: string): InPlaceRentRollActions {
        rentRollPage.getCheckboxByLabel(label).scrollIntoView().should("have.value", "true")
            .uncheck().should("have.value", "false");
        return this;
    }

    verifyCheckboxIsChecked(label: string): InPlaceRentRollActions {
        rentRollPage.getCheckboxByLabel(label).should("have.value", "true");
        return this;
    }

    verifyCheckboxNotExist(label: string): InPlaceRentRollActions {
        rentRollPage.getCheckboxByLabel(label).should("not.exist");
        return this;
    }

    checkUncheckCheckboxForColumn(columnName: string, label: string): InPlaceRentRollActions {
        this.checkCheckboxByLabelAndVerify(label, columnName)
            .uncheckCheckboxByLabel(label)
            .verifyColumnNotExist(columnName);
        return this;
    }

    checkCheckboxByLabelAndVerify(label: string, columnName: string): InPlaceRentRollActions {
        this.checkCheckboxByLabel(label)
            .verifyColumnExist(columnName);
        return this;
    }

    checkUncheckPerUnitSquareFootage(columnNames: Array<string>): InPlaceRentRollActions {
        this.checkPerUnitSquareFootage()
            .verifyListColumnExist(columnNames)
            .checkPerUnitSquareFootage(false)
            .verifyListColumnNotExist(columnNames);
        return this;
    }

    verifyCheckPerUnitSquareFootageColumns(columnNames: string[]): InPlaceRentRollActions {
        this.checkPerUnitSquareFootage()
            .verifyListColumnExist(columnNames);
        return this;
    }

    uploadFile(filePath: string, unitsToBe: number): InPlaceRentRollActions {
        rentRollPage.uploadFileButton.should("be.visible");
        rentRollPage.uploadFileInput.should("exist").attachFile(filePath);
        rentRollPage.importDataButton.should("exist").should("be.enabled").click();
        this.verifyNumberOfResidentialUnits(unitsToBe);
        this.verifyNumberOfIsInspectedRows(unitsToBe);
        return this;
    }

    enterAllEqualRentTypeCells(rentType: string): InPlaceRentRollActions {
        rentRollPage.rentTypeCells.each((cell, i) => {
            this.enterRentTypeCellByRowNumber(rentType, i)
                .verifyRentTypeCellByRowNumber(rentType, i);
        });
        return this;
    }

    enterRentTypeCellByRowNumber(rentType: string, rowNumber = 0): this {
        rentRollPage.rentTypeCells.eq(rowNumber).dblclick();
        this.enterTextToTextarea(rentType);
        return this;
    }

    removeRentTypeByRowNumber(number = 0): InPlaceRentRollActions {
        rentRollPage.rentTypeCells.eq(number).click().type("{backspace}");
        this.verifyLeaseStatusByRow("", number);
        return this;
    }

    pasteRentTypeByRowNumber(value: string | number, rowNumber = 0): InPlaceRentRollActions {
        rentRollPage.rentTypeCells.eq(rowNumber).dblclick();
        rentRollPage.textAreaToInput.clear().invoke("val", value);
        cy.get(".listbox ").contains(value).click();
        rentRollPage.rentTypeCells.eq(rowNumber).should("include.text", value);
        return this;
    }

    setIsInspectedCheckboxByRowNumber(number = 0, isCheck = true): InPlaceRentRollActions {
        rentRollPage.isInspectedInputs.eq(number).as("inspectedInputs");
        if (isCheck === true) {
            cy.get("@inspectedInputs").click().find("input")
                .check();
            cy.get("@inspectedInputs").find("input").should("be.checked");
        } else {
            cy.get("@inspectedInputs").click().find("input")
                .uncheck();
            cy.get("@inspectedInputs").find("input").should("not.be.checked");
        }
        return this;
    }

    setCheckListIsInspectedByRowNumbers(numbers: Array<number>, isCheck = true): InPlaceRentRollActions {
        numbers.forEach(number => {
            this.setIsInspectedCheckboxByRowNumber(number, isCheck);
        });
        return this;
    }

    enterUnitNumbersByOrderToAll(numberOfUnits: number): InPlaceRentRollActions {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterUnitNumberByRow(i + 1, i);
        }
        return this;
    }

    enterUnitNumberByRow(numberToEnter: number, rowNumber = 0): this {
        rentRollPage.unitNumberCells.eq(rowNumber).dblclick();
        this.enterTextToTextarea(`${numberToEnter}`)
            .verifyUnitNumberByRow(numberToEnter, rowNumber);
        return this;
    }

    removeUnitNumberByRowNumber(number = 0): InPlaceRentRollActions {
        rentRollPage.unitNumberCells.eq(number).click().type("{backspace}");
        rentRollPage.pageTitle.click();
        rentRollPage.unitNumberCells.eq(number).should("have.text", "");
        return this;
    }

    pasteUnitNumberByRowNumber(value: number, rowNumber = 0): InPlaceRentRollActions {
        rentRollPage.unitNumberCells.eq(rowNumber).dblclick();
        this.pasteTextToTextarea(`${value}`);
        this.verifyUnitNumberByRow(value, rowNumber);
        return this;
    }

    enterRoomsNumberByRowNumber(value: number | string, number: number): InPlaceRentRollActions {
        rentRollPage.roomsCells.eq(number).dblclick();
        this.enterTextToTextarea(`${value}`);
        if (typeof value === "string") {
            this.verifyRoomsNumberByRow(0, number);
        } else {
            this.verifyRoomsNumberByRow(value, number);
        }
        return this;
    }

    removeRoomsNumberByRowNumber(number = 0): InPlaceRentRollActions {
        rentRollPage.roomsCells.eq(number).click().type("{backspace}");
        rentRollPage.pageTitle.click();
        this.verifyRoomsNumberByRow(0, number);
        return this;
    }

    pasteRoomsByRowNumber(value: number | string, rowNumber = 0): InPlaceRentRollActions {
        rentRollPage.roomsCells.eq(rowNumber).dblclick();
        this.pasteTextToTextarea(`${value}`);
        this.verifyRoomsNumberByRow(value, rowNumber);
        return this;
    }

    enterAllEqualRoomsNumber(roomsNumber: number, numberOfUnits: number): InPlaceRentRollActions {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterRoomsNumberByRowNumber(roomsNumber, i);
        }
        return this;
    }

    enterBedroomsNumberByRowNumber(bedroomsNumber: number | string, rowNumber = 0): InPlaceRentRollActions {
        rentRollPage.bedroomsCells.eq(rowNumber).dblclick();
        this.enterTextToTextarea(`${bedroomsNumber}`)
            .verifyBedroomsNumberByRow(bedroomsNumber, rowNumber);
        return this;
    }

    enterAllEqualBedroomsNumber(bedroomsNumber: number, numberOfUnits: number): InPlaceRentRollActions {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterBedroomsNumberByRowNumber(bedroomsNumber, i);
        }
        return this;
    }

    removeBedroomsNumberByRowNumber(number = 0): InPlaceRentRollActions {
        rentRollPage.bedroomsCells.eq(number).click().type("{backspace}");
        rentRollPage.pageTitle.click();
        this.verifyBedroomsNumberByRow(0, number);
        return this;
    }

    pasteBedroomsByRowNumber(value: number | string, rowNumber = 0): InPlaceRentRollActions {
        rentRollPage.bedroomsCells.eq(rowNumber).dblclick();
        this.pasteTextToTextarea(`${value}`);
        this.verifyBedroomsNumberByRow(value, rowNumber);
        return this;
    }

    enterLeaseStatusByRowNumber(status: string, number = 0): this {
        rentRollPage.leaseStatusCells.eq(number).dblclick();
        this.enterTextToTextarea(status)
            .verifyLeaseStatusByRow(status, number);
        return this;
    }

    removeLeaseStatusByRowNumber(number = 0): InPlaceRentRollActions {
        rentRollPage.leaseStatusCells.eq(number).click().type("{backspace}");
        this.verifyLeaseStatusByRow("", number);
        return this;
    }

    pasteLeaseStatusByRowNumber(value: string | number, rowNumber = 0): InPlaceRentRollActions {
        rentRollPage.leaseStatusCells.eq(rowNumber).dblclick();
        rentRollPage.textAreaToInput.clear().invoke("val", value);
        cy.get(".listbox").contains(value).click();
        rentRollPage.leaseStatusCells.eq(rowNumber).should("include.text", value);
        return this;
    }

    enterAllEqualLeaseStatuses(leaseStatus: string): InPlaceRentRollActions {
        rentRollPage.leaseStatusCells.each((cell, i) => {
            this.enterLeaseStatusByRowNumber(leaseStatus, i);
        });
        return this;
    }

    enterForecastByRowNumber(forecastValue: number | string, rowNumber = 0): InPlaceRentRollActions {
        let forecastText;
        if (typeof forecastValue === "number") {
            forecastText = `$${numberWithCommas(forecastValue.toFixed(2))}`;
        } else {
            if ((Number(forecastValue)).toFixed && !isNaN(Number(forecastValue))) {
                forecastText = `$${numberWithCommas((Number(forecastValue)).toFixed(2))}`;
            } else {
                forecastText = "$0.00";
            }
        }
        rentRollPage.rentForecastCells.eq(rowNumber).dblclick();
        this.enterTextToTextarea(`${forecastValue}`)
            .verifyRentForecastByRow(forecastText, rowNumber);
        return this;
    }

    enterMonthlyRentByRowNumber(value: string | number, rowNumber = 0): this {
        const textToBe = typeof value === "string" ? value : `$${numberWithCommas(value.toFixed(2))}`;
        rentRollPage.monthlyRentCells.eq(rowNumber).dblclick();
        this.enterTextToTextarea(`${value}`);
        rentRollPage.monthlyRentCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    pasteMonthlyRentByRowNumber(value: string | number, rowNumber = 0): InPlaceRentRollActions {
        const textToBe = typeof value === "string" ? value : `$${numberWithCommas(value.toFixed(2))}`;
        rentRollPage.monthlyRentCells.eq(rowNumber).dblclick();
        this.pasteTextToTextarea(`${value}`);
        rentRollPage.monthlyRentCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    enterMonthlyRents(values: number[]): InPlaceRentRollActions {
        values.forEach((value, index) => {
            this.enterMonthlyRentByRowNumber(value, index);
        });
        return this;
    }

    enterAllEqualMonthlyRents(monthlyRent: string | number): InPlaceRentRollActions {
        rentRollPage.monthlyRentCells.each((cell, i) => {
            this.enterMonthlyRentByRowNumber(monthlyRent, i);
        });
        return this;
    }

    enterAllEqualForecast(forecastValue: string | number, numberOfUnits: number): InPlaceRentRollActions {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterForecastByRowNumber(forecastValue, i);
        }
        return this;
    }
      
    verifyRentRollCommentary(commentaryToBe: string, include = false): InPlaceRentRollActions {
        if (include === true) {
            rentRollPage.rentRollCommentary.should("include.text", commentaryToBe);
        } else {
            rentRollPage.rentRollCommentary.should("have.text", commentaryToBe);
        }
        return this;
    }

    enterOutdoorSpaceByOptionByRow(space: string, rowNumber = 0): InPlaceRentRollActions {
        rentRollPage.outdoorSpaceCells.eq(rowNumber).dblclick();
        this.chooseOptionFromTableListbox(space)
            .verifyOutdoorSpaceByRow(space, rowNumber);
        return this;
    }

    chooseOptionFromTableListbox(option: string): InPlaceRentRollActions {
        rentRollPage.tableListboxOptions.contains(option).click();
        return this;
    }

    enterSquareFootageByRow(value: string | number, rowNumber = 0): InPlaceRentRollActions {
        rentRollPage.squareFootageCells.eq(rowNumber).dblclick();
        this.enterTextToTextarea(`${value}`);
        let number = typeof value === "string" ? getNumberFromDollarNumberWithCommas(value) : value;
        let textToBe;
        if (number > (99 * Math.pow(10, 19))) {
            textToBe = "NaN";
        } else if (number === 0) {
            textToBe = "";
        } else {
            textToBe = typeof value === "string" ? value : numberWithCommas(value.toFixed(2));
        }
        this.verifySquareFootageCellByRow(textToBe, rowNumber);
        return this;
    }

    enterNumberBathroomsByRow(value:number | string, rowNumber = 0): InPlaceRentRollActions {
        rentRollPage.bathroomsCells.eq(rowNumber).as("bathroomCell");
        cy.get("@bathroomCell").dblclick();
        this.enterTextToTextarea(`${value}`)
            .verifyBathroomCellByRow(value, rowNumber);
        if ((isDecimal(value) && !isHalfDecimalPart(value)) || Number(value) < 0) {
            cy.get("@bathroomCell").should("have.class", "invalid");
        }
        return this;
    }

    private enterTextToTextarea(text: string): InPlaceRentRollActions {
        rentRollPage.textAreaToInput.clear().type(text).type("{enter}");
        return this;
    }

    private pasteTextToTextarea(text: string): InPlaceRentRollActions {
        rentRollPage.textAreaToInput.clear().invoke("val", text).type("{enter}");
        return this;
    }

    chooseUnitTypeByRow(type: string, rowNumber = 0): InPlaceRentRollActions {
        rentRollPage.unitTypeCells.eq(rowNumber).dblclick();
        this.chooseOptionFromTableListbox(type)
            .verifyUnitTypeCellByRow(type, rowNumber);
        return this;
    }

    verifyMonthlyTotalRentValue(): InPlaceRentRollActions {
        rentRollPage.monthlyRentCells.then(rentCells => {
            rentRollPage.leaseStatusCells.then(leaseStatusCells => {
                let totalToBe = 0;
                const vacantLeaseStatusText: BoweryReports.LeaseStatus = "Vacant";
                for (let i = 0; i < rentCells.length; i++) {
                    if (!leaseStatusCells.eq(i).text().includes(vacantLeaseStatusText)) {
                        let cellNumber = getNumberFromDollarNumberWithCommas(rentCells.eq(i).text());
                        totalToBe += cellNumber;
                    }
                }
                const textToBe = `$${numberWithCommas(totalToBe.toFixed(2))}`;
                rentRollPage.monthlyTotalRent.should("have.text", textToBe);
            });
        });
        return this;
    }

    enterAppraiserCommentary(value: string | number): InPlaceRentRollActions {
        rentRollPage.rentRollAppraiserCommentary.should("be.visible");
        rentRollPage.rentRollAppraiserCommentary.clear().type(`${value}`).should("have.text", value);
        return this;
    }
    
}

export default new InPlaceRentRollActions(rentRollPage);
