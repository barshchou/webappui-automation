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
import stabRentRollSummaryActions from "../../actions/income/residential/stabRentRollSummary.actions";
import expensesStructureActions from "../../actions/income/residential/expenseStructure.actions";
import laundryActions from "../../actions/income/miscellaneous/laundry.actions";
import storageActions from "../../actions/income/miscellaneous/storage.actions";
import parkingActions from "../../actions/income/miscellaneous/parking.actions";
import otherActions from "../../actions/income/miscellaneous/other.actions";
import grossIncomeActions from "../../actions/income/potentialGrossIncome.actions";
import taxInfoActions from "../../actions/income/taxInfo.actions";
import expenseHistoryActions from "../../actions/income/expenseHistory.actions";
import compExpensesActions from "../../actions/income/comparableExpenses.actions";
import expenseForecastActions from "../../actions/income/expenseForecast.actions";
import proFormaActions from "../../actions/income/proForma.actions";
import supportingCapRatesActions from "../../actions/income/supportingCapRates.actions";
import capRateConclusionActions from "../../actions/income/capRateConclusion.actions";
import capRateCompsActions from "../../actions/final/capRateComps.actions";
import findCompsActions from "../../actions/sales/findComps.actions";
import createSalesCompMap from "../../actions/sales/createCompMap.actions";
import adjustCompsActions from "../../actions/sales/adjustComps.actions";
import valueConclusionActions from "../../actions/sales/valueConclusion.actions";

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
      renovationsActions.fillTotalTable(testData.renovationsPeriod, testData.renovationTotalAmount);
      renovationsActions.verifyNetTotalRenovationBudget(testData.renovationTotalAmount);
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
      stabRentRollSummaryActions.verifyAnnualRentByRow(testData.marketAnnualRent);
      stabRentRollSummaryActions.verifyTotalAnnualRent(testData.marketAnnualRent);
      stabRentRollSummaryActions.verifyIncreaseValueByRow();
      stabRentRollSummaryActions.verifyPGICellByRow(testData.marketAnnualRent);
      stabRentRollSummaryActions.verifyPGITotal(testData.marketAnnualRent);
      stabRentRollSummaryActions.openDiscussionTab();
      stabRentRollSummaryActions.verifyStabRRSummaryDiscussion(testData.stabRRSummary);
      stabRentRollSummaryActions.verifyGrossIncomeDiscussion(testData.grossIncomeDiscussion);
      stabRentRollSummaryActions.verifyDistributionSummary(testData.distributionSummary);
      stabRentRollSummaryActions.clickSaveContinueButton();
      expensesStructureActions.checkHeatExpensesByValue(testData.tenantValue);
      expensesStructureActions.checkElectricityByValue(testData.tenantValue);
      expensesStructureActions.checkCommonElectricityByValue(testData.ownerValue);
      expensesStructureActions.checkGasByValue(testData.tenantValue);
      expensesStructureActions.checkRefuseRemovalByValue(testData.ownerValue);
      expensesStructureActions.checkWaterSewerByValue(testData.ownerValue);
      expensesStructureActions.checkAreaMaintenanceByValue(testData.ownerValue);
      expensesStructureActions.verifyTenantObligationsCommentary(testData.tenantObligationsCommentary);
      expensesStructureActions.verifyOwnerObligationsCommentary(testData.ownerObligationsCommentary);
      expensesStructureActions.clickSaveContinueButton();
      laundryActions.verifyNoLaundryButtonExists();
      laundryActions.clickSaveContinueButton();
      storageActions.verifyNoStorageButtonExists();
      storageActions.clickSaveContinueButton();
      parkingActions.checkIsFreeParkingCheckbox();
      parkingActions.verifyParkingCommentary(testData.parkingCommentary);
      parkingActions.clickSaveContinueButton();
      otherActions.verifyPageIsOpened();
      otherActions.clickSaveContinueButton();
      grossIncomeActions.enterResVacancyCollLoss(testData.resVacancyCollLossValue);
      grossIncomeActions.verifyResidentialVCLoss(testData.resVacancyCollLossValue, testData.marketAnnualRent);
      grossIncomeActions.enterCoStarSubmarketRate(testData.coStarRate);
      grossIncomeActions.enterCoStarMetroRate(testData.coStarRate);
      grossIncomeActions.editCommentary(testData.vcLossCommentary);
      grossIncomeActions.verifyIncomeTable(testData.marketAnnualRent);
      grossIncomeActions.clickSaveContinueButton();
      taxInfoActions.checkBasisByValue(testData.concludedLiabilityBasisValue);
      taxInfoActions.fillTaxableAssessedValues(testData.taxAssessedLandValue, testData.taxAssessedBuildingValue);
      taxInfoActions.editTaxRatesWithoutAddingNew(testData.taxClassName, testData.taxRateYear, testData.taxRateValue);
      taxInfoActions.verifyTaxLiabilityInfo(testData.taxClassName, testData.taxRateYear);
      taxInfoActions.verifyTaxLiabilityTable(testData.taxRateValue, testData.numberOfUnits);
      taxInfoActions.verifyTaxLiabilityCommentary(testData.taxLiabilityCommentary);
      taxInfoActions.clickProjectedTab();
      taxInfoActions.checkProjectedIncludeCheckbox();
      taxInfoActions.verifyProjectedLiabilityCommentary(testData.projectedLiabilityComm);
      taxInfoActions.clickComparablesTab();
      taxInfoActions.addListTaxComparablesWithoutSourceInfoData(testData.firstTaxComp, testData.secondTaxComp,
          testData.thirdTaxComp, testData.forthTaxComp, testData.fifthTaxComp);
      taxInfoActions.verifyListAddedComparables(testData.firstTaxComp, testData.secondTaxComp,
          testData.thirdTaxComp, testData.forthTaxComp, testData.fifthTaxComp);
      taxInfoActions.verifyTaxCompsCommentary(testData.taxCompsCommentary);
      taxInfoActions.clickSummaryTab();
      taxInfoActions.checkConcludedLiabilityTypeByValue(testData.concludedLiabilityType);
      taxInfoActions.enterConcludedLiabilityPerBasis(testData.concludedLiabilityValue);
      taxInfoActions.verifyAppraiserOpinionTaxLiabilityTotal(testData.concludedLiabilityValue, testData.numberOfUnits);
      taxInfoActions.verifyAppraiserOpinionTaxLiabilityPerBasis(testData.concludedLiabilityValue);
      taxInfoActions.verifyAppraiserOpinionTaxRateCell(testData.taxRateValue);
      taxInfoActions.verifyAppraiserOpinionTaxableAssessedValueCell(testData.taxRateValue);
      taxInfoActions.verifyTaxSummaryCommentary(testData.taxSummaryCommentary);
      taxInfoActions.clickSaveContinueButton();
      expenseHistoryActions.selectExpensePeriod(testData.expensePeriod);
      expenseHistoryActions.verifyExpenseYear(testData.expenseYear);
      expenseHistoryActions.clickAddExpenseYearButton();
      expenseHistoryActions.checkGrossRevenueCheckboxByColumnIndex();
      expenseHistoryActions.enterGrossRevenueByColIndex(testData.grossRevenue);
      expenseHistoryActions.enterRealEstateTaxesByColIndex(testData.realEstateTaxes);
      expenseHistoryActions.enterInsuranceByColIndex(testData.insuranceExpense);
      expenseHistoryActions.enterElectricityByColIndex(testData.electricityExpense);
      expenseHistoryActions.enterFuelByColIndex(testData.fuelExpense);
      expenseHistoryActions.uncheckFuelCheckboxByColIndex();
      expenseHistoryActions.uncheckWaterSewerCheckboxByColIndex();
      expenseHistoryActions.enterPayrollBenefitsByColIndex(testData.payrollBenefitsExpense);
      expenseHistoryActions.verifyTotalOpExpensesByColIndex(testData.toeToBe);
      expenseHistoryActions.verifyTOEExcludingRETByIndex(testData.realEstateTaxes);
      expenseHistoryActions.verifyNetOpIncomeByIndex(testData.grossRevenue);
      expenseHistoryActions.verifyAverageTable();
      expenseHistoryActions.verifyExpenseHistoryCommentary(testData.expenseHistoryCommentary);
      expenseHistoryActions.clickSaveContinueButton();
      const compExpensesArray = [testData.compExpensesFirstComp, testData.compExpensesSecondComp, testData.compExpensesThirdComp,
         testData.compExpensesForthComp, testData.compExpensesFifthComp];
      compExpensesArray.forEach((comp, i) => {
         compExpensesActions.clickAddBlankColumnButton();
         compExpensesActions.enterAddressByColumnIndex(comp.address, i);
         compExpensesActions.enterLocationByColumnIndex(comp.location, i);
         compExpensesActions.chooseExpensePeriodByColumnIndex(comp.period, i);
         compExpensesActions.enterSquareFeetByColumnIndex(comp.squareFeet, i);
         compExpensesActions.enterResidentialUnitsByColumnIndex(comp.resUnits, i);
         compExpensesActions.enterInsuranceByColumnIndex(comp.insurance, i);
         compExpensesActions.enterElectricityByColumnIndex(comp.electricity, i);
         compExpensesActions.enterRepairsMaintenanceByColumnIndex(comp.repairsAndMaintenance, i);
         compExpensesActions.enterPayrollBenefitsByColumnIndex(comp.payrollAndBenefits, i);
         compExpensesActions.enterGeneralAdministrativeByColumnIndex(comp.generalAndAdministrative, i);
         compExpensesActions.enterManagementFeesByColumnIndex(comp.management, i);
         compExpensesActions.verifyTOEByColumnIndex(comp.toe, i);
         compExpensesActions.verifyTOEPerSFByColumnIndex(i);
         compExpensesActions.verifyToePerUnitByColumnIndex(i);
      });
      compExpensesActions.verifyTableAverageValues();
      compExpensesActions.clickSaveContinueButton();
      navSectionActions.clickExpenseForecastBookmark();
      expenseForecastActions.chooseForecastItemBasis(testData.forecastItems[0], testData.perUnit);
      expenseForecastActions.enterForecastItemForecast(testData.forecastItems[0], testData.insuranceForecast);
      expenseForecastActions.verifyForecastItemCompMin(testData.forecastItems[0], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemCompAverage(testData.forecastItems[0], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemCompMax(testData.forecastItems[0], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemBasisMoney(testData.forecastItems[0], testData.perUnit, testData.numberOfUnits,
          testData.grossArea, testData.insuranceForecast);
      expenseForecastActions.chooseForecastItemBasis(testData.forecastItems[1], testData.perUnit);
      expenseForecastActions.enterForecastItemForecast(testData.forecastItems[1], testData.electricityForecast);
      expenseForecastActions.verifyForecastItemCompMin(testData.forecastItems[1], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemCompAverage(testData.forecastItems[1], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemCompMax(testData.forecastItems[1], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemBasisMoney(testData.forecastItems[1], testData.perUnit, testData.numberOfUnits,
          testData.grossArea, testData.electricityForecast);
      expenseForecastActions.verifyForecastItemOwnerProjection(testData.forecastItems[1], testData.perUnit, testData.electricityExpense,
          testData.numberOfUnits, testData.grossArea);
      expenseForecastActions.chooseForecastItemBasis(testData.forecastItems[2], testData.perUnit);
      expenseForecastActions.chooseForecastItemBasis(testData.forecastItems[3], testData.perUnit);
      expenseForecastActions.chooseForecastItemBasis(testData.forecastItems[4], testData.perUnit);
      expenseForecastActions.enterForecastItemForecast(testData.forecastItems[4], testData.repairsForecast);
      expenseForecastActions.verifyForecastItemCompMin(testData.forecastItems[4], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemCompAverage(testData.forecastItems[4], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemCompMax(testData.forecastItems[4], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemBasisMoney(testData.forecastItems[4], testData.perUnit, testData.numberOfUnits,
          testData.grossArea, testData.repairsForecast);
      expenseForecastActions.chooseForecastItemBasis(testData.forecastItems[5], testData.perUnit);
      expenseForecastActions.enterForecastItemForecast(testData.forecastItems[5], testData.payrollForecast);
      expenseForecastActions.verifyForecastItemCompMin(testData.forecastItems[5], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemCompAverage(testData.forecastItems[5], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemCompMax(testData.forecastItems[5], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemBasisMoney(testData.forecastItems[5], testData.perUnit, testData.numberOfUnits,
          testData.grossArea, testData.payrollForecast);
      expenseForecastActions.verifyForecastItemOwnerProjection(testData.forecastItems[5], testData.perUnit, testData.payrollBenefitsExpense,
          testData.numberOfUnits, testData.grossArea);
      expenseForecastActions.chooseForecastItemBasis(testData.forecastItems[6], testData.perUnit);
      expenseForecastActions.enterForecastItemForecast(testData.forecastItems[6], testData.generalForecast);
      expenseForecastActions.verifyForecastItemCompMin(testData.forecastItems[6], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemCompAverage(testData.forecastItems[6], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemCompMax(testData.forecastItems[6], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemBasisMoney(testData.forecastItems[6], testData.perUnit, testData.numberOfUnits,
          testData.grossArea, testData.generalForecast);
      expenseForecastActions.chooseForecastItemBasis(testData.forecastItems[7], testData.perUnit);
      expenseForecastActions.chooseForecastItemBasis(testData.forecastItems[8], testData.perUnit);
      expenseForecastActions.chooseForecastItemBasis(testData.forecastItems[9], testData.perUnit);
      expenseForecastActions.checkPercentOfEGICheckbox();
      expenseForecastActions.enterPercentOfEgi(testData.percentOfEgi);
      const managementForecastEgi = expenseForecastActions.getManagementForecastEgiPercent(testData.perUnit, testData.percentOfEgi,
          testData.effectiveGrossIncome, testData.numberOfUnits, testData.grossArea);
      expenseForecastActions.verifyManagementForecast(managementForecastEgi);
      expenseForecastActions.verifyForecastItemCompMin(testData.forecastItems[9], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemCompAverage(testData.forecastItems[9], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemCompMax(testData.forecastItems[9], testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyForecastItemBasisMoney(testData.forecastItems[9], testData.perUnit, testData.numberOfUnits,
          testData.grossArea, managementForecastEgi);
      expenseForecastActions.chooseForecastItemBasis(testData.forecastItems[10], testData.perUnit);
      expenseForecastActions.enterForecastItemForecast(testData.forecastItems[10], testData.reservesForecast);
      expenseForecastActions.verifyForecastItemBasisMoney(testData.forecastItems[10], testData.perUnit, testData.numberOfUnits,
          testData.grossArea, testData.reservesForecast);
      expenseForecastActions.chooseForecastItemBasis(testData.forecastItems[11], testData.perUnit);
      expenseForecastActions.verifyToeCompMinPerBasis(testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyToeCompAvgPerBasis(testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyToeCompMaxPerBasis(testData.perUnit, compExpensesArray);
      expenseForecastActions.verifyOwnersProFormaValue();
      expenseForecastActions.verifyTotalForecast();
      expenseForecastActions.clickSaveContinueButton();
      proFormaActions.verifyPotentialResIncomeRow(testData.totalPotentialResIncome, testData.psfPotentialResIncome, testData.perUnitPotResIncome);
      proFormaActions.verifyPotentialGrossIncomeRow(testData.totalPotentialResIncome, testData.psfPotentialResIncome, testData.perUnitPotResIncome);
      proFormaActions.verifyResVCLossRow(testData.vcLossRow.total, testData.vcLossRow.perSF, testData.vcLossRow.perUnit);
      proFormaActions.verifyEffectiveGrossRow(testData.effectiveGrossRow.total, testData.effectiveGrossRow.perSF, testData.effectiveGrossRow.perUnit);
      proFormaActions.verifyRETaxesRow(testData.reTaxesRow.total, testData.reTaxesRow.perSF, testData.reTaxesRow.perUnit);
      proFormaActions.verifyInsuranceRow(testData.insuranceRow.total, testData.insuranceRow.perSF, testData.insuranceRow.perUnit);
      proFormaActions.verifyElectricityRow(testData.electricityRow.total, testData.electricityRow.perSF, testData.electricityRow.perUnit);
      proFormaActions.verifyRepairsRow(testData.repairsRow.total, testData.repairsRow.perSF, testData.repairsRow.perUnit);
      proFormaActions.verifyPayrollRow(testData.payrollRow.total, testData.payrollRow.perSF, testData.payrollRow.perUnit);
      proFormaActions.verifyGeneralRow(testData.generalRow.total, testData.generalRow.perSF, testData.generalRow.perUnit);
      proFormaActions.verifyManagementRow(testData.managementRow.total, testData.managementRow.perSF, testData.managementRow.perUnit);
      proFormaActions.verifyReservesRow(testData.reservesRow.total, testData.reservesRow.perSF, testData.reservesRow.perUnit);
      proFormaActions.verifyToeRow(testData.toeRow.total, testData.toeRow.perSF, testData.toeRow.perUnit);
      proFormaActions.verifyToeNetReRow(testData.toeNetReRow.total, testData.toeNetReRow.perSF, testData.toeNetReRow.perUnit);
      proFormaActions.verifyNetOpIncomeRow(testData.netOpIncomeRow.total, testData.netOpIncomeRow.perSF, testData.netOpIncomeRow.perUnit);
      proFormaActions.verifyOperatingExpenseRatio(testData.opExpenseRatio);
      proFormaActions.clickSaveContinueButton();
      supportingCapRatesActions.uncheckIncludePersonalSurvey();
      supportingCapRatesActions.verifyIncomeCapitalizationCommentary(testData.incomeCapComm);
      supportingCapRatesActions.clickSelectedLoanSectionButton();
      supportingCapRatesActions.verifySelectedLoanTermsSection(testData.mortgageComponentCommentary);
      supportingCapRatesActions.clickSelectedLoanSectionButton();
      supportingCapRatesActions.clickBandOfInvestmentSectionButton();
      supportingCapRatesActions.enterEquityDividendRate(testData.equityDividendRate);
      supportingCapRatesActions.verifyBandInvestmentSection(testData.bandInvestmentCommentary, testData.equityDividendRate);
      supportingCapRatesActions.clickSaveContinueButton();
      capRateConclusionActions.verifyBandOfInvestments(testData.bandOfInvestmentsValue);
      capRateConclusionActions.verifyPWCCell(testData.pwcValue);
      capRateConclusionActions.verifySitusCell(testData.situsValue);
      capRateConclusionActions.navigateToCapRateComps();
      capRateCompsActions.verifyPageIsOpened();
      const capRateComps = [testData.firstCapRateComp, testData.secondCapRateComp, testData.thirdCapRateComp, testData.forthCapRateComp,
      testData.fifthCapRateComp, testData.sixthCapRateComp];
      capRateComps.forEach((comp, i) => {
         capRateCompsActions.addComparable(comp.stateValue, comp.address, comp.id, comp.source, comp.sourceName, comp.sourceUrl);
         capRateCompsActions.fillAddedCompWithInfo(comp.address, comp.gba, comp.type, comp.isElevatored, comp.numberOfUnits,
             comp.isListing, comp.isInContract, comp.saleDate, comp.yearBuilt, comp.pricePerSF, comp.capRate, comp.sourceName,
             comp.sourceUrl, i);
      });
      const firstCapRate = Number(testData.firstCapRateComp.capRate);
      const secondCapRate = Number(testData.secondCapRateComp.capRate);
      const thirdCapRate = Number(testData.thirdCapRateComp.capRate);
      const forthCapRate = Number(testData.forthCapRateComp.capRate);
      const fifthCapRate = Number(testData.fifthCapRateComp.capRate);
      const sixthCapRate = Number(testData.sixthCapRateComp.capRate);
      const minCapRate = Math.min(firstCapRate, secondCapRate, thirdCapRate, forthCapRate, fifthCapRate, sixthCapRate);
      const maxCapRate = Math.max(firstCapRate, secondCapRate, thirdCapRate, forthCapRate, fifthCapRate, sixthCapRate);
      const avgCapRate = ((firstCapRate + secondCapRate + thirdCapRate + forthCapRate + fifthCapRate + sixthCapRate) /
          capRateComps.length).toFixed(2);
      capRateCompsActions.verifyCapRateCommentary(minCapRate, maxCapRate, avgCapRate);
      capRateCompsActions.chooseCompIncomePotential(testData.compIncomePotential);
      capRateCompsActions.chooseCompPropertyConditions(testData.compPropertyConditions);
      capRateCompsActions.chooseCompPropertyLocations(testData.compPropertyLocations);
      navSectionActions.navigateToCapRateConclusion();
      capRateConclusionActions.verifyCompCapRatesCell(minCapRate, maxCapRate);
      capRateConclusionActions.enterConclusionSectionConcludedCapRate(testData.concludedCapRate);
      capRateConclusionActions.enterAsCompleteMonthsOfRentLoss(testData.asCompleteMonthsOfRentLoss);
      capRateConclusionActions.enterASStabilizedMonthsOfRentLoss(testData.asStabilizedMonthsOfRentLoss);
      capRateConclusionActions.selectRoundingFactor(testData.roundingFactorValue);
      capRateConclusionActions.verifyNetOperatingIncome(testData.netOperatingIncome);
      capRateConclusionActions.verifyConcludedCapRateCell(testData.concludedCapRate);
      capRateConclusionActions.verifyAsStabilizedTablePart(testData.asStabilizedPeriod, testData.asStabilizedFinalValue);
      capRateConclusionActions.verifyAsCompleteTablePart(testData.asStabilizedPeriod, testData.asCompleteAmountValue, testData.asStabilizedFinalValue);
      capRateConclusionActions.enterAsCompleteLessEntrepreneurialProfit(testData.asCompleteLessEntrepreneurialProfit);
      capRateConclusionActions.verifyAsIsMarketTablePart(testData.asIsMarketPeriod, testData.asIsMarketAmount,
          testData.asIsMarketFinalValue, testData.asIsMarketPerUnit, testData.asIsMarketPerSF);
      capRateConclusionActions.clickSaveContinueButton();
      const salesComps = [testData.firstSalesComp, testData.secondSalesComp, testData.thirdSalesComp, testData.forthSalesComp,
      testData.fifthSalesComp];
      salesComps.forEach((comp, i) => {
         findCompsActions.addComparable(comp.address);
         findCompsActions.verifyAddedCompByIndex(comp.address, i + 1, comp.capRate);
      });
      findCompsActions.clickSaveContinueButton();
      createSalesCompMap.captureScreen();
      createSalesCompMap.clickSaveContinueButton();
      adjustCompsActions.checkCalculationUnitsRadio(testData.calculationUnitsRadioValue);
      adjustCompsActions.checkIncomeAdjustmentLevel(testData.incomeAdjustmentType);
      const adjustComps = [testData.firstAdjustComp, testData.secondAdjustComp, testData.thirdAdjustComp, testData.forthAdjustComp,
      testData.fifthAdjustComp];
      adjustComps.forEach((comp, i) => {
         adjustCompsActions.enterSizeAdjustmentByColumn(comp.size, i);
         adjustCompsActions.enterConditionAdjustmentByColumn(comp.condition, i);
         adjustCompsActions.enterOtherAdjustmentByColumn(comp.other, i);
         adjustCompsActions.verifyTrendedPriceByColumn(comp.trendedPrice, i);
         adjustCompsActions.verifyAdjustedPriceByColumn(comp.adjustedPrice, i);
      });
      adjustCompsActions.editOtherAdjustmentRowName(testData.otherAdjustmentNewName);
      adjustCompsActions.clickSaveContinueButton();
      valueConclusionActions.verifyUnadjustedPrices(testData.secondAdjustComp.trendedPrice, testData.unadjustedPriceAvg,
          testData.thirdAdjustComp.trendedPrice, testData.unadjustedPriceMedian);
      valueConclusionActions.verifyAdjustedPrices(testData.secondAdjustComp.adjustedPrice, testData.adjustedPriceAvg,
          testData.thirdAdjustComp.adjustedPrice, testData.adjustedPriceMedian);
      valueConclusionActions.verifyIncomeApproachConclusion(testData.incomeApproachConclusion);
      valueConclusionActions.enterSaleValueConclusion(testData.saleValueConclusion);
      valueConclusionActions.verifyAsStabilizedRow(testData.asStabilizedPeriod, testData.conclusionAsStabilizedAmount,
          testData.conclusionAsStabilizedAmount);
      valueConclusionActions.verifyAsCompleteRow(testData.asStabilizedPeriod, testData.conclusionAsCompleteAmount,
          testData.conclusionAsCompleteAmount);
      valueConclusionActions.verifyAsIsMarketRow(testData.asIsMarketPeriod, testData.conclusionAsIsMarketAmount,
          testData.conclusionAsIsMarketFinalValue);
      valueConclusionActions.clickSaveContinueButton();
   });
});
