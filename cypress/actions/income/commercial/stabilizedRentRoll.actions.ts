import stabRentRollPage from "../../../pages/income/commercial/stabilizedRentRoll.page";
import CommercialRentRollSharedComponent from "../../shared_components/commercialRentRoll.shared.actions";

class StabilizedRentRollActions extends CommercialRentRollSharedComponent<typeof stabRentRollPage> {

    verifyThatPageIsOpened(): this {
        stabRentRollPage.stabilizedRentRollHeaderSection.should("be.visible");
        cy.url().then(url => {
            let urlObj = new URL(url);
            cy.log("Check whether current URL ends with '/commercial-projected-rent-roll'");
            cy.wrap(urlObj.pathname.endsWith("/commercial-projected-rent-roll")).should("be.true");
        });
        return this;
    }

    enterListPerSFAnnually(leaseStatuses: Array<BoweryReports.LeaseStatus>, rentToBe: Array<number>): this {
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                this.enterRentPerSFAnnuallyByRowNumber(rentToBe[i], i);
            }
        }
        return this;
    }

    verifyListRentPsfAnnually(leaseStatuses: Array<BoweryReports.LeaseStatus>, rentToBe: Array<number>): this {
        for (let i = 0; i < rentToBe.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                this.verifyRentPsfAnnuallyByRow(rentToBe[i], i);
            }
        }
        return this;
    }

    clickAutoFillButton(): StabilizedRentRollActions {
        stabRentRollPage.autoFillButton.click();
        return this;
    }

    verifyCommercialCompGroupDisplayed(groupName: string): StabilizedRentRollActions {
        stabRentRollPage.commercialCompGroupName(groupName).should('be.visible');
        return this;
    }

    verifyCommercialCompGroupForecastRentDisplayed(forecast: number): StabilizedRentRollActions {
        stabRentRollPage.commercialCompGroupForecastRent(`${forecast}`).should('be.visible');
        return this;
    }

    verifyCommercialCompGroupHeaderDisplayed(): StabilizedRentRollActions {
        stabRentRollPage.commercialCompGroupHeader.should('exist');
        return this;
    }
    
    verifyStabilizedCommercialIncomeDiscussion(textToBe: string): StabilizedRentRollActions {
        stabRentRollPage.stabilizedCommercialIncomeDiscussion.invoke('text').then(text => {
            cy.wrap(this.normalizeText(text)).should('deep.equal', textToBe);
        });
        
        return this;
    }

}

export default new StabilizedRentRollActions(stabRentRollPage);
