import BaseActions from "../base/base.actions";
import capRateDiscussionPage from "../../pages/final/capRateDiscussion.page";

class CapRateDiscussionActions extends BaseActions {

    /**
     * @param {string} table.min
     * @param {string} table.max
     * @param {string} table.average
     * */
    verifyCapRateTable(table) {
        capRateDiscussionPage.capRateCompsMin.should("have.text", table.min);
        capRateDiscussionPage.capRateCompsMax.should("have.text", table.max);
        capRateDiscussionPage.capRateCompsAverage.should("have.text", table.average);
        return this;
    }

    /**
     * @param {string} row.min
     * @param {string} row.average
     * @param {string} row.max
     */
    verifyPwCRow(row) {
        capRateDiscussionPage.pwcMin.should("have.text", row.min);
        capRateDiscussionPage.pwcAverage.should("have.text", row.average);
        capRateDiscussionPage.pwcMax.should("have.text", row.max);
        return this;
    }

    /**
     * @param {string} row.min
     * @param {string} row.average
     * @param {string} row.max
     */
    verifySitusRow(row) {
        capRateDiscussionPage.situsMin.should("have.text", row.min);
        capRateDiscussionPage.situsAverage.should("have.text", row.average);
        capRateDiscussionPage.situsMax.should("have.text", row.max);
        return this;
    }

    clickCapRateCompsTab() {
        capRateDiscussionPage.capRateCompsTab.click();
        return this;
    }

    /**
     *
     * @param {string} table.income
     * @param {string} table.propConditions
     * @param {string} table.location
     */
    verifyCapRateCompsTable(table) {
        capRateDiscussionPage.incomePotentialCell.should("have.text", table.income);
        capRateDiscussionPage.propertyConditionsCell.should("have.text", table.propConditions);
        capRateDiscussionPage.locationCell.should("have.text", table.location);
        return this;
    }

    clickIncomeSpikesTab() {
        capRateDiscussionPage.incomeSpikesTab.click();
        return this;
    }

    /**
     * @param {string} table.capRate
     * @param {string} table.occupancy
     * @param {string} table.percentageMarketRate
     * @param {string} table.condition
     */
    verifyIncomeSpikesTable(table) {
        capRateDiscussionPage.concludedCapRateCell.should("have.text", table.capRate);
        capRateDiscussionPage.occupancyCell.should("have.text", table.occupancy);
        capRateDiscussionPage.percentageMarketRateCell.should("have.text", table.percentageMarketRate);
        capRateDiscussionPage.propertyConditionIncomeSpikeCell.should("have.text", table.condition);
        return this;
    }

    /**
     *
     * @param {string} radios.incomePotential
     * @param {string} radios.marketConditions
     * @param {string} radios.flowRisk
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
     */
    checkSubjectIncomePotentialRadio(value) {
        capRateDiscussionPage.subjectIncomePotentialRadio.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     */
    checkCurrentMarketConditionsRadio(value) {
        capRateDiscussionPage.currentMarketConditionsRadio.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     */
    checkCashFlowRiskRadio(value) {
        capRateDiscussionPage.cashFlowRiskRadio.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     */
    verifyRadioIsChecked(value) {
        capRateDiscussionPage.getElementToCheckRadio(value).should("exist");
        return this;
    }

}

export default new CapRateDiscussionActions();