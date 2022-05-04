import rentRollPage from "../../../pages/income/residential/rentRoll.page";
import {
    getNumberFromDollarNumberWithCommas,
    isDecimal,
    isHalfDecimalPart,
    numberWithCommas
} from "../../../../utils/numbers.utils";
import {isProdEnv} from "../../../../utils/env.utils";
import BaseActionsExt from "../../base/base.actions.ext";

class InPlaceRentRollActions extends BaseActionsExt<typeof rentRollPage> {

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

    verifyNumberOfIsInspectedRows(unitsNumber: string | number): InPlaceRentRollActions {
        if (unitsNumber !== 0) {
            rentRollPage.isInspectedColumnCells.first().scrollIntoView({duration: 2000});
            rentRollPage.isInspectedColumnCells.last().scrollIntoView({duration: 2000});
        }
        rentRollPage.isInspectedColumnCells.should("have.length", unitsNumber);
        return this;
    }

    clickGoToPropSummaryButton(): InPlaceRentRollActions {
        rentRollPage.goToPropSummaryButton.should("be.visible").click();
        return this;
    }

    goToPropSummaryWithSaveLeavingFirst(): InPlaceRentRollActions {
        this.clickGoToPropSummaryButton()
            .clickYesButton();
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

    checkPerUnitSquareFootage(value = "true"):InPlaceRentRollActions {
        rentRollPage.getPerUnitSFRadio(value).should("not.be.checked").scrollIntoView()
            .click().should("be.checked");
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
            .checkPerUnitSquareFootage("false")
            .verifyListColumnNotExist(columnNames);
        return this;
    }

     verifyCheckPerUnitSquareFootageColumns(columnNames: string[]): InPlaceRentRollActions {
        this.checkPerUnitSquareFootage()
            .verifyListColumnExist(columnNames);
        return this;
    }

    uploadFile(filePath: string, unitsToBe: number): InPlaceRentRollActions{
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

    verifyRentTypeCellByRowNumber(rentTypeToBe: string, rowNumber = 0): this {
        rentRollPage.rentTypeCells.eq(rowNumber).should("contain.text", rentTypeToBe);
        return this;
    }

    checkIsInspectedByRowNumber(number: string | number): InPlaceRentRollActions {
        rentRollPage.getIsInspectedCheckboxByRowNumber(number).check();
        return this;
    }

    checkListIsInspectedByRowNumbers(numbers: Array<string | number>): InPlaceRentRollActions {
        numbers.forEach(number => {
            this.checkIsInspectedByRowNumber(number);
        });
        return this;
    }

    enterUnitNumbersByOrderToAll(numberOfUnits: string | number): InPlaceRentRollActions {
        for (let i = 0; i < numberOfUnits; i++) {
            rentRollPage.unitNumberCells.eq(i).dblclick();
            this.enterTextToTextarea(`${i + 1}`);
            rentRollPage.unitNumberCells.eq(i).should("have.text", `${i + 1}`);
        }
        return this;
    }

    enterRoomsNumberByRowNumber(value: string | number, number: number): InPlaceRentRollActions {
        rentRollPage.roomsCells.eq(number).dblclick();
        this.enterTextToTextarea(value);
        rentRollPage.roomsCells.eq(number).should("have.text", value);
        return this;
    }

    enterAllEqualRoomsNumber(roomsNumber: string | number, numberOfUnits: number): InPlaceRentRollActions {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterRoomsNumberByRowNumber(roomsNumber, i);
        }
        return this;
    }

    enterBedroomsNumberByRowNumber(bedroomsNumber: string | number, rowNumber = 0): InPlaceRentRollActions {
        rentRollPage.bedroomsCells.eq(rowNumber).dblclick();
        this.enterTextToTextarea(`${bedroomsNumber}`);
        rentRollPage.bedroomsCells.eq(rowNumber).should("have.text", bedroomsNumber);
        return this;
    }

    enterAllEqualBedroomsNumber(bedroomsNumber: string | number, numberOfUnits: number): InPlaceRentRollActions {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterBedroomsNumberByRowNumber(bedroomsNumber, i);
        }
        return this;
    }

    enterLeaseStatusByRowNumber(status: string, number = 0): this {
        rentRollPage.leaseStatusCells.eq(number).dblclick();
        this.enterTextToTextarea(status);
        rentRollPage.leaseStatusCells.eq(number).should("contain.text", status);
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
        this.enterTextToTextarea(`${forecastValue}`);
        rentRollPage.rentForecastCells.eq(rowNumber).should("have.text", forecastText);
        return this;
    }

    enterMonthlyRentByRowNumber(value: string | number, rowNumber = 0): this {
        const textToBe = typeof value === "string" ? value : `$${numberWithCommas(value.toFixed(2))}`;
        rentRollPage.monthlyRentCells.eq(rowNumber).dblclick();
        this.enterTextToTextarea(`${value}`);
        rentRollPage.monthlyRentCells.eq(rowNumber).should("have.text", textToBe);
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

    verifyMonthlyTotalForecastEqualValue(): InPlaceRentRollActions {
        rentRollPage.rentForecastCells.then(cells => {
            let totalToBe = 0;
            for (let i = 0; i < cells.length; i++) {
                let cellNumber = getNumberFromDollarNumberWithCommas(cells.eq(i).text());
                totalToBe += cellNumber;
            }
            const textToBe = `$${numberWithCommas(totalToBe.toFixed(2))}`;
            rentRollPage.monthlyTotalRent.should("have.text", textToBe);
        });
        return this;
    }

    verifyAnnuallyTotalForecastEqualValue() {
        rentRollPage.monthlyTotalRent.then(monthly => {
            const monthlyNumber = getNumberFromDollarNumberWithCommas(monthly.text());
            const textToBe = `$${numberWithCommas((monthlyNumber * 12).toFixed(2))}`;
            rentRollPage.annualTotalRent.should("have.text", textToBe);
        });
        return this;
    }

    verifyRentRollCommentary(commentaryToBe: string): InPlaceRentRollActions {
        rentRollPage.rentRollCommentary.should("have.text", commentaryToBe);
        return this;
    }

    clickCloseIcon(): InPlaceRentRollActions {
        rentRollPage.closeIcon.click();
        return this;
    }

    verifyNumberOfUnitsNumberCells(numberOfUnits = 0): InPlaceRentRollActions {
        if (numberOfUnits === 0) {
            rentRollPage.unitNumberCells.should("not.exist");
        } else {
            rentRollPage.unitNumberCells.should("have.length", numberOfUnits);
        }
        return this;
    }

    verifyNumberOfNumberCells(numberOfUnits = 0): InPlaceRentRollActions {
        if (numberOfUnits === 0) {
            rentRollPage.numberCells.should("not.exist");
        } else {
            rentRollPage.numberCells.should("have.length", numberOfUnits);
        }
        return this;
    }

    enterOutdoorSpaceByOptionByRow(space: string, rowNumber = 0): InPlaceRentRollActions {
        rentRollPage.outdoorSpaceCells.eq(rowNumber).dblclick();
        this.chooseOptionFromTableListbox(space);
        rentRollPage.outdoorSpaceCells.should("contain.text", space);
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
        rentRollPage.squareFootageCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    enterNumberBathroomsByRow(value:number | string, rowNumber = 0): InPlaceRentRollActions {
        rentRollPage.bathroomsCells.eq(rowNumber).dblclick();
        this.enterTextToTextarea(`${value}`);
        rentRollPage.bathroomsCells.eq(rowNumber).should("have.text", value).as("checkedTextBathroom");
        if ((isDecimal(value) && !isHalfDecimalPart(value)) || Number(value) < 0) {
            cy.get("@checkedTextBathroom").should("have.class", "invalid");
        }
        return this;
    }

    private enterTextToTextarea(text: string): InPlaceRentRollActions {
        rentRollPage.textAreaToInput.clear().type(text).type("{enter}");
        return this;
    }

    chooseUnitTypeByRow(type: string, rowNumber = 0): InPlaceRentRollActions {
        rentRollPage.unitTypeCells.eq(rowNumber).dblclick();
        this.chooseOptionFromTableListbox(type);
        rentRollPage.unitTypeCells.eq(rowNumber).should("contain.text", type);
        return this;
    }

    verifyMonthlyTotalRentValue(): InPlaceRentRollActions {
        rentRollPage.monthlyRentCells.then(rentCells => {
            rentRollPage.leaseStatusCells.then(leaseStatusCells => {
                let totalToBe = 0;
                const vacantLeaseStatusText: BoweryReports.LeaseStatus = "Vacant";
                for (let i = 0; i < rentCells.length; i++) {
                    if(!leaseStatusCells.eq(i).text().includes(vacantLeaseStatusText)) {
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
    
    verifyRentSFValue(): InPlaceRentRollActions{
        rentRollPage.monthlyRentCells.then(el => {
            const monthlyRent = getNumberFromDollarNumberWithCommas(el.text());
            rentRollPage.squareFootageCells.then(sf => {
                const squareFootage = getNumberFromDollarNumberWithCommas(sf.text());
                const rentSFNumber = (monthlyRent * 12 / squareFootage).toFixed(2);
                if (squareFootage === 0) {
                    rentRollPage.rentSFCell.should("have.text", `$NaN`);
                } else {
                    rentRollPage.rentSFCell.should("have.text", `$${rentSFNumber}`);
                }
            });
        });
        return this;
    }
    
}

export default new InPlaceRentRollActions(rentRollPage);
