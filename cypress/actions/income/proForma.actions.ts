import BaseActions from "../base/base.actions";
import proFormaPage from "../../pages/income/proForma.page";
import {
    getNumberFromMinusDollarNumberWithCommas,
    numberWithCommas
} from "../../../utils/numbers.utils";

class ProFormaActions extends BaseActions {

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyTotalPotentialResIncome(incomeToBe: string): this {
        proFormaPage.totalPotentialResIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPsfPotentialResIncome(incomeToBe: string): this {
        proFormaPage.psfPotentialResIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitPotentialResIncome(incomeToBe: string): this {
        proFormaPage.perUnitPotentialResIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyPotentialResIncomeRow(rowData: Readonly<{ total: string; perSF: string; perUnit: string; }>): this {
        this.verifyTotalPotentialResIncome(rowData.total)
            .verifyPsfPotentialResIncome(rowData.perSF)
            .verifyPerUnitPotentialResIncome(rowData.perUnit);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyTotalPotGrossIncome(incomeToBe: string): this {
        proFormaPage.totalPotGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFPotGrossIncome(incomeToBe: string): this {
        proFormaPage.perSFPotGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitPotGrossIncome(incomeToBe: string): this {
        proFormaPage.perUnitPotGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyPotentialGrossIncomeRow(rowData: Readonly<{ total: string; perSF: string; perUnit: string; }>): this {
        this.verifyTotalPotGrossIncome(rowData.total)
            .verifyPerSFPotGrossIncome(rowData.perSF)
            .verifyPerUnitPotGrossIncome(rowData.perUnit);
        return this;
    }

    /**
     *
     * @param {string} lossToBe
     * @returns {ProFormaActions}
     */
    verifyTotalResVCLoss(lossToBe: string): this {
        proFormaPage.totalResVCLoss.should("have.text", lossToBe);
        return this;
    }

    /**
     *
     * @param {string} lossToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFResVCLoss(lossToBe: string): this {
        proFormaPage.perSfResVCLoss.should("have.text", lossToBe);
        return this;
    }

    /**
     *
     * @param {string} lossToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitResVCLoss(lossToBe: string): this {
        proFormaPage.perUnitResVCLoss.should("have.text", lossToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyResVCLossRow(rowData: Readonly<{ total: string; perSF: string; perUnit: string; }>): this {
        this.verifyTotalResVCLoss(rowData.total)
            .verifyPerSFResVCLoss(rowData.perSF)
            .verifyPerUnitResVCLoss(rowData.perUnit);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyEffectiveGrossIncomeTotal(incomeToBe: string): this {
        proFormaPage.totalEffectiveGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFEffectiveGrossIncome(incomeToBe: string): this {
        proFormaPage.perSFEffectiveGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitEffectiveGrossIncome(incomeToBe: string): this {
        proFormaPage.perUnitEffectiveGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyEffectiveGrossRow(rowData: Readonly<{ total: string; perSF: string; perUnit: string; }>): this {
        this.verifyEffectiveGrossIncomeTotal(rowData.total)
            .verifyPerSFEffectiveGrossIncome(rowData.perSF)
            .verifyPerUnitEffectiveGrossIncome(rowData.perUnit);
        return this;
    }

    /**
     *
     * @param taxesToBe
     * @returns {ProFormaActions}
     */
    verifyTotalRETaxes(taxesToBe): this {
        proFormaPage.totalRETaxes.should("have.text", taxesToBe);
        return this;
    }

    /**
     *
     * @param {string} taxesToBe
     * @returns {ProFormaActions}
     */
    verifyPerSfRETaxes(taxesToBe: string): this {
        proFormaPage.perSFRETaxes.should("have.text", taxesToBe);
        return this;
    }

    /**
     *
     * @param {string} taxesToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitRETaxes(taxesToBe: string): this {
        proFormaPage.perUnitTaxes.should("have.text", taxesToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyRETaxesRow(rowData: Readonly<{ total: string; perSF: string; perUnit: string; }>): this {
        this.verifyTotalRETaxes(rowData.total)
            .verifyPerSfRETaxes(rowData.perSF)
            .verifyPerUnitRETaxes(rowData.perUnit);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyTotalInsurance(textToBe: string): this {
        proFormaPage.totalInsurance.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFInsurance(textToBe: string): this {
        proFormaPage.perSFInsurance.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitInsurance(textToBe: string): this {
        proFormaPage.perUnitInsurance.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyInsuranceRow(rowData: Readonly<{ total: string; perSF: string; perUnit: string; }>): this {
        this.verifyTotalInsurance(rowData.total)
            .verifyPerSFInsurance(rowData.perSF)
            .verifyPerUnitInsurance(rowData.perUnit);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyElectricityTotal(textToBe: string): this {
        proFormaPage.totalElectricity.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFElectricity(textToBe: string): this {
        proFormaPage.perSFElectricity.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitElectricity(textToBe: string): this {
        proFormaPage.perUnitElectricity.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyElectricityRow(rowData: Readonly<{ total: string; perSF: string; perUnit: string; }>): this {
        this.verifyElectricityTotal(rowData.total)
            .verifyPerSFElectricity(rowData.perSF)
            .verifyPerUnitElectricity(rowData.perUnit);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyTotalRepairs(textToBe: string): this {
        proFormaPage.totalRepairs.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFRepairs(textToBe: string): this {
        proFormaPage.perSFRepairs.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitRepairs(textToBe: string): this {
        proFormaPage.perUnitRepairs.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyRepairsRow(rowData: Readonly<{ total: string; perSF: string; perUnit: string; }>): this {
        this.verifyTotalRepairs(rowData.total)
            .verifyPerSFRepairs(rowData.perSF)
            .verifyPerUnitRepairs(rowData.perUnit);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyTotalPayroll(textToBe: string): this {
        proFormaPage.totalPayroll.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFPayroll(textToBe: string): this {
        proFormaPage.perSFPayroll.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitPayroll(textToBe: string): this {
        proFormaPage.perUnitPayroll.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyPayrollRow(rowData: Readonly<{ total: string; perSF: string; perUnit: string; }>): this {
        this.verifyTotalPayroll(rowData.total)
            .verifyPerSFPayroll(rowData.perSF)
            .verifyPerUnitPayroll(rowData.perUnit);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyTotalGeneral(textToBe: string): this {
        proFormaPage.totalGeneral.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFGeneral(textToBe: string): this {
        proFormaPage.perSFGeneral.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitGeneral(textToBe: string): this {
        proFormaPage.perUnitGeneral.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyGeneralRow(rowData: Readonly<{ total: string; perSF: string; perUnit: string; }>): this {
        this.verifyTotalGeneral(rowData.total)
            .verifyPerSFGeneral(rowData.perSF)
            .verifyPerUnitGeneral(rowData.perUnit);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyTotalManagement(textToBe: string): this {
        proFormaPage.totalManagement.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFManagement(textToBe: string): this {
        proFormaPage.perSFManagement.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitManagement(textToBe: string): this {
        proFormaPage.perUnitManagement.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyManagementRow(rowData: Readonly<{ total: string; perSF: string; perUnit: string; }>): this {
        this.verifyTotalManagement(rowData.total)
            .verifyPerSFManagement(rowData.perSF)
            .verifyPerUnitManagement(rowData.perUnit);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyTotalReserves(textToBe: string): this {
        proFormaPage.totalReserves.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFReserves(textToBe: string): this {
        proFormaPage.perSFReserves.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitReserves(textToBe: string): this {
        proFormaPage.perUnitReserves.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyReservesRow(rowData: Readonly<{ total: string; perSF: string; perUnit: string; }>): this {
        this.verifyTotalReserves(rowData.total)
            .verifyPerSFReserves(rowData.perSF)
            .verifyPerUnitReserves(rowData.perUnit);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyTotalToe(textToBe: string): this {
        proFormaPage.totalToe.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFToe(textToBe: string): this {
        proFormaPage.perSFToe.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitToe(textToBe: string): this {
        proFormaPage.perUnitToe.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyToeRow(rowData: Readonly<{ total: string; perSF: string; perUnit: string; }>): this {
        this.verifyTotalToe(rowData.total)
            .verifyPerSFToe(rowData.perSF)
            .verifyPerUnitToe(rowData.perUnit);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyTotalToeNetRe(textToBe: string): this {
        proFormaPage.totalToeNetRe.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFToeNetRe(textToBe: string): this {
        proFormaPage.perSFToeNetRe.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitToeNetRe(textToBe: string): this {
        proFormaPage.perUnitToeNetRe.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyToeNetReRow(rowData: Readonly<{ total: string; perSF: string; perUnit: string; }>): this {
        this.verifyTotalToeNetRe(rowData.total)
            .verifyPerSFToeNetRe(rowData.perSF)
            .verifyPerUnitToeNetRe(rowData.perUnit);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyTotalNetOpIncome(textToBe: string): this {
        proFormaPage.totalNetOpIncome.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFNetOpIncome(textToBe: string): this {
        proFormaPage.perSFNetOpIncome.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitNetOpIncome(textToBe: string): this {
        proFormaPage.perUnitNetOpIncome.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyNetOpIncomeRow(rowData: Readonly<{ total: string; perSF: string; perUnit: string; }>): this {
        this.verifyTotalNetOpIncome(rowData.total)
            .verifyPerSFNetOpIncome(rowData.perSF)
            .verifyPerUnitNetOpIncome(rowData.perUnit);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyOperatingExpenseRatio(textToBe: string): this {
        proFormaPage.operatingExpenseRatio.should("have.text", textToBe);
        return this;
    }

    /**
     * @param {string} useText
     * @param {number} numberOfResUnits
     * @returns {ProFormaActions}
     */
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

    verifyResidentialVCLossPerUnit(numberOfUnits: number): ProFormaActions {
        proFormaPage.residentialVCLossTotal.invoke("text").then(totalText => {
            const totalNumber = getNumberFromMinusDollarNumberWithCommas(totalText);
            const perUnitTextToBe = `-$${numberWithCommas(totalNumber / numberOfUnits)}`;
            proFormaPage.residentialVCLossPerUnit.should("have.text", perUnitTextToBe);
        });
        return this;
    }
}

export default new ProFormaActions();