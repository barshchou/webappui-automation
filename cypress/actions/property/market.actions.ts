import BaseActions from "../base/base.actions";
import marketPage from "../../pages/property/market.page";
import { getQuarter, getYearFromDate, isCorrectQuarter } from "../../../utils/date.utils";

class MarketActions extends BaseActions{

    verifyExposureTimeMin(monthsToBe: number): MarketActions {
        marketPage.exposureTimeMin.should("have.value", monthsToBe);
        return this;
    }

    verifyExposureTimeMax(monthsToBe: number): MarketActions {
        marketPage.exposureTimeMax.should("have.value", monthsToBe);
        return this;
    }

    verifyTimeOnMarket(timeOnMarket: Readonly<{ minMonths: number; maxMonths: number; }>): MarketActions {
        this.verifyExposureTimeMin(timeOnMarket.minMonths)
            .verifyExposureTimeMax(timeOnMarket.maxMonths);
        return this;
    }


    enterNeighborhood(neighborhood: string): MarketActions {
        marketPage.neighborhood.clear().type(neighborhood).type("{enter}").should("have.value", neighborhood);
        return this;
    }

    enterArea(area: string): MarketActions {
        marketPage.area.clear().type(area).type("{enter}").should("have.value", area);
        return this;
    }

    verifyMarketState(stateToBe: string): MarketActions {
        marketPage.marketState.click().type("{enter}").should("have.value", stateToBe);
        return this;
    }

    verifyNeighborhoodYear(yearToBe: string): MarketActions {
        marketPage.neighborhoodYear.should("have.value", yearToBe);
        return this;
    }

    enterMultifamilyMarket(market: string): MarketActions {
        marketPage.multifamilyMarket.clear().type(market).type("{enter}").should("have.value", market);
        return this;
    }

    enterMultifamilySubmarket(submarket: string): MarketActions {
        marketPage.multifamilySubmarket.clear().type(submarket).type("{enter}").should("have.value", submarket);
        return this;
    }

    verifyMarketQuarter(quarterToBe: string): MarketActions {
        marketPage.marketQuarter.click().type("{enter}").should("have.value", quarterToBe);
        return this;
    }

    verifyMarketYear(yearToBe: string): MarketActions {
        marketPage.marketYear.should("have.value", yearToBe);
        return this;
    }

    clickPullFromDropbox(): MarketActions {
        marketPage.pullDropboxButton.should("not.be.disabled").click();
        this.verifyProgressBarNotExist();
        return this;
    }

    verifyAnyDocumentInputIsNotEmpty(): MarketActions {
        marketPage.pulledFileConfirmation.should("exist");
        return this;
    }

    verifyMultifamilySubmarketAnalysisHasDocument(name: string): MarketActions {
        marketPage.multifamilySubmarketAnalysisFile.should("have.value", name);
        return this;
    }

    fillMarketResearch(marketResearch): MarketActions {
        this.enterNeighborhood(marketResearch.neighborhoodValue)
            .enterArea(marketResearch.marketArea)
            .verifyMarketState(marketResearch.state)
            .verifyNeighborhoodYear(getYearFromDate(marketResearch.marketYear))
            .enterMultifamilyMarket(marketResearch.macroMarket)
            .enterMultifamilySubmarket(marketResearch.submarket)
            .verifyMarketQuarter(getQuarter(marketResearch.dateOfValuation))
            .verifyMarketYear(getYearFromDate(marketResearch.dateOfValuation));
        return this;
    }

    enterMarketQuarter(quarter) {
        if (isCorrectQuarter(quarter)) {
            marketPage.marketQuarter.clear().type(quarter);
            this.verifyMarketQuarter(quarter);
        } else {
            throw new Error("Incorrect quarter to enter");
        }
        return this;
    }

    verifyExposureTimeDescription(expectedComment: string): MarketActions {
        marketPage.exposureTimeDescription.should("have.text", expectedComment);
        return this;
    }

    updateExposureTimeMin(exposureTime: number): MarketActions {
        marketPage.exposureTimeMin.clear().type(exposureTime.toString())
            .should("have.value", exposureTime);
        return this;
    }

    updateExposureTimeMax(exposureTime: number): MarketActions {
        marketPage.exposureTimeMax.clear().type(exposureTime.toString())
            .should("have.value", exposureTime);
        return this;
    }

    updateMarketingTimeMin(exposureTime: number): MarketActions {
        marketPage.marketingTimeMin.clear().type(exposureTime.toString())
            .should("have.value", exposureTime);
        return this;
    }

    updateMarketingTimeMax(exposureTime: number): MarketActions {
        marketPage.marketingTimeMax.clear().type(exposureTime.toString())
            .should("have.value", exposureTime);
        return this;
    }

    checkIncludeMarketingTimeDescription(): MarketActions {
        marketPage.includeMarketTimeCheckbox.click();
        marketPage.marketTimeDescription.should("be.visible");
        return this;
    }

    verifyMarketTimeDescription(expectedComment: string): MarketActions {
        marketPage.marketTimeDescription.should("have.text", expectedComment);
        return this;
    }
}

export default new MarketActions();