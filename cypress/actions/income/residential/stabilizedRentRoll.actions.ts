import stabRentRollPage from "../../../pages/income/residential/stabilizedRentRoll.page";
import { numberWithCommas } from "../../../../utils/numbers.utils";
import ResidentialRentRollSharedActions from "../../shared_components/residentialRentRoll.shared.actions";

class StabilizedRentRollActions extends ResidentialRentRollSharedActions<typeof stabRentRollPage> {

    verifyTableUnitTypeExist(type: string): this {
        stabRentRollPage.getSummaryTableUnitByType(type).should("exist");
        return this;
    }

    verifyUnitTypeRentConclusion(type: string, rentToBe: number): this {
        const textToBe = `$${numberWithCommas(rentToBe)} /Unit`;
        stabRentRollPage.getSummaryTableRentConclusionUnit(type).should("have.text", textToBe);
        return this;
    }

    verifyUnitTypeAndRentConclusion(type: string, rentToBe: number): this {
        this.verifyTableUnitTypeExist(type)
            .verifyUnitTypeRentConclusion(type, rentToBe);
        return this;
    }

    enterMonthlyRentByRow(monthlyRent: number, rowNumber: number): this {
        this.clickSaveButton().verifyProgressBarNotExist();
        stabRentRollPage.monthlyRentCellsInputs.eq(rowNumber).as("monthlyRent");
        cy.get("@monthlyRent").clear().type(`${monthlyRent}`).should("have.value", `${numberWithCommas(monthlyRent)}`);
        return this;
    }

    enterAllMonthlyRents(...rentsToEnter: Array<number>): this {
        if (rentsToEnter.length === 1) {
            stabRentRollPage.monthlyRentCellsInputs.then(cells => {
                for (let i = 0; i < cells.length; i++) {
                    this.enterMonthlyRentByRow(rentsToEnter[0], i);
                }
            });
        } else {
            for (let i = 0; i < rentsToEnter.length; i++) {
                this.enterMonthlyRentByRow(rentsToEnter[i], i);
            }
        }
        return this;
    }

    verifyTotalMonthlyRent(numberOfUnits: number, ...rents: Array<number>): this {
        let textToBe;
        if (rents.length === 1) {
            textToBe = `$${numberWithCommas((rents[0] * numberOfUnits).toFixed(2))}`;
        } else {
            let rentsSum = 0;
            rents.forEach(rent => rentsSum += rent);
            textToBe = `$${numberWithCommas(rentsSum.toFixed(2))}`;
        }
        stabRentRollPage.monthlyTotalRent.should("have.text", textToBe);
        return this;
    }

    verifyRentPerRoomByRow(rowNumber: number, numberOfRooms: number, monthlyRent: number): this {
        const textToBe = `$${numberWithCommas(Math.round(monthlyRent / numberOfRooms))}`;
        stabRentRollPage.rentPerRoomCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifyAllPerRoomCells(numbersOfRooms: Array<number> | number, monthlyRents: Array<number> | number): this {
        if (typeof numbersOfRooms === "number" && typeof monthlyRents === "number") {
            stabRentRollPage.rentPerRoomCells.then(cells => {
                for (let i = 0; i < cells.length; i++) {
                    this.verifyRentPerRoomByRow(i, numbersOfRooms, monthlyRents);
                }
            });
        } else if (Array.isArray(numbersOfRooms) && typeof monthlyRents === "number") {
            for (let i = 0; i < numbersOfRooms.length; i++) {
                this.verifyRentPerRoomByRow(i, numbersOfRooms[i], monthlyRents);
            }
        } else if (typeof numbersOfRooms === "number" && Array.isArray(monthlyRents)) {
            for (let i = 0; i < monthlyRents.length; i++) {
                this.verifyRentPerRoomByRow(i, numbersOfRooms, monthlyRents[i]);
            }
        } else if (Array.isArray(numbersOfRooms) && Array.isArray(monthlyRents)) {
            for (let i = 0; i < monthlyRents.length; i++) {
                this.verifyRentPerRoomByRow(i, numbersOfRooms[i], monthlyRents[i]);
            }
        }
        return this;
    }

    verifyRentRollDiscussionCommentary(commToBe: string): this {
        stabRentRollPage.rentRollDiscussionCommentary.should("have.text", commToBe);
        return this;
    }

    editOccupancyRateCommentary(newCommentary: string): this {
        stabRentRollPage.occupancyRateEditButton.click();
        stabRentRollPage.occupancyRateInput.clear().type(newCommentary).should("have.text", newCommentary);
        return this;
    }
}

export default new StabilizedRentRollActions(stabRentRollPage);
