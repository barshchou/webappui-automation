const testData = require("../../fixtures/full_reports/chicago_8524_South/chicago8524South.fixtures.json");
import homepageActions from "../../actions/base/homepage.actions";
import keyInfoActions from "../../actions/report/keyInfo.actions";
import navSectionActions from "../../actions/base/navigationSection.actions";
import clientActions from "../../actions/report/client.actions";
import summaryActions from "../../actions/property/summary.actions";
import marketActions from "../../actions/property/market.actions";
import historyActions from "../../actions/property/history.actions";
import descriptionActions from "../../actions/property/description.actions";
import siteDescriptionActions from "../../actions/property/siteDescription.actions";
import mapsActions from "../../actions/property/maps.actions";
import utilitiesActions from "../../actions/property/utilities.actions";
import amenitiesActions from "../../actions/property/amenities.actions";
import photosActions from "../../actions/property/photos.actions";
import zoningActions from "../../actions/property/zoning.actions";
import renovationsActions from "../../actions/property/renovations.actions";
import residentialUnitsActions from "../../actions/property/residentialUnits.actions";
import inPlaceRentRollActions from "../../actions/income/residential/rentRoll.actions";
import unitGroupsActions from "../../actions/income/residential/unitGroups.actions";
import rentCompsActions from "../../actions/income/residential/rent_comps/rentComps.actions";
import addCompFormActions from "../../actions/income/residential/rent_comps/addCompForm.actions";
import rentCompsMapActions from "../../actions/income/residential/rentCompsMap.actions";
import rentReconciliationActions from "../../actions/income/residential/rentReconciliation.actions";
import stabilizedRentRollActions from "../../actions/income/residential/stabilizedRentRoll.actions";

describe("Full doesn't Freddie Mac, only residential, multifamily report ", () => {
   it("Test", () => {
      cy.loginByApi();
      homepageActions.createReportAdvancedSearch(testData.state, testData.address, testData.propIdentifierType,
          testData.identifier, testData.reportNumber, testData.templateType, testData.incomeType, testData.conclusionType);
      keyInfoActions.choosePurpose(testData.purposeValue);
      keyInfoActions.checkAllInterestAppraisedByValues(testData.interestAppraised);
      keyInfoActions.enterDateByType(testData.dueDate, testData.dueType);
      keyInfoActions.enterDateByType(testData.dateOfValuation, testData.valuationType);
      keyInfoActions.uploadFile(testData.engagementFileName);
      navSectionActions.openClientPageInReport();
      clientActions.enterClientName(testData.clientName);
      navSectionActions.navigateToPropertySummary();
      summaryActions.verifySiteDetails(testData.streetAddressToBe, testData.censusTract, testData.streetNameToBe,
          testData.buildingDescriptor, testData.propIdentifierType, testData.identifier);
      summaryActions.enterYearBuilt(testData.yearBuilt);
      summaryActions.enterSiteArea(testData.siteArea);
      summaryActions.fillAsCompleteBuildingDescription(testData.grossArea, testData.numberOfUnits, testData.floorsNumber);
      summaryActions.clickWalkUpTypeButtons();
      summaryActions.fillCurrentBuildDescription(testData.grossArea, testData.numberOfUnits, testData.floorsNumber);
      summaryActions.editAsCompleteExport(testData.asCompleteExportText);
      summaryActions.clickSaveContinueButton();
      marketActions.verifyTimeOnMarket(testData.minExposureMonths, testData.maxExposureMonths);
      marketActions.fillMarketResearch(testData);
      marketActions.clickPullFromDropbox();
      marketActions.verifyAnyDocumentInputIsNotEmpty();
      marketActions.clickSaveContinueButton();
      historyActions.enterCurrentOwner(testData.currentOwner);
      historyActions.checkIsUnderContractCheckbox();
      historyActions.enterContractDetails(testData.buyer, testData.contractDate, testData.contractPrice);
      photosActions.clickSaveContinueButton();
      descriptionActions.selectGeneralPropertyCondition(testData.generalPropertyCondition);
      descriptionActions.selectAsStabilizedPropertyCondition(testData.stabilizedCondition);
      descriptionActions.checkListCheckboxesByLabels(testData.locationsInspectedLabels);
      descriptionActions.checkStairConditionByValue(testData.stairCondition);
      descriptionActions.checkFoundationByValue(testData.foundationValue);
      descriptionActions.checkStructuralSystemByValue(testData.structuralSystemValue);
      descriptionActions.checkListCheckboxesByLabels(testData.externalWallsLabels);
      descriptionActions.checkFramingByValue(testData.framingValue);
      descriptionActions.checkRoofTypeByValue(testData.roofType);
      descriptionActions.checkListCheckboxesByLabels(testData.windowsLabels);
      descriptionActions.checkListCheckboxesByLabels(testData.plumbingLabels);
      descriptionActions.checkSprinklersByValue(testData.sprinklersValue);
      descriptionActions.checkListCheckboxesByLabels(testData.securityLabels);
      descriptionActions.checkContainsBasement();
      descriptionActions.checkListCheckboxesByLabels(testData.basementAccess);
      descriptionActions.checkBasementStateByValue(testData.basementState);
      descriptionActions.verifyTotalEconomicLife(testData.totalEconomicLifeToBe);
      descriptionActions.enterAgeEffective(testData.ageEffective);
      descriptionActions.clickSaveContinueButton();
      siteDescriptionActions.editTransportationDiscussionCommentary(testData.transportationCommentary);
      siteDescriptionActions.checkSurroundingResidental();
      siteDescriptionActions.verifySiteArea(testData.siteArea);
      siteDescriptionActions.verifyPropertyShape(testData.propertyShape);
      navSectionActions.openMapsInProperty();
      mapsActions.enterPropertyFrontage(testData.propertyFrontage);
      navSectionActions.openSiteDescriptionInProperty();
      siteDescriptionActions.verifyPropertyFrontage(testData.propertyFrontage);
      siteDescriptionActions.verifySiteDescriptionItems(testData.siteDescriptionItems);
      siteDescriptionActions.editFloodHazardCommentary(testData.floodHazardCommentary);
      siteDescriptionActions.verifyUtilitiesItems(testData.utilitiesItems);
      siteDescriptionActions.verifyUtilitiesDescriptions(testData.utilitiesDescription);
      siteDescriptionActions.clickSaveContinueButton();
      utilitiesActions.checkHeatingSystem();
      utilitiesActions.addHeatingSystemParameters(testData.heatingCoolingSystemType, testData.allSystemsLocation);
      utilitiesActions.checkCoolingSystem();
      utilitiesActions.addCoolingSystemParameters(testData.heatingCoolingSystemType, testData.allSystemsLocation);
      utilitiesActions.verifyHeatingCoolingCommentary(testData.heatingCollingCommentary);
      utilitiesActions.checkGasMeters();
      utilitiesActions.addGasMetersParameters(testData.gasElectricMetersType, testData.allSystemsLocation);
      utilitiesActions.verifyGasMetersCommentary(testData.gasMetersCommentary);
      utilitiesActions.checkElectricMetersCheckbox();
      utilitiesActions.addElectricMetersParameters(testData.gasElectricMetersType, testData.allSystemsLocation);
      utilitiesActions.verifyElectricMetersCommentary(testData.electricComm);
      utilitiesActions.checkHotWaterSystemsCheckbox();
      utilitiesActions.addHotWaterSystemParameters(testData.hotWaterSystemType, testData.allSystemsLocation);
      utilitiesActions.verifyHotWaterSystemCommentary(testData.hotWaterSystemCommentary);
      utilitiesActions.clickSaveContinueButton();
      amenitiesActions.addParkingPlaces(testData.numberOfParkingPlaces);
      amenitiesActions.checkHasNoUnitAmenities();
      amenitiesActions.clickSaveContinueButton();
      mapsActions.uploadZoningMap(testData.zoningMapFileName);
      mapsActions.uploadFloodMap(testData.floodMapFileName);
      mapsActions.chooseCornerByValue(testData.cornerValue);
      mapsActions.uploadTaxMap(testData.taxMapFileName);
      mapsActions.captureSubjectMap();
      mapsActions.clickSaveContinueButton();
      photosActions.uploadPhotosBySectionName(testData.facadeSection, testData.facadePhotosFolder,
          testData.facadePhotosFileNames);
      photosActions.uploadPhotosBySectionName(testData.subjectSection, testData.subjectStreetPhotosFolder,
          testData.subjectStreetFileNames);
      photosActions.uploadPhotosBySectionName(testData.exteriorSection, testData.exteriorEntranceFolder,
          testData.exteriorEntranceFileNames);
      photosActions.uploadPhotosBySectionName(testData.stairwaySection, testData.typicalStairwayFolder,
          testData.typicalStairwayFiles);
      photosActions.uploadPhotosBySectionName(testData.hallwaySection, testData.typicalHallwayFolder,
          testData.typicalHallwayFiles);
      photosActions.uploadPhotosBySectionName(testData.kitchenSection, testData.kitchenFolder, testData.kitchenFiles);
      photosActions.uploadPhotosBySectionName(testData.bathroomSection, testData.bathroomFolder,
          testData.bathroomFiles);
      photosActions.uploadPhotosBySectionName(testData.bedroomSection, testData.bedroomFolder, testData.bedroomFiles);
      photosActions.uploadPhotosBySectionName(testData.livingRoomSection, testData.livingRoomFolder,
          testData.livingRoomFiles);
      photosActions.uploadPhotosBySectionName(testData.electricMetersSection, testData.electricMetersFolder,
          testData.electricMetersFiles);
      photosActions.uploadPhotosBySectionName(testData.gasMetersSection, testData.gasMetersFolder,
          testData.gasMetersFiles);
      photosActions.editSectionName(testData.heatingSystemSectionOldName, testData.heatingSystemNewName);
      photosActions.clickSaveButton();
      photosActions.verifyProgressBarNotExist();
      cy.reload();
      photosActions.uploadPhotosBySectionName(testData.heatingSystemNewName, testData.heatingSystemFolder,
          testData.heatingSystemPhotos);
      photosActions.uploadPhotosBySectionName(testData.hotWaterSection, testData.hotWaterFolder,
          testData.hotWaterPhotos);
      photosActions.clickSaveContinueButton();
      zoningActions.enterZoneNames(testData.zonesNames);
      zoningActions.verifyPropertyIdentification(testData.siteArea, testData.cityToBe);
      zoningActions.verifyPropIdentificationCommentary(testData.siteArea, testData.zonesNames[0],
          testData.cityToBe, testData.propIdentifierType, testData.identifier);
      zoningActions.verifyIntroductionCommentary(testData.streetAddressToBe, testData.zonesNames[0]);
      zoningActions.clickUsesTab();
      zoningActions.choosePermittedPropertyUse(testData.propertyUse);
      zoningActions.chooseCurrentPropertyUse(testData.propertyUse);
      zoningActions.chooseIsConformingAllowableUses();
      zoningActions.verifyConformingUseCommentary(testData.zonesNames, true, testData.permittedUses,
          testData.streetAddressToBe, testData.currentUses);
      zoningActions.clickBulkTab();
      zoningActions.deleteRowsByRegulationValues(testData.regulationValues);
      zoningActions.addBulkRegulation(testData.regulationNew);
      zoningActions.editAllDataByRegName(testData.regulationExist1);
      zoningActions.editAllDataByRegName(testData.regulationExist2);
      zoningActions.editAllDataByRegName(testData.regulationExist3);
      zoningActions.editAllDataByRegName(testData.regulationExist4);
      zoningActions.verifyComplyingCommentary(testData.complyingCommentary);
      zoningActions.clickParkingTab();
      zoningActions.verifyParkingResidentalUnits(testData.numberOfUnits);
      zoningActions.verifyActualParkingSpaces(testData.numberOfParkingPlaces);
      zoningActions.enterRequiredParkingSpaces(testData.requiredParkingPlaces);
      zoningActions.chooseIsConformingWithParkingRequirements();
      zoningActions.verifyParkingConformityCommentary(testData.requiredParkingPlaces, testData.numberOfParkingPlaces);
      zoningActions.clickSaveContinueButton();
      renovationsActions.chooseRenovationByValue(testData.renovationDropValue);
      renovationsActions.clickTotalButton();
      renovationsActions.fillTotalTable(testData.renovationsPeriod, testData.totalAmount);
      renovationsActions.verifyNetTotalRenovationBudget(testData.totalAmount);
      renovationsActions.editCommentary(testData.renovationsCommentary);
      renovationsActions.clickSaveContinueButton();
      residentialUnitsActions.fillKitchenDescription(testData.kitchenCondition, testData.kitchenFlooring, testData.counterTops,
          testData.cabinetry, testData.stovetops, testData.refrigerators);
      residentialUnitsActions.verifyKitchenConditionCommentary(testData.kitchenCondition, testData.kitchenFlooring, testData.counterTops,
          testData.cabinetry, testData.stovetops, testData.refrigerators);
      residentialUnitsActions.fillBathroomDescription(testData.bathroomCondition, testData.bathroomFlooring, testData.bathroomTub,
          testData.sink, testData.toilet);
      residentialUnitsActions.verifyBathroomCommentary(testData.bathroomCondition, testData.bathroomFlooring, testData.bathroomTub,
          testData.sink, testData.toilet);
      residentialUnitsActions.fillBedroomDescription(testData.bedroomCondition, testData.bedroomFlooring, testData.bedroomWalls);
      residentialUnitsActions.verifyBedroomCommentary(testData.bedroomCondition, testData.bedroomFlooring, testData.bedroomWalls);
      residentialUnitsActions.fillLivingRoomDescription(testData.livingCondition, testData.livingFlooring, testData.livingWalls);
      residentialUnitsActions.verifyLivingRoomCommentary(testData.livingCondition, testData.livingFlooring, testData.livingWalls);
      residentialUnitsActions.fillStairsDescription(testData.numberOfStairs, testData.stairsStart, testData.stairsEnd);
      residentialUnitsActions.editStairsCommentary(testData.stairsCommentary);
      residentialUnitsActions.clickSaveContinueButton();
      inPlaceRentRollActions.verifyNumberOFResidentialUnits(testData.numberOfUnits);
      inPlaceRentRollActions.checkCheckboxByLabelAndVerify(testData.forecastLabel, testData.forecastColumn);
      inPlaceRentRollActions.checkListIsInspectedByRowNumbers(testData.isInspectedRowsToCheck);
      inPlaceRentRollActions.enterUnitNumbersByOrderToAll(testData.numberOfUnits);
      inPlaceRentRollActions.enterAllEqualRoomsNumber(testData.roomsNumber, testData.numberOfUnits);
      inPlaceRentRollActions.enterAllEqualBedroomsNumber(testData.bedroomsNumber, testData.numberOfUnits);
      inPlaceRentRollActions.fillAllRentTypeCellsWithEqualValue(testData.rentType);
      inPlaceRentRollActions.enterAllEqualLeaseStatuses(testData.leaseStatus, testData.numberOfUnits);
      inPlaceRentRollActions.enterAllEqualForecast(testData.forecastValue, testData.numberOfUnits);
      inPlaceRentRollActions.verifyMonthlyTotalForecastEqualValue(testData.forecastValue, testData.numberOfUnits);
      inPlaceRentRollActions.verifyAnnuallyTotalForecastEqualValue(testData.forecastValue, testData.numberOfUnits);
      inPlaceRentRollActions.verifyRentRollCommentary(testData.inPlaceRentRollCommentary);
      inPlaceRentRollActions.clickSaveContinueButton();
      unitGroupsActions.verifyRowsNumberEqualBedroomsNonComp(testData.bedroomsNumber, testData.numberOfUnits);
      unitGroupsActions.verifyGLAPercentage();
      unitGroupsActions.verifyRoomSize();
      unitGroupsActions.verifyGLAValue(testData.grossArea);
      unitGroupsActions.enterAvgSFByUnitTypeValue(testData.unitType, testData.averageSF);
      unitGroupsActions.verifyGLACellValue(testData.grossArea);
      unitGroupsActions.verifyTotalAvgSqftEqualUnits(testData.averageSF, testData.numberOfUnits);
      unitGroupsActions.clickSaveContinueButton();
      rentCompsActions.openAddNewComparableFormAdvanced(testData.firstCompData.address, testData.state, testData.compID);
      addCompFormActions.fillNewRentCompWithoutNumbTypeSourceNameUrlNoteAmenities(testData.firstCompData);
      rentCompsActions.openAddNewComparableFormAdvanced(testData.secondCompData.address, testData.state, testData.compID);
      addCompFormActions.fillNewRentCompWithoutNumbTypeSourceNameUrlNoteAmenities(testData.secondCompData);
      rentCompsActions.openAddNewComparableFormAdvanced(testData.thirdCompData.address, testData.state, testData.compID);
      addCompFormActions.fillNewRentCompWithoutNumbTypeSourceNameUrlNoteAmenities(testData.thirdCompData);
      rentCompsActions.openAddNewComparableFormAdvanced(testData.forthCompData.address, testData.state, testData.compID);
      addCompFormActions.fillNewRentCompWithoutNumbTypeSourceNameUrlNoteAmenities(testData.forthCompData);
      rentCompsActions.openAddNewComparableFormAdvanced(testData.fifthCompData.address, testData.state, testData.compID);
      addCompFormActions.fillNewRentCompWithoutNumbTypeSourceNameUrlNoteAmenities(testData.fifthCompData);
      rentCompsActions.verifyComparableBedroomTableByNumber(0, testData.firstCompData.rooms, testData.firstCompData.bedrooms,
          testData.firstCompData.monthly, testData.sourceOfInfoText);
      rentCompsActions.verifyComparableBedroomTableByNumber(1, testData.secondCompData.rooms, testData.secondCompData.bedrooms,
          testData.secondCompData.monthly, testData.sourceOfInfoText);
      rentCompsActions.verifyComparableBedroomTableByNumber(2, testData.thirdCompData.rooms, testData.thirdCompData.bedrooms,
          testData.thirdCompData.monthly, testData.sourceOfInfoText);
      rentCompsActions.verifyComparableBedroomTableByNumber(3, testData.forthCompData.rooms, testData.forthCompData.bedrooms,
          testData.forthCompData.monthly, testData.sourceOfInfoText);
      rentCompsActions.verifyComparableBedroomTableByNumber(4, testData.fifthCompData.rooms, testData.fifthCompData.bedrooms,
          testData.fifthCompData.monthly, testData.sourceOfInfoText);
      rentCompsActions.clickSaveContinueButton();
      rentCompsMapActions.uploadCompMap(testData.compMapPath);
      rentCompsMapActions.clickSaveContinueButton();
      rentReconciliationActions.verifyIntroCommentary(testData.reconcilIntroComm);
      rentReconciliationActions.expandBedroomReconByNumber(testData.bedroomsNumber);
      rentReconciliationActions.verifyBedroomMinForecastByNumber(testData.bedroomsNumber, testData.forecastValue);
      rentReconciliationActions.verifyBedroomAvgForecastByNumber(testData.bedroomsNumber, testData.numberOfUnits, testData.forecastValue);
      rentReconciliationActions.verifyBedroomMaxForecastByNumber(testData.bedroomsNumber, testData.forecastValue);
      rentReconciliationActions.verifyBedroomMinCompByNumber(testData.bedroomsNumber, testData.firstCompData.monthly,
          testData.secondCompData.monthly, testData.thirdCompData.monthly, testData.forthCompData.monthly, testData.fifthCompData.monthly);
      rentReconciliationActions.verifyBedroomAvgCompByNumber(testData.bedroomsNumber, testData.firstCompData.monthly,
          testData.secondCompData.monthly, testData.thirdCompData.monthly, testData.forthCompData.monthly, testData.fifthCompData.monthly);
      rentReconciliationActions.verifyBedroomMaxCompByNumber(testData.bedroomsNumber, testData.firstCompData.monthly,
          testData.secondCompData.monthly, testData.thirdCompData.monthly, testData.forthCompData.monthly, testData.fifthCompData.monthly);
      rentReconciliationActions.enterBedroomMarketConclusionByNumber(testData.bedroomsNumber, testData.marketConclusion);
      rentReconciliationActions.selectBedroomMarketBreakdownBedByNumber(testData.bedroomsNumber, testData.marketBreakdownDropValue);
      rentReconciliationActions.editBedroomCommentaryByBedNum(testData.bedroomsNumber, testData.reconcilCommentary);
      rentReconciliationActions.clickSaveContinueButton();
      stabilizedRentRollActions.verifyUnitTypeAndRentConclusion(testData.unitType, testData.marketConclusion);
      stabilizedRentRollActions.verifyRowsNumber(testData.numberOfUnits);
      stabilizedRentRollActions.verifyCheckedIsInspected(testData.isInspectedRowsToCheck);
      stabilizedRentRollActions.verifyUnitsNumberByOrder();
      stabilizedRentRollActions.verifyAllRoomsNumbers(testData.roomsNumber);
      stabilizedRentRollActions.verifyAllBedroomsNumbers(testData.bedroomsNumber);
      stabilizedRentRollActions.verifyAllRentTypeCells(testData.rentType);
      stabilizedRentRollActions.enterAllMonthlyRents(testData.monthlyRentStab);
      stabilizedRentRollActions.verifyTotalMonthlyRent(testData.numberOfUnits, testData.monthlyRentStab);
      stabilizedRentRollActions.verifyTotalAnnualRent();
      stabilizedRentRollActions.verifyAllPerRoomCells(testData.roomsNumber, testData.monthlyRentStab);
      stabilizedRentRollActions.verifyAllLeaseStatusesCells(testData.leaseStatus);
      stabilizedRentRollActions.verifyAllRentForecasts(testData.forecastValue);
      stabilizedRentRollActions.verifyTotalMonthlyForecast(testData.numberOfUnits, testData.forecastValue);
      stabilizedRentRollActions.verifyTotalAnnualForecast();
      stabilizedRentRollActions.verifyRentRollDiscussionCommentary(testData.rentRollDiscussionComm);
      stabilizedRentRollActions.editOccupancyRateCommentary(testData.occupancyRateComm);
      stabilizedRentRollActions.clickSaveContinueButton();
   });
});
