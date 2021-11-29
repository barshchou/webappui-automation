import BaseActions from "../base/base.actions";
import proFromaPage from "../../pages/income/proForma.page";

class ProFormaActions extends BaseActions {

    verifyTotalPotentialResIncome(incomeToBe) {
        proFromaPage.totalPotentialResIncome.should("have.text", incomeToBe);
    }

    verifyPsfPotentialResIncome(incomeToBe) {
        proFromaPage.psfPotentialResIncome.should("have.text", incomeToBe);
    }

    verifyPerUnitPotentialResIncome(incomeToBe) {
        proFromaPage.perUnitPotentialResIncome.should("have.text", incomeToBe);
    }

    verifyPotentialResIncomeRow(total, perSF, perUnit) {
        this.verifyTotalPotentialResIncome(total);
        this.verifyPsfPotentialResIncome(perSF);
        this.verifyPerUnitPotentialResIncome(perUnit);
    }

    verifyTotalPotGrossIncome(incomeToBe) {
        proFromaPage.totalPotGrossIncome.should("have.text", incomeToBe);
    }

    verifyPerSFPotGrossIncome(incomeToBe) {
        proFromaPage.perSFPotGrossIncome.should("have.text", incomeToBe);
    }

    verifyPerUnitPotGrossIncome(incomeToBe) {
        proFromaPage.perUnitPotGrossIncome.should("have.text", incomeToBe);
    }

    verifyPotentialGrossIncomeRow(total, perSF, perUnit) {
        this.verifyTotalPotGrossIncome(total);
        this.verifyPerSFPotGrossIncome(perSF);
        this.verifyPerUnitPotGrossIncome(perUnit);
    }

    verifyTotalResVCLoss(lossToBe) {
        proFromaPage.totalResVCLoss.should("have.text", lossToBe);
    }

    verifyPerSFResVCLoss(lossToBe) {
        proFromaPage.perSfResVCLoss.should("have.text", lossToBe);
    }

    verifyPerUnitResVCLoss(lossToBe) {
        proFromaPage.perUnitResVCLoss.should("have.text", lossToBe);
    }

    verifyResVCLossRow(total, perSF, perUnit) {
        this.verifyTotalResVCLoss(total);
        this.verifyPerSFResVCLoss(perSF);
        this.verifyPerUnitResVCLoss(perUnit);
    }

    verifyEffectiveGrossIncomeTotal(incomeToBe) {
        proFromaPage.totalEffectiveGrossIncome.should("have.text", incomeToBe);
    }

    verifyPerSFEffectiveGrossIncome(incomeToBe) {
        proFromaPage.perSFEffectiveGrossIncome.should("have.text", incomeToBe);
    }

    verifyPerUnitEffectiveGrossIncome(incomeToBe) {
        proFromaPage.perUnitEffectiveGrossIncome.should("have.text", incomeToBe);
    }

    verifyEffectiveGrossRow(total, perSF, perUnit) {
        this.verifyEffectiveGrossIncomeTotal(total);
        this.verifyPerSFEffectiveGrossIncome(perSF);
        this.verifyPerUnitEffectiveGrossIncome(perUnit);
    }

    verifyTotalRETaxes(taxesToBe) {
        proFromaPage.totalRETaxes.should("have.text", taxesToBe);
    }

    verifyPerSfRETaxes(taxesToBe) {
        proFromaPage.perSFRETaxes.should("have.text", taxesToBe);
    }

    verifyPerUnitRETaxes(taxesToBe) {
        proFromaPage.perUnitTaxes.should("have.text", taxesToBe);
    }

    verifyRETaxesRow(total, perSF, perUnit) {
        this.verifyTotalRETaxes(total);
        this.verifyPerSfRETaxes(perSF);
        this.verifyPerUnitRETaxes(perUnit);
    }

    verifyTotalInsurance(textToBe) {
        proFromaPage.totalInsurance.should("have.text", textToBe);
    }

    verifyPerSFInsurance(textToBe) {
        proFromaPage.perSFInsurance.should("have.text", textToBe);
    }

    verifyPerUnitInsurance(textToBe) {
        proFromaPage.perUnitInsurance.should("have.text", textToBe);
    }

    verifyInsuranceRow(total, perSF, perUnit) {
        this.verifyTotalInsurance(total);
        this.verifyPerSFInsurance(perSF);
        this.verifyPerUnitInsurance(perUnit);
    }

    verifyElectricityTotal(textToBe) {
        proFromaPage.totalElectricity.should("have.text", textToBe);
    }

    verifyPerSFElectricity(textToBe) {
        proFromaPage.perSFElectricity.should("have.text", textToBe);
    }

    verifyPerUnitElectricity(textToBe) {
        proFromaPage.perUnitElectricity.should("have.text", textToBe);
    }

    verifyElectricityRow(total, perSF, perUnit) {
        this.verifyElectricityTotal(total);
        this.verifyPerSFElectricity(perSF);
        this.verifyPerUnitElectricity(perUnit);
    }

    verifyTotalRepairs(textToBe) {
        proFromaPage.totalRepairs.should("have.text", textToBe);
    }

    verifyPerSFRepairs(textToBe) {
        proFromaPage.perSFRepairs.should("have.text", textToBe);
    }

    verifyPerUnitRepairs(textToBe) {
        proFromaPage.perUnitRepairs.should("have.text", textToBe);
    }

    verifyRepairsRow(total, perSF, perUnit) {
        this.verifyTotalRepairs(total);
        this.verifyPerSFRepairs(perSF);
        this.verifyPerUnitRepairs(perUnit);
    }

    verifyTotalPayroll(textToBe) {
        proFromaPage.totalPayroll.should("have.text", textToBe);
    }

    verifyPerSFPayroll(textToBe) {
        proFromaPage.perSFPayroll.should("have.text", textToBe);
    }

    verifyPerUnitPayroll(textToBe) {
        proFromaPage.perUnitPayroll.should("have.text", textToBe);
    }

    verifyPayrollRow(total, perSF, perUnit) {
        this.verifyTotalPayroll(total);
        this.verifyPerSFPayroll(perSF);
        this.verifyPerUnitPayroll(perUnit);
    }

    verifyTotalGeneral(textToBe) {
        proFromaPage.totalGeneral.should("have.text", textToBe);
    }

    verifyPerSFGeneral(textToBe) {
        proFromaPage.perSFGeneral.should("have.text", textToBe);
    }

    verifyPerUnitGeneral(textToBe) {
        proFromaPage.perUnitGeneral.should("have.text", textToBe);
    }

    verifyGeneralRow(total, perSF, perUnit) {
        this.verifyTotalGeneral(total);
        this.verifyPerSFGeneral(perSF);
        this.verifyPerUnitGeneral(perUnit);
    }

    verifyTotalManagement(textToBe) {
        proFromaPage.totalManagement.should("have.text", textToBe);
    }

    verifyPerSFManagement(textToBe) {
        proFromaPage.perSFManagement.should("have.text", textToBe);
    }

    verifyPerUnitManagement(textToBe) {
        proFromaPage.perUnitManagement.should("have.text", textToBe);
    }

    verifyManagementRow(total, perSF, perUnit) {
        this.verifyTotalManagement(total);
        this.verifyPerSFManagement(perSF);
        this.verifyPerUnitManagement(perUnit);
    }

    verifyTotalReserves(textToBe) {
        proFromaPage.totalReserves.should("have.text", textToBe);
    }

    verifyPerSFReserves(textToBe) {
        proFromaPage.perSFReserves.should("have.text", textToBe);
    }

    verifyPerUnitReserves(textToBe) {
        proFromaPage.perUnitReserves.should("have.text", textToBe);
    }

    verifyReservesRow(total, perSF, perUnit) {
        this.verifyTotalReserves(total);
        this.verifyPerSFReserves(perSF);
        this.verifyPerUnitReserves(perUnit);
    }

    verifyTotalToe(textToBe) {
        proFromaPage.totalToe.should("have.text", textToBe);
    }

    verifyPerSFToe(textToBe) {
        proFromaPage.perSFToe.should("have.text", textToBe);
    }

    verifyPerUnitToe(textToBe) {
        proFromaPage.perUnitToe.should("have.text", textToBe);
    }

    verifyToeRow(total, perSF, perUnit) {
        this.verifyTotalToe(total);
        this.verifyPerSFToe(perSF);
        this.verifyPerUnitToe(perUnit);
    }

    verifyTotalToeNetRe(textToBe) {
        proFromaPage.totalToeNetRe.should("have.text", textToBe);
    }

    verifyPerSFToeNetRe(textToBe) {
        proFromaPage.perSFToeNetRe.should("have.text", textToBe);
    }

    verifyPerUnitToeNetRe(textToBe) {
        proFromaPage.perUnitToeNetRe.should("have.text", textToBe);
    }

    verifyToeNetReRow(total, perSF, perUnit) {
        this.verifyTotalToeNetRe(total);
        this.verifyPerSFToeNetRe(perSF);
        this.verifyPerUnitToeNetRe(perUnit);
    }

    verifyTotalNetOpIncome(textToBe) {
        proFromaPage.totalNetOpIncome.should("have.text", textToBe);
    }

    verifyPerSFNetOpIncome(textToBe) {
        proFromaPage.perSFNetOpIncome.should("have.text", textToBe);
    }

    verifyPerUnitNetOpIncome(textToBe) {
        proFromaPage.perUnitNetOpIncome.should("have.text", textToBe);
    }

    verifyNetOpIncomeRow(total, perSF, perUnit) {
        this.verifyTotalNetOpIncome(total);
        this.verifyPerSFNetOpIncome(perSF);
        this.verifyPerUnitNetOpIncome(perUnit);
    }

    verifyOperatingExpenseRatio(textToBe) {
        proFromaPage.operatingExpenseRatio.should("have.text", textToBe);
    }
}

export default new ProFormaActions();