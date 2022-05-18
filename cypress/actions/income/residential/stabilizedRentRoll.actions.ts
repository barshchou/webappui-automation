import stabRentRollPage from "../../../pages/income/residential/stabilizedRentRoll.page";
import { getNumberFromDollarNumberWithCommas, numberWithCommas } from "../../../../utils/numbers.utils";
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

    verifyUnitsNumberByOrder(): this {
        let i = 1;
        stabRentRollPage.unitNumberCells.each(cell => {
           expect(cell.text()).to.eq(`${i}`);
           i++;
        });
        return this;
    }

    verifyRoomsNumberByRow(roomsNumber: number, rowNumber: number): this {
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

    verifyBedroomsNumberByRow(bedroomsNumber: number, rowNumber: number): this {
        stabRentRollPage.bedroomsCells.eq(rowNumber).should("have.text", bedroomsNumber);
        return this;
    }

    verifyAllBedroomsNumbers(...bedroomsNumbersToBe: Array<number>): this {
        if (bedroomsNumbersToBe.length === 1) {
            stabRentRollPage.bedroomsCells.then(cells => {
                for (let i = 0; i < cells.length; i++) {
                    this.verifyBedroomsNumberByRow(bedroomsNumbersToBe[0], i);
                }
            });
        } else {
            for (let i = 0; i < bedroomsNumbersToBe.length; i++) {
                this.verifyBedroomsNumberByRow(bedroomsNumbersToBe[i], i);
            }
        }
        return this;
    }

    verifyRentTypeByRow(rentType: string, rowNumber: number): this {
        stabRentRollPage.rentTypeCells.eq(rowNumber).should("have.text", rentType);
        return this;
    }

    verifyAllRentTypeCells(...rentTypesToBe: Array<string>): this {
        if (rentTypesToBe.length === 1) {
            stabRentRollPage.rentTypeCells.then(cells => {
                for (let i = 0; i < cells.length; i++) {
                    this.verifyRentTypeByRow(rentTypesToBe[0], i);
                }
            });
        } else {
            for (let i = 0; i < rentTypesToBe.length; i++) {
                this.verifyRentTypeByRow(rentTypesToBe[i], i);
            }
        }
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
        stabRentRollPage.totalMonthlyRent.should("have.text", textToBe);
        return this;
    }

    verifyTotalAnnualRent(): this {
        stabRentRollPage.totalMonthlyRent.then(cell => {
           const numberTotalMonthly = getNumberFromDollarNumberWithCommas(cell.text());
           const totalAnnualText = `$${numberWithCommas((numberTotalMonthly * 12).toFixed(2))}`;
           stabRentRollPage.totalAnnualRent.should("have.text", totalAnnualText);
        });
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

    verifyLeaseStatusByRow(leaseStatus: string, rowNumber: number): this {
        stabRentRollPage.leaseStatusCells.eq(rowNumber).should("have.text", leaseStatus);
        return this;
    }

    verifyAllLeaseStatusesCells(...leaseStatuses: Array<string>): this {
        if (leaseStatuses.length === 1) {
            stabRentRollPage.leaseStatusCells.then(cells => {
                for (let i = 0; i < cells.length; i++) {
                    this.verifyLeaseStatusByRow(leaseStatuses[0], i);
                }
            });
        } else {
            for (let i = 0; i < leaseStatuses.length; i++) {
                this.verifyLeaseStatusByRow(leaseStatuses[i], i);
            }
        }
        return this;
    }

    verifyRentForecastByRow(forecastValue: number, rowNumber: number): this {
        const textToBe = `$${numberWithCommas(forecastValue.toFixed(2))}`;
        stabRentRollPage.rentForecastCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifyAllRentForecasts(...forecastsValues: Array<number>): this {
        if (forecastsValues.length === 1) {
            stabRentRollPage.rentForecastCells.then(cells => {
                for (let i = 0; i < cells.length; i++) {
                    this.verifyRentForecastByRow(forecastsValues[0], i);
                }
            });
        } else {
            for (let i = 0; i < forecastsValues.length; i++) {
                this.verifyRentForecastByRow(forecastsValues[i], i);
            }
        }
        return this;
    }

    verifyTotalMonthlyForecast(numberOfUnits: number, ...forecastValues: Array<number>): this {
        let textToBe;
        if (forecastValues.length === 1) {
            textToBe = `$${numberWithCommas((forecastValues[0] * numberOfUnits).toFixed(2))}`;
        } else {
            let sum;
            forecastValues.forEach(el => sum += el);
            textToBe = `$${numberWithCommas(sum.toFixed(2))}`;
        }
        stabRentRollPage.totalMonthlyForecast.should("have.text", textToBe);
        return this;
    }

    verifyTotalAnnualForecast(): this {
        stabRentRollPage.totalMonthlyForecast.then(el => {
            const numberTotalMonthly = getNumberFromDollarNumberWithCommas(el.text());
            const totalAnnualText = `$${numberWithCommas((numberTotalMonthly * 12).toFixed(2))}`;
            stabRentRollPage.totalAnnualForecast.should("have.text", totalAnnualText);
        });
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
