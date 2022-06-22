import proFormaPage from "../../pages/income/proForma.page";
import {
    getNumberFromMinusDollarNumberWithCommas,
    numberWithCommas,
    getNumberWithDecimalPart,
    getNumberFromDollarNumberWithCommas
} from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { uppercaseFirstLetterEachWord } from "../../../utils/string.utils";
import { BoweryReports } from "../../types";
import enums from "../../enums/enums";
import { Alias } from "../../utils/alias.utils";

class ProFormaActions extends BaseActionsExt<typeof proFormaPage> {

    verifyOperatingExpenseRatio(textToBe: string, categoryName: string): ProFormaActions {
        proFormaPage.categoryCellTotal(categoryName).should("have.text", textToBe);
        return this;
    }

    verifyCommercialUseVCLossPerUnit(useText: string, numberOfResUnits: number): ProFormaActions {
        proFormaPage.getCommercialUseVCLossTotal(useText).invoke("text").then(totalText => {
            const totalNumber = getNumberFromMinusDollarNumberWithCommas(totalText);
            const perUnitTextToBe = `-$${numberWithCommas(totalNumber / numberOfResUnits)}`;
            proFormaPage.getCommercialUseVCLossPerUnitCell(useText).should("have.text", perUnitTextToBe);
        });
        return this;
    }

    verifyCommercialUseVCLossTotal(useText: string, totalToBe: string): ProFormaActions {
        proFormaPage.getCommercialUseVCLossTotal(useText).should("have.text", totalToBe);
        return this;
    }

    verifyCommercialUseVCPerSF(useText: string, grossBuildingArea: number): ProFormaActions {
        proFormaPage.getCommercialUseVCLossTotal(useText).invoke("text").then(totalText => {
            const totalNumber = getNumberFromMinusDollarNumberWithCommas(totalText);
            const perSFTextToBe = `-$${numberWithCommas((totalNumber / grossBuildingArea).toFixed(2))}`;
            proFormaPage.getCommercialUseVCLossPerSF(useText).should("have.text", perSFTextToBe);
        });
        return this;
    }

    verifyResidentialVCLossLabel(categoryName: string, vcLossValue: number): ProFormaActions {
        proFormaPage.residentialVCLossLabelCell(categoryName).should("contain.text", `${vcLossValue.toFixed(2)}%`);
        return this;
    }

    verifyResidentialVCLossTotal(categoryName: string, totalToBe: string): ProFormaActions {
        proFormaPage.residentialVCLossTotal(categoryName).should("have.text", totalToBe);
        return this;
    }

    verifyResidentialVCLossPerSF(categoryName: string, grossBuildingArea: number): ProFormaActions {
        proFormaPage.residentialVCLossTotal(categoryName).invoke("text").then(totalText => {
            const totalNumber = getNumberFromMinusDollarNumberWithCommas(totalText);
            const perSFTextToBe = `-$${numberWithCommas((totalNumber / grossBuildingArea).toFixed(2))}`;
            proFormaPage.residentialVCLossPerSF(categoryName).should("have.text", perSFTextToBe);
        });
        return this;
    }

    verifyResidentialVCLossPerUnit(categoryName: string, numberOfUnits: number): ProFormaActions {
        proFormaPage.residentialVCLossTotal(categoryName).invoke("text").then(totalText => {
            const totalNumber = getNumberFromMinusDollarNumberWithCommas(totalText);
            const perUnitTextToBe = `-$${numberWithCommas(Math.round(totalNumber / numberOfUnits))}`;
            proFormaPage.residentialVCLossPerUnit(categoryName).should("have.text", perUnitTextToBe);
        });
        return this;
    }

    clickIncludeNOIComparisonCheckbox(): ProFormaActions {
        proFormaPage.includeNOIComparisonCheckbox.click();
        return this;
    }

    verifyCategoryTotal(totalToBe: string, categoryName: string): ProFormaActions {
        proFormaPage.categoryCellTotal(categoryName).should("have.text", totalToBe);
        return this;
    }

    verifyCategoryPSFTotal(totalToBe: string, categoryName: string): ProFormaActions {
        proFormaPage.categoryPSFTotal(categoryName).should("have.text", totalToBe);
        return this;
    }

    verifyCategoryPerUnitTotal(totalToBe: string, categoryName: string): ProFormaActions {
        proFormaPage.categoryPerUnitTotal(categoryName).should("have.text", totalToBe);
        return this;
    }

    verifyCategoryRow(rowData: BoweryReports.ProFormaAnyIncome, categoryName: string): ProFormaActions {
        this.verifyCategoryTotal(rowData.total, categoryName)
            .verifyCategoryPSFTotal(rowData.perSF, categoryName)
            .verifyCategoryPerUnitTotal(rowData.perUnit, categoryName);
        return this;
    }

    verifyCustomCategoryName(categoryName: string): ProFormaActions {
        let textToBe = uppercaseFirstLetterEachWord(categoryName).toString();
        proFormaPage.getCustomCategoryIncomeCell(categoryName).first().invoke('text').should('deep.include', textToBe);
        return this;
    }

    verifyExpensesCombined(expenseMode: string): ProFormaActions {
        switch (expenseMode) {
            case "brokenOut":
                proFormaPage.getCategoryElementByType(enums.PRO_FORMA_TYPES.electricity, "label").should('be.visible');
                proFormaPage.getCategoryElementByType(enums.PRO_FORMA_TYPES.fuel, "label").should('be.visible');
                proFormaPage.getCategoryElementByType(enums.PRO_FORMA_TYPES.waterAndSewer, "label").should('be.visible');
                break;
            case "combinedElectricityAndFuel":
                proFormaPage.getCategoryElementByType(enums.PRO_FORMA_TYPES.fuel, "label").should('not.exist');
                proFormaPage.getCategoryElementByType(enums.PRO_FORMA_TYPES.electricity, "label").should('not.exist');
                proFormaPage.getCategoryElementByType(enums.PRO_FORMA_TYPES.waterAndSewer, "label").should('be.visible');
                proFormaPage.getCategoryElementByType(enums.PRO_FORMA_TYPES.utilities, "label").should('be.visible');
                break;
            case "combinedAll":
                proFormaPage.getCategoryElementByType(enums.PRO_FORMA_TYPES.fuel, "label").should('not.exist');
                proFormaPage.getCategoryElementByType(enums.PRO_FORMA_TYPES.electricity, "label").should('not.exist');
                proFormaPage.getCategoryElementByType(enums.PRO_FORMA_TYPES.waterAndSewer, "label").should('not.exist');
                proFormaPage.getCategoryElementByType(enums.PRO_FORMA_TYPES.utilities, "label").should('be.visible');
        }
        return this;
    }

    verifyTotalTOEexTaxesIncludeForecasts(GBA: number): ProFormaActions {
        cy.get(`@${Alias.expenceForcastAliases.summaPerSF}`).then(val => {
            let valTotal = (Number(val) * GBA).toFixed(0);
            let textToBeTotal = `$${numberWithCommas(Number(valTotal))}`;        
            this.verifyCategoryTotal(textToBeTotal, enums.PRO_FORMA_TYPES.totalOperatingExpensesExTaxes);
        });
        return this;
    }

    verifyPsfTOEexTaxesIncludeForecasts(): ProFormaActions {
        cy.get(`@${Alias.expenceForcastAliases.summaPerSF}`).then(val => {
            let valPSF = Number(val);
            let textToBePSF = `$${getNumberWithDecimalPart(valPSF)}`;
            this.verifyCategoryPSFTotal(textToBePSF, enums.PRO_FORMA_TYPES.totalOperatingExpensesExTaxes);
        });
        return this;
    }

    verifyPerUnitTOEexTaxesIncludeForecasts(): ProFormaActions {
        cy.get(`@${Alias.expenceForcastAliases.summaPerUnit}`).then(val => {
            let valPerUnit = Number(val);
            let textToBePerUnit = `$${numberWithCommas(valPerUnit)}`;
            this.verifyCategoryPerUnitTotal(textToBePerUnit, enums.PRO_FORMA_TYPES.totalOperatingExpensesExTaxes);
        });
        return this;
    }

    verifyTotalTOEIncludeForecasts(GBA: number): ProFormaActions {
        cy.get(`@${Alias.expenceForcastAliases.summaPerSF}`).then(val => {
            this.Page.categoryCellTotal(enums.PRO_FORMA_TYPES.totalOperatingExpenses).invoke("text").then(totalText => {
                this.Page.categoryCellTotal(enums.PRO_FORMA_TYPES.realEstateTaxes).invoke("text").then(taxesText => {
                    let valTotal = (Number(val) * GBA).toFixed(0); 
                    const totalNumberWithTaxes = getNumberFromDollarNumberWithCommas(totalText);
                    const taxesNumber = getNumberFromDollarNumberWithCommas(taxesText);
                    const totalNumberWithoutTaxes = (totalNumberWithTaxes - taxesNumber).toFixed(0);
                    expect(valTotal).to.equal(totalNumberWithoutTaxes);
                });
            });
        });
        return this;
    }

    verifyPsfTOEIncludeForecasts(): ProFormaActions {
        cy.get(`@${Alias.expenceForcastAliases.summaPerSF}`).then(val => {
            this.Page.categoryPSFTotal(enums.PRO_FORMA_TYPES.totalOperatingExpenses).invoke("text").then(psfText => {
                this.Page.categoryPSFTotal(enums.PRO_FORMA_TYPES.realEstateTaxes).invoke("text").then(taxesText => {
                    let valPSF = Number(val).toFixed(2);
                    const psfNumberWithTaxes = getNumberFromDollarNumberWithCommas(psfText);
                    const taxesNumber = getNumberFromDollarNumberWithCommas(taxesText);
                    const psfNumberWithoutTaxes = (psfNumberWithTaxes - taxesNumber).toFixed(2);
                    expect(valPSF).to.equal(psfNumberWithoutTaxes);
                });
            });
        });
        return this;
    }

    verifyPerUnitTOEIncludeForecasts(): ProFormaActions {
        cy.get(`@${Alias.expenceForcastAliases.summaPerUnit}`).then(val => {
            this.Page.categoryPerUnitTotal(enums.PRO_FORMA_TYPES.totalOperatingExpenses).invoke("text").then(perUnitText => {
                this.Page.categoryPerUnitTotal(enums.PRO_FORMA_TYPES.realEstateTaxes).invoke("text").then(taxesText => {
                    let valPerUnit =Number(val).toFixed(0);
                    const perUnitNumberWithTaxes = getNumberFromDollarNumberWithCommas(perUnitText);
                    const taxesNumber = getNumberFromDollarNumberWithCommas(taxesText);
                    const perUnitNumberWithoutTaxes = (perUnitNumberWithTaxes - taxesNumber).toFixed(0);
                    expect(valPerUnit).to.equal(perUnitNumberWithoutTaxes);
                });
            });
        });
        return this;
    }

    verifyTotalNOIIncludeForecasts(GBA: number): ProFormaActions {
        cy.get(`@${Alias.expenceForcastAliases.summaPerSF}`).then(val => {
            this.Page.categoryCellTotal(enums.PRO_FORMA_TYPES.netOperatingIncome).invoke("text").then(totalIncome => {
                this.Page.categoryCellTotal(enums.PRO_FORMA_TYPES.realEstateTaxes).invoke("text").then(taxesText => {
                    this.Page.categoryCellTotal(enums.PRO_FORMA_TYPES.effectiveGrossIncome).invoke("text").then(incomeText => {
                        let valTotal = (Number(val) * GBA).toFixed(0);
                        const totalNumberWithTaxes = getNumberFromDollarNumberWithCommas(totalIncome);
                        const taxesNumber = getNumberFromDollarNumberWithCommas(taxesText);
                        const incomeNumber = getNumberFromDollarNumberWithCommas(incomeText);
                        const totalNumberWithoutTaxes = (incomeNumber - totalNumberWithTaxes - taxesNumber).toFixed(0);
                        expect(valTotal).to.equal(totalNumberWithoutTaxes);
                    });
                });
            });
        });
        return this;
    }

    verifyPsfNOIIncludeForecasts(): ProFormaActions {
        cy.get(`@${Alias.expenceForcastAliases.summaPerSF}`).then(val => {           
            this.Page.categoryPSFTotal(enums.PRO_FORMA_TYPES.netOperatingIncome).invoke("text").then(psfIncome => {                
                this.Page.categoryPSFTotal(enums.PRO_FORMA_TYPES.realEstateTaxes).invoke("text").then(taxesText => {                   
                    this.Page.categoryPSFTotal(enums.PRO_FORMA_TYPES.effectiveGrossIncome).invoke("text").then(incomeText => {
                        let valPSF = Number(val).toFixed(2);
                        const psfNumberWithTaxes = getNumberFromDollarNumberWithCommas(psfIncome);
                        const taxesNumber = getNumberFromDollarNumberWithCommas(taxesText);
                        const incomeNumber = getNumberFromDollarNumberWithCommas(incomeText);
                        const totalNumberWithoutTaxes = (incomeNumber - psfNumberWithTaxes - taxesNumber).toFixed(2);
                        expect(valPSF).to.equal(totalNumberWithoutTaxes);
                    });
                });
            });
        });
        return this;
    }

    verifyPerUnitNOIIncludeForecasts(): ProFormaActions {
        cy.get(`@${Alias.expenceForcastAliases.summaPerUnit}`).then(val => {            
            this.Page.categoryPerUnitTotal(enums.PRO_FORMA_TYPES.netOperatingIncome).invoke("text").then(perUnitIncome => {                
                this.Page.categoryPerUnitTotal(enums.PRO_FORMA_TYPES.realEstateTaxes).invoke("text").then(taxesText => {                    
                    this.Page.categoryPerUnitTotal(enums.PRO_FORMA_TYPES.effectiveGrossIncome).invoke("text").then(incomeText => {
                        let valPerUnit = Number(val).toFixed(0);
                        const perUnitNumberWithTaxes = getNumberFromDollarNumberWithCommas(perUnitIncome);
                        const taxesNumber = getNumberFromDollarNumberWithCommas(taxesText);
                        const incomeNumber = getNumberFromDollarNumberWithCommas(incomeText);
                        const totalNumberWithoutTaxes = (incomeNumber - perUnitNumberWithTaxes - taxesNumber).toFixed(0);
                        expect(valPerUnit).to.equal(totalNumberWithoutTaxes);
                    });
                });
            });
        });
        return this;
    }
    
}

export default new ProFormaActions(proFormaPage);
