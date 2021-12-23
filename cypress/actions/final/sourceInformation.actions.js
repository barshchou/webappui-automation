import BaseActions from "../base/base.actions";
import sourceInformationPage from "../../pages/final/sourceInformation.page";

class SourceInformationActions extends BaseActions {

    get siteSizeDefaultSources() {return "Public Record";}
    get excessSurplusLandDefaultSources() {return "Tax Map";}
    get grossSizeUnitsDefaultSources() {return "Public Record";}
    get residentialSFDefaultSources() {return ["Appraiser's Estimate", "Inspection"];}
    get numberOfBuildingsDefaultSources() {return "Inspection";}
    get amenitiesDefaultSources() {return "Inspection";}
    get deferredMaintenanceDefaultSources() {return "Inspection";}
    get areaAnalysisDefaultSources() {return "Bureau of Labor Statistics";}
    get incomeDataDefaultSources() {return ["Owner", "Market Forecast"];}
    get expenseDataDefaultSources() {return ["Owner", "Expense Comparables"];}
    get architecturalPlansDefaultSources() {return "Owner";}
    get comparableRentalDataDefaultSources() {return ["CoStar", "Primary Source"];}
    get comparableSalesDataDefaultSources() {return ["CoStar", "Public Record", "Primary Source"];}

    /**
     * @param {JQuery<HTMLElement>} sourceLabel
     * @param {string} textToBe
     * */
    verifySourceLabelText(sourceLabel, textToBe) {
        expect(sourceLabel.text()).to.eq(textToBe);
    }

    /**
     *
     * @param {string, Array<string>} sources
     * @returns {SourceInformationActions}
     */
    verifySiteSizeSources(sources = this.siteSizeDefaultSources) {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.siteSizeSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    /**
     *
     * @param {string, Array<string>} sources
     * @returns {SourceInformationActions}
     */
    verifyExcessSurplusLandSources(sources = this.excessSurplusLandDefaultSources) {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.excessSurplusLandSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    /**
     *
     * @param {string, Array<string>} sources
     * @returns {SourceInformationActions}
     */
    verifyGrossSizeUnitsSources(sources = this.grossSizeUnitsDefaultSources) {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.grossSizeUnitsSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    /**
     *
     * @param {string, Array<string>} sources
     * @returns {SourceInformationActions}
     */
    verifyResidentialSFSources(sources = this.residentialSFDefaultSources) {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.residentialSFSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    /**
     *
     * @param {string, Array<string>} sources
     * @returns {SourceInformationActions}
     */
    verifyNumberOfBuildingsSources(sources = this.numberOfBuildingsDefaultSources) {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.numberOfBuildingsSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    /**
     *
     * @param {string, Array<string>} sources
     * @returns {SourceInformationActions}
     */
    verifyAmenitiesSources(sources = this.amenitiesDefaultSources) {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.amenitiesSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    /**
     *
     * @param {string, Array<string>} sources
     * @returns {SourceInformationActions}
     */
    verifyDeferredMaintenanceSources(sources = this.deferredMaintenanceDefaultSources) {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.deferredMaintenanceSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    /**
     *
     * @param {string, Array<string>} sources
     * @returns {SourceInformationActions}
     */
    verifyAreaAnalysisSources(sources = this.areaAnalysisDefaultSources) {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.areaAnalysisSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    /**
     *
     * @param {string, Array<string>} sources
     * @returns {SourceInformationActions}
     */
    verifyIncomeDataSources(sources = this.incomeDataDefaultSources) {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.incomeDataSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    /**
     *
     * @param {string, Array<string>} sources
     * @returns {SourceInformationActions}
     */
    verifyExpenseDataSources(sources = this.expenseDataDefaultSources) {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.expenseDataSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    /**
     *
     * @param {string, Array<string>} sources
     * @returns {SourceInformationActions}
     */
    verifyArchitecturalPlansSources(sources = this.architecturalPlansDefaultSources) {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.architecturalPlansSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    /**
     *
     * @param {string, Array<string>} sources
     * @returns {SourceInformationActions}
     */
    verifyComparableRentalDataSources(sources = this.comparableRentalDataDefaultSources) {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.comparableRentalDataSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    /**
     *
     * @param {string, Array<string>} sources
     * @returns {SourceInformationActions}
     */
    verifyComparableSalesDataSources(sources = this.comparableSalesDataDefaultSources) {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.comparableSalesDataSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

}

export default new SourceInformationActions();