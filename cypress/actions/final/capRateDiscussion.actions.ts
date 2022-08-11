import capRateDiscussionPage from "../../pages/final/capRateDiscussion.page";
import BaseActionsExt from "../base/base.actions.ext";

class CapRateDiscussionActions extends BaseActionsExt<typeof capRateDiscussionPage> {

    verifyCapRateTable(table: Readonly<{min: string, max: string, average: string}>): CapRateDiscussionActions {
        capRateDiscussionPage.capRateCompsMin.should("have.text", table.min);
        capRateDiscussionPage.capRateCompsMax.should("have.text", table.max);
        capRateDiscussionPage.capRateCompsAverage.should("have.text", table.average);
        return this;
    }

    verifyPwCRow(row: Readonly<{min: string, max: string, average: string}>): CapRateDiscussionActions {
        capRateDiscussionPage.pwcMin.should("have.text", row.min);
        capRateDiscussionPage.pwcAverage.should("have.text", row.average);
        capRateDiscussionPage.pwcMax.should("have.text", row.max);
        return this;
    }

    verifySitusRow(row: Readonly<{min: string, max: string, average: string}>): CapRateDiscussionActions {
        capRateDiscussionPage.situsMin.should("have.text", row.min);
        capRateDiscussionPage.situsAverage.should("have.text", row.average);
        capRateDiscussionPage.situsMax.should("have.text", row.max);
        return this;
    }

    clickCapRateCompsTab(): CapRateDiscussionActions {
        capRateDiscussionPage.capRateCompsTab.click();
        return this;
    }

    verifyCapRateCompsTable(table: Readonly<{income: string, propConditions: string, 
        location: string}>): CapRateDiscussionActions {
        capRateDiscussionPage.incomePotentialCell.should("have.text", table.income);
        capRateDiscussionPage.propertyConditionsCell.should("have.text", table.propConditions);
        capRateDiscussionPage.locationCell.should("have.text", table.location);
        return this;
    }

    clickIncomeSpikesTab(): CapRateDiscussionActions {
        capRateDiscussionPage.incomeSpikesTab.click();
        return this;
    }

    verifyIncomeSpikesTable(table: Readonly<{capRate: string, occupancy: string, 
        percentageMarketRate: string, condition: string}>): CapRateDiscussionActions {
        capRateDiscussionPage.concludedCapRateCell.should("have.text", table.capRate);
        capRateDiscussionPage.occupancyCell.should("have.text", table.occupancy);
        capRateDiscussionPage.percentageMarketRateCell.should("have.text", table.percentageMarketRate);
        capRateDiscussionPage.propertyConditionIncomeSpikeCell.should("have.text", table.condition);
        return this;
    }

    checkIncomeSpikesRadios(radios: Readonly<{incomePotential: string,
        marketConditions: string, flowRisk: string}>): CapRateDiscussionActions {
        this.checkSubjectIncomePotentialRadio(radios.incomePotential)
            .checkCurrentMarketConditionsRadio(radios.marketConditions)
            .checkCashFlowRiskRadio(radios.flowRisk);
        return this;
    }

    checkSubjectIncomePotentialRadio(value: string): CapRateDiscussionActions {
        capRateDiscussionPage.subjectIncomePotentialRadio.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    checkCurrentMarketConditionsRadio(value: string): CapRateDiscussionActions {
        capRateDiscussionPage.currentMarketConditionsRadio.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    checkCashFlowRiskRadio(value: string): CapRateDiscussionActions {
        capRateDiscussionPage.cashFlowRiskRadio.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    verifyRadioIsChecked(value: string): CapRateDiscussionActions {
        capRateDiscussionPage.getElementToCheckRadio(value).should("exist");
        return this;
    }

}

export default new CapRateDiscussionActions(capRateDiscussionPage);