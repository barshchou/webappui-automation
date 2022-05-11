import ReportDataCreator from "../../../data_creator/reportData.creator";

const _linkedChipsDropdownOptions: [string, string][] = [
    ["Bui", "Building Name"],
    ["Gro", "Gross Building Area"],
    ["Year", "Year Built"],
    ["Buil","Building Name"],
    ["Prop","Property Type"],
    ["Curr","Current Residential Unit Count"],
    ["Curr","Current Commercial Unit Count"],
    ["Stree","Street Address"],
    ["Stree","Street Name"],
    ["Site","Site Area"],
    ["Bloc","Block"],
    ["Lo","Lot"],
    ["Conclu","Concluded Cap Rate"],
    ["Zon","Zone(s)"],
    ["Curre","Current Condition"],
    ["As","As Stabilized Condition"] ,
    ["As", "As Complete Residential Unit Count"],
    ["As","As Complete Commercial Unit Count"],
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4642", { conclusionValue: "AS_COMPLETE" }),
    linkedChipsDropdownOptions: _linkedChipsDropdownOptions
};