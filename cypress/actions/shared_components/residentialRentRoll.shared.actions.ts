import BaseActions from "../base/base.actions";
import ResidentialRentRollSharedPage from "../../pages/shared_components/residentialRentRoll.shared.page";
import stabRentRollPage from "../../pages/income/residential/stabilizedRentRoll.page";
import rentRollPage from "../../pages/income/residential/rentRoll.page";

export default class ResidentialRentRollSharedActions<T extends ResidentialRentRollSharedPage> extends BaseActions {
    Page: T;

    constructor(page: T) {
        super();
        this.Page = page;
    }

    verifyRowsNumber(numberOfUnits: number): this {
        stabRentRollPage.isInspectedInputs.should("have.length", numberOfUnits);
        return this;
    }

    verifyCheckedIsInspected(rowsToBeChecked: Array<number>): this {
        rowsToBeChecked.forEach(index => {
            stabRentRollPage.isInspectedInputs.eq(index).should("be.checked");
        });
        return this;
    }

    verifyNumberOfIsInspectedRows(unitsNumber: string | number): this {
        if (unitsNumber !== 0) {
            rentRollPage.isInspectedColumnCells.first().scrollIntoView({ duration: 2000 });
            rentRollPage.isInspectedColumnCells.last().scrollIntoView({ duration: 2000 });
        }
        rentRollPage.isInspectedColumnCells.should("have.length", unitsNumber);
        return this;
    }

}