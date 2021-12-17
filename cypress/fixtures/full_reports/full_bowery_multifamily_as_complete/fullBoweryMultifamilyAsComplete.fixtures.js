const reportCreationFixture = () => {
    return {
        state: "Other",
        address: "8524 South Oglesby Avenue",
        identifierType: "PIN",
        identifier: "20-36-420-020-0000",
        reportNumber: "Full Report Test Automation",
        templateValue: "bowery-way",
        incomeValue: "multifamily",
        conclusionValue: "AS_COMPLETE"
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
        dueDate: {
            type: "dueDate",
            date: "10-18-2021"
        },
        dateOfValuation: {
            type: "dateOfValuation",
            date: "10-13-2021"
        },
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
        yearBuilt: "1933",
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
        dateOfValuation: keyInfoEngagementFixture().dateOfValuation.date
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
        locationsInspectedLabels: ["Building Facade", "Exterior Entrance", "Interior Hallways", "Common Areas",
            "Mechanical/electrical systems", "Stairs"],
        stairCondition: "Average"
    };
};

const descriptionOfImprovementsFixture = () => {
    return {
        foundationValue: "Poured concrete and fieldstone",
        structuralSystemValue: "Wood joists and masonry",
        externalWallsLabels: ["Brick", "Masonry"],
        framingValue: "Wood post and beam",
        roofType: "Flat built-up",
        windowsLabels: ["Double-hung"],
        plumbingLabels: ["PVC", "Copper", "Iron"],
        sprinklersValue: "None",
        securityLabels: ["Door Locks"],
        basementAccess: ["Interior"],
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
        commentary: "The South Chicago & Crandon bus stop is 0.2 miles away, a 3-minute walk. It is served by CTA bus " +
            "line #30.\nThe 87th St. Metra commuter rail station is 1.1 miles away, a 4-minute drive. It is served by " +
            "the Metra Electric District Line.\nThe 83rd St. Metra commuter rail station is 1.2 miles away, a 4-minute " +
            "drive. It is served by the Metra Electric District Line.\nChicago Midway International Airport is 13 miles " +
            "away, about a 25-minute drive.\nChicago-O'Hare International Airport is 29 miles away, about a 45-minute drive."
    };
};

const siteDescriptorsFixture = () => {
    return {
        siteArea: siteDetailsFixture().siteArea,
        propertyShape: "Rectangular",
        propertyFrontage: 50,
        siteDescriptionItems: ["Access", "Topography", "Drainage", "Paving", "Street Lighting", "Hazardous Substances",
            "Easements, Encroachments, and Restrictions"],
        floodHazardCommentary: "According to National Flood Insurance Program Rate Map dated August 19, 2008 Community " +
            "Panel #17031C0655J, the subject is located within a Zone X flood zone. Zone X is an area of minimal flooding." +
            " These areas are determined to be outside the 500-year floodplain and are determined to be outside the 1% " +
            "and 0.2% annual chance floodplains."
    };
};

const utilitiesSiteDescriptionFixture = () => {
    return {
        utilitiesItems: ["Water/Sewer and Refuse", "Police & Fire Protection", "Gas", "Electricity"],
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
        commentary: "Gas meters located in the basement. The residential tenants will be directly metered for gas."
    };
};

const electricMetersUtilitiesFixture = () => {
    return {
        type: "Individual",
        location: "Basement",
        commentary: "Electric meters located in the basement. The residential tenants will be directly metered for electricity."
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
        photosFileNames: ["building_facade_1.png", "building_facade_2.png", "building_facade_3.png"]
    };
};

const subjectPhotosFixture = () => {
    return {
        section: "Subject Street",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/subject_street_photos",
        photosFileNames: ["subject_street_1.png", "subject_street_2.png"]
    };
};

const exteriorEntrancePhotosFixture = () => {
    return {
        section: "Exterior Entrance",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/exterior_entrance_photos",
        photosFileNames: ["exterior_entrance_1.png", "exterior_entrance_2.png", "exterior_entrance_3.png"]
    };
};

const stairwayPhotosFixture = () => {
    return {
        section: "Typical Stairway",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/typical_stairway_photos",
        photosFileNames: ["typical_stairway_1.png", "typical_stairway_2.png", "typical_stairway_3.png",
            "typical_stairway_4.png", "typical_stairway_5.png"]
    };
};

const hallwayPhotosFixture = () => {
    return {
        section: "Typical Hallway",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/typical_hallway_photos",
        photosFileNames: ["typical_hallway_1.png", "typical_hallway_2.png"]
    };
};

const kitchenPhotosFixture = () => {
    return {
        section: "Typical Kitchen",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/typical_kitchen_photos",
        photosFileNames: ["typical_kitchen_1.png", "typical_kitchen_2.png", "typical_kitchen_3.png", "typical_kitchen_4.png",
            "typical_kitchen_5.png"]
    };
};

const bathroomPhotosFixture = () => {
    return {
        section: "Typical Bathroom",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/typical_bathroom_photos",
        photosFileNames: ["typical_bathroom_1.png", "typical_bathroom_2.png"]
    };
};

const bedroomPhotosFixture = () => {
    return {
        section: "Typical Bedroom",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/typical_bedroom_photos",
        photosFileNames: ["typical_bedroom_1.png", "typical_bedroom_2.png", "typical_bedroom_3.png", "typical_bedroom_4.png"]
    };
};

const livingRoomPhotosFixture = () => {
    return {
        section: "Typical Living Room",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/typical_living_room_photos",
        photosFileNames: ["living_room_1.png", "living_room_2.png", "living_room_3.png"]
    };
};

const electricMetersPhotosFixture = () => {
    return {
        section: "Electric Meters",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/electric_meters_photos",
        photosFileNames: ["electric_meters.png"]
    };
};

const gasMetersPhotosFixture = () => {
    return {
        section: "Gas Meters",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/gas_meters_photos",
        photosFileNames: ["gas_meters.png"]
    };
};

const heatingSystemPhotosFixture = () => {
    return {
        sectionOldName: "Heating System",
        section: "HVAC System",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/heating_system_photos",
        photosFileNames: ["hvac_system_1.png", "hvac_system_2.png", "hvac_system_3.png"]
    };
};

const hotWaterPhotosFixture = () => {
    return {
        section: "Hot Water System",
        photosFolder: "full_reports/full_bowery_multifamily_as_complete/hot_water_system_photos",
        photosFileNames: ["hot_water_system.png"]
    };
};

const zoningDescriptionInformationFixture = () => {
    return {
        zonesNames: ["RS-3"],
        city: "Chicago",
        siteArea: siteDetailsFixture().siteArea,
        propertyIdentificationCommentary: "The subject is situated on a 6,250 square foot parcel in an RS-3 zone. " +
            "It is identified in the city of Chicago tax maps as PIN 20-36-420-020-0000. ",
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
        permittedUses: ["residential"],
        currentUses: ["residential"],
        streetAddress: siteDetailsFixture().streetAddress
    };
};

const zoningDescriptionBulkFixture = () => {
    return {
        regulationValuesDelete: ["Maximum Density", "Permitted Units", "Minimum Lot Width", "Minimum Setback (Both Sides)",
            "Minimum Rear Yard", "Maximum Building Coverage"],
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

export  const hotWaterPhotosData = () => {
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

export default {
    reportCreationData: reportCreationData(),
    keyInfoPurposeData: keyInfoPurposeData(),
    keyInfoEngagementData: keyInfoEngagementData(),
    clientData: clientData(),
    siteDetails: siteDetailsData(),
    asCompleteBuildingDescription: asCompleteBuildingDescriptionData(),
    currentBuildingDescription: currentBuildingDescriptionData(),
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
    zoningDescriptionParking: zoningDescriptionParkingData()
};

const testDataOld = {
    "renovationDropValue": "Renovation",
    "renovationsPeriod": 12,
    "renovationTotalAmount": 106000,
    "renovationsCommentary": "The buyer reported a total prospective renovation budget of $106,000.00. Renovations are expected to take 12 months to complete.",
    "kitchenCondition": "Good",
    "kitchenFlooring": "Ceramic Tile",
    "counterTops": "Laminate",
    "cabinetry": "Natural Wood",
    "stovetops": "Standard Oven/Range",
    "refrigerators": "Standard",
    "bathroomCondition": "Good",
    "bathroomFlooring": "Ceramic Tile",
    "bathroomTub": "Bathtub/Shower Combo",
    "sink": "Laminate-top set in cabinet",
    "toilet": "Ceramic",
    "bedroomCondition": "Good",
    "bedroomFlooring": "Hardwood",
    "bedroomWalls": "Plaster",
    "livingCondition": "Good",
    "livingFlooring": "Hardwood",
    "livingWalls": "Plaster",
    "numberOfStairs": 2,
    "stairsStart": "Basement",
    "stairsEnd": "2nd floor",
    "stairsCommentary": "There are 2 staircases that run from the basement to the 2nd floor, one interior and one exterior.",
    "forecastLabel": "Developer's Forecast",
    "forecastColumn": "Rent Forecast",
    "isInspectedRowsToCheck": [0, 1],
    "roomsNumber": 4,
    "bedroomsNumber": 2,
    "rentType": "Market Rate",
    "leaseStatus": "Vacant",
    "forecastValue": 1120,
    "inPlaceRentRollCommentary": "8524 S Oglesby Ave. is expected to contain 6 units upon completion of the construction works; the developer's projected residential rent roll is presented below.",
    "unitType": "2 Bedroom",
    "averageSF": 700,
    "compID": "1",
    "firstCompData": {
        "address": "8416 S Escanaba Ave., Chicago, IL 60617", "monthly": 1050, "date": "04-09-2021",
        "footage": 0, "sourceInfo": "externalDatabase", "bedrooms": 2, "rooms": 4, "bathrooms": 0
    },
    "secondCompData": {
        "address": "8349 S Colfax Ave., Chicago, IL 60617", "monthly": 1000, "date": "04-09-2021",
        "footage": 0, "sourceInfo": "externalDatabase", "bedrooms": 2, "rooms": 4, "bathrooms": 0
    },
    "thirdCompData": {
        "address": "2815 E 81st St., Chicago, IL 60617", "monthly": 1000, "date": "04-09-2021",
        "footage": 0, "sourceInfo": "externalDatabase", "bedrooms": 2, "rooms": 4, "bathrooms": 0
    },
    "forthCompData": {
        "address": "8155 S Merrill Ave., Chicago, IL 60617", "monthly": 1150, "date": "04-09-2021",
        "footage": 0, "sourceInfo": "externalDatabase", "bedrooms": 2, "rooms": 4, "bathrooms": 0
    },
    "fifthCompData": {
        "address": "7957 S Marquette Ave., Chicago, IL 60617", "monthly": 1200, "date": "04-09-2021",
        "footage": 0, "sourceInfo": "externalDatabase", "bedrooms": 2, "rooms": 4, "bathrooms": 0
    },
    "sourceOfInfoText": "External Database",
    "compMapPath": "full_reports/full_bowery_multifamily_as_complete/comp_map.png",
    "reconcilIntroComm": "Important considerations in determining potential rental value include location, access to transportation and neighborhood amenities, and building design and condition. The subject is in a desirable section of Lakeview, a neighborhood that has seen significant investment in the past 5 to 10 years. The site has good access to  transportation, and the block is appealing. The comparables are similar in their physical and locational appeal and are good indicators of value. Thus, our analysis of the forecast of market rents is presented:",
    "marketConclusion": 1100,
    "marketBreakdownDropValue": "all market oriented",
    "reconcilCommentary": "The comparable two-bedroom units range from $1,000 to $1,200 per month with an average of $1,080 per month. Based on the subject's market rate rents and the range of the comparables, we forecast a market rent for the subject's two-bedroom units of $1,100 per month. Considering the range of the comparables and our market rent forecasts for the subject units, the subject's market rate units are all currently market oriented.",
    "monthlyRentStab": 1100,
    "rentRollDiscussionComm": "8524 S Oglesby Ave. will contain 6 residential units upon stabilization; the residential rent roll is summarized by unit type and rent regulation status.",
    "occupancyRateComm": "We note that the subject will contain 6 market rate residential units.",
    "marketAnnualRent": "$79,200.00",
    "stabRRSummary": "The average forecasted monthly rent is $1,100.",
    "grossIncomeDiscussion": "Based on our market rent conclusions, the residential rent roll is projected at 100% of market.",
    "distributionSummary": "We estimated the total leasable area and resulting average square footage per unit based on a loss factor of 10% applied to the GBA.",
    "tenantValue": "tenant",
    "ownerValue": "owner",
    "tenantObligationsCommentary": "In-unit electricity, cooking gas and heat. ",
    "ownerObligationsCommentary": "Common area electricity, refuse removal, water/sewer and common area maintenance. ",
    "parkingCommentary": "The subject property has 6 parking spaces available.",
    "resVacancyCollLossValue": 5,
    "coStarRate": 94,
    "vcLossCommentary": "CoStar reports the submarket rate near 94% and metro area rate near 94%. Based on 8524 South Oglesby Avenue's current and historical operating results, macro market conditions, and investor expectations, a 5.00% residential vacancy and collection loss has been applied. We note that the subject will contain 6 market rate residential units.",
    "concludedLiabilityBasisValue": "Per Unit",
    "taxAssessedLandValue": 5625,
    "taxAssessedBuildingValue": 8260,
    "taxClassName": "Cook County Class 2-11",
    "taxRateYear": 2020,
    "taxRateValue": 6.911,
    "taxLiabilityCommentary": "8524 S Oglesby Ave. is located in Chicago, Cook County, IL. It is designated on the tax maps as PIN 20-36-420-020-0000. We have applied the 2020 tax rate of 6.911% to the most recent assessed value of the property to determine its current tax liability.",
    "projectedLiabilityComm": "In order to determine the projected tax liability, we have applied a tax rate of 6.911% to our projection of the assessed value.",
    "firstTaxComp": {
        "address": "8326 S Brandon Ave", "yearBuilt": 1900, "basis": 4, "taxPerBasis": 556.6,
        "sourceOfInfo": "externalDatabase", "taxYear": 2020
    },
    "secondTaxComp": {
        "address": "2908 E 91st St", "yearBuilt": 1895, "basis": 8, "taxPerBasis": 437.09,
        "sourceOfInfo": "externalDatabase", "taxYear": 2020
    },
    "thirdTaxComp": {
        "address": "2922 E 90th St", "yearBuilt": 1962, "basis": 9, "taxPerBasis": 378.35,
        "sourceOfInfo": "externalDatabase", "taxYear": 2020
    },
    "forthTaxComp": {
        "address": "2748 E 83rd St", "yearBuilt": 1959, "basis": 8, "taxPerBasis": 482.16,
        "sourceOfInfo": "externalDatabase", "taxYear": 2020
    },
    "fifthTaxComp": {
        "address": "3004 E 79th Pl", "yearBuilt": 1965, "basis": 10, "taxPerBasis": 585.66,
        "sourceOfInfo": "externalDatabase", "taxYear": 2020
    },
    "taxCompsCommentary": "In order to support the forecasted real estate tax liability, we surveyed those of comparable buildings in the area.",
    "concludedLiabilityType": "Per Unit",
    "concludedLiabilityValue": 515.52,
    "taxSummaryCommentary": "The projection for the subject property’s taxes per unit falls within the market range and is considered reasonable. Thus, we apply the projected tax liability of $3,093.12 in our analysis.",
    "expensePeriod": "Projection",
    "expenseYear": 2022,
    "grossRevenue": 84240,
    "realEstateTaxes": 2402.06,
    "insuranceExpense": "clear",
    "electricityExpense": 8268,
    "fuelExpense": "clear",
    "payrollBenefitsExpense": 1464,
    "toeToBe": "$12,134.06",
    "expenseHistoryCommentary": "We were provided with the owner's pro forma for the subject property. Therefore, we analyzed the subject's operating expense projections, as well as expense reports of comparable properties, in developing our forecast of operating expenses. The data, analyzed in terms of residential units and gross square footage, is presented below.",
    "compExpensesFirstComp": {
        "address": "6001 S Sacramento Ave", "location": "Chicago", "period": "Projection",
        "squareFeet": 6608, "resUnits": 13, "insurance": 3900, "electricity": 12675, "repairsAndMaintenance": 5850,
        "payrollAndBenefits": 3900, "generalAndAdministrative": 2925, "management": 4899, "toe": "$34,149.00"
    },
    "compExpensesSecondComp": {
        "address": "7955 S Emerald Ave", "location": "Chicago", "period": "Projection",
        "squareFeet": 9000, "resUnits": 12, "insurance": 4525, "electricity": 6754, "repairsAndMaintenance": 6000,
        "payrollAndBenefits": 3104, "generalAndAdministrative": 2640, "management": 5383, "toe": "$28,406.00"
    },
    "compExpensesThirdComp": {
        "address": "7613 S Kingston Ave", "location": "Chicago", "period": "Projection",
        "squareFeet": 9750, "resUnits": 13, "insurance": 4200, "electricity": 15917, "repairsAndMaintenance": 5200,
        "payrollAndBenefits": 3357, "generalAndAdministrative": 2275, "management": 5902, "toe": "$36,851.00"
    },
    "compExpensesForthComp": {
        "address": "7655 S Coles Ave", "location": "Chicago", "period": "Projection",
        "squareFeet": 12771, "resUnits": 13, "insurance": 5161, "electricity": 6151, "repairsAndMaintenance": 5850,
        "payrollAndBenefits": 6248, "generalAndAdministrative": 2300, "management": 6529, "toe": "$32,239.00"
    },
    "compExpensesFifthComp": {
        "address": "2320 E 70th Street", "location": "Chicago", "period": "Projection",
        "squareFeet": 7250, "resUnits": 8, "insurance": 3200, "electricity": 3800, "repairsAndMaintenance": 3200,
        "payrollAndBenefits": 5000, "generalAndAdministrative": 1880, "management": 5464.8, "toe": "$22,544.80"
    },
    "perSf": "sf",
    "perUnit": "unit",
    "insuranceForecast": 350,
    "forecastItems": ["insurance", "electricity", "fuel", "waterAndSewer", "repairsAndMaintenance", "payrollAndBenefits",
        "generalAndAdministrative", "legalAndProfessionalFees", "miscellaneous", "management", "reserves", "total"],
    "electricityForecast": 1380,
    "repairsForecast": 450,
    "payrollForecast": 350,
    "generalForecast": 200,
    "effectiveGrossIncome": 75240,
    "percentOfEgi": 4,
    "reservesForecast": 200,
    "totalPotentialResIncome": "$79,200",
    "psfPotentialResIncome": "$16.74",
    "perUnitPotResIncome": "$13,200",
    "vcLossRow": {"total": "-$3,960", "perSF": "-$0.84", "perUnit": "-$660"},
    "effectiveGrossRow": {"total": "$75,240", "perSF": "$15.90", "perUnit": "$12,540"},
    "reTaxesRow": {"total": "$3,093", "perSF": "$0.65", "perUnit": "$516"},
    "insuranceRow": {"total": "$2,100", "perSF": "$0.44", "perUnit": "$350"},
    "electricityRow": {"total": "$8,280", "perSF": "$1.75", "perUnit": "$1,380"},
    "repairsRow": {"total": "$2,700", "perSF": "$0.57", "perUnit": "$450"},
    "payrollRow": {"total": "$2,100", "perSF": "$0.44", "perUnit": "$350"},
    "generalRow": {"total": "$1,200", "perSF": "$0.25", "perUnit": "$200"},
    "managementRow": {"total": "$3,010", "perSF": "$0.64", "perUnit": "$502"},
    "reservesRow": {"total": "$1,200", "perSF": "$0.25", "perUnit": "$200"},
    "toeRow": {"total": "$23,683", "perSF": "$5.00", "perUnit": "$3,947"},
    "toeNetReRow": {"total": "$20,590", "perSF": "$4.35", "perUnit": "$3,432"},
    "netOpIncomeRow": {"total": "$51,557", "perSF": "$10.90", "perUnit": "$8,593"},
    "opExpenseRatio": "31.48%",
    "incomeCapComm": "In developing an opinion of the overall capitalization rate required by an investor, we will apply several methods of analyses: (1) Band of Investment; (2) Comparable Capitalization Rates; and (3) National Survey Responses.",
    "mortgageComponentCommentary": "After surveying several commercial mortgage lenders, it is our opinion that a typical creditworthy purchaser could obtain financing from a lending source in an amount equal to 75% of value at an annual interest rate of 4% and a 30-year payout. Therefore, the mortgage constant is 0.0573.",
    "equityDividendRate": "20",
    "bandInvestmentCommentary": "We believe an investor in the subject property would accept an initial annual return of 20% in anticipation of a stable income flow and property appreciation over time. It should be emphasized that the equity dividend rate is not necessarily the same as an equity yield rate or true rate of return on equity capital. The equity dividend rate is an equity capitalization that reflects all benefits that can be recognized by the equity investor as of the date of purchase. We selected this rate based on the subject's location in a good residential area, and its good access and visibility. We summarize the mortgage and equity parameters utilized in our derivation of an overall capitalization rate.",
    "bandOfInvestmentsValue": "9.3%",
    "pwcValue": "3-7%",
    "situsValue": "3.8-5%",
    "firstCapRateComp": {
        "stateValue": "Other",
        "address": "7900 S Merrill Ave.",
        "id": "1",
        "source": "externalDatabase",
        "sourceName": "CoStar",
        "sourceUrl": "https://product.costar.com/detail/lookup/4101421/sale",
        "gba": 15471,
        "type": "multifamily",
        "isElevatored": false,
        "numberOfUnits": 15,
        "isListing": false,
        "isInContract": false,
        "saleDate": "10-16-2020",
        "yearBuilt": 0,
        "pricePerSF": "N/A",
        "capRate": "8.69"
    },
    "secondCapRateComp": {
        "stateValue": "Other",
        "address": "8121 S Colfax Ave., Chicago, Illinois 60617",
        "id": "1",
        "source": "externalDatabase",
        "sourceName": "CoStar",
        "sourceUrl": "https://product.costar.com/detail/lookup/10566744/summary",
        "gba": 6300,
        "type": "multifamily",
        "isElevatored": false,
        "numberOfUnits": 6,
        "isListing": false,
        "isInContract": false,
        "saleDate": "04-29-2021",
        "yearBuilt": 1920,
        "pricePerSF": "N/A",
        "capRate": "9.05"
    },
    "thirdCapRateComp": {
        "stateValue": "Other",
        "address": "8109 S Colfax Ave.",
        "id": "1",
        "source": "externalDatabase",
        "sourceName": "CoStar",
        "sourceUrl": "https://product.costar.com/detail/sale-comps/default/Comp/5504232/summary",
        "gba": 6300,
        "type": "multifamily",
        "isElevatored": false,
        "numberOfUnits": 6,
        "isListing": false,
        "isInContract": false,
        "saleDate": "05-17-2021",
        "yearBuilt": 1920,
        "pricePerSF": "N/A",
        "capRate": "9.09"
    },
    "forthCapRateComp": {
        "stateValue": "Other",
        "address": "7932 S Kingston Ave., Chicago, Illinois 60617",
        "id": "1",
        "source": "externalDatabase",
        "sourceName": "CoStar",
        "sourceUrl": "https://product.costar.com/detail/lookup/8896305/summary",
        "gba": 8700,
        "type": "multifamily",
        "isElevatored": false,
        "numberOfUnits": 6,
        "isListing": false,
        "isInContract": false,
        "saleDate": "08-16-2021",
        "yearBuilt": 1926,
        "pricePerSF": "N/A",
        "capRate": "11.44"
    },
    "fifthCapRateComp": {
        "stateValue": "Other",
        "address": "8041 S Manistee Ave., Chicago, Illinois 60617",
        "id": "1",
        "source": "externalDatabase",
        "sourceName": "CoStar",
        "sourceUrl": "https://product.costar.com/detail/sale-comps/default/Comp/5672762/summary/58557721",
        "gba": 13387,
        "type": "multifamily",
        "isElevatored": false,
        "numberOfUnits": 8,
        "isListing": false,
        "isInContract": false,
        "saleDate": "09-23-2021",
        "yearBuilt": 1930,
        "pricePerSF": "N/A",
        "capRate": "9.31"
    },
    "sixthCapRateComp": {
        "stateValue": "Other",
        "address": "8103 S Luella Ave., Chicago, Illinois 60617",
        "id": "1",
        "source": "externalDatabase",
        "sourceName": "External Database",
        "sourceUrl": "https://traded.co/property/8103-south-luella-avenue/",
        "gba": 6420,
        "type": "multifamily",
        "isElevatored": false,
        "numberOfUnits": 6,
        "isListing": false,
        "isInContract": false,
        "saleDate": "09-24-2021",
        "yearBuilt": 1925,
        "pricePerSF": "N/A",
        "capRate": "10.08"
    },
    "compIncomePotential": "Similar",
    "compPropertyConditions": "Similar",
    "compPropertyLocations": "Similar",
    "concludedCapRate": 10,
    "asCompleteMonthsOfRentLoss": 12,
    "asStabilizedMonthsOfRentLoss": 0,
    "roundingFactorValue": 10000,
    "netOperatingIncome": "$51,557.28",
    "asStabilizedPeriod": "10/13/2022",
    "asStabilizedFinalValue": "$520,000",
    "asCompleteAmountValue": "$515,573",
    "asCompleteLessEntrepreneurialProfit": 25,
    "asIsMarketPeriod": "10/13/2021",
    "asIsMarketAmount": "$383,073",
    "asIsMarketFinalValue": "$380,000",
    "asIsMarketPerUnit": "$63,333",
    "asIsMarketPerSF": "$80.30",
    "firstSalesComp": {"address": "7748 S Colfax Ave.", "capRate": "remove"},
    "secondSalesComp": {"address": "8138 S Exchange Ave.", "capRate": "remove"},
    "thirdSalesComp": {"address": "8041 S Manistee Ave.", "capRate": "9.31%"},
    "forthSalesComp": {"address": "7926 S Luella Ave.", "capRate": "remove"},
    "fifthSalesComp": {"address": "8103 S Luella Ave.", "capRate": "10.08%"},
    "calculationUnitsRadioValue": "false",
    "incomeAdjustmentType": "None",
    "firstAdjustComp": {
        "size": 0,
        "condition": 5,
        "other": -5,
        "trendedPrice": "$90,000.00",
        "adjustedPrice": "$90,000.00"
    },
    "secondAdjustComp": {
        "size": 5,
        "condition": 5,
        "other": -5,
        "trendedPrice": "$78,125.00",
        "adjustedPrice": "$82,031.25"
    },
    "thirdAdjustComp": {
        "size": 0,
        "condition": 0,
        "other": -5,
        "trendedPrice": "$101,666.67",
        "adjustedPrice": "$96,583.33"
    },
    "forthAdjustComp": {
        "size": 10,
        "condition": 0,
        "other": -5,
        "trendedPrice": "$91,666.67",
        "adjustedPrice": "$96,250.00"
    },
    "fifthAdjustComp": {
        "size": 0,
        "condition": 5,
        "other": -5,
        "trendedPrice": "$86,666.67",
        "adjustedPrice": "$86,666.67"
    },
    "otherAdjustmentNewName": "Average Unit Size Adjustment",
    "unadjustedPriceAvg": "$89,625.00",
    "unadjustedPriceMedian": "$90,000.00",
    "adjustedPriceAvg": "$90,306.25",
    "adjustedPriceMedian": "$90,000.00",
    "incomeApproachConclusion": "$85,929 per unit",
    "saleValueConclusion": 90000,
    "conclusionAsStabilizedAmount": "$540,000",
    "conclusionAsCompleteAmount": "$540,000",
    "conclusionAsIsMarketAmount": "$407,500",
    "conclusionAsIsMarketFinalValue": "$410,000",
    "stabilizedCompleteDate": "October 13, 2022",
    "marketDate": "October 13, 2021",
    "finalValueApproach": "Income",
    "contractDateForPropSale": "9/14/2021",
    "extraordinaryAssumption": "Some specific assumption about COVID-19",
    "propertyCondition": "Good",
    "complyingBulk": "Complying",
    "conformingUse": "Conforming",
    "subjectMarketCharacteristicsAndPropTypeValue": "Residential",
    "feasiblePropertyType": "multifamilyApartment",
    "feasiblePropTypeWord": "Multifamily Apartment",
    "readyForOccupancyValues": ["N/A", "N/A"],
    "capRateTable": {"min": "8.69%", "max": "11.44%", "average": "9.61%"},
    "pwcRow": {"min": "3.50%", "average": "5.03%", "max": "7.00%"},
    "situsRow": {"min": "4.00%", "average": "5.20%", "max": "6.00%"},
    "capRateCompsTable": {"income": "Similar", "propConditions": "Similar", "location": "Similar"},
    "incomeSpikesTable": {
        "capRate": "10.00%",
        "occupancy": "0.00%",
        "percentageMarketRate": "100.00%",
        "condition": "Good"
    },
    "incomeSpikesRadios": {
        "incomePotential": "Limited",
        "marketConditions": "Moderately Appreciating",
        "flowRisk": "Moderate Risk"
    },
    "subjectState": "Illinois",
    "subjectLocale": "Chicago"
};