import { getTodayDateString, getYearFromDate } from "../../../../utils/date.utils";
import Enums from "../../../enums/enums";
import { BoweryAutomation } from "../../../types/boweryAutomation.type";
import { BoweryReports } from "../../../types/boweryReports.type";

const reportCreationFixture = (): BoweryAutomation.ReportCreationData => {
    return {
        state: "Other",
        address: "8524 South Oglesby Avenue",
        identifierType: "PIN",
        identifier: "20-36-420-020-0000",
        reportNumber: "Full Report Test Automation",
        isSalesForcePull: false,
        templateValue: Enums.TEMPLATE_TYPE.notFreddieMac,
        incomeValue: Enums.INCOME_TYPE.residential,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    };
};

const keyInfoPurposeFixture = () => {
    return {
        purposeValue: "Loan underwriting",
        interestAppraised: {
            asIsMarket: "Leased Fee Interest",
            asComplete: "Leased Fee Interest",
            asStabilized: "Leased Fee Interest"
        }
    };
};

const keyInfoEngagementFixture = () => {
    return {
        _dueDateFixture,
        _valuationDateFixture,
        engagementFileName: "full_reports/full_bowery_multifamily_as_complete/test_engagement.pdf",
    };
};

const clientFixture = () => {
    return {
        clientName: "Gerardo  Jorge"
    };
};

const siteDetailsFixture = () => {
    return {
        censusTract: "4605.00",
        buildingDescriptor: "Building",
        streetAddress: "8524 S Oglesby Ave.",
        streetName: "S Oglesby Ave.",
        identifierType: reportCreationFixture().identifierType,
        identifier: reportCreationFixture().identifier,
        yearBuilt: 1933,
        siteArea: 6250
    };
};

const asCompleteBuildingDescriptionFixture = () => {
    return {
        grossArea: 4732,
        numberOfUnits: 6,
        floorsNumber: 2,
        asCompleteExportText: "The purchaser plans to renovate the property.",
    };
};

const currentBuildingDescriptionFixture = () => {
    return {
        grossArea: asCompleteBuildingDescriptionFixture().grossArea,
        numberOfUnits: asCompleteBuildingDescriptionFixture().numberOfUnits,
        floorsNumber: asCompleteBuildingDescriptionFixture().floorsNumber
    };
};

const timeOnMarketFixture = () => {
    return {
        minMonths: 6,
        maxMonths: 9,
    };
};

const marketResearchFixture = () => {
    return {
        neighborhoodValue: "Lakeview",
        marketArea: "South Chicago",
        state: "IL",
        macroMarket: "IL-Chicago",
        submarket: "IL-South Chicago",
        dateOfValuation: keyInfoEngagementFixture()._dueDateFixture.date,
        marketDate: getTodayDateString(),
        quarter: "Q4"
    };
};

const ownerFixture = () => {
    return {
        name: "Daniel & Audrey Brown"
    };
};

const contractDetailsFixture = () => {
    return {
        buyer: "RW Taylor Group LLC",
        contractDate: "09-14-2021",
        contractPrice: 300000
    };
};

const siteInspectionFixture = () => {
    return {
        generalPropertyCondition: "Average",
        stabilizedCondition: "Good",
        locationsInspectedLabels: [ "Building Facade", "Exterior Entrance", "Interior Hallways", "Common Areas",
            "Mechanical/electrical systems", "Stairs" ],
        stairCondition: "Average"
    };
};

const descriptionOfImprovementsFixture = () => {
    return {
        foundationValue: "Poured concrete",
        structuralSystemValue: "Wood joists and masonry",
        externalWallsLabels: [ "Brick", "Masonry" ],
        framingValue: "Wood post and beam",
        roofType: "Flat built-up",
        windowsLabels: [ "Double-hung" ],
        plumbingLabels: [ "PVC", "Copper", "Iron" ],
        sprinklersValue: "None",
        securityLabels: [ "Door Locks" ],
        basementAccess: [ "Interior" ],
        basementState: "Unfinished"
    };
};

const remainingEconomicLifeFixture = () => {
    return {
        totalEconomicLifeToBe: "50",
        ageEffective: "15"
    };
};

const transportationSiteDescriptionFixture = () => {
    return {
        commentary: "The South Chicago & Crandon bus stop is 0.2 miles away, a 3-minute walk. " + 
        "It is served by CTA bus line #30.\nThe 87th St. Metra commuter rail station is 1.1 miles " + 
        "away, a 4-minute drive. It is served by the Metra Electric District Line.\nThe 83rd St. " + 
        "Metra commuter rail station is 1.2 miles away, a 4-minute drive. It is served by the Metra " + 
        "Electric District Line.\nChicago Midway International Airport is 13 miles away, about a " + 
        "25-minute drive.\nChicago-O'Hare International Airport is 29 miles away, about a 45-minute drive."
    };
};

const siteDescriptorsFixture = () => {
    return {
        siteArea: siteDetailsFixture().siteArea,
        propertyShape: "Rectangular",
        propertyFrontage: 50,
        siteDescriptionItems: [ "Access", "Topography", "Drainage", "Paving", "Street Lighting", "Hazardous Substances",
            "Easements, Encroachments, and Restrictions" ],
        floodHazardCommentary: "According to National Flood Insurance Program Rate Map dated " + 
        "August 19, 2008 Community Panel #17031C0655J, the subject is located within a Zone X flood zone. " + 
        "Zone X is an area of minimal flooding. These areas are determined to be outside the 500-year " + 
        "floodplain and are determined to be outside the 1% and 0.2% annual chance floodplains."
    };
};

const utilitiesSiteDescriptionFixture = () => {
    return {
        utilitiesItems: [ "Water/Sewer and Refuse", "Police & Fire Protection", "Gas", "Electricity" ],
        utilitiesDescription: "Comed"
    };
};

const heatingCoolingSystemsUtilitiesFixture = () => {
    return {
        type: "HVAC system",
        location: "Basement",
        commentary: "HVAC system located in the basement for heating and cooling.",
        systemNumber: 0
    };
};

const gasMetersUtilitiesFixture = () => {
    return {
        type: "Individual",
        location: "Basement",
        commentary: "Individual gas meters are located in the basement."
    };
};

const electricMetersUtilitiesFixture = () => {
    return {
        type: "Individual",
        location: "Basement",
        commentary: "Individual electric meters are located in the basement."
    };
};

const hotWaterSystemsUtilitiesFixture = () => {
    return {
        type: "individual tanks",
        location: "Basement",
        commentary: "Individual tanks located in the basement.",
        systemNumber: 0
    };
};

const amenitiesFixture = () => {
    return {
        numberOfParkingPlaces: 6
    };
};

const propertyMapsFixture = () => {
    return {
        zoningMapFile: "full_reports/full_bowery_multifamily_as_complete/zoning_map.PNG",
        floodMapFile: "full_reports/full_bowery_multifamily_as_complete/flood_map.PNG",
        cornerValue: "Mid-Block",
        taxMapFile: "full_reports/full_bowery_multifamily_as_complete/tax_parcel_map.PNG"
    };
};

const facadePhotosFixture = () => {
    return {
        section: "Building Facade",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/facade_photos",
        photosFileNames: [ "building_facade_1.png", "building_facade_2.png", "building_facade_3.png" ]
    };
};

const subjectPhotosFixture = () => {
    return {
        section: "Subject Street",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/subject_street_photos",
        photosFileNames: [ "subject_street_1.png", "subject_street_2.png" ]
    };
};

const exteriorEntrancePhotosFixture = () => {
    return {
        section: "Exterior Entrance",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/exterior_entrance_photos",
        photosFileNames: [ "exterior_entrance_1.png", "exterior_entrance_2.png", "exterior_entrance_3.png" ]
    };
};

const stairwayPhotosFixture = () => {
    return {
        section: "Typical Stairway",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/typical_stairway_photos",
        photosFileNames: [ "typical_stairway_1.png", "typical_stairway_2.png", "typical_stairway_3.png",
            "typical_stairway_4.png", "typical_stairway_5.png" ]
    };
};

const hallwayPhotosFixture = () => {
    return {
        section: "Typical Hallway",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/typical_hallway_photos",
        photosFileNames: [ "typical_hallway_1.png", "typical_hallway_2.png" ]
    };
};

const kitchenPhotosFixture = () => {
    return {
        section: "Typical Kitchen",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/typical_kitchen_photos",
        photosFileNames: 
        [ 
            "typical_kitchen_1.png", 
            "typical_kitchen_2.png", 
            "typical_kitchen_3.png", 
            "typical_kitchen_4.png",
            "typical_kitchen_5.png" 
        ]
    };
};

const bathroomPhotosFixture = () => {
    return {
        section: "Typical Bathroom",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/typical_bathroom_photos",
        photosFileNames: [ "typical_bathroom_1.png", "typical_bathroom_2.png" ]
    };
};

const bedroomPhotosFixture = () => {
    return {
        section: "Typical Bedroom",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/typical_bedroom_photos",
        photosFileNames: [ "typical_bedroom_1.png", "typical_bedroom_2.png", "typical_bedroom_3.png", 
            "typical_bedroom_4.png" ]
    };
};

const livingRoomPhotosFixture = () => {
    return {
        section: "Typical Living Room",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/typical_living_room_photos",
        photosFileNames: [ "living_room_1.png", "living_room_2.png", "living_room_3.png" ]
    };
};

const electricMetersPhotosFixture = () => {
    return {
        section: "Electric Meters",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/electric_meters_photos",
        photosFileNames: [ "electric_meters.png" ]
    };
};

const gasMetersPhotosFixture = () => {
    return {
        section: "Gas Meters",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/gas_meters_photos",
        photosFileNames: [ "gas_meters.png" ]
    };
};

const heatingSystemPhotosFixture = () => {
    return {
        sectionOldName: "Heating System",
        section: "HVAC System",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/heating_system_photos",
        photosFileNames: [ "hvac_system_1.png", "hvac_system_2.png", "hvac_system_3.png" ]
    };
};

const hotWaterPhotosFixture = () => {
    return {
        section: "Hot Water System",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/hot_water_system_photos",
        photosFileNames: [ "hot_water_system.png" ]
    };
};

const zoningDescriptionInformationFixture = () => {
    return {
        zonesNames: [ "RS-3" ],
        city: "Chicago",
        siteArea: siteDetailsFixture().siteArea,
        propertyIdentificationCommentary: "The subject is situated on a 6,250 square foot parcel in an RS-3 zone " +
            "and is identified in the city of Chicago tax maps as PIN 20-36-420-020-0000.",
        introductionCommentary: "8524 S Oglesby Ave. is in a RS-3 zone. Below is a summary of the subject property's " +
            "compliance with regard to use and bulk regulations."
    };
};

const zoningDescriptionUsesFixture = () => {
    return {
        permittedPropertyUse: "Residential",
        currentPropertyUse: "Residential",
        zonesNames: zoningDescriptionInformationFixture().zonesNames,
        isConformable: true,
        permittedUses: [ "residential" ],
        currentUses: [ "residential" ],
        streetAddress: siteDetailsFixture().streetAddress
    };
};

const zoningDescriptionBulkFixture = () => {
    return {
        regulationValuesDelete: [ "Maximum Density", "Permitted Units", "Minimum Lot Width", 
            "Minimum Setback (Both Sides)", "Minimum Rear Yard", "Maximum Building Coverage" ],
        regulationNew: {
            name: "Maximum FAR",
            actualValue: "0.76",
            requiredValue: "0.90",
            statusValue: "Complying"
        },
        existingRegulations: [
            {
                name: "Minimum Lot Size", actualValue: "6250 SF", requiredValue: "5000 SF",
                statusValue: "Complying"
            },
            {
                name: "Minimum Front Setback", actualValue: "25 ft", requiredValue: "19 ft",
                statusValue: "Complying"
            },
            {
                name: "Minimum Setback (One Side)", actualValue: "8 ft", requiredValue: "5 ft",
                statusValue: "Complying"
            },
            {
                name: "Maximum Height", actualValue: "26.5 ft", requiredValue: "30 ft",
                statusValue: "Complying"
            }
        ],
        complyingCommentary: "The subject will be complying with regards to bulk regulations."
    };
};

const zoningDescriptionParkingFixture = () => {
    return {
        numberOfUnits: asCompleteBuildingDescriptionFixture().numberOfUnits,
        numberOfParkingPlaces: amenitiesFixture().numberOfParkingPlaces,
        requiredParkingPlaces: 6,
        isConforming: "true"
    };
};

const prospectiveRenovationsFixture = () => {
    return {
        dropValue: Enums.RENOVATION_TYPE.renovation,
        period: 12,
        totalAmount: 106000,
        commentary: "The buyer reported a total prospective renovation budget of $106,000.00. " +
            "Renovations are expected to take 12 months to complete."
    };
};

const typicalKitchenConditionFixture = () => {
    return {
        condition: "Good",
        flooring: "Ceramic Tile",
        counterTops: "Laminate",
        cabinetry: "Natural Wood",
        stovetops: "Standard Oven/Range",
        refrigerators: "Standard",
    };
};

const typicalBathroomConditionFixture = () => {
    return {
        condition: "Good",
        flooring: "Ceramic Tile",
        tub: "Bathtub/Shower Combo",
        sink: "Laminate-top set in cabinet",
        toilet: "Ceramic"
    };
};

const bedroomConditionFixture = () => {
    return {
        condition: "Good",
        flooring: "Hardwood",
        walls: "Plaster"
    };
};

const livingRoomConditionFixture = () => {
    return {
        condition: "Good",
        flooring: "Hardwood",
        walls: "Plaster",
    };
};

const stairsFixture = () => {
    return {
        numberOfStairs: 2,
        stairsStart: "Basement",
        stairsEnd: "2nd floor",
        commentary: "There are 2 staircases that run from the basement to the 2nd floor, " + 
        "one interior and one exterior.",
    };
};

const inPLaceRentRollFixture = () => {
    return {
        includePerRoom: "Include Per Room Analysis in Report",
        forecastLabel: "Developer's Forecast",
        forecastColumn: "Rent Forecast",
        isInspectedRowsToCheck: [ 0, 1 ],
        roomsNumber: 4,
        bedroomsNumber: 2,
        rentType: "Market Rate",
        leaseStatus: "Vacant",
        forecastValue: 1120,
        numberOfUnits: currentBuildingDescriptionFixture().numberOfUnits,
        commentary: "8524 S Oglesby Ave. is expected to contain 6 units upon completion of the construction works; " +
            "the developer's projected residential rent roll is presented below."
    };
};

const unitGroupsFixture = () => {
    return {
        unitType: "2 Bedroom",
        averageSF: 700
    };
};

const rentComparablesFixture = () => {
    return {
        comparables: [
            {
                state: "Other", address: "8416 S Escanaba Ave., Chicago, IL 60617", monthly: 1050, date: "04-09-2021",
                footage: 0, sourceInfo: "externalDatabase", bedrooms: 2, rooms: 4, bathrooms: 0, id: "1",
                sourceInfoCheck: "External Database"
            },
            {
                state: "Other", address: "8349 S Colfax Ave., Chicago, IL 60617", monthly: 1000, date: "04-09-2021",
                footage: 0, sourceInfo: "externalDatabase", bedrooms: 2, rooms: 4, bathrooms: 0, id: "1",
                sourceInfoCheck: "External Database"
            },
            {
                state: "Other", address: "2815 E 81st St., Chicago, IL 60617", monthly: 1000, date: "04-09-2021",
                footage: 0, sourceInfo: "externalDatabase", bedrooms: 2, rooms: 4, bathrooms: 0, id: "1",
                sourceInfoCheck: "External Database"
            },
            {
                state: "Other", address: "8155 S Merrill Ave., Chicago, IL 60617", monthly: 1150, date: "04-09-2021",
                footage: 0, sourceInfo: "externalDatabase", bedrooms: 2, rooms: 4, bathrooms: 0, id: "1",
                sourceInfoCheck: "External Database"
            },
            {
                state: "Other", address: "7957 S Marquette Ave., Chicago, IL 60617", monthly: 1200, date: "04-09-2021",
                footage: 0, sourceInfo: "externalDatabase", bedrooms: 2, rooms: 4, bathrooms: 0, id: "1",
                sourceInfoCheck: "External Database"
            }
        ],
        compMapPath: "full_reports/full_bowery_multifamily_as_complete/comp_map.png"
    };
};

const resRentReconciliationFixture = () => {
    return {
        reconciliationIntroComm: "Important considerations in determining potential rental value " + 
        "include location, access to transportation and neighborhood amenities, and building design " + 
        "and condition. The subject is in a primarily residential section of Lakeview, a neighborhood " + 
        "that has seen significant investment in the past 5 to 10 years. The site has good access to  " + 
        "transportation, and the block is appealing. The comparables are similar in their physical and " + 
        "locational appeal and are good indicators of value. Thus, our analysis " + 
        "of the forecast of market rents is presented:",
        marketConclusion: 1100,
        marketBreakdown: "all market oriented",
        reconciliationCommentary: "The comparable two-bedroom units range from $1,000 to $1,200 per " + 
        "month with an average of $1,080 per month. Based on the subject's market rate rents and the " + 
        "range of the comparables, we forecast a market rent for the subject's two-bedroom units of $1,100 " + 
        "per month. Considering the range of the comparables and our market rent forecasts for the subject " + 
        "units, the subject's market rate units are all currently market oriented."
    };
};

const stabRentRollFixture = () => {
    return {
        monthlyRentStab: 1100,
        rentRollDiscussionComm: "8524 S Oglesby Ave. will contain 6 residential units upon stabilization; the " +
            "residential rent roll is summarized by unit type and rent regulation status.",
        occupancyRateComm: "We note that the subject will contain 6 market rate residential units.",
    };
};

const stabRentRollSummaryFixture = () => {
    return {
        marketAnnualRent: "$79,200.00",
        stabRRSummary: "The average forecasted monthly rent is $1,100.",
        grossIncomeDiscussion: "Based on our market rent conclusions, the residential rent roll is " + 
        "projected at 100% of market.",
        distributionSummary: "We estimated the total leasable area and resulting average square footage per unit " +
        "based on a loss factor of 10% applied to the GBA."
    };
};

const expenseStructureFixture = () => {
    return {
        tenantValue: "tenant",
        ownerValue: "owner",
        tenantObligationsCommentary: "In-unit electricity, cooking gas and heat. ",
        ownerObligationsCommentary: "Common area electricity, refuse removal, water/sewer and common area maintenance. "
    };
};

const parkingFixture = () => {
    return {
        commentary: "The subject property has 6 parking spaces available. Parking is a free amenity."
    };
};

const grossIncomeFixture = () => {
    return {
        resVacancyCollLoss: 5,
        coStarRate: 94,
        commentary: "CoStar reports the submarket rate near 94% and metro area rate near 94%. Based on 8524 " +
        "South Oglesby Avenue's current and historical operating results, macro market conditions, and investor " +
        "expectations, a 5.00% residential vacancy and collection loss has been applied. We note that the subject " +
        "will contain 6 market rate residential units."
    };
};

const currentTaxInfoFixture = () => {
    return {
        liabilityBasis: "Per Unit",
        landValue: 5625,
        buildingValue: 8260,
        className: "Cook County Class 2-11",
        rateYear: 2020,
        rateValue: 6.911,
        liabilityCommentary: "8524 S Oglesby Ave. is located in Chicago, Cook County, IL. " + 
        "It is designated on the tax maps as PIN 20-36-420-020-0000. We have applied the 2020 " + 
        "tax rate of 6.911% to the most recent assessed value of the property to determine " + 
        "its current tax liability."
    };
};

const projectedTaxInfoFixture = () => {
    return {
        liabilityComm: "In order to determine the projected tax liability, we have applied " + 
        "a tax rate of 6.911% to our projection of the assessed value."
    };
};

const comparablesTaxInfoFixture = () => {
    return {
        comparables: [
            {
                address: "8326 S Brandon Ave", yearBuilt: 1900, basis: 4, taxPerBasis: 556.6,
                sourceOfInfo: "externalDatabase", taxYear: 2020
            },
            {
                address: "2908 E 91st St", yearBuilt: 1895, basis: 8, taxPerBasis: 437.09,
                sourceOfInfo: "externalDatabase", taxYear: 2020
            },
            {
                address: "2922 E 90th St", yearBuilt: 1962, basis: 9, taxPerBasis: 378.35,
                sourceOfInfo: "externalDatabase", taxYear: 2020
            },
            {
                address: "2748 E 83rd St", yearBuilt: 1959, basis: 8, taxPerBasis: 482.16,
                sourceOfInfo: "externalDatabase", taxYear: 2020
            },
            {
                address: "3004 E 79th Pl", yearBuilt: 1965, basis: 10, taxPerBasis: 585.66,
                sourceOfInfo: "externalDatabase", taxYear: 2020
            }
        ],
        commentary: "In order to support the forecasted real estate tax liability, we surveyed those of comparable " +
            "buildings in the area."
    };
};

const summaryTaxInfoFixture = () => {
    return {
        liabilityType: "Per Unit",
        liabilityValue: 515.52,
        commentary: "The projection for the subject property’s taxes per unit falls within the market range " +
            "and is considered reasonable. Thus, we apply the projected tax liability of $3,093.12 in our analysis."
    };
};

const expenseHistoryFixture = () => {
    return {
        expensePeriod: "Projection",
        expenseYear: Number(getYearFromDate(getTodayDateString())) + 1,
        grossRevenue: 84240,
        realEstateTaxes: 2402.06,
        insuranceExpense: "clear",
        electricityExpense: 8268,
        fuelExpense: "clear",
        payrollBenefitsExpense: 1464,
        toeToBe: "$12,134.06",
        commentary: "We were provided with the owner's pro forma for the subject property. Therefore, " +
        "we analyzed the subject's operating expense projections, as well as expense reports of comparable " +
        "properties, in developing our forecast of operating expenses. The data, analyzed in terms of residential " +
        "units and gross square footage, is presented below."
    };
};

const comparableExpensesFixture = () => {
    return {
        comparables: [
            {
                address: "6001 S Sacramento Ave", city: "Chicago", period: "Projection",
                squareFeet: 6608, resUnits: 13, insurance: 3900, electricity: 12675, repairsAndMaintenance: 5850,
                payrollAndBenefits: 3900, generalAndAdministrative: 2925, management: 4899, toe: "$34,149.00"
            },
            {
                address: "7955 S Emerald Ave", city: "Chicago", period: "Projection",
                squareFeet: 9000, resUnits: 12, insurance: 4525, electricity: 6754, repairsAndMaintenance: 6000,
                payrollAndBenefits: 3104, generalAndAdministrative: 2640, management: 5383, toe: "$28,406.00"
            },
            {
                address: "7613 S Kingston Ave", city: "Chicago", period: "Projection",
                squareFeet: 9750, resUnits: 13, insurance: 4200, electricity: 15917, repairsAndMaintenance: 5200,
                payrollAndBenefits: 3357, generalAndAdministrative: 2275, management: 5902, toe: "$36,851.00"
            },
            {
                address: "7655 S Coles Ave", city: "Chicago", period: "Projection",
                squareFeet: 12771, resUnits: 13, insurance: 5161, electricity: 6151, repairsAndMaintenance: 5850,
                payrollAndBenefits: 6248, generalAndAdministrative: 2300, management: 6529, toe: "$32,239.00"
            },
            {
                address: "2320 E 70th Street", city: "Chicago", period: "Projection",
                squareFeet: 7250, "resUnits": 8, insurance: 3200, electricity: 3800, repairsAndMaintenance: 3200,
                payrollAndBenefits: 5000, generalAndAdministrative: 1880, management: 5464.8, toe: "$22,544.80"
            },
        ]
    };
};

const expenseForecastFixture = (): {
    insuranceItem: BoweryReports.ForecastItem,
    electricityItem: BoweryReports.ForecastItem,
    fuelItem: BoweryReports.ForecastItem,
    waterSewerItem: BoweryReports.ForecastItem,
    repairsMaintenance: BoweryReports.ForecastItem,
    payrollBenefits: BoweryReports.ForecastItem
    general: BoweryReports.ForecastItem,
    legalProf: BoweryReports.ForecastItem,
    miscellaneous: BoweryReports.ForecastItem,
    management: BoweryReports.ForecastItem,
    reserves: BoweryReports.ForecastItem,
    total: BoweryReports.ForecastItem,
    effectiveGrossIncome: number,
    percentOfEgi: number} => {
    return {
        insuranceItem: {
            name: "insurance", basis: "unit", forecast: 350
        },
        electricityItem: {
            name: "electricity", basis: "unit", forecast: 1380, projection: expenseHistoryFixture().electricityExpense
        },
        fuelItem: {
            name: "fuel", basis: "unit"
        },
        waterSewerItem: {
            name: "waterAndSewer", basis: "unit"
        },
        repairsMaintenance: {
            name: "repairsAndMaintenance", basis: "unit", forecast: 450
        },
        payrollBenefits: {
            name: "payrollAndBenefits", basis: "unit", forecast: 350, 
            projection: expenseHistoryFixture().payrollBenefitsExpense
        },
        general: {
            name: "generalAndAdministrative", basis: "unit", forecast: 200
        },
        legalProf: {
            name: "legalAndProfessionalFees", basis: "unit"
        },
        miscellaneous: {
            name: "miscellaneous", basis: "unit"
        },
        management: {
            name: "management", basis: "unit"
        },
        reserves: {
            name: "reserves", basis: "unit", forecast: 200
        },
        total: {
            name: "total", basis: "unit"
        },
        effectiveGrossIncome: 75240,
        percentOfEgi: 4
    };
};

const proFormaFixture = () => {
    return {
        potentialResIncomeRow: { total: "$79,200", perSF: "$16.74", perUnit: "$13,200" },
        potentialGrossIncomeRow: { total: "$79,200", perSF: "$16.74", perUnit: "$13,200" },
        vcLossRow: { total: "-$3,960", perSF: "-$0.84", perUnit: "-$660" },
        effectiveGrossRow: { total: "$75,240", perSF: "$15.90", perUnit: "$12,540" },
        reTaxesRow: { total: "$3,093", perSF: "$0.65", perUnit: "$516" },
        insuranceRow: { total: "$2,100", perSF: "$0.44", perUnit: "$350" },
        electricityRow: { total: "$8,280", perSF: "$1.75", perUnit: "$1,380" },
        repairsRow: { total: "$2,700", perSF: "$0.57", perUnit: "$450" },
        payrollRow: { total: "$2,100", perSF: "$0.44", perUnit: "$350" },
        generalRow: { total: "$1,200", perSF: "$0.25", perUnit: "$200" },
        managementRow: { total: "$3,010", perSF: "$0.64", perUnit: "$502" },
        reservesRow: { total: "$1,200", perSF: "$0.25", perUnit: "$200" },
        toeRow: { total: "$23,683", perSF: "$5.00", perUnit: "$3,947" },
        toeNetReRow: { total: "$20,590", perSF: "$4.35", perUnit: "$3,432" },
        netOpIncomeRow: { total: "$51,557", perSF: "$10.90", perUnit: "$8,593" },
        opExpenseRatio: "31.48%"
    };
};

const supportingCapRatesFixture = () => {
    return {
        incomeCapComm: "In developing an opinion of the overall capitalization rate required by an investor, we will " +
            "apply several methods of analyses: (1) Band of Investment; (2) Comparable Capitalization Rates; and (3) " +
            "National Survey Responses.",
        selectedLoanTermsSection: {
            amortizationTerm: 30, paymentsPerYear: 12, loanToValueConstant: 1, loanToValueRatio: 75, mortgageRate: 4,
            mortgageConstant: 0.0573,
            commentary: "After surveying several commercial mortgage lenders, it is our opinion that a " +
            "typical creditworthy purchaser could obtain financing from a lending source in an " + 
            "amount equal to 75% of value at an annual interest rate of 4% and a 30-year payout. " + 
            "Therefore, the mortgage constant is 0.0573."
        },
        bandInvestmentSection: {
            loanRatio: 75, mortgageConstant: 0.0573, equityDividendRate: 20, equityRatio: 25,
            commentary: "We believe an investor in the subject property would accept an initial annual return " +
            "of 20% in anticipation of a stable income flow and property appreciation over time. " + 
            "It should be emphasized that the equity dividend rate is not necessarily the same as " + 
            "an equity yield rate or true rate of return on equity capital. The equity dividend rate " + 
            "is an equity capitalization that reflects all benefits that can be recognized by the equity " + 
            "investor as of the date of purchase. We selected this rate based on the subject's location in " + 
            "a good residential area, and its good access and visibility. We summarize the " +
            "mortgage and equity parameters utilized in our derivation of an overall capitalization rate."
        },
    };
};

const capRateConclusionFixture = () => {
    return {
        bandOfInvestmentsValue: "9.3%",
        pwcValue: "3-7%",
        situsValue: "3.8-5%",
        concludedCapRate: 10,
        asCompleteMonthsOfRentLoss: 12,
        asStabilizedMonthsOfRentLoss: 0,
        roundingFactorValue: 10000,
        netOperatingIncome: "$51,557.28",
        asStabilizedPart: {
            period: "10/13/2022",
            finalValue: "$520,000"
        },
        asCompletePart: {
            period: "10/13/2022",
            amount: "$515,573",
            finalValue: "$520,000",
            lessEntrepreneurialProfit: 25
        },
        asIsMarketPart: {
            period: "10/13/2021",
            amount: "$383,073",
            finalValue: "$380,000",
            perUnit: "$63,333",
            perSF: "$80.30"
        }
    };
};

const capRateCompsFixture = () => {
    return {
        comparables: [
            {
                stateValue: "Other",
                address: "7900 S Merrill Ave.",
                id: "1",
                source: "externalDatabase",
                sourceName: "CoStar",
                sourceUrl: "https://product.costar.com/detail/lookup/4101421/sale",
                gba: 15471,
                type: "multifamily",
                isElevatored: false,
                numberOfUnits: 15,
                isListing: false,
                isInContract: false,
                saleDate: "10-16-2020",
                yearBuilt: 0,
                pricePerSF: "N/A",
                capRate: "8.69"
            },
            {
                stateValue: "Other",
                address: "8121 S Colfax Ave., Chicago, Illinois 60617",
                id: "1",
                source: "externalDatabase",
                sourceName: "CoStar",
                sourceUrl: "https://product.costar.com/detail/lookup/10566744/summary",
                gba: 6300,
                type: "multifamily",
                isElevatored: false,
                numberOfUnits: 6,
                isListing: false,
                isInContract: false,
                saleDate: "04-29-2021",
                yearBuilt: 1920,
                pricePerSF: "N/A",
                capRate: "9.05"
            },
            {
                stateValue: "Other",
                address: "7932 S Kingston Ave., Chicago, Illinois 60617",
                id: "1",
                source: "externalDatabase",
                sourceName: "CoStar",
                sourceUrl: "https://product.costar.com/detail/lookup/8896305/summary",
                gba: 8700,
                type: "multifamily",
                isElevatored: false,
                numberOfUnits: 6,
                isListing: false,
                isInContract: false,
                saleDate: "08-16-2021",
                yearBuilt: 1926,
                pricePerSF: "N/A",
                capRate: "11.44"
            },
            {
                stateValue: "Other",
                address: "8041 S Manistee Ave., Chicago, Illinois 60617",
                id: "1",
                source: "externalDatabase",
                sourceName: "CoStar",
                sourceUrl: "https://product.costar.com/detail/sale-comps/default/Comp/5672762/summary/58557721",
                gba: 13387,
                type: "multifamily",
                isElevatored: false,
                numberOfUnits: 8,
                isListing: false,
                isInContract: false,
                saleDate: "09-23-2021",
                yearBuilt: 1930,
                pricePerSF: "N/A",
                capRate: "9.31"
            },
            {
                stateValue: "Other",
                address: "8103 S Luella Ave., Chicago, Illinois 60617",
                id: "1",
                source: "externalDatabase",
                sourceName: "External Database",
                sourceUrl: "https://traded.co/property/8103-south-luella-avenue/",
                gba: 6420,
                type: "multifamily",
                isElevatored: false,
                numberOfUnits: 6,
                isListing: false,
                isInContract: false,
                saleDate: "09-24-2021",
                yearBuilt: 1925,
                pricePerSF: "N/A",
                capRate: "10.08"
            },
        ],
        compIncomePotential: "Similar",
        compPropertyConditions: "Similar",
        compPropertyLocations: "Similar"
    };
};

const findCompsFixture = () => {
    return {
        comparables: [
            { address: "8138 S Exchange Ave." },
            { address: "8041 S Manistee Ave." },
            { address: "8103 S Luella Ave." }
        ]
    };
};

const adjustCompsFixture = () => {
    return {
        calculationUnitsRadioValue: Enums.CALCULATION_UNITS.perResidentialUnits,
        incomeAdjustmentType: "None",
        comparables: [
            {
                size: 0,
                condition: 5,
                other: -5,
                trendedPrice: "$90,000.00",
            },
            {
                size: 5,
                condition: 5,
                other: -5,
                trendedPrice: "$78,125.00",
            },
            {
                size: 0,
                condition: 5,
                other: -5,
                trendedPrice: "$101,666.67",
            },
        ],
        otherAdjustmentNewName: "Average Unit Size Adjustment"
    };
};

const valueConclusionFixture = () => {
    return {
        unadjustedPrices: {
            min: "$78,125.00", avg: "$89,930.56", max: "$101,666.67", median: "$90,000.00"
        },
        adjustedPrices: {
            min: "$82,031.25", avg: "$91,232.64", max: "$101,666.67", median: "$90,000.00"
        },
        incomeApproachConclusion: "$85,929 per unit",
        saleValueConclusion: 90000,
        asStabilizedRow: {
            period: capRateConclusionFixture().asStabilizedPart.period,
            amount: "$540,000",
            finalValue: "$540,000"
        },
        asCompleteRow: {
            period: capRateConclusionFixture().asCompletePart.period,
            amount: "$540,000",
            finalValue: "$540,000"
        },
        asIsMarketRow: {
            period: capRateConclusionFixture().asIsMarketPart.period,
            amount: "$407,500",
            finalValue: "$410,000"
        }
    };
};

const finalValuesReconciliationFixture = () => {
    return {
        stabilizedCompleteDate: "October 13, 2022",
        marketDate: "October 13, 2021",
        finalValueApproach: "Income",
    };
};

const propertySalesConclusionFixture = () => {
    return {
        contractPrice: contractDetailsFixture().contractPrice,
        contractDate: "9/14/2021",
        asIsMarketFinalValue: capRateConclusionFixture().asIsMarketPart.finalValue
    };
};

const assumptionsFixture = () => {
    return {
        extraordinaryAssumption: "Some specific assumption about COVID-19"
    };
};

const highestBestUseFixture = () => {
    return {
        propertyCondition: "Good",
        complyingBulk: "Complying",
        conformingUse: "Conforming",
        marketCharPropType: "Residential",
        feasiblePropertyType: "multifamilyApartment",
        feasiblePropTypeWord: "Multifamily Apartment"
    };
};

const unitInspectionFixture = () => {
    return {
        readyForOccupancyValues: [ "N/A", "N/A" ],
    };
};

const capRateDiscussionFixture = () => {
    return {
        capRateTable: { min: "8.69%", max: "11.44%", average: "9.71%" },
        pwcRow: { min: "3.50%", average: "5.03%", max: "7.00%" },
        situsRow: { min: "4.00%", average: "5.20%", max: "6.00%" },
        capRateCompsTable: { income: "Similar", propConditions: "Similar", location: "Similar" },
        incomeSpikesTable: {
            capRate: "10.00%",
            occupancy: "0.00%",
            percentageMarketRate: "100.00%",
            condition: "Good"
        },
        incomeSpikesRadios: {
            incomePotential: "Limited",
            marketConditions: "Moderately Appreciating",
            flowRisk: "Moderate Risk"
        }
    };
};

const _inspectionDateFixture: BoweryReports.KeyInfoDateType = {
    type: Enums.DATE_TYPE.inspectionDate,
    date: "08-30-2022"
};

const _valuationDateFixture: BoweryReports.KeyInfoDateType = {
    type: Enums.DATE_TYPE.dateOfValuation,
    date: "10-13-2021"
};

const _dueDateFixture: BoweryReports.KeyInfoDateType = {
    type: Enums.DATE_TYPE.dueDate,
    date: "10-18-2021"
};

const insurableReplacementCostFixture = () => {
    return {
        subjectState: "Illinois",
        subjectLocale: "Chicago"
    };
};

export const reportCreationData = () => {
    return Object.freeze(reportCreationFixture());
};

export const keyInfoPurposeData = () => {
    return Object.freeze(keyInfoPurposeFixture());
};

export const keyInfoEngagementData = () => {
    return Object.freeze(keyInfoEngagementFixture());
};

export const clientData = () => {
    return Object.freeze(clientFixture());
};

export const siteDetailsData = () => {
    return Object.freeze(siteDetailsFixture());
};

export const asCompleteBuildingDescriptionData = () => {
    return Object.freeze(asCompleteBuildingDescriptionFixture());
};

export const currentBuildingDescriptionData = () => {
    return Object.freeze(currentBuildingDescriptionFixture());
};

export const timeOnMarketData = () => {
    return Object.freeze(timeOnMarketFixture());
};

export const marketResearchData = () => {
    return Object.freeze(marketResearchFixture());
};

export const ownerData = () => {
    return Object.freeze(ownerFixture());
};

export const contractDetailsData = () => {
    return Object.freeze(contractDetailsFixture());
};

export const siteInspectionData = () => {
    return Object.freeze(siteInspectionFixture());
};

export const descriptionOfImprovementsData = () => {
    return Object.freeze(descriptionOfImprovementsFixture());
};

export const remainingEconomicLifeData = () => {
    return Object.freeze(remainingEconomicLifeFixture());
};

export const transportationSiteDescriptionData = () => {
    return Object.freeze(transportationSiteDescriptionFixture());
};

export const siteDescriptorsData = () => {
    return Object.freeze(siteDescriptorsFixture());
};

export const utilitiesSiteDescriptionData = () => {
    return Object.freeze(utilitiesSiteDescriptionFixture());
};

export const heatingCoolingSystemsUtilitiesData = () => {
    return Object.freeze(heatingCoolingSystemsUtilitiesFixture());
};

export const gasMetersUtilitiesData = () => {
    return Object.freeze(gasMetersUtilitiesFixture());
};

export const electricMetersUtilitiesData = () => {
    return Object.freeze(electricMetersUtilitiesFixture());
};

export const hotWaterSystemsUtilitiesData = () => {
    return Object.freeze(hotWaterSystemsUtilitiesFixture());
};

export const amenitiesData = () => {
    return Object.freeze(amenitiesFixture());
};

export const propertyMapsData = () => {
    return Object.freeze(propertyMapsFixture());
};

export const facadePhotosData = () => {
    return Object.freeze(facadePhotosFixture());
};

export const subjectPhotosData = () => {
    return Object.freeze(subjectPhotosFixture());
};

export const exteriorEntrancePhotosData = () => {
    return Object.freeze(exteriorEntrancePhotosFixture());
};

export const stairwayPhotosData = () => {
    return Object.freeze(stairwayPhotosFixture());
};

export const hallwayPhotosData = () => {
    return Object.freeze(hallwayPhotosFixture());
};

export const kitchenPhotosData = () => {
    return Object.freeze(kitchenPhotosFixture());
};

export const bathroomPhotosData = () => {
    return Object.freeze(bathroomPhotosFixture());
};

export const bedroomPhotosData = () => {
    return Object.freeze(bedroomPhotosFixture());
};

export const livingRoomPhotosData = () => {
    return Object.freeze(livingRoomPhotosFixture());
};

export const electricMetersPhotosData = () => {
    return Object.freeze(electricMetersPhotosFixture());
};

export const gasMetersPhotosData = () => {
    return Object.freeze(gasMetersPhotosFixture());
};

export const heatingSystemPhotosData = () => {
    return Object.freeze(heatingSystemPhotosFixture());
};

export const hotWaterPhotosData = () => {
    return Object.freeze(hotWaterPhotosFixture());
};

export const zoningDescriptionInformationData = () => {
    return Object.freeze(zoningDescriptionInformationFixture());
};

export const zoningDescriptionUsesData = () => {
    return Object.freeze(zoningDescriptionUsesFixture());
};

export const zoningDescriptionBulkData = () => {
    return Object.freeze(zoningDescriptionBulkFixture());
};

export const zoningDescriptionParkingData = () => {
    return Object.freeze(zoningDescriptionParkingFixture());
};

export const prospectiveRenovationsData = () => {
    return Object.freeze(prospectiveRenovationsFixture());
};

export const typicalKitchenConditionData = () => {
    return Object.freeze(typicalKitchenConditionFixture());
};

export const typicalBathroomConditionData = () => {
    return Object.freeze(typicalBathroomConditionFixture());
};

export const bedroomConditionData = () => {
    return Object.freeze(bedroomConditionFixture());
};

export const livingRoomConditionData = () => {
    return Object.freeze(livingRoomConditionFixture());
};

export const stairsData = () => {
    return Object.freeze(stairsFixture());
};

export const inPLaceRentRollData = () => {
    return Object.freeze(inPLaceRentRollFixture());
};

export const unitGroupsData = () => {
    return Object.freeze(unitGroupsFixture());
};

export const rentComparablesData = () => {
    return Object.freeze(rentComparablesFixture());
};

export const resRentReconciliationData = () => {
    return Object.freeze(resRentReconciliationFixture());
};

export const stabRentRollData = () => {
    return Object.freeze(stabRentRollFixture());
};

export const stabRentRollSummaryData = () => {
    return Object.freeze(stabRentRollSummaryFixture());
};

export const expenseStructureData = () => {
    return Object.freeze(expenseStructureFixture());
};

export const parkingData = () => {
    return Object.freeze(parkingFixture());
};

export const grossIncomeData = () => {
    return Object.freeze(grossIncomeFixture());
};

export const currentTaxInfoData = () => {
    return Object.freeze(currentTaxInfoFixture());
};

export const projectedTaxInfoData = () => {
    return Object.freeze(projectedTaxInfoFixture());
};

export const comparablesTaxInfoData = () => {
    return Object.freeze(comparablesTaxInfoFixture());
};

export const summaryTaxInfoData = () => {
    return Object.freeze(summaryTaxInfoFixture());
};

export const expenseHistoryData = () => {
    return Object.freeze(expenseHistoryFixture());
};

export const comparableExpensesData = () => {
    return Object.freeze(comparableExpensesFixture());
};

export const expenseForecastData = () => {
    return Object.freeze(expenseForecastFixture());
};

export const proFormaData = () => {
    return Object.freeze(proFormaFixture());
};

export const supportingCapRatesData = () => {
    return Object.freeze(supportingCapRatesFixture());
};

export const capRateConclusionData = () => {
    return Object.freeze(capRateConclusionFixture());
};

export const capRateCompsData = () => {
    return Object.freeze(capRateCompsFixture());
};

export const findCompsData = () => {
    return Object.freeze(findCompsFixture());
};

export const adjustCompsData = () => {
    return Object.freeze(adjustCompsFixture());
};

export const valueConclusionData = () => {
    return Object.freeze(valueConclusionFixture());
};

export const finalValuesReconciliationData = () => {
    return Object.freeze(finalValuesReconciliationFixture());
};

export const propertySalesConclusionData = () => {
    return Object.freeze(propertySalesConclusionFixture());
};

export const assumptionsData = () => {
    return Object.freeze(assumptionsFixture());
};

export const highestBestUseData = () => {
    return Object.freeze(highestBestUseFixture());
};

export const unitInspectionData = () => {
    return Object.freeze(unitInspectionFixture());
};

export const capRateDiscussionData = () => {
    return Object.freeze(capRateDiscussionFixture());
};

export const insurableReplacementCostData = () => {
    return Object.freeze(insurableReplacementCostFixture());
};

export default {
    reportCreationData: reportCreationData(),
    keyInfoPurposeData: keyInfoPurposeData(),
    keyInfoEngagementData: keyInfoEngagementData(),
    clientData: clientData(),
    siteDetails: siteDetailsData(),
    asCompleteDescription: asCompleteBuildingDescriptionData(),
    currentDescription: currentBuildingDescriptionData(),
    timeOnMarket: timeOnMarketData(),
    marketResearch: marketResearchData(),
    owner: ownerData(),
    contractDetails: contractDetailsData(),
    siteInspection: siteInspectionData(),
    descriptionOfImprovements: descriptionOfImprovementsData(),
    remainingEconomicLife: remainingEconomicLifeData(),
    transportationSiteDescription: transportationSiteDescriptionData(),
    siteDescriptors: siteDescriptorsData(),
    utilitiesSiteDescription: utilitiesSiteDescriptionData(),
    heatingCoolingSystemsUtilities: heatingCoolingSystemsUtilitiesData(),
    gasMetersUtilities: gasMetersUtilitiesData(),
    electricMetersUtilities: electricMetersUtilitiesData(),
    hotWaterSystemsUtilities: hotWaterSystemsUtilitiesData(),
    amenities: amenitiesData(),
    propertyMaps: propertyMapsData(),
    facadePhotos: facadePhotosData(),
    subjectPhotos: subjectPhotosData(),
    exteriorEntrancePhotos: exteriorEntrancePhotosData(),
    stairwayPhotos: stairwayPhotosData(),
    hallwayPhotos: hallwayPhotosData(),
    kitchenPhotos: kitchenPhotosData(),
    bathroomPhotos: bathroomPhotosData(),
    bedroomPhotos: bedroomPhotosData(),
    livingRoomPhotos: livingRoomPhotosData(),
    electricMetersPhotos: electricMetersPhotosData(),
    gasMetersPhotos: gasMetersPhotosData(),
    heatingSystemPhotos: heatingSystemPhotosData(),
    hotWaterPhotos: hotWaterPhotosData(),
    zoningDescriptionInformation: zoningDescriptionInformationData(),
    zoningDescriptionUses: zoningDescriptionUsesData(),
    zoningDescriptionBulk: zoningDescriptionBulkData(),
    zoningDescriptionParking: zoningDescriptionParkingData(),
    prospectiveRenovations: prospectiveRenovationsData(),
    typicalKitchenCondition: typicalKitchenConditionData(),
    typicalBathroomCondition: typicalBathroomConditionData(),
    bedroomCondition: bedroomConditionData(),
    livingRoomCondition: livingRoomConditionData(),
    stairsData: stairsData(),
    inPLaceRentRoll: inPLaceRentRollData(),
    unitGroups: unitGroupsData(),
    rentComparables: rentComparablesData(),
    residentialRentReconciliation: resRentReconciliationData(),
    stabRentRoll: stabRentRollData(),
    stabRentRollSummary: stabRentRollSummaryData(),
    expenseStructure: expenseStructureData(),
    parking: parkingData(),
    grossIncome: grossIncomeData(),
    currentTaxInfo: currentTaxInfoData(),
    projectedTaxInfo: projectedTaxInfoData(),
    comparablesTaxInfo: comparablesTaxInfoData(),
    summaryTaxInfo: summaryTaxInfoData(),
    expenseHistory: expenseHistoryData(),
    comparableExpenses: comparableExpensesData(),
    expenseForecast: expenseForecastData(),
    proForma: proFormaData(),
    supportingCapRates: supportingCapRatesData(),
    capRateConclusion: capRateConclusionData(),
    capRateComps: capRateCompsData(),
    findComps: findCompsData(),
    adjustComps: adjustCompsData(),
    valueConclusion: valueConclusionData(),
    finalValuesReconciliation: finalValuesReconciliationData(),
    propertySalesConclusion: propertySalesConclusionData(),
    assumptions: assumptionsData(),
    highestBestUse: highestBestUseData(),
    unitInspection: unitInspectionData(),
    capRateDiscussion: capRateDiscussionData(),
    insurableReplacementCost: insurableReplacementCostData(),
    valueConclusionAsComplete: Enums.VALUE_CONCLUSION_NAME.asComplete,
    valueConclusionAsStabilized: Enums.VALUE_CONCLUSION_NAME.asStabilized,
    valueConclusionAsIs: Enums.VALUE_CONCLUSION_NAME.asIs,
    valueConclusionKeyAsComplete: Object.keys(Enums.VALUE_CONCLUSION_NAME)[2] as BoweryReports.ValueConclusionKeys,
    valueConclusionKeyAsStabilized: Object.keys(Enums.VALUE_CONCLUSION_NAME)[1] as BoweryReports.ValueConclusionKeys,
    dueDate: _dueDateFixture,
    inspectionDate: _inspectionDateFixture,
    valuationDate: _valuationDateFixture
};
