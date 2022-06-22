import proFormaPage from "../../pages/income/proForma.page";
import {
    getNumberFromMinusDollarNumberWithCommas,
    numberWithCommas
} from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { uppercaseFirstLetterEachWord } from "../../../utils/string.utils";
import { BoweryReports } from "../../types/boweryReports.type";
import enums from "../../enums/enums";

class ProFormaActions extends BaseActionsExt<typeof proFormaPage> {

    verifyOperatingExpenseRatio(textToBe: string, categoryName: string): this {
        proFormaPage.categoryCellTotal(categoryName).should("have.text", textToBe);
        return this;
    }

    verifyCommercialUseVCLossPerUnit(useText: string, numberOfResUnits: number): this {
        proFormaPage.getCommercialUseVCLossTotal(useText).invoke("text").then(totalText => {
            const totalNumber = getNumberFromMinusDollarNumberWithCommas(totalText);
            const perUnitTextToBe = `-$${numberWithCommas(totalNumber / numberOfResUnits)}`;
            proFormaPage.getCommercialUseVCLossPerUnitCell(useText).should("have.text", perUnitTextToBe);
        });
        return this;
    }

    verifyCommercialUseVCLossTotal(useText: string, totalToBe: string): this {
        proFormaPage.getCommercialUseVCLossTotal(useText).should("have.text", totalToBe);
        return this;
    }

    verifyCommercialUseVCPerSF(useText: string, grossBuildingArea: number): this {
        proFormaPage.getCommercialUseVCLossTotal(useText).invoke("text").then(totalText => {
            const totalNumber = getNumberFromMinusDollarNumberWithCommas(totalText);
            const perSFTextToBe = `-$${numberWithCommas((totalNumber / grossBuildingArea).toFixed(2))}`;
            proFormaPage.getCommercialUseVCLossPerSF(useText).should("have.text", perSFTextToBe);
        });
        return this;
    }

    verifyResidentialVCLossLabel(categoryName: string, vcLossValue: number): this {
        proFormaPage.residentialVCLossLabelCell(categoryName).should("contain.text", `${vcLossValue.toFixed(2)}%`);
        return this;
    }

    verifyResidentialVCLossTotal(categoryName: string, totalToBe: string): this {
        proFormaPage.residentialVCLossTotal(categoryName).should("have.text", totalToBe);
        return this;
    }

    verifyResidentialVCLossPerSF(categoryName: string, grossBuildingArea: number): this {
        proFormaPage.residentialVCLossTotal(categoryName).invoke("text").then(totalText => {
            const totalNumber = getNumberFromMinusDollarNumberWithCommas(totalText);
            const perSFTextToBe = `-$${numberWithCommas((totalNumber / grossBuildingArea).toFixed(2))}`;
            proFormaPage.residentialVCLossPerSF(categoryName).should("have.text", perSFTextToBe);
        });
        return this;
    }

    verifyResidentialVCLossPerUnit(categoryName: string, numberOfUnits: number): this {
        proFormaPage.residentialVCLossTotal(categoryName).invoke("text").then(totalText => {
            const totalNumber = getNumberFromMinusDollarNumberWithCommas(totalText);
            const perUnitTextToBe = `-$${numberWithCommas(Math.round(totalNumber / numberOfUnits))}`;
            proFormaPage.residentialVCLossPerUnit(categoryName).should("have.text", perUnitTextToBe);
        });
        return this;
    }

    clickIncludeNOIComparisonCheckbox(): this {
        proFormaPage.includeNOIComparisonCheckbox.click();
        return this;
    }

    verifyCategoryTotal(totalToBe: string, categoryName: string): this{
        proFormaPage.categoryCellTotal(categoryName).should("have.text", totalToBe);
        return this;
    }

    verifyCategoryPSFTotal(totalToBe: string, categoryName: string): this{
        proFormaPage.categoryPSFTotal(categoryName).should("have.text", totalToBe);
        return this;
    }

    verifyCategoryPerUnitTotal(totalToBe: string, categoryName: string): this{
        proFormaPage.categoryPerUnitTotal(categoryName).should("have.text", totalToBe);
        return this;
    }

    verifyCategoryRow(rowData: BoweryReports.ProFormaAnyIncome, categoryName: string): this {
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
}

export default new ProFormaActions(proFormaPage);
