import proFormaPage from "../../pages/income/proForma.page";
import {
    getNumberFromMinusDollarNumberWithCommas,
    numberWithCommas
} from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

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

    verifyResidentialVCLossLabel(vcLossValue: number): this {
        proFormaPage.residentialVCLossLabelCell.should("contain.text", `${vcLossValue.toFixed(2)}%`);
        return this;
    }

    verifyResidentialVCLossTotal(totalToBe: string): this {
        proFormaPage.residentialVCLossTotal.should("have.text", totalToBe);
        return this;
    }

    verifyResidentialVCLossPerSF(grossBuildingArea: number): this {
        proFormaPage.residentialVCLossTotal.invoke("text").then(totalText => {
            const totalNumber = getNumberFromMinusDollarNumberWithCommas(totalText);
            const perSFTextToBe = `-$${numberWithCommas((totalNumber / grossBuildingArea).toFixed(2))}`;
            proFormaPage.residentialVCLossPerSF.should("have.text", perSFTextToBe);
        });
        return this;
    }

    verifyResidentialVCLossPerUnit(numberOfUnits: number): this {
        proFormaPage.residentialVCLossTotal.invoke("text").then(totalText => {
            const totalNumber = getNumberFromMinusDollarNumberWithCommas(totalText);
            const perUnitTextToBe = `-$${numberWithCommas(totalNumber / numberOfUnits)}`;
            proFormaPage.residentialVCLossPerUnit.should("have.text", perUnitTextToBe);
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
        let textToBe = proFormaPage.capitalizeWordsInCategoryName(categoryName).toString();
        proFormaPage.getCustomCategoryIncomeCell(categoryName).eq(0).invoke('text').should('deep.include', textToBe);
        return this;
    }
}

export default new ProFormaActions(proFormaPage);