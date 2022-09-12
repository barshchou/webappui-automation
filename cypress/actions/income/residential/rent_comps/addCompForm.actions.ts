import addCompFormPage from "../../../../pages/income/residential/rent_comps/addCompForm.page";
import { getTodayDateString, getTodayDay, isDateHasCorrectFormat } from "../../../../../utils/date.utils";
import { isDecimal, isHalfDecimalPart, numberWithCommas } from "../../../../../utils/numbers.utils";
import BaseActionsExt from "../../../base/base.actions.ext";

class AddCompFormActions extends BaseActionsExt<typeof addCompFormPage> {

    clickCloseButton(): AddCompFormActions {
        addCompFormPage.closeButton.should("be.enabled").click();
        return this;
    }

    enterUnitNumber(unitNumber: string): AddCompFormActions {
        addCompFormPage.unitNumbInput.clear().type(unitNumber).should("have.value", unitNumber);
        return this;
    }

    clickUnitTypeDropdown(): AddCompFormActions {
        addCompFormPage.unitTypeDropdown.should("be.visible").click();
        return this;
    }

    selectUnitTypeByValue(value: string): AddCompFormActions {
        addCompFormPage.getUnitTypeByValue(value).scrollIntoView().should("be.visible").click();
        return this;
    }

    verifyUnitTypeValue(valueToBe: string): AddCompFormActions {
        addCompFormPage.unitTypeInputToCheck.should("have.value", valueToBe);
        return this;
    }

    selectUnitTypeAndVerify(value: string): AddCompFormActions {
        this.clickUnitTypeDropdown()
            .selectUnitTypeByValue(value)
            .verifyUnitTypeValue(value);
        return this;
    }

    selectListUnitTypes(values: string[]): AddCompFormActions {
        values.forEach(value => {
            this.selectUnitTypeAndVerify(value);
        });
        return this;
    }

    enterMonthlyRent(rent: number): AddCompFormActions {
        const textToBe = numberWithCommas(rent);
        addCompFormPage.monthRentInput.clear().type(rent.toString())
            .should("have.value", textToBe).should("have.attr", "required");
        return  this;
    }

    clearDateInput(): AddCompFormActions {
        addCompFormPage.dateOfValueInput.clear().should("have.attr", "required");
        return this;
    }

    enterDate(date?: string): AddCompFormActions {
        this.clearDateInput();
        date = date ?? getTodayDateString();
        addCompFormPage.dateOfValueInput.type(date);
        if (!isDateHasCorrectFormat(date)) { addCompFormPage.errorMessage.should("exist"); }
        this.verifyEnteredDate(date);
        return this;
    }

    verifyEnteredDate(dateToBe?: string): AddCompFormActions {
        dateToBe = dateToBe ?? getTodayDateString();
        if (!isDateHasCorrectFormat(dateToBe)) { dateToBe = ""; }
        addCompFormPage.dateInputValue.should("have.value", dateToBe);
        return this;
    }

    chooseDayOfCurrentMonthInPicker(day?: string | number): AddCompFormActions {
        day = day ?? Number(getTodayDay());
        let date = getTodayDateString();
        let dateArr = date.split("-");
        if (day < 10) {
            dateArr[1] = `0${day}`;
        } else {
            dateArr[1] = day.toString();
        }
        date = `${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`;
        addCompFormPage.datePickerButton.should("be.enabled").click();
        addCompFormPage.datePickerPopover.should("exist");
        addCompFormPage.getDayOfCurrentMonthInPicker(day).should("be.visible").click();
        this.verifyEnteredDate(date);
        return this;
    }

    enterSquareFootage(footage: number): AddCompFormActions {
        const textToBe = numberWithCommas(footage);
        addCompFormPage.squareFootageInput.clear().type(footage.toString()).should("have.value", textToBe);
        return this;
    }

    clickSourceOfInfoDropdown(): AddCompFormActions {
        addCompFormPage.sourceOfInfoDropdown.click({ force:true });
        return this;
    }

    selectSourceOfInfoByValue(value: string): AddCompFormActions {
        addCompFormPage.getSourceOfInfoByValue(value).click({ force:true });
        return this;
    }

    verifySelectedSource(valueToBe: string): AddCompFormActions {
        addCompFormPage.sourceOfInfoInputToCheck.should("have.value", valueToBe);
        return this;
    }

    selectSourceOfInfoAndVerify(value: string): AddCompFormActions {
        this.clickSourceOfInfoDropdown()
            .selectSourceOfInfoByValue(value)
            .verifySelectedSource(value);
        return this;
    }

    selectListSourceOfInfoAndVerify(values: string[]): AddCompFormActions {
        values.forEach(value => {
            this.selectSourceOfInfoAndVerify(value);
        });
        return this;
    }

    enterNumberOfBedrooms(number: number): AddCompFormActions {
        addCompFormPage.bedroomsInput.clear().type(number.toString())
            .should("have.value", number).should("have.attr", "required");
        return this;
    }

    enterSourceName(name: string): AddCompFormActions {
        addCompFormPage.sourceNameInput.should("exist").clear().type(name).should("have.value", name);
        return this;
    }

    verifySourceNameNotExist(): AddCompFormActions {
        addCompFormPage.sourceNameInput.should("not.exist");
        return this;
    }

    verifySourceUrlNotExist(): AddCompFormActions {
        addCompFormPage.sourceUrlInput.should("not.exist");
        return this;
    }

    enterSourceUrl(url: string): AddCompFormActions {
        addCompFormPage.sourceUrlInput.should("exist").clear().type(url).should("have.value", url);
        return this;
    }

    enterNumberOfRooms(numberOfRooms: number): AddCompFormActions {
        addCompFormPage.numberOfRoomsInput.clear().type(numberOfRooms.toString())
            .should("have.value", numberOfRooms).should("have.attr", "required");
        return this;
    }

    enterNumberOfBathrooms(number = 0): AddCompFormActions {
        if (isDecimal(number)) {
            let numberOfBath: string;
            numberOfBath = number.toFixed(1);
            numberOfBath = `${number}`;
            addCompFormPage.numberOfBathInput.clear().type(numberOfBath)
                .type("{enter}").should("have.value", numberOfBath);
            if (!isHalfDecimalPart(number)) {
                addCompFormPage.numberOfRoomsInput.click();
                addCompFormPage.numberOfBathInput.click();
                addCompFormPage.bathNumbErrorMessage.should("exist");
            }
        } else {
            addCompFormPage.numberOfBathInput.clear().type(number.toString())
                .type("{enter}").should("have.value", number);
        }
        return this;
    }

    enterInternalNotes(notes: string): AddCompFormActions {
        addCompFormPage.internalNotesTextField.should("exist").should("have.attr", "placeholder",
            "Write internal notes that will not be exported.").clear().type(notes).should("have.text", notes);
        return this;
    }

    clickUnitAmenitiesDropdown(): AddCompFormActions {
        addCompFormPage.unitAmenitiesDropdown.should("be.visible").click();
        return this;
    }

    checkCheckboxByQaAttr(attribute: string): AddCompFormActions {
        addCompFormPage.getCheckboxByDataQaAttr(attribute)
            .should("have.value", "false")
            .scrollIntoView().check({ force:true }).should("have.value", "true");
        return this;
    }

    uncheckCheckboxByQaAttr(attribute: string): AddCompFormActions {
        addCompFormPage.getCheckboxByDataQaAttr(attribute)
            .should("have.value", "true")
            .scrollIntoView().uncheck({ force:true }).should("have.value", "false");
        return this;
    }

    checkListOfCheckboxesByQa(attributes: string[]): AddCompFormActions {
        attributes.forEach(attr => {
            this.checkCheckboxByQaAttr(attr);
        });
        return this;
    }

    uncheckListOfCheckboxesByQa(attributes: string[]): AddCompFormActions {
        attributes.forEach(attr => {
            this.uncheckCheckboxByQaAttr(attr);
        });
        return this;
    }

    clickCancelButton(): AddCompFormActions {
        addCompFormPage.cancelButton.should("be.visible").click();
        return this;
    }

    clickSubmitCompButton(): AddCompFormActions {
        addCompFormPage.submitCompButton.should("exist").should("not.be.disabled").click();
        return this;
    }

    fillNewRentCompWithoutNumbTypeSourceNameUrlNoteAmenities(compData: {
        state?: string;
        address?: string; 
        monthly: number; 
        date: string; 
        footage: number; 
        sourceInfo: string; 
        bedrooms: number;
        rooms: number; 
        bathrooms: number; 
        id?: string; 
        sourceInfoCheck?: string;
     }): AddCompFormActions {
        this.enterMonthlyRent(compData.monthly)
            .enterDate(compData.date)
            .enterSquareFootage(compData.footage)
            .selectSourceOfInfoAndVerify(compData.sourceInfo)
            .enterNumberOfBedrooms(compData.bedrooms)
            .enterNumberOfRooms(compData.rooms)
            .enterNumberOfBathrooms(compData.bathrooms)
            .clickSubmitCompButton();
        return this;
    }
}

export default new AddCompFormActions(addCompFormPage);
