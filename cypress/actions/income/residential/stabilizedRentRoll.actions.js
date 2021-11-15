import BaseActions from "../../base/base.actions";
import stabRentRollPage from "../../../pages/income/residential/stabilizedRentRoll.page";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../../utils/numbers.utils";

class StabilizedRentRollActions extends BaseActions{
    verifyTableUnitTypeExist(type) {
        stabRentRollPage.getSummaryTableUnitByType(type).should("exist");
    }

    verifyUnitTypeRentConclusion(type, rentToBe) {
        const textToBe = `$${numberWithCommas(rentToBe)} / Unit`;
        stabRentRollPage.getSummaryTableRentConclusionUnit(type).should("have.text", textToBe);
    }

    verifyUnitTypeAndRentConclusion(type, rentToBe) {
        this.verifyTableUnitTypeExist(type);
        this.verifyUnitTypeRentConclusion(type, rentToBe);
    }

    verifyRowsNumber(numberOfUnits) {
        stabRentRollPage.isInspectedInputs.should("have.length", numberOfUnits);
    }

    verifyCheckedIsInspected(rowsToBeChecked) {
        rowsToBeChecked.forEach(index => {
            stabRentRollPage.isInspectedInputs.eq(index).should("be.checked");
        });
    }

    verifyUnitsNumberByOrder() {
        let i = 1;
        stabRentRollPage.unitNumberCells.each(cell => {
           expect(cell.text()).to.eq(`${i}`);
           i++;
        });
    }

    verifyRoomsNumberByRow(roomsNumber, rowNumber) {
        stabRentRollPage.roomsCells.eq(rowNumber).should("have.text", roomsNumber);
    }

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
    }

    verifyBedroomsNumberByRow(bedroomsNumber, rowNumber) {
        stabRentRollPage.bedroomsCells.eq(rowNumber).should("have.text", bedroomsNumber);
    }

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
    }

    verifyRentTypeByRow(rentType, rowNumber) {
        stabRentRollPage.rentTypeCells.eq(rowNumber).should("have.text", rentType);
    }

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
    }

    enterMonthlyRentByRow(monthlyRent, rowNumber) {
        stabRentRollPage.monthlyRentCellsInputs.eq(rowNumber).clear().type(monthlyRent)
            .should("have.value", `${numberWithCommas(monthlyRent)}`);
    }

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
    }

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
    }

    verifyTotalAnnualRent() {
        stabRentRollPage.totalMonthlyRent.then(cell => {
           const numberTotalMonthly = getNumberFromDollarNumberWithCommas(cell.text());
           const totalAnnualText = `$${numberWithCommas((numberTotalMonthly * 12).toFixed(2))}`;
           stabRentRollPage.totalAnnualRent.should("have.text", totalAnnualText);
        });
    }

    verifyRentPerRoomByRow(rowNumber, numberOfRooms, monthlyRent) {
        const textToBe = `$${numberWithCommas(Math.round(monthlyRent / numberOfRooms))}`;
        stabRentRollPage.rentPerRoomCells.eq(rowNumber).should("have.text", textToBe);
    }

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
    }

    verifyLeaseStatusByRow(leaseStatus, rowNumber) {
        stabRentRollPage.leaseStatusCells.eq(rowNumber).should("have.text", leaseStatus);
    }

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
    }

    verifyRentForecastByRow(forecastValue, rowNumber) {
        const textToBe = `$${numberWithCommas(forecastValue.toFixed(2))}`;
        stabRentRollPage.rentForecastCells.eq(rowNumber).should("have.text", textToBe);
    }

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
    }

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
    }

    verifyTotalAnnualForecast() {
        stabRentRollPage.totalMonthlyForecast.then(el => {
            const numberTotalMonthly = getNumberFromDollarNumberWithCommas(el.text());
            const totalAnnualText = `$${numberWithCommas((numberTotalMonthly * 12).toFixed(2))}`;
            stabRentRollPage.totalAnnualForecast.should("have.text", totalAnnualText);
        });
    }

    verifyRentRollDiscussionCommentary(commToBe) {
        stabRentRollPage.rentRollDiscussionCommentary.should("have.text", commToBe);
    }

    editOccupancyRateCommentary(newCommentary) {
        stabRentRollPage.occupancyRateEditButton.click();
        stabRentRollPage.occupancyRateInput.clear().type(newCommentary).should("have.text", newCommentary);
    }
}

export default new StabilizedRentRollActions();
