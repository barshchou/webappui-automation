import BaseActions from "../base/base.actions";
import marketPage from "../../pages/property/market.page";
import {getCurrentQuarter, getCurrentYear} from "../../../utils/date.utils";

class MarketActions extends BaseActions{
    verifyExposureTimeMin(monthsToBe) {
        marketPage.exposureTimeMin.should("have.value", monthsToBe);
    }

    verifyExposureTimeMax(monthsToBe) {
        marketPage.exposureTimeMax.should("have.value", monthsToBe);
    }

    verifyTimeOnMarket(minMonthsToBe, maxMonthsToBe) {
        this.verifyExposureTimeMin(minMonthsToBe);
        this.verifyExposureTimeMax(maxMonthsToBe);
    }

    enterNeighborhood(neighborhood) {
        marketPage.neighborhood.clear().type(neighborhood).type("{enter}").should("have.value", neighborhood);
    }

    enterArea(area) {
        marketPage.area.clear().type(area).type("{enter}").should("have.value", area);
    }

    verifyMarketState(stateToBe) {
        marketPage.marketState.click().type("{enter}").should("have.value", stateToBe);
    }

    verifyNeighborhoodYear(yearToBe) {
        marketPage.neighborhoodYear.should("have.value", yearToBe);
    }

    enterMacroMarket(market) {
        marketPage.macroMarket.clear().type(market).type("{enter}").should("have.value", market);
    }

    enterSubmarket(submarket) {
        marketPage.submarket.clear().type(submarket).type("{enter}").should("have.value", submarket);
    }

    verifyMarketQuarter(quarterToBe) {
        marketPage.marketQuarter.click().type("{enter}").should("have.value", quarterToBe);
    }

    verifyMarketYear(yearToBe) {
        marketPage.marketYear.should("have.value", yearToBe);
    }

    clickPullFromDropbox() {
        marketPage.pullDropboxButton.should("not.be.disabled").click();
        this.verifyProgressBarNotExist();
    }

    verifyAnyDocumentInputIsNotEmpty() {
        marketPage.pulledFileConfirmation.should("exist");
    }

    fillMarketResearch(testDataGiven) {
        this.enterNeighborhood(testDataGiven.neighborhoodValue);
        this.enterArea(testDataGiven.marketArea);
        this.verifyMarketState(testDataGiven.stateToBe);
        this.verifyNeighborhoodYear(getCurrentYear());
        this.enterMacroMarket(testDataGiven.macroMarket);
        this.enterSubmarket(testDataGiven.submarket);
        this.verifyMarketQuarter(getCurrentQuarter());
        this.verifyMarketYear(getCurrentYear());
    }
}

export default new MarketActions();