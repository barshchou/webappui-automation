import parkingPage from "../../../pages/income/miscellaneous/parking.page";
import { BoweryReports } from "../../../types";
import BaseActionsExt from "../../base/base.actions.ext";

class ParkingActions extends BaseActionsExt<typeof parkingPage> {

    checkIsFreeParkingCheckbox(): ParkingActions {
        parkingPage.isParkingFreeCheckbox.check().should("have.value", "true");
        return this;
    }

    checkVCLossTypeCheckbox(type: string): ParkingActions {
        parkingPage.vcLossTypeCheckbox(type).check().should("have.value", type);
        return this;
    }

    addParkingVCLossPercentage(type: BoweryReports.ParkingVcLossType, percent: number): ParkingActions {
        this.checkVCLossTypeCheckbox(type)
            .fillVCLossPercentage(percent);
        return this;
    }

    fillVCLossPercentage(value: number): ParkingActions {
        parkingPage.parkingVCLossPercentage.clear().type(`${value}`).should('have.value', value);
        return this;
    }

    verifyParkingCommentary(commToBe: string): ParkingActions {
        parkingPage.parkingCommentary.should("have.text", commToBe);
        return this;
    }

    addMonthlyRentByRow(rent: number, index = 0): ParkingActions {
        parkingPage.parkingMonthlyRent(index).click().clear().type(rent.toString());
        this.verifyMonthlyRentValue(rent, index);
        return this;
    }

    addMonthlyRents(rents: number[]): ParkingActions {
        rents.forEach((rent, index) => {
            this.addMonthlyRentByRow(rent, index);
        });
        return this;
    }

    verifyMonthlyRentValue(rent: number, index = 0): ParkingActions {
        parkingPage.parkingMonthlyRent(index).should('have.value', rent);
        return this;
    }
}

export default new ParkingActions(parkingPage);
