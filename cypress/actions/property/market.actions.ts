import marketPage from "../../pages/property/market.page";
import { getQuarter, getYearFromDate, isCorrectQuarter } from "../../../utils/date.utils";
import { BoweryReports } from "../../types/boweryReports.type";
import { isStringContainSubstring } from "../../../utils/string.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { _map } from "../../support/commands";
import mapKeysUtils from "../../utils/mapKeys.utils";

class MarketActions extends BaseActionsExt<typeof marketPage> {
    readonly errorRetrieveFileMessage = "Cannot retrieve file. Contact Research team.";

    readonly finalDocumentNamePart = "FINAL";

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

    enterNeighborhoodYear(yearToBe: number): MarketActions {
        marketPage.neighborhoodYear.type(`${yearToBe}`);
        this.verifyNeighborhoodYear(yearToBe);
        return this;
    }

    verifyNeighborhoodYear(yearToBe: number): MarketActions {
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

    enterMarketYear(yearToBe: number): MarketActions {
        marketPage.marketYear.type(`${yearToBe}`);
        this.verifyMarketYear(yearToBe);
        return this;
    }

    verifyMarketYear(yearToBe: number): MarketActions {
        marketPage.marketYear.should("have.value", yearToBe);
        return this;
    }

    clickPullFromDropbox(): MarketActions {
        marketPage.pullDropboxButton.should("not.be.disabled").click();
        this.verifyProgressBarNotExist();
        return this;
    }

    fillMarketResearch(marketResearch: BoweryReports.MarketResearch, 
        marketAnalysisUse: BoweryReports.MarketAnalysisUses,
        isEnterState = true, isEnterQuarter = false): MarketActions {
        this.enterNeighborhood(marketResearch.neighborhoodValue);
        if (isEnterState) { this.enterMarketState(marketResearch.state); }
        this.verifyMarketState(marketResearch.state)
            .enterArea(marketResearch.marketArea)
            .verifyNeighborhoodYear(parseInt(getYearFromDate(marketResearch.marketDate)))
            .enterMarket(marketResearch.macroMarket, marketAnalysisUse)
            .enterSubmarket(marketResearch.submarket, marketAnalysisUse);
        if (isEnterQuarter)  {
            this.enterMarketQuarter(marketResearch.quarter)
                .verifyMarketQuarter(marketResearch.quarter);
        } else {
            this.verifyMarketQuarter(getQuarter(marketResearch.dateOfValuation));
        }
        this.verifyMarketYear(parseInt(getYearFromDate(marketResearch.dateOfValuation)));
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

    verifyMarketAnalysisUseCheckboxState(use: BoweryReports.MarketAnalysisUses, isCheck = true): MarketActions {
        const matcher = isCheck ? "be.checked" : "not.be.checked";
        marketPage.getMarketAnalysisUseCheckbox(use).should(matcher);
        return this;
    }

    checkUncheckMarketAnalysisUseCheckbox(use: BoweryReports.MarketAnalysisUses, isCheck = true): MarketActions {
        marketPage.getMarketAnalysisUseCheckboxArea(use).invoke('attr', 'data-qa').then(dataQA => {
            let isChecked = dataQA.includes("checked") ? true : false;
            if (isCheck != isChecked) {
                marketPage.getMarketAnalysisUseCheckbox(use).click();
                this.verifyMarketAnalysisUseCheckboxState(use, isCheck);
            }
        });
        return this;
    }

    verifyAreaEconomicAnalysisHasFile(textToContain = this.finalDocumentNamePart): MarketActions {
        marketPage.areaEconomicAnalysisFile.invoke("attr", "value").then(fileName => {
            expect(isStringContainSubstring(fileName, textToContain)).to.be.true;
        });
        return this;
    }

    setAreaEconomicAnalysisFileValueToMap(): MarketActions {
        marketPage.areaEconomicAnalysisFile.invoke("attr", "value").then(fileName => {
            _map.set(mapKeysUtils.areaEconomicAnalysisFile, fileName);
        });
        return this;
    }

    verifyNeighborhoodDemographicHasFile(textToContain = this.finalDocumentNamePart): MarketActions {
        marketPage.neighborhoodDemographicFile.invoke("attr", "value").then(fileName => {
            expect(isStringContainSubstring(fileName, textToContain)).to.be.true;
        });
        return this;
    }

    setNeighborhoodDemographicFileValueToMap(): MarketActions {
        marketPage.neighborhoodDemographicFile.invoke("attr", "value").then(fileName => {
            _map.set(mapKeysUtils.neighborhoodDemographicFile, fileName);
        });
        return this;
    }

    verifyMarketByAnalysisUseHasFile(use: BoweryReports.MarketAnalysisUses, 
        textToContain = this.finalDocumentNamePart): MarketActions {
        marketPage.getMarketFileByAnalysisUse(use).invoke("attr", "value").then(fileName => {
            expect(isStringContainSubstring(fileName, textToContain)).to.be.true;
        });
        return this;
    }

    setMarketByAnalysisUseFileValueToMap(use: BoweryReports.MarketAnalysisUses): MarketActions {
        marketPage.getMarketFileByAnalysisUse(use).invoke("attr", "value").then(fileName => {
            _map.set(`${use}_${mapKeysUtils.marketAnalysisUseFile}`, fileName);
        });
        return this;
    }

    verifySubmarketByAnalysisUseHasFile(use: BoweryReports.MarketAnalysisUses, 
        textToContain = this.finalDocumentNamePart): MarketActions {
        marketPage.getSubmarketFileByAnalysisUse(use).invoke("attr", "value").then(fileName => {
            expect(isStringContainSubstring(fileName, textToContain)).to.be.true;
        });
        return this;
    }

    setSubmarketByAnalysisUseFileValueToMap(use: BoweryReports.MarketAnalysisUses): MarketActions {
        marketPage.getSubmarketFileByAnalysisUse(use).invoke("attr", "value").then(fileName => {
            _map.set(`${use}_${mapKeysUtils.submarketAnalysisUseFile}`, fileName);
        });
        return this;
    }

    setFilesValuesToMap(use: BoweryReports.MarketAnalysisUses): MarketActions {
        this.setAreaEconomicAnalysisFileValueToMap()
            .setNeighborhoodDemographicFileValueToMap()
            .setMarketByAnalysisUseFileValueToMap(use)
            .setSubmarketByAnalysisUseFileValueToMap(use);
        return this;
    }

    verifyAreaEconomicAnalysisInputErrorRetrieving(): MarketActions {
        marketPage.areaEconomicAnalysisContainer.contains(this.errorRetrieveFileMessage).should("exist");
        return this;
    }

    verifyAnyFileInputHasFile(use: BoweryReports.MarketAnalysisUses, 
        textToContain = this.finalDocumentNamePart): MarketActions {
        cy.url().then(() => {
            let isAnyHasFile = false;
            const files: string[] = [ 
                _map.get(mapKeysUtils.areaEconomicAnalysisFile),
                _map.get(mapKeysUtils.neighborhoodDemographicFile),
                _map.get(`${use}_${mapKeysUtils.marketAnalysisUseFile}`), 
                _map.get(`${use}_${mapKeysUtils.submarketAnalysisUseFile}`) 
            ];
            for (let i = 0; i < files.length; i++) {
                cy.log(`${files[i]} file value`);
                if (files[i].includes(textToContain)) {
                    isAnyHasFile = true;
                    break;
                }
            }
            cy.wrap(isAnyHasFile).should("be.true");
        });
        return this;
    }

    uploadRentStabilizationFile(fileName: string): MarketActions {
        marketPage.uploadRentStabilizationFileButton.click();
        marketPage.fileDropZone.attachFile(
            `test_files/${fileName}`,
            { subjectType: 'drag-n-drop' }
        );
        marketPage.getUploadFileButton().click();
        marketPage.insertFileButton.click();
        return this;
    }

    uploadMarketSubmarketByAnalysisUseFile(use: BoweryReports.MarketAnalysisUses, 
        fileName: string, isMarket = true): MarketActions {
        isMarket ? marketPage.getMarketByAnalysisUseFileUploadButton(use).click()
            : marketPage.getSubmarketByAnalysisUseFileUploadButton(use).click();

        let aliasFileUpload = "aliasFileUpload";
        cy.intercept('POST', '/api/files/upload**').as(aliasFileUpload);

        marketPage.fileDropZone.attachFile(
            `test_files/${fileName}`,
            { subjectType: 'drag-n-drop' }
        );

        marketPage.getUploadFileButton().click();

        cy.wait(`@${aliasFileUpload}`).then(({ response }) => {
            expect(response.statusCode).equal(201);
            cy.log("fileUpload resolved");
        });

        marketPage.insertFileButton.click();
        return this;
    }

    clickTrashCanButton(fileSelectionName: BoweryReports.FileSelection): MarketActions {
        marketPage.getTrashCanButton(fileSelectionName).click();
        return this;
    }

    verifyRentStabilizationFile(textToContain: string): MarketActions {
        marketPage.rentStabilizationFile.invoke("attr", "value").then(fileName => {
            expect(fileName).to.equal(textToContain);
        });
        return this;
    }
}

export default new MarketActions(marketPage);
