import BaseActions from "../base/base.actions";
import ResidentialRentRollSharedPage from "../../pages/shared_components/residentialRentRoll.shared.page";
import { getNumberFromDollarNumberWithCommas, numberWithCommas } from "../../../utils/numbers.utils";

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
        this.Page.unitNumberCells.each(cell => {
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
        this.Page.roomsCells.eq(rowNumber).should("have.text", roomsNumber);
        return this;
    }

    verifyAllRoomsNumbers(...roomsNumbersToBe: Array<number>): this {
        if (roomsNumbersToBe.length === 1) {
            this.Page.roomsCells.then(cells => {
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

    verifyRentTypeCellByRowNumber(rentTypeToBe: string, rowNumber = 0): this {
        this.Page.rentTypeCells.eq(rowNumber).should("contain.text", rentTypeToBe);
        return this;
    }

    verifyAllRentTypeCells(...rentTypesToBe: Array<string>): this {
        if (rentTypesToBe.length === 1) {
            this.Page.rentTypeCells.each((cell, index) => {
                this.verifyRentTypeCellByRowNumber(rentTypesToBe[0], index);
            });
        } else {
            rentTypesToBe.forEach((type, index) => {
                this.verifyRentTypeCellByRowNumber(type, index);
            });
        }
        return this;
    }

    verifyMonthlyTotalForecastEqualValue(): this {
        this.Page.rentForecastCells.then(cells => {
            let totalToBe = 0;
            for (let i = 0; i < cells.length; i++) {
                let cellNumber = getNumberFromDollarNumberWithCommas(cells.eq(i).text());
                totalToBe += cellNumber;
            }
            const textToBe = `$${numberWithCommas(totalToBe.toFixed(2))}`;
            this.Page.monthlyTotalForecast.should("have.text", textToBe);
        });
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
        this.Page.monthlyTotalForecast.should("have.text", textToBe);
        return this;
    }

    verifyRentForecastByRow(forecastValue: number | string, rowNumber: number): this {
        let textToBe;
        if (typeof forecastValue === "string") {
            textToBe = forecastValue;
        } else {
            textToBe = `$${numberWithCommas((<number>forecastValue).toFixed(2))}`;
        }
        this.Page.rentForecastCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifyAllRentForecasts(...forecastsValues: Array<number>): this {
        if (forecastsValues.length === 1) {
            this.Page.rentForecastCells.each((cells, index) => {
                this.verifyRentForecastByRow(forecastsValues[0], index);
            });
        } else {
            for (let i = 0; i < forecastsValues.length; i++) {
                this.verifyRentForecastByRow(forecastsValues[i], i);
            }
        }
        return this;
    }

    verifyTotalAnnualForecast(): this {
        this.Page.monthlyTotalForecast.then(el => {
            const numberTotalMonthly = getNumberFromDollarNumberWithCommas(el.text());
            const totalAnnualText = `$${numberWithCommas((numberTotalMonthly * 12).toFixed(2))}`;
            this.Page.totalAnnualForecast.should("have.text", totalAnnualText);
        });
        return this;
    }

    verifyBedroomsNumberByRow(bedroomsNumber: number, rowNumber: number): this {
        this.Page.bedroomsCells.eq(rowNumber).should("have.text", bedroomsNumber);
        return this;
    }

    verifyAllBedroomsNumbers(...bedroomsNumbersToBe: Array<number>): this {
        if (bedroomsNumbersToBe.length === 1) {
            this.Page.bedroomsCells.each((cell, index) => {
                this.verifyBedroomsNumberByRow(bedroomsNumbersToBe[0], index);
            });
        } else {
            this.Page.bedroomsCells.each((cell, i) => {
                this.verifyBedroomsNumberByRow(bedroomsNumbersToBe[i], i);
            });
        }
        return this;
    }

    verifyLeaseStatusByRow(leaseStatus: string, rowNumber: number): this {
        this.Page.leaseStatusCells.eq(rowNumber).should("contain.text", leaseStatus);
        return this;
    }

    verifyAllLeaseStatusesCells(...leaseStatuses: Array<string>): this {
        if (leaseStatuses.length === 1) {
            this.Page.leaseStatusCells.each((cell, i) => {
                this.verifyLeaseStatusByRow(leaseStatuses[0], i);
            });
        } else {
            this.Page.leaseStatusCells.each((cell, i) => {
                this.verifyLeaseStatusByRow(leaseStatuses[i], i);
            });
        }
        return this;
    }

    verifyTotalAnnualRent(): this {
        this.Page.monthlyTotalRent.invoke("text").then(cell => {
            const numberTotalMonthly = getNumberFromDollarNumberWithCommas(cell);
            const totalAnnualText = `$${numberWithCommas((numberTotalMonthly * 12).toFixed(2))}`;
            this.Page.annualTotalRent.should("have.text", totalAnnualText);
        });
        return this;
    }

}