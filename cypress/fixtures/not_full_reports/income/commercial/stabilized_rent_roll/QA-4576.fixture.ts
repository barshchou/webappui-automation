import ReportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    snapshotNames:{
        stabilizedRRPanel:"StabilizedRentRoll_Panel",
        stabilizedRRPanel_severalUnits:"StabilizedRentRoll_Panel_Several_Units",
        stabilizedRRPanel_severalUnits_compGroups:"stabilizedRRPanel_severalUnits_compGroups"
    },
    reportCreationData: ReportDataCreator.getReportData("4576"),
    numberOfCommercialUnits: 2,
    listOfUnitsSF: [1000, 2000],
    groupName: "Use",
    useRadios: ["retail", "office"],
    useTexts: ["Retail", "Office"],
    leaseStatuses: ["Vacant", "Occupied"],
    tenantNames: ["vacant name", "test name"],
    rentsPsf: [100, 120],
    annualRent: "$240,000.00",
    monthlyRent: "$20,000.00",
    newTenantName: "new test name",
    comparableFirst: {
        address: "200 West 78 Street",
        sizeAdjustment: 20,
        conditionAdjustment: -30,
        otherAdjustment: 40,
        otherNewAdjustment: -20
    },
    comparableSecond: {
        address: "146-34 45 Avenue",
        sizeAdjustment: 40,
        conditionAdjustment: -10,
        otherAdjustment: -50,
        otherNewAdjustment: 0
    },
    wrongFormatLeaseDate: "25/45/3000",
    occupiedLease: "Occupied",
    vacantLease: "Vacant",
    compGroupName: ["Group1", "Group2"]
};