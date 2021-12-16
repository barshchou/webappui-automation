import BaseActions from "../base/base.actions";
import marketPage from "../../pages/property/market.page";
import {getQuarter, getYearFromDate} from "../../../utils/date.utils";

class MarketActions extends BaseActions{
    /**
     *
     * @param {number} monthsToBe
     * @returns {MarketActions}
     */
    verifyExposureTimeMin(monthsToBe) {
        marketPage.exposureTimeMin.should("have.value", monthsToBe);
        return this;
    }

    /**
     *
     * @param {number} monthsToBe
     * @returns {MarketActions}
     */
    verifyExposureTimeMax(monthsToBe) {
        marketPage.exposureTimeMax.should("have.value", monthsToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{minMonths: number, maxMonths: number}>} timeOnMarket
     * @returns {MarketActions}
     */
    verifyTimeOnMarket(timeOnMarket) {
        this.verifyExposureTimeMin(timeOnMarket.minMonths)
            .verifyExposureTimeMax(timeOnMarket.maxMonths);
        return this;
    }

    /**
     *
     * @param {string} neighborhood
     * @returns {MarketActions}
     */
    enterNeighborhood(neighborhood) {
        marketPage.neighborhood.clear().type(neighborhood).type("{enter}").should("have.value", neighborhood);
        return this;
    }

    /**
     *
     * @param {string} area
     * @returns {MarketActions}
     */
    enterArea(area) {
        marketPage.area.clear().type(area).type("{enter}").should("have.value", area);
        return this;
    }

    /**
     *
     * @param {string} stateToBe
     * @returns {MarketActions}
     */
    verifyMarketState(stateToBe) {
        marketPage.marketState.click().type("{enter}").should("have.value", stateToBe);
        return this;
    }

    /**
     *
     * @param {string} yearToBe
     * @returns {MarketActions}
     */
    verifyNeighborhoodYear(yearToBe) {
        marketPage.neighborhoodYear.should("have.value", yearToBe);
        return this;
    }

    /**
     *
     * @param {string} market
     * @returns {MarketActions}
     */
    enterMacroMarket(market) {
        marketPage.macroMarket.clear().type(market).type("{enter}").should("have.value", market);
        return this;
    }

    /**
     *
     * @param {string} submarket
     * @returns {MarketActions}
     */
    enterSubmarket(submarket) {
        marketPage.submarket.clear().type(submarket).type("{enter}").should("have.value", submarket);
        return this;
    }

    /**
     *
     * @param {string} quarterToBe
     * @returns {MarketActions}
     */
    verifyMarketQuarter(quarterToBe) {
        marketPage.marketQuarter.click().type("{enter}").should("have.value", quarterToBe);
        return this;
    }

    /**
     *
     * @param {string} yearToBe
     * @returns {MarketActions}
     */
    verifyMarketYear(yearToBe) {
        marketPage.marketYear.should("have.value", yearToBe);
        return this;
    }

    /**
     *
     * @returns {MarketActions}
     */
    clickPullFromDropbox() {
        marketPage.pullDropboxButton.should("not.be.disabled").click();
        this.verifyProgressBarNotExist();
        return this;
    }

    /**
     *
     * @returns {MarketActions}
     */
    verifyAnyDocumentInputIsNotEmpty() {
        marketPage.pulledFileConfirmation.should("exist");
        return this;
    }

    /**
     *
     * @param {Readonly<{neighborhoodValue: string, marketArea: string, state: string, dateOfValuation: string,
     * macroMarket: string, submarket: string}>} marketResearch
     * @returns {MarketActions}
     */
    fillMarketResearch(marketResearch) {
        this.enterNeighborhood(marketResearch.neighborhoodValue)
            .enterArea(marketResearch.marketArea)
            .verifyMarketState(marketResearch.state)
            .verifyNeighborhoodYear(getYearFromDate(marketResearch.dateOfValuation))
            .enterMacroMarket(marketResearch.macroMarket)
            .enterSubmarket(marketResearch.submarket)
            .verifyMarketQuarter(getQuarter(marketResearch.dateOfValuation))
            .verifyMarketYear(getYearFromDate(marketResearch.dateOfValuation));
        return this;
    }
}

export default new MarketActions();