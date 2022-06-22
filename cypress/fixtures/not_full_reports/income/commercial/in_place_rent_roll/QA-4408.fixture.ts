import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4408", {
        templateValue: Enums.TEMPLATE_TYPE.notFreddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    });
};

const _numberOfCommercialUnits = 5;
const _leaseMixedFixture: BoweryReports.LeaseStatus[] = [ "Occupied", "Vacant", "Vacant", "Occupied", "Occupied" ];
const _leaseAllOccupiedFixture: BoweryReports.LeaseStatus[] = [ "Occupied", "Occupied", "Occupied", "Occupied", "Occupied" ];
const _leaseAllVacantFixture: BoweryReports.LeaseStatus[] = [ "Vacant", "Vacant", "Vacant", "Vacant", "Vacant" ];

const _allVacantFixture = () => {
    return {
        numberOfCommercialUnits: _numberOfCommercialUnits,
        leases: _leaseAllVacantFixture,
        commentaryToBe: "The subject currently contains no occupied commercial units. " +
            "We will forecast market rent and market lease terms for the vacant units based on the comparables and our " +
            "research of the subject's market."
    };
};

const _allOccupiedFixture = () => {
    return {
        numberOfCommercialUnits: _numberOfCommercialUnits,
        leases: _leaseAllOccupiedFixture,
        commentaryToBe: "The subject currently contains 5 commercial units. The leases are summarized below."
    };
};

const _mixedFixture = () => {
    return {
        numberOfCommercialUnits: _numberOfCommercialUnits,
        leases: _leaseMixedFixture,
        commentaryToBe: "The subject currently contains 5 commercial units. " +
            "Units 1, 4, and 5 are occupied, while units 2 and 3 are currently vacant. The occupied unit leases are summarized below."
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    leaseMixedFixture: _leaseMixedFixture,
    leaseAllOccupiedFixture: _leaseAllOccupiedFixture,
    leaseAllVacantFixture: _leaseAllVacantFixture,
    allVacantFixture: _allVacantFixture(),
    allOccupiedFixture: _allOccupiedFixture(),
    mixedFixture: _mixedFixture(),
    numberOfCommercialUnits: _numberOfCommercialUnits
};