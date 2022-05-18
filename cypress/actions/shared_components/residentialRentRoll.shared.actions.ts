import BaseActions from "../base/base.actions";
import ResidentialRentRollSharedPage from "../../pages/shared_components/residentialRentRoll.shared.page";
import stabRentRollPage from "../../pages/income/residential/stabilizedRentRoll.page";

export default class ResidentialRentRollSharedActions<T extends ResidentialRentRollSharedPage> extends BaseActions {
    Page: T;

    constructor(page: T) {
        super();
        this.Page = page;
    }

    verifyRowsNumber(numberOfUnits: number): this {
        this.Page.isInspectedInputs.should("have.length", numberOfUnits);
        return this;
    }

    verifyCheckedIsInspected(rowsToBeChecked: Array<number>): this {
        rowsToBeChecked.forEach(index => {
            this.Page.isInspectedInputs.eq(index).should("be.checked");
        });
        return this;
    }

    verifyNumberOfIsInspectedRows(unitsNumber: string | number): this {
        if (unitsNumber !== 0) {
            this.Page.isInspectedColumnCells.first().scrollIntoView({ duration: 2000 });
            this.Page.isInspectedColumnCells.last().scrollIntoView({ duration: 2000 });
        }
        this.Page.isInspectedColumnCells.should("have.length", unitsNumber);
        return this;
    }

    verifyNumberOfUnitsNumberCells(numberOfUnits = 0): this {
        if (numberOfUnits === 0) {
            this.Page.unitNumberCells.should("not.exist");
        } else {
            this.Page.unitNumberCells.should("have.length", numberOfUnits);
        }
        return this;
    }

    verifyUnitsNumberByOrder(): this {
        let i = 1;
        stabRentRollPage.unitNumberCells.each(cell => {
            expect(cell.text()).to.eq(`${i}`);
            i++;
        });
        return this;
    }

    verifyUnitNumberByRow(number: number, rowNumber = 0): this {
        this.Page.unitNumberCells.eq(rowNumber).should("have.text", number);
        return this;
    }

    verifyRoomsNumberByRow(roomsNumber: number, rowNumber = 0): this {
        stabRentRollPage.roomsCells.eq(rowNumber).should("have.text", roomsNumber);
        return this;
    }

    verifyAllRoomsNumbers(...roomsNumbersToBe: Array<number>): this {
        if (roomsNumbersToBe.length === 1) {
            stabRentRollPage.roomsCells.then(cells => {
                for (let i = 0; i < cells.length; i++) {
                    this.verifyRoomsNumberByRow(roomsNumbersToBe[0], i);
                }
            });
        } else {
            for (let i = 0; i < roomsNumbersToBe.length; i++) {
                this.verifyRoomsNumberByRow(roomsNumbersToBe[i], i);
            }
        }
        return this;
    }

}