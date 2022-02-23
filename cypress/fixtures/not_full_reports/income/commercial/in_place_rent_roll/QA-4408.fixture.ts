import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.setAddress().setReportNumber("4408")
        .setTemplateValue(Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE);
};

const noVacantFewUnitsFixture = () => {
    return {
        numberOfCommercialUnits: 2,
        leases: ["Occupied", "Occupied"],
        commentaryToBe: "The subject currently contains 2 commercial units. The leases are summarized below."
    };
};

const oneVacantFixture = () => {
    return {
        numberOfCommercialUnits: 2,
        leases: ["Occupied", "Vacant"],
        commentaryToBe: "The subject currently contains 2 commercial units. " +
            "Unit 1 is occupied, while unit 2 is currently vacant. The occupied unit lease is summarized below."
    };
};

const allVacantFixture = () => {
    return {
        numberOfCommercialUnits: 2,
        leases: ["Vacant", "Vacant"],
        commentaryToBe: "The subject currently contains no occupied commercial units. " +
            "We will forecast market rent and market lease terms for the vacant units based on the comparables and our " +
            "research of the subject's market."
    };
};

const oneUnitFixture = () => {
    return {
        numberOfCommercialUnits: 1,
        lease: "Occupied",
        commentaryToBe: "The subject currently contains 1 commercial unit. The lease is summarized below."
    };
};

const fewVacantFewOccupiedFixture = () => {
    return {
        numberOfCommercialUnits: 5,
        leases: ["Occupied", "Vacant", "Vacant", "Occupied", "Occupied"],
        commentaryToBe: "The subject currently contains 5 commercial units. " +
            "Units 1, 4, and 5 are occupied, while units 2 and 3 are currently vacant. The occupied unit leases are summarized below."
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    noVacantData: noVacantFewUnitsFixture(),
    oneVacantData: Object.freeze(oneVacantFixture()),
    allVacantData: Object.freeze(allVacantFixture()),
    oneUnitData: Object.freeze(oneUnitFixture()),
    fewVacantFewOccupiedData: Object.freeze(fewVacantFewOccupiedFixture())
};