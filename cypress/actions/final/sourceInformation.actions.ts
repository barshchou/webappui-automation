import sourceInformationPage from "../../pages/final/sourceInformation.page";
import BaseActionsExt from "../base/base.actions.ext";

class SourceInformationActions extends BaseActionsExt<typeof sourceInformationPage> {

    get siteSizeDefaultSources() { return [ "Public Record" ]; }

    get excessSurplusLandDefaultSources() { return [ "Tax Map" ]; }

    get grossSizeUnitsDefaultSources() { return [ "Public Record" ]; }

    get residentialSFDefaultSources() { return [ "Appraiser's Estimate", "Inspection" ]; }

    get numberOfBuildingsDefaultSources() { return [ "Inspection" ]; }

    get amenitiesDefaultSources() { return [ "Inspection" ]; }

    get deferredMaintenanceDefaultSources() { return [ "Inspection" ]; }

    get areaAnalysisDefaultSources() { return [ "Bureau of Labor Statistics" ]; }

    get incomeDataDefaultSources() { return [ "Owner", "Market Forecast" ]; }

    get expenseDataDefaultSources() { return [ "Owner", "Expense Comparables" ]; }

    get architecturalPlansDefaultSources() { return [ "Owner" ]; }

    get comparableRentalDataDefaultSources() { return [ "CoStar", "Primary Source" ]; }

    get comparableSalesDataDefaultSources() { return [ "CoStar", "Public Record", "Primary Source" ]; }

    private verifySourceLabelText(sourceLabel: JQuery<HTMLElement>, textToBe: string) {
        expect(sourceLabel.text()).to.eq(textToBe);
    }

    verifySiteSizeSources(sources = this.siteSizeDefaultSources): SourceInformationActions {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.siteSizeSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    verifyExcessSurplusLandSources(sources = this.excessSurplusLandDefaultSources): SourceInformationActions {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.excessSurplusLandSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    verifyGrossSizeUnitsSources(sources = this.grossSizeUnitsDefaultSources): SourceInformationActions {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.grossSizeUnitsSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    verifyResidentialSFSources(sources = this.residentialSFDefaultSources): SourceInformationActions {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.residentialSFSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    verifyNumberOfBuildingsSources(sources = this.numberOfBuildingsDefaultSources): SourceInformationActions {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.numberOfBuildingsSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    verifyAmenitiesSources(sources = this.amenitiesDefaultSources): SourceInformationActions {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.amenitiesSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    verifyDeferredMaintenanceSources(sources = this.deferredMaintenanceDefaultSources): SourceInformationActions {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.deferredMaintenanceSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    verifyAreaAnalysisSources(sources = this.areaAnalysisDefaultSources): SourceInformationActions {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.areaAnalysisSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    verifyIncomeDataSources(sources = this.incomeDataDefaultSources): SourceInformationActions {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.incomeDataSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    verifyExpenseDataSources(sources = this.expenseDataDefaultSources): SourceInformationActions {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.expenseDataSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    verifyArchitecturalPlansSources(sources = this.architecturalPlansDefaultSources): SourceInformationActions {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.architecturalPlansSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    verifyComparableRentalDataSources(sources = this.comparableRentalDataDefaultSources): SourceInformationActions {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.comparableRentalDataSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    verifyComparableSalesDataSources(sources = this.comparableSalesDataDefaultSources): SourceInformationActions {
        sources = Array.isArray(sources) ? sources : Array.of(sources);
        sourceInformationPage.comparableSalesDataSources.each((sourceElem, i) => {
            this.verifySourceLabelText(sourceElem, sources[i]);
        });
        return this;
    }

    enterDataSourcesDescriptionExportTextBox(textToType: string): SourceInformationActions {
        sourceInformationPage.dataSourcesDescriptionExportTextBox.type(textToType);
        return this;
    }
}

export default new SourceInformationActions(sourceInformationPage);