import proFormaPage from "../../pages/income/proForma.page";
import {
    getNumberFromMinusDollarNumberWithCommas,
    numberWithCommas
} from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

class ProFormaActions extends BaseActionsExt<typeof proFormaPage> {

    verifyTotalPotentialResIncome(incomeToBe: string): this {
        proFormaPage.totalPotentialResIncome.should("have.text", incomeToBe);
        return this;
    }

    verifyPsfPotentialResIncome(incomeToBe: string): this {
        proFormaPage.psfPotentialResIncome.should("have.text", incomeToBe);
        return this;
    }

    verifyPerUnitPotentialResIncome(incomeToBe: string): this {
        proFormaPage.perUnitPotentialResIncome.should("have.text", incomeToBe);
        return this;
    }

    verifyPotentialResIncomeRow(rowData: BoweryReports.ProFormaAnyIncome): this {
        this.verifyTotalPotentialResIncome(rowData.total)
            .verifyPsfPotentialResIncome(rowData.perSF)
            .verifyPerUnitPotentialResIncome(rowData.perUnit);
        return this;
    }

    verifyTotalPotGrossIncome(incomeToBe: string): this {
        proFormaPage.totalPotGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    verifyPerSFPotGrossIncome(incomeToBe: string): this {
        proFormaPage.perSFPotGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    verifyPerUnitPotGrossIncome(incomeToBe: string): this {
        proFormaPage.perUnitPotGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    verifyPotentialGrossIncomeRow(rowData: BoweryReports.ProFormaAnyIncome): this {
        this.verifyTotalPotGrossIncome(rowData.total)
            .verifyPerSFPotGrossIncome(rowData.perSF)
            .verifyPerUnitPotGrossIncome(rowData.perUnit);
        return this;
    }

    verifyTotalResVCLoss(lossToBe: string): this {
        proFormaPage.totalResVCLoss.should("have.text", lossToBe);
        return this;
    }

    verifyPerSFResVCLoss(lossToBe: string): this {
        proFormaPage.perSfResVCLoss.should("have.text", lossToBe);
        return this;
    }

    verifyPerUnitResVCLoss(lossToBe: string): this {
        proFormaPage.perUnitResVCLoss.should("have.text", lossToBe);
        return this;
    }

    verifyResVCLossRow(rowData: BoweryReports.ProFormaAnyIncome): this {
        this.verifyTotalResVCLoss(rowData.total)
            .verifyPerSFResVCLoss(rowData.perSF)
            .verifyPerUnitResVCLoss(rowData.perUnit);
        return this;
    }

    verifyEffectiveGrossIncomeTotal(incomeToBe: string): this {
        proFormaPage.totalEffectiveGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    verifyPerSFEffectiveGrossIncome(incomeToBe: string): this {
        proFormaPage.perSFEffectiveGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    verifyPerUnitEffectiveGrossIncome(incomeToBe: string): this {
        proFormaPage.perUnitEffectiveGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    verifyEffectiveGrossRow(rowData: BoweryReports.ProFormaAnyIncome): this {
        this.verifyEffectiveGrossIncomeTotal(rowData.total)
            .verifyPerSFEffectiveGrossIncome(rowData.perSF)
            .verifyPerUnitEffectiveGrossIncome(rowData.perUnit);
        return this;
    }

    verifyTotalRETaxes(taxesToBe: string): this {
        proFormaPage.totalRETaxes.should("have.text", taxesToBe);
        return this;
    }

    verifyPerSfRETaxes(taxesToBe: string): this {
        proFormaPage.perSFRETaxes.should("have.text", taxesToBe);
        return this;
    }

    verifyPerUnitRETaxes(taxesToBe: string): this {
        proFormaPage.perUnitTaxes.should("have.text", taxesToBe);
        return this;
    }

    verifyRETaxesRow(rowData: BoweryReports.ProFormaAnyIncome): this {
        this.verifyTotalRETaxes(rowData.total)
            .verifyPerSfRETaxes(rowData.perSF)
            .verifyPerUnitRETaxes(rowData.perUnit);
        return this;
    }

    verifyTotalInsurance(textToBe: string): this {
        proFormaPage.totalInsurance.should("have.text", textToBe);
        return this;
    }

    verifyPerSFInsurance(textToBe: string): this {
        proFormaPage.perSFInsurance.should("have.text", textToBe);
        return this;
    }

    verifyPerUnitInsurance(textToBe: string): this {
        proFormaPage.perUnitInsurance.should("have.text", textToBe);
        return this;
    }

    verifyInsuranceRow(rowData: BoweryReports.ProFormaAnyIncome): this {
        this.verifyTotalInsurance(rowData.total)
            .verifyPerSFInsurance(rowData.perSF)
            .verifyPerUnitInsurance(rowData.perUnit);
        return this;
    }

    verifyElectricityTotal(textToBe: string): this {
        proFormaPage.totalElectricity.should("have.text", textToBe);
        return this;
    }

    verifyPerSFElectricity(textToBe: string): this {
        proFormaPage.perSFElectricity.should("have.text", textToBe);
        return this;
    }

    verifyPerUnitElectricity(textToBe: string): this {
        proFormaPage.perUnitElectricity.should("have.text", textToBe);
        return this;
    }

    verifyElectricityRow(rowData: BoweryReports.ProFormaAnyIncome): this {
        this.verifyElectricityTotal(rowData.total)
            .verifyPerSFElectricity(rowData.perSF)
            .verifyPerUnitElectricity(rowData.perUnit);
        return this;
    }

    verifyTotalRepairs(textToBe: string): this {
        proFormaPage.totalRepairs.should("have.text", textToBe);
        return this;
    }

    verifyPerSFRepairs(textToBe: string): this {
        proFormaPage.perSFRepairs.should("have.text", textToBe);
        return this;
    }

    verifyPerUnitRepairs(textToBe: string): this {
        proFormaPage.perUnitRepairs.should("have.text", textToBe);
        return this;
    }

    verifyRepairsRow(rowData: BoweryReports.ProFormaAnyIncome): this {
        this.verifyTotalRepairs(rowData.total)
            .verifyPerSFRepairs(rowData.perSF)
            .verifyPerUnitRepairs(rowData.perUnit);
        return this;
    }

    verifyTotalPayroll(textToBe: string): this {
        proFormaPage.totalPayroll.should("have.text", textToBe);
        return this;
    }

    verifyPerSFPayroll(textToBe: string): this {
        proFormaPage.perSFPayroll.should("have.text", textToBe);
        return this;
    }

    verifyPerUnitPayroll(textToBe: string): this {
        proFormaPage.perUnitPayroll.should("have.text", textToBe);
        return this;
    }

    verifyPayrollRow(rowData: BoweryReports.ProFormaAnyIncome): this {
        this.verifyTotalPayroll(rowData.total)
            .verifyPerSFPayroll(rowData.perSF)
            .verifyPerUnitPayroll(rowData.perUnit);
        return this;
    }

    verifyTotalGeneral(textToBe: string): this {
        proFormaPage.totalGeneral.should("have.text", textToBe);
        return this;
    }

    verifyPerSFGeneral(textToBe: string): this {
        proFormaPage.perSFGeneral.should("have.text", textToBe);
        return this;
    }

    verifyPerUnitGeneral(textToBe: string): this {
        proFormaPage.perUnitGeneral.should("have.text", textToBe);
        return this;
    }

    verifyGeneralRow(rowData: BoweryReports.ProFormaAnyIncome): this {
        this.verifyTotalGeneral(rowData.total)
            .verifyPerSFGeneral(rowData.perSF)
            .verifyPerUnitGeneral(rowData.perUnit);
        return this;
    }

    verifyTotalManagement(textToBe: string): this {
        proFormaPage.totalManagement.should("have.text", textToBe);
        return this;
    }

    verifyPerSFManagement(textToBe: string): this {
        proFormaPage.perSFManagement.should("have.text", textToBe);
        return this;
    }

    verifyPerUnitManagement(textToBe: string): this {
        proFormaPage.perUnitManagement.should("have.text", textToBe);
        return this;
    }

    verifyManagementRow(rowData: BoweryReports.ProFormaAnyIncome): this {
        this.verifyTotalManagement(rowData.total)
            .verifyPerSFManagement(rowData.perSF)
            .verifyPerUnitManagement(rowData.perUnit);
        return this;
    }

    verifyTotalReserves(textToBe: string): this {
        proFormaPage.totalReserves.should("have.text", textToBe);
        return this;
    }

    verifyPerSFReserves(textToBe: string): this {
        proFormaPage.perSFReserves.should("have.text", textToBe);
        return this;
    }

    verifyPerUnitReserves(textToBe: string): this {
        proFormaPage.perUnitReserves.should("have.text", textToBe);
        return this;
    }

    verifyReservesRow(rowData: BoweryReports.ProFormaAnyIncome): this {
        this.verifyTotalReserves(rowData.total)
            .verifyPerSFReserves(rowData.perSF)
            .verifyPerUnitReserves(rowData.perUnit);
        return this;
    }

    verifyTotalToe(textToBe: string): this {
        proFormaPage.totalToe.should("have.text", textToBe);
        return this;
    }

    verifyPerSFToe(textToBe: string): this {
        proFormaPage.perSFToe.should("have.text", textToBe);
        return this;
    }

    verifyPerUnitToe(textToBe: string): this {
        proFormaPage.perUnitToe.should("have.text", textToBe);
        return this;
    }

    verifyToeRow(rowData: BoweryReports.ProFormaAnyIncome): this {
        this.verifyTotalToe(rowData.total)
            .verifyPerSFToe(rowData.perSF)
            .verifyPerUnitToe(rowData.perUnit);
        return this;
    }

    verifyTotalToeNetRe(textToBe: string): this {
        proFormaPage.totalToeNetRe.should("have.text", textToBe);
        return this;
    }

    verifyPerSFToeNetRe(textToBe: string): this {
        proFormaPage.perSFToeNetRe.should("have.text", textToBe);
        return this;
    }

    verifyPerUnitToeNetRe(textToBe: string): this {
        proFormaPage.perUnitToeNetRe.should("have.text", textToBe);
        return this;
    }

    verifyToeNetReRow(rowData: BoweryReports.ProFormaAnyIncome): this {
        this.verifyTotalToeNetRe(rowData.total)
            .verifyPerSFToeNetRe(rowData.perSF)
            .verifyPerUnitToeNetRe(rowData.perUnit);
        return this;
    }

    verifyTotalNetOpIncome(textToBe: string): this {
        proFormaPage.totalNetOpIncome.should("have.text", textToBe);
        return this;
    }

    verifyPerSFNetOpIncome(textToBe: string): this {
        proFormaPage.perSFNetOpIncome.should("have.text", textToBe);
        return this;
    }

    verifyPerUnitNetOpIncome(textToBe: string): this {
        proFormaPage.perUnitNetOpIncome.should("have.text", textToBe);
        return this;
    }

    verifyNetOpIncomeRow(rowData: BoweryReports.ProFormaAnyIncome): this {
        this.verifyTotalNetOpIncome(rowData.total)
            .verifyPerSFNetOpIncome(rowData.perSF)
            .verifyPerUnitNetOpIncome(rowData.perUnit);
        return this;
    }

    verifyOperatingExpenseRatio(textToBe: string): this {
        proFormaPage.operatingExpenseRatio.should("have.text", textToBe);
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

    verifyCustomTotal(totalToBe: string, categoryName: string): this{
        proFormaPage.customTotal(categoryName).should("have.text", totalToBe);
        return this;
    }
    
    verifyFuelTotal(totalToBe: string): this{
        proFormaPage.getFuelTotal.should("have.text", totalToBe);
        return this;
    }

    verifyWaterAndSewerTotal(totalToBe: string): this{
        proFormaPage.getWaterAndSewerTotal.should("have.text", totalToBe);
        return this;
    }

}

export default new ProFormaActions(proFormaPage);