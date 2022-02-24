import capRateCompsActions from "./capRateComps.actions";
import finalValuesReconciliationActions from "./finalValuesReconciliation.actions";
import propertySaleConclusionActions from "./propertySaleConclusion.actions";
import assumptionsConditionsActions from "./assumptionsConditions.actions";
import swotAnalysisActions from "./swotAnalysis.actions";
import highestBestUseActions from "./highestBestUse.actions";
import unitInspectionActions from "./unitInspection.actions";
import scopeActions from "./scope.actions";
import sourceInformationActions from "./sourceInformation.actions";
import capRateDiscussionActions from "./capRateDiscussion.actions";
import insurableReplacementCostActions from "./insurableReplacementCost.actions";

export default {
    CapRateComps: capRateCompsActions,
    FinalValuesReconciliation: finalValuesReconciliationActions,
    PropertySalesConclusion: propertySaleConclusionActions,
    AssumptionsConditions: assumptionsConditionsActions,
    SWOTAnalysis: swotAnalysisActions,
    HighestBestUse: highestBestUseActions,
    UnitInspection: unitInspectionActions,
    Scope: scopeActions,
    SourceInformation: sourceInformationActions,
    CapRateDiscussion: capRateDiscussionActions,
    InsurableReplacementCost: insurableReplacementCostActions
};