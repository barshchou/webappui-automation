import { BoweryAutomation } from "../../types/boweryAutomation.type";

export const createPayload = (reportCreationData: BoweryAutomation.ReportCreationData, userID: string) => {
    return {
        APPBBL: 1009620100,
        APPDate: "12/29/2006",
        Address: "462 1 AVENUE",
        AreaSource: 2,
        AssessLand: 140865750,
        AssessTot: 266959350,
        BBL: 1009620100,
        BldgArea: 2124441,
        BldgClass: "I1",
        BldgDepth: 201,
        BldgFront: 197,
        Block: 962,
        BoroCode: 1,
        Borough: "MN",
        BsmtCode: 0,
        BuiltFAR: 2.82,
        CB2010: 1002,
        CD: 106,
        CT2010: 62,
        ComArea: 2124441,
        CommFAR: 0,
        CondoNo: null,
        Council: 4,
        EDesigNum: "",
        Easements: 0,
        ExemptTot: 266959350,
        Ext: "N",
        FIRM07Flag: 1,
        FacilFAR: 6.5,
        FactryArea: 0,
        FireComp: "E016",
        GarageArea: 0,
        HealthArea: 6000,
        HealthCenterDistrict: 14,
        HistDist: "",
        IrrLotCode: "Y",
        LandUse: 8,
        Landmark: "",
        Latitude: 40.7387469,
        Longitude: -73.9753428,
        Lot: 100,
        LotArea: 753175,
        LotDepth: 779.58,
        LotFront: 1287.6,
        LotType: 3,
        LtdHeight: "",
        Notes: "",
        NumBldgs: 6,
        NumFloors: 17,
        OfficeArea: 2124441,
        OtherArea: 0,
        Overlay1: "C2-5",
        Overlay2: "",
        OwnerName: "NYC HEALTH AND HOSPITALS CORPORATION",
        OwnerType: "C",
        PFIRM15Flag: 1,
        PLUTOMapID: 1,
        PolicePrct: 13,
        ProxCode: 0,
        ResArea: 0,
        ResidFAR: 6.02,
        RetailArea: 0,
        SPDist1: "",
        SPDist2: "",
        SPDist3: "",
        Sanborn: "104 025",
        SanitBoro: 1,
        SanitDistrict: 6,
        SanitSub: "1B",
        SchoolDist: 2,
        SplitZone: "N",
        StrgeArea: 0,
        TaxMap: 10310,
        Tract2010: 62,
        UnitsRes: 0,
        UnitsTotal: 1,
        Version: "21v1",
        XCoord: 991083,
        YCoord: 208423,
        YearAlter1: 0,
        YearAlter2: 0,
        YearBuilt: 1910,
        ZMCode: "Y",
        ZipCode: 10016,
        ZoneDist1: "R8",
        ZoneDist2: "",
        ZoneDist3: "",
        ZoneDist4: "",
        ZoneMap: "8d",
        address: "462 1 Avenue",
        block: 962,
        borough: "Manhattan",
        city: "New York",
        coords: {
            latitude: 40.74727,
            longitude: -73.9800645
        },
        floorCount: 17,
        fullAddress: "462 1 Avenue, New York, New York",
        fullAddressWithZip: "462 1 Avenue, New York, New York 10016",
        gba: 2124441,
        hasElevator: false,
        incomeType: reportCreationData.incomeValue,
        location: {
            addressInfo: {
                address: "462 1st Avenue, New York, USA",
                borough: {
                    long: "Manhattan",
                    short: "Manhattan"
                },
                city: "Manhattan",
                country: "US",
                county: "New York County",
                locationIdentifier: "New York",
                route: {
                    long: "1st Avenue",
                    short: "1st Ave."
                },
                shortAddress: "462 1st Ave..",
                state: "NY",
                streetName: "1st Ave..",
                streetNumber: "462",
                zip: "10016"
            },
            coords: {
                latitude: 40.7397258,
                longitude: -73.976201
            },
            googlePlace: "462 1st Avenue, New York, USA"
        },
        locationIdentifier: "New York",
        lot: 100,
        neighborhood: "Kips Bay",
        owner: "Nyc Health And Hospitals Corporation",
        reportNumber: reportCreationData.reportNumber,
        saleInfoLink: "http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=1&block=962&lot=100",
        salesHistory: [],
        score: 2,
        search: {
            location: {
                addressInfo: {
                    address: "462 1st Avenue, New York, USA",
                    borough: {
                        long: "Manhattan",
                        short: "Manhattan"
                    },
                    city: "Manhattan",
                    country: "US",
                    county: "New York County",
                    locationIdentifier: "New York",
                    route: {
                        long: "1st Avenue",
                        short: "1st Ave."
                    },
                    shortAddress: "462 1st Ave..",
                    state: "NY",
                    streetName: "1st Ave..",
                    streetNumber: "462",
                    zip: "10016"
                },
                coords: {
                    latitude: 40.7397258,
                    longitude: -73.976201
                },
                googlePlace: "462 1st Avenue, New York, USA"
            },
            locationIdentifier: "New York"
        },
        settings: {
            incomeType: reportCreationData.incomeValue,
            isBlocks: false,
            pullExternalData: reportCreationData.isSalesForcePull,
            templateType: reportCreationData.templateValue,
            valueConclusionType: reportCreationData.conclusionValue
        },
        siteArea: 753175,
        siteAreaUnit: "sf",
        state: "New York",
        taxInfoLink: "https://zola.planning.nyc.gov/lot/1/962/100",
        templateType: reportCreationData.templateValue,
        type: "commercial",
        valid: true,
        valueConclusionType: reportCreationData.conclusionValue,
        yearBuilt: 1910,
        zip: 10016,
        _id: userID
    };
};