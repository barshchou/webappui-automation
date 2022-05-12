import BaseActions from "../../base/base.actions";
import stabRentRollPage from "../../../pages/income/residential/stabilizedRentRoll.page";
import { getNumberFromDollarNumberWithCommas, numberWithCommas } from "../../../../utils/numbers.utils";

class StabilizedRentRollActions extends BaseActions{

    /**
     *
     * @param {string} type
     * @returns {StabilizedRentRollActions}
     */
    verifyTableUnitTypeExist(type) {
        stabRentRollPage.getSummaryTableUnitByType(type).should("exist");
        return this;
    }

    /**
     *
     * @param {string} type
     * @param {number} rentToBe
     * @returns {StabilizedRentRollActions}
     */
    verifyUnitTypeRentConclusion(type, rentToBe) {
        const textToBe = `$${numberWithCommas(rentToBe)} /Unit`;
        stabRentRollPage.getSummaryTableRentConclusionUnit(type).should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} type
     * @param {number} rentToBe
     * @returns {StabilizedRentRollActions}
     */
    verifyUnitTypeAndRentConclusion(type, rentToBe) {
        this.verifyTableUnitTypeExist(type)
            .verifyUnitTypeRentConclusion(type, rentToBe);
        return this;
    }

    /**
     *
     * @param {number} numberOfUnits
     * @returns {StabilizedRentRollActions}
     */
    verifyRowsNumber(numberOfUnits) {
        stabRentRollPage.isInspectedInputs.should("have.length", numberOfUnits);
        return this;
    }

    /**
     *
     * @param {Array<number>} rowsToBeChecked
     * @returns {StabilizedRentRollActions}
     */
    verifyCheckedIsInspected(rowsToBeChecked) {
        rowsToBeChecked.forEach(index => {
            stabRentRollPage.isInspectedInputs.eq(index).should("be.checked");
        });
        return this;
    }

    /**
     *
     * @returns {StabilizedRentRollActions}
     */
    verifyUnitsNumberByOrder() {
        let i = 1;
        stabRentRollPage.unitNumberCells.each(cell => {
           expect(cell.text()).to.eq(`${i}`);
           i++;
        });
        return this;
    }

    /**
     *
     * @param {number} roomsNumber
     * @param {number} rowNumber
     * @returns {StabilizedRentRollActions}
     */
    verifyRoomsNumberByRow(roomsNumber, rowNumber) {
        stabRentRollPage.roomsCells.eq(rowNumber).should("have.text", roomsNumber);
        return this;
    }

    /**
     *
     * @param {number} roomsNumbersToBe
     * @returns {StabilizedRentRollActions}
     */
    verifyAllRoomsNumbers(...roomsNumbersToBe) {
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

    /**
     *
     * @param {number} bedroomsNumber
     * @param {number} rowNumber
     * @returns {StabilizedRentRollActions}
     */
    verifyBedroomsNumberByRow(bedroomsNumber, rowNumber) {
        stabRentRollPage.bedroomsCells.eq(rowNumber).should("have.text", bedroomsNumber);
        return this;
    }

    /**
     *
     * @param {number} bedroomsNumbersToBe
     * @returns {StabilizedRentRollActions}
     */
    verifyAllBedroomsNumbers(...bedroomsNumbersToBe) {
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

    /**
     *
     * @param {string} rentType
     * @param {number} rowNumber
     * @returns {StabilizedRentRollActions}
     */
    verifyRentTypeByRow(rentType, rowNumber) {
        stabRentRollPage.rentTypeCells.eq(rowNumber).should("have.text", rentType);
        return this;
    }

    /**
     *
     * @param {string} rentTypesToBe
     * @returns {StabilizedRentRollActions}
     */
    verifyAllRentTypeCells(...rentTypesToBe) {
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

    /**
     *
     * @param {number | string} monthlyRent
     * @param {number} rowNumber
     * @returns {StabilizedRentRollActions}
     */
    enterMonthlyRentByRow(monthlyRent, rowNumber) {
        this.clickSaveButton().verifyProgressBarNotExist();
        stabRentRollPage.monthlyRentCellsInputs.eq(rowNumber).as("monthlyRent");
        cy.get("@monthlyRent").clear().type(monthlyRent).should("have.value", `${numberWithCommas(monthlyRent)}`);
        return this;
    }

    /**
     *
     * @param {number} rentsToEnter
     * @returns {StabilizedRentRollActions}
     */
    enterAllMonthlyRents(...rentsToEnter) {
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

    /**
     *
     * @param {number} numberOfUnits
     * @param {number} rents
     * @returns {StabilizedRentRollActions}
     */
    verifyTotalMonthlyRent(numberOfUnits, ...rents) {
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

    /**
     *
     * @returns {StabilizedRentRollActions}
     */
    verifyTotalAnnualRent() {
        stabRentRollPage.totalMonthlyRent.then(cell => {
           const numberTotalMonthly = getNumberFromDollarNumberWithCommas(cell.text());
           const totalAnnualText = `$${numberWithCommas((numberTotalMonthly * 12).toFixed(2))}`;
           stabRentRollPage.totalAnnualRent.should("have.text", totalAnnualText);
        });
        return this;
    }

    /**
     *
     * @param {number} rowNumber
     * @param {number} numberOfRooms
     * @param {number} monthlyRent
     * @returns {StabilizedRentRollActions}
     */
    verifyRentPerRoomByRow(rowNumber, numberOfRooms, monthlyRent) {
        const textToBe = `$${numberWithCommas(Math.round(monthlyRent / numberOfRooms))}`;
        stabRentRollPage.rentPerRoomCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Array<number>, number} numbersOfRooms
     * @param {Array<number>, number} monthlyRents
     * @returns {StabilizedRentRollActions}
     */
    verifyAllPerRoomCells(numbersOfRooms, monthlyRents) {
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

    /**
     *
     * @param {string} leaseStatus
     * @param {number} rowNumber
     * @returns {StabilizedRentRollActions}
     */
    verifyLeaseStatusByRow(leaseStatus, rowNumber) {
        stabRentRollPage.leaseStatusCells.eq(rowNumber).should("have.text", leaseStatus);
        return this;
    }

    /**
     *
     * @param {string} leaseStatuses
     * @returns {StabilizedRentRollActions}
     */
    verifyAllLeaseStatusesCells(...leaseStatuses) {
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

    /**
     *
     * @param {number} forecastValue
     * @param {number} rowNumber
     * @returns {StabilizedRentRollActions}
     */
    verifyRentForecastByRow(forecastValue, rowNumber) {
        const textToBe = `$${numberWithCommas(forecastValue.toFixed(2))}`;
        stabRentRollPage.rentForecastCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {number} forecastsValues
     * @returns {StabilizedRentRollActions}
     */
    verifyAllRentForecasts(...forecastsValues) {
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

    /**
     *
     * @param {number} numberOfUnits
     * @param {number} forecastValues
     * @returns {StabilizedRentRollActions}
     */
    verifyTotalMonthlyForecast(numberOfUnits, ...forecastValues) {
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

    /**
     *
     * @returns {StabilizedRentRollActions}
     */
    verifyTotalAnnualForecast() {
        stabRentRollPage.totalMonthlyForecast.then(el => {
            const numberTotalMonthly = getNumberFromDollarNumberWithCommas(el.text());
            const totalAnnualText = `$${numberWithCommas((numberTotalMonthly * 12).toFixed(2))}`;
            stabRentRollPage.totalAnnualForecast.should("have.text", totalAnnualText);
        });
        return this;
    }

    /**
     *
     * @param {string} commToBe
     * @returns {StabilizedRentRollActions}
     */
    verifyRentRollDiscussionCommentary(commToBe) {
        stabRentRollPage.rentRollDiscussionCommentary.should("have.text", commToBe);
        return this;
    }

    /**
     *
     * @param {string} newCommentary
     * @returns {StabilizedRentRollActions}
     */
    editOccupancyRateCommentary(newCommentary) {
        stabRentRollPage.occupancyRateEditButton.click();
        stabRentRollPage.occupancyRateInput.clear().type(newCommentary).should("have.text", newCommentary);
        return this;
    }
}

export default new StabilizedRentRollActions();
