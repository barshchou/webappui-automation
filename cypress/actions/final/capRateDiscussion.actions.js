import BaseActions from "../base/base.actions";
import capRateDiscussionPage from "../../pages/final/capRateDiscussion.page";

class CapRateDiscussionActions extends BaseActions {

    /**
     * @param {Readonly<{min: string, max: string, average: string}>} table
     * @returns {CapRateDiscussionActions}
     * */
    verifyCapRateTable(table) {
        capRateDiscussionPage.capRateCompsMin.should("have.text", table.min);
        capRateDiscussionPage.capRateCompsMax.should("have.text", table.max);
        capRateDiscussionPage.capRateCompsAverage.should("have.text", table.average);
        return this;
    }

    /**
     * @param {Readonly<{min: string, max: string, average: string}>} row
     * @returns {CapRateDiscussionActions}
     */
    verifyPwCRow(row) {
        capRateDiscussionPage.pwcMin.should("have.text", row.min);
        capRateDiscussionPage.pwcAverage.should("have.text", row.average);
        capRateDiscussionPage.pwcMax.should("have.text", row.max);
        return this;
    }

    /**
     * @param {Readonly<{min: string, max: string, average: string}>} row
     * @returns {CapRateDiscussionActions}
     */
    verifySitusRow(row) {
        capRateDiscussionPage.situsMin.should("have.text", row.min);
        capRateDiscussionPage.situsAverage.should("have.text", row.average);
        capRateDiscussionPage.situsMax.should("have.text", row.max);
        return this;
    }

    /**
     *
     * @returns {CapRateDiscussionActions}
     */
    clickCapRateCompsTab() {
        capRateDiscussionPage.capRateCompsTab.click();
        return this;
    }

    /**
     * @param {Readonly<{income: string, propConditions: string, location: string}>} table
     * @returns {CapRateDiscussionActions}
     */
    verifyCapRateCompsTable(table) {
        capRateDiscussionPage.incomePotentialCell.should("have.text", table.income);
        capRateDiscussionPage.propertyConditionsCell.should("have.text", table.propConditions);
        capRateDiscussionPage.locationCell.should("have.text", table.location);
        return this;
    }

    /**
     *
     * @returns {CapRateDiscussionActions}
     */
    clickIncomeSpikesTab() {
        capRateDiscussionPage.incomeSpikesTab.click();
        return this;
    }

    /**
     * @param {Readonly<{capRate: string, occupancy: string, percentageMarketRate: string, condition: string}>} table
     * @returns {CapRateDiscussionActions}
     */
    verifyIncomeSpikesTable(table) {
        capRateDiscussionPage.concludedCapRateCell.should("have.text", table.capRate);
        capRateDiscussionPage.occupancyCell.should("have.text", table.occupancy);
        capRateDiscussionPage.percentageMarketRateCell.should("have.text", table.percentageMarketRate);
        capRateDiscussionPage.propertyConditionIncomeSpikeCell.should("have.text", table.condition);
        return this;
    }

    /**
     * @param {Readonly<{incomePotential: string, marketConditions: string, flowRisk: string}>} radios
     * @returns {CapRateDiscussionActions}
     */
    checkIncomeSpikesRadios(radios) {
        this.checkSubjectIncomePotentialRadio(radios.incomePotential)
            .checkCurrentMarketConditionsRadio(radios.marketConditions)
            .checkCashFlowRiskRadio(radios.flowRisk);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {CapRateDiscussionActions}
     */
    checkSubjectIncomePotentialRadio(value) {
        capRateDiscussionPage.subjectIncomePotentialRadio.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {CapRateDiscussionActions}
     */
    checkCurrentMarketConditionsRadio(value) {
        capRateDiscussionPage.currentMarketConditionsRadio.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {CapRateDiscussionActions}
     */
    checkCashFlowRiskRadio(value) {
        capRateDiscussionPage.cashFlowRiskRadio.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {CapRateDiscussionActions}
     */
    verifyRadioIsChecked(value) {
        capRateDiscussionPage.getElementToCheckRadio(value).should("exist");
        return this;
    }

}

export default new CapRateDiscussionActions();