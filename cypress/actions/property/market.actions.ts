import BaseActions from "../base/base.actions";
import marketPage from "../../pages/property/market.page";
import { getQuarter, getYearFromDate, isCorrectQuarter } from "../../../utils/date.utils";
import { BoweryReports } from "../../types";
import { isStringContainSubstring } from "../../../utils/string.utils";

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

    enterMarketState(state: string): MarketActions {
        marketPage.marketState.click().clear().type(`${state}{enter}`);
        return this;
    }

    verifyNeighborhoodYear(yearToBe: string | number): MarketActions {
        marketPage.neighborhoodYear.should("have.value", yearToBe);
        return this;
    }

    enterMarket(market: string, marketAnalysisUse: BoweryReports.MarketAnalysisUses): MarketActions {
        marketPage.getMarketInputByAnalysisUse(marketAnalysisUse).clear().type(market).type("{enter}")
            .should("have.value", market);
        return this;
    }

    enterSubmarket(submarket: string, marketAnalysisUse: BoweryReports.MarketAnalysisUses): MarketActions {
        marketPage.getSubmarketInputByAnalysisUse(marketAnalysisUse).clear().type(submarket).type("{enter}")
            .should("have.value", submarket);
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

    fillMarketResearch(marketResearch: BoweryReports.MarketResearch, marketAnalysisUse: BoweryReports.MarketAnalysisUses,
                       isEnterState = true): MarketActions {
        this.enterNeighborhood(marketResearch.neighborhoodValue);
        if (isEnterState) {
            this.enterMarketState(marketResearch.state);
        }
        this.verifyMarketState(marketResearch.state)
            .enterArea(marketResearch.marketArea)
            .verifyNeighborhoodYear(getYearFromDate(marketResearch.marketDate))
            .enterMarket(marketResearch.macroMarket, marketAnalysisUse)
            .enterSubmarket(marketResearch.submarket, marketAnalysisUse)
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

    verifyMarketAnalysisUseCheckboxChecked(use: BoweryReports.MarketAnalysisUses): MarketActions {
        marketPage.getMarketAnalysisUseCheckbox(use).should("have.value", "true");
        return this;
    }

    verifyMarketAnalysisUseCheckboxUnchecked(use: BoweryReports.MarketAnalysisUses): MarketActions {
        marketPage.getMarketAnalysisUseCheckbox(use).should("have.value", "false");
        return this;
    }

    checkMarketAnalysisUseCheckbox(use: BoweryReports.MarketAnalysisUses): MarketActions {
        marketPage.getMarketAnalysisUseCheckbox(use).check();
        this.verifyMarketAnalysisUseCheckboxChecked(use);
        return this;
    }

    uncheckMarketAnalysisUseCheckbox(use: BoweryReports.MarketAnalysisUses): MarketActions {
        marketPage.getMarketAnalysisUseCheckbox(use).uncheck();
        this.verifyMarketAnalysisUseCheckboxUnchecked(use);
        return this;
    }

    verifyAreaEconomicAnalysisHasFile(): MarketActions {
        marketPage.areaEconomicAnalysisFile.invoke("attr", "value").then(fileName => {
            expect(isStringContainSubstring(fileName, "FINAL")).to.be.true;
        });
        return this;
    }

    verifyNeighborhoodDemographicHasFile(): MarketActions {
        marketPage.neighborhoodDemographicFile.invoke("attr", "value").then(fileName => {
            expect(isStringContainSubstring(fileName, "FINAL")).to.be.true;
        });
        return this;
    }

    verifyMarketByAnalysisUseHasFile(use: BoweryReports.MarketAnalysisUses): MarketActions {
        marketPage.getMarketFileByAnalysisUse(use).invoke("attr", "value").then(fileName => {
            expect(isStringContainSubstring(fileName, "FINAL")).to.be.true;
        });
        return this;
    }

    verifySubmarketByAnalysisUseHasFile(use: BoweryReports.MarketAnalysisUses): MarketActions {
        marketPage.getSubmarketFileByAnalysisUse(use).invoke("attr", "value").then(fileName => {
            expect(isStringContainSubstring(fileName, "FINAL")).to.be.true;
        });
        return this;
    }
}

export default new MarketActions();