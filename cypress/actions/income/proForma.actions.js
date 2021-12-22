import BaseActions from "../base/base.actions";
import proFromaPage from "../../pages/income/proForma.page";

class ProFormaActions extends BaseActions {

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyTotalPotentialResIncome(incomeToBe) {
        proFromaPage.totalPotentialResIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPsfPotentialResIncome(incomeToBe) {
        proFromaPage.psfPotentialResIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitPotentialResIncome(incomeToBe) {
        proFromaPage.perUnitPotentialResIncome.should("have.text", incomeToBe);
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
        proFromaPage.totalPotGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFPotGrossIncome(incomeToBe) {
        proFromaPage.perSFPotGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitPotGrossIncome(incomeToBe) {
        proFromaPage.perUnitPotGrossIncome.should("have.text", incomeToBe);
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
        proFromaPage.totalResVCLoss.should("have.text", lossToBe);
        return this;
    }

    /**
     *
     * @param {string} lossToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFResVCLoss(lossToBe) {
        proFromaPage.perSfResVCLoss.should("have.text", lossToBe);
        return this;
    }

    /**
     *
     * @param {string} lossToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitResVCLoss(lossToBe) {
        proFromaPage.perUnitResVCLoss.should("have.text", lossToBe);
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
        proFromaPage.totalEffectiveGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFEffectiveGrossIncome(incomeToBe) {
        proFromaPage.perSFEffectiveGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitEffectiveGrossIncome(incomeToBe) {
        proFromaPage.perUnitEffectiveGrossIncome.should("have.text", incomeToBe);
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
        proFromaPage.totalRETaxes.should("have.text", taxesToBe);
        return this;
    }

    /**
     *
     * @param {string} taxesToBe
     * @returns {ProFormaActions}
     */
    verifyPerSfRETaxes(taxesToBe) {
        proFromaPage.perSFRETaxes.should("have.text", taxesToBe);
        return this;
    }

    /**
     *
     * @param {string} taxesToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitRETaxes(taxesToBe) {
        proFromaPage.perUnitTaxes.should("have.text", taxesToBe);
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
        proFromaPage.totalInsurance.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFInsurance(textToBe) {
        proFromaPage.perSFInsurance.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitInsurance(textToBe) {
        proFromaPage.perUnitInsurance.should("have.text", textToBe);
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
        proFromaPage.totalElectricity.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFElectricity(textToBe) {
        proFromaPage.perSFElectricity.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitElectricity(textToBe) {
        proFromaPage.perUnitElectricity.should("have.text", textToBe);
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
        proFromaPage.totalRepairs.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFRepairs(textToBe) {
        proFromaPage.perSFRepairs.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitRepairs(textToBe) {
        proFromaPage.perUnitRepairs.should("have.text", textToBe);
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
        proFromaPage.totalPayroll.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFPayroll(textToBe) {
        proFromaPage.perSFPayroll.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitPayroll(textToBe) {
        proFromaPage.perUnitPayroll.should("have.text", textToBe);
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
        proFromaPage.totalGeneral.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFGeneral(textToBe) {
        proFromaPage.perSFGeneral.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitGeneral(textToBe) {
        proFromaPage.perUnitGeneral.should("have.text", textToBe);
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
        proFromaPage.totalManagement.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFManagement(textToBe) {
        proFromaPage.perSFManagement.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitManagement(textToBe) {
        proFromaPage.perUnitManagement.should("have.text", textToBe);
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
        proFromaPage.totalReserves.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFReserves(textToBe) {
        proFromaPage.perSFReserves.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitReserves(textToBe) {
        proFromaPage.perUnitReserves.should("have.text", textToBe);
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
        proFromaPage.totalToe.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFToe(textToBe) {
        proFromaPage.perSFToe.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitToe(textToBe) {
        proFromaPage.perUnitToe.should("have.text", textToBe);
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
        proFromaPage.totalToeNetRe.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFToeNetRe(textToBe) {
        proFromaPage.perSFToeNetRe.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitToeNetRe(textToBe) {
        proFromaPage.perUnitToeNetRe.should("have.text", textToBe);
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
        proFromaPage.totalNetOpIncome.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerSFNetOpIncome(textToBe) {
        proFromaPage.perSFNetOpIncome.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ProFormaActions}
     */
    verifyPerUnitNetOpIncome(textToBe) {
        proFromaPage.perUnitNetOpIncome.should("have.text", textToBe);
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
        proFromaPage.operatingExpenseRatio.should("have.text", textToBe);
        return this;
    }
}

export default new ProFormaActions();