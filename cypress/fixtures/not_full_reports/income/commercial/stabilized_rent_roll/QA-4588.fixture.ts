import enums from "../../../../../enums/enums";
import reportDataCreator from "../../../../data_creator/reportData.creator";

const _numberOfCommercialUnits = 3;
const _leaseStatusMixed: BoweryReports.LeaseStatus[] = [ "Occupied", "Vacant", "Occupied" ];
const _leaseStatusVacant: BoweryReports.LeaseStatus[] = [ "Vacant", "Vacant", "Vacant"  ];
const _leaseStatusOccupied: BoweryReports.LeaseStatus[] = [ "Occupied", "Occupied", "Occupied" ];

const _commentaryAsIsMixed = "The subject contains "+ _numberOfCommercialUnits +" commercial units. Commercial unit 2 is currently vacant. "+
                            "We have forecasted market rent and market lease terms for the vacant unit based on the "+
                            "occupied unit leases, the comparables above, and our research of the subject's market. "+
                            "The forecasted lease term is summarized below.";

const _commentaryAsIsVacant = "The subject contains "+ _numberOfCommercialUnits +" commercial units. Commercial units 1, 2, and 3 "+
                            "are currently vacant. We have forecasted market rent and market lease terms for the vacant units based "+
                            "on the occupied unit leases, the comparables above, and our research of the subject's market. "+
                            "The forecasted lease terms are summarized below.";

const _commentartAsIsOccupied = "The subject contains "+ _numberOfCommercialUnits +" commercial units. The terms are summarized below.";

const _commentaryAsStabilizedMixed = "Upon completion of the renovations, the subject will contain [number #] commercial units. "+
                                    "Commercial unit [number #] is currently vacant. We have forecasted market rent and market lease "+
                                    "terms for the vacant unit based on the occupied unit lease, the comparables above, and our research "+
                                    "of the subject's market. The forecasted lease term is summarized below.";

const _commentaryAsStabilizedVacant = "Upon completion of the renovations, the subject will contain [number #] commercial units. "+
                                    "Commercial units [number #] and [number #] are currently vacant. We have forecasted market rent "+
                                    "and market lease terms for the vacant units based on the occupied unit leases, the comparables above, "+
                                    "and our research of the subject's market. The forecasted lease terms are summarized below.";

const _commentaryAsStabilizedOccupied = "Upon completion of the renovations, the subject will contain [number #] commercial units. "+
                                        "The terms are summarized below.";

const _commentaryAsCompleteMixed = "Upon completion of the renovations, the subject will contain [number #] commercial units. "+
                                    "Commercial unit "+ _numberOfCommercialUnits +" is currently vacant. We have forecasted market rent and market lease terms for "+
                                    "the vacant unit based on the occupied unit lease, the comparables above, and our research of the "+
                                    "subject's market. The forecasted lease term is summarized below.";

const _commentaryAsCompleteVacant = "Upon completion of the renovations, the subject will contain [number #] commercial units. "+
                                    "Commercial units [number #] and [number #] are currently vacant. We have forecasted market rent and "+
                                    "market lease terms for the vacant units based on the occupied unit leases, the comparables above, and our research of the subject's market. The forecasted lease terms are summarized below.";

const _commentaryAsCompleteOccupied = "Upon completion of the renovations, the subject will contain [number #] commercial units. "+
                                    "The terms are summarized below.";

export default {
    reportCreationDataAsIs: reportDataCreator.getReportData("4588", {
        incomeValue: enums.INCOME_TYPE.BOTH,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_IS
    }),
    reportCreationDataAsStabilized: reportDataCreator.getReportData("4588", {
        incomeValue: enums.INCOME_TYPE.BOTH,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED
    }),
    reportCreationDataAsComplete: reportDataCreator.getReportData("4588", {
        incomeValue: enums.INCOME_TYPE.BOTH,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }),
    leaseStatusMixed: _leaseStatusMixed,
    leaseStatusVacant: _leaseStatusVacant,
    leaseStatusOccupied: _leaseStatusOccupied,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    commentaryAsIsMixed: _commentaryAsIsMixed,
    commentaryAsIsVacant: _commentaryAsIsVacant,
    commentaryAsIsOccupied: _commentartAsIsOccupied,
    commentaryAsStabilizedMixed: _commentaryAsStabilizedMixed,
    commentaryAsStabilizedVacant: _commentaryAsStabilizedVacant,
    commentaryAsStabilizedOccupied: _commentaryAsStabilizedOccupied,
    commentaryAsCompleteMixed: _commentaryAsCompleteMixed,
    commentaryAsCompleteVacant: _commentaryAsCompleteVacant,
    commentaryAsCompleteOccupied: _commentaryAsCompleteOccupied
};