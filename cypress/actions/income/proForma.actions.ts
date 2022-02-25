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
    verifyTotalPotentialResIncome(incomeToBe) {
        proFormaPage.totalPotentialResIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPsfPotentialResIncome(incomeToBe) {
        proFormaPage.psfPotentialResIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitPotentialResIncome(incomeToBe) {
        proFormaPage.perUnitPotentialResIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyPotentialResIncomeRow(rowData) {
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
    verifyTotalPotGrossIncome(incomeToBe) {
        proFormaPage.totalPotGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFPotGrossIncome(incomeToBe) {
        proFormaPage.perSFPotGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitPotGrossIncome(incomeToBe) {
        proFormaPage.perUnitPotGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyPotentialGrossIncomeRow(rowData) {
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
    verifyTotalResVCLoss(lossToBe) {
        proFormaPage.totalResVCLoss.should("have.text", lossToBe);
        return this;
    }

    /**
     *
     * @param {string} lossToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFResVCLoss(lossToBe) {
        proFormaPage.perSfResVCLoss.should("have.text", lossToBe);
        return this;
    }

    /**
     *
     * @param {string} lossToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitResVCLoss(lossToBe) {
        proFormaPage.perUnitResVCLoss.should("have.text", lossToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyResVCLossRow(rowData) {
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
    verifyEffectiveGrossIncomeTotal(incomeToBe) {
        proFormaPage.totalEffectiveGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFEffectiveGrossIncome(incomeToBe) {
        proFormaPage.perSFEffectiveGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitEffectiveGrossIncome(incomeToBe) {
        proFormaPage.perUnitEffectiveGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyEffectiveGrossRow(rowData) {
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
    verifyTotalRETaxes(taxesToBe) {
        proFormaPage.totalRETaxes.should("have.text", taxesToBe);
        return this;
    }

    /**
     *
     * @param {string} taxesToBe
     * @returns {ProFormaActions}
     */
    verifyPerSfRETaxes(taxesToBe) {
        proFormaPage.perSFRETaxes.should("have.text", taxesToBe);
        return this;
    }

    /**
     *
     * @param {string} taxesToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitRETaxes(taxesToBe) {
        proFormaPage.perUnitTaxes.should("have.text", taxesToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyRETaxesRow(rowData) {
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
    verifyTotalInsurance(textToBe) {
        proFormaPage.totalInsurance.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFInsurance(textToBe) {
        proFormaPage.perSFInsurance.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitInsurance(textToBe) {
        proFormaPage.perUnitInsurance.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyInsuranceRow(rowData) {
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
    verifyElectricityTotal(textToBe) {
        proFormaPage.totalElectricity.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFElectricity(textToBe) {
        proFormaPage.perSFElectricity.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitElectricity(textToBe) {
        proFormaPage.perUnitElectricity.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyElectricityRow(rowData) {
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
    verifyTotalRepairs(textToBe) {
        proFormaPage.totalRepairs.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFRepairs(textToBe) {
        proFormaPage.perSFRepairs.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitRepairs(textToBe) {
        proFormaPage.perUnitRepairs.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyRepairsRow(rowData) {
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
    verifyTotalPayroll(textToBe) {
        proFormaPage.totalPayroll.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFPayroll(textToBe) {
        proFormaPage.perSFPayroll.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitPayroll(textToBe) {
        proFormaPage.perUnitPayroll.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyPayrollRow(rowData) {
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
    verifyTotalGeneral(textToBe) {
        proFormaPage.totalGeneral.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFGeneral(textToBe) {
        proFormaPage.perSFGeneral.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitGeneral(textToBe) {
        proFormaPage.perUnitGeneral.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyGeneralRow(rowData) {
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
    verifyTotalManagement(textToBe) {
        proFormaPage.totalManagement.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFManagement(textToBe) {
        proFormaPage.perSFManagement.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitManagement(textToBe) {
        proFormaPage.perUnitManagement.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyManagementRow(rowData) {
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
    verifyTotalReserves(textToBe) {
        proFormaPage.totalReserves.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFReserves(textToBe) {
        proFormaPage.perSFReserves.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitReserves(textToBe) {
        proFormaPage.perUnitReserves.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyReservesRow(rowData) {
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
    verifyTotalToe(textToBe) {
        proFormaPage.totalToe.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFToe(textToBe) {
        proFormaPage.perSFToe.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitToe(textToBe) {
        proFormaPage.perUnitToe.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyToeRow(rowData) {
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
    verifyTotalToeNetRe(textToBe) {
        proFormaPage.totalToeNetRe.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFToeNetRe(textToBe) {
        proFormaPage.perSFToeNetRe.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitToeNetRe(textToBe) {
        proFormaPage.perUnitToeNetRe.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyToeNetReRow(rowData) {
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
    verifyTotalNetOpIncome(textToBe) {
        proFormaPage.totalNetOpIncome.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFNetOpIncome(textToBe) {
        proFormaPage.perSFNetOpIncome.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitNetOpIncome(textToBe) {
        proFormaPage.perUnitNetOpIncome.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{total: string, perSF: string, perUnit: string}>} rowData
     * @returns {ProFormaActions}
     */
    verifyNetOpIncomeRow(rowData) {
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
    verifyOperatingExpenseRatio(textToBe) {
        proFormaPage.operatingExpenseRatio.should("have.text", textToBe);
        return this;
    }

    /**
     * @param {string} useText
     * @param {number} numberOfResUnits
     * @returns {ProFormaActions}
     */
    verifyCommercialUseVCLossPerUnit(useText, numberOfResUnits) {
        proFormaPage.getCommercialUseVCLossTotal(useText).invoke("text").then(totalText => {
            const totalNumber = getNumberFromMinusDollarNumberWithCommas(totalText);
            const perUnitTextToBe = `-$${numberWithCommas(totalNumber / numberOfResUnits)}`;
            proFormaPage.getCommercialUseVCLossPerUnitCell(useText).should("have.text", perUnitTextToBe);
        });
        return this;
    }

    /**
     * @param {string} totalToBe
     * @param {string} useText
     * @returns {ProFormaActions}
     */
    verifyCommercialUseVCLossTotal(useText, totalToBe) {
        proFormaPage.getCommercialUseVCLossTotal(useText).should("have.text", totalToBe);
        return this;
    }

    /**
     * @param {string} useText
     * @param {number} grossBuildingArea
     * @returns {ProFormaActions}
     */
    verifyCommercialUseVCPerSF(useText, grossBuildingArea) {
        proFormaPage.getCommercialUseVCLossTotal(useText).invoke("text").then(totalText => {
            const totalNumber = getNumberFromMinusDollarNumberWithCommas(totalText);
            const perSFTextToBe = `-$${numberWithCommas((totalNumber / grossBuildingArea).toFixed(2))}`;
            proFormaPage.getCommercialUseVCLossPerSF(useText).should("have.text", perSFTextToBe);
        });
        return this;
    }

    verifyResidentialVCLossLabel(vcLossValue: number): ProFormaActions {
        proFormaPage.residentialVCLossLabelCell.should("contain.text", `${vcLossValue.toFixed(2)}%`);
        return this;
    }
}

export default new ProFormaActions();