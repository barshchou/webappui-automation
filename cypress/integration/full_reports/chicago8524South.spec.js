const testData = require("../../fixtures/full_reports/chicago_8524_South/chicago8524South.fixtures.json");
import homepageActions from "../../actions/base/homepage.actions";
import keyInfoActions from "../../actions/report/keyInfo.actions";
import navSectionActions from "../../actions/base/navigationSection.actions";
import clientActions from "../../actions/report/client.actions";
import summaryActions from "../../actions/property/summary.actions";
import marketActions from "../../actions/property/market.actions";
import propertyHistoryActions from "../../actions/property/history.actions";
import descriptionActions from "../../actions/property/description.actions";
import siteDescriptionActions from "../../actions/property/siteDescription.actions";
import propertyMapsActions from "../../actions/property/maps.actions";
import propertyUtilitiesActions from "../../actions/property/utilities.actions";
import propertyAmenitiesActions from "../../actions/property/amenities.actions";
import propertyPhotosActions from "../../actions/property/photos.actions";
import propertyZoningActions from "../../actions/property/zoning.actions";

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
      propertyHistoryActions.enterCurrentOwner(testData.currentOwner);
      propertyHistoryActions.checkIsUnderContractCheckbox();
      propertyHistoryActions.enterContractDetails(testData.buyer, testData.contractDate, testData.contractPrice);
      propertyPhotosActions.clickSaveContinueButton();
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
      propertyMapsActions.enterPropertyFrontage(testData.propertyFrontage);
      navSectionActions.openSiteDescriptionInProperty();
      siteDescriptionActions.verifyPropertyFrontage(testData.propertyFrontage);
      siteDescriptionActions.verifySiteDescriptionItems(testData.siteDescriptionItems);
      siteDescriptionActions.editFloodHazardCommentary(testData.floodHazardCommentary);
      siteDescriptionActions.verifyUtilitiesItems(testData.utilitiesItems);
      siteDescriptionActions.verifyUtilitiesDescriptions(testData.utilitiesDescription);
      siteDescriptionActions.clickSaveContinueButton();
      propertyUtilitiesActions.checkHeatingSystem();
      propertyUtilitiesActions.addHeatingSystemParameters(testData.heatingCoolingSystemType, testData.allSystemsLocation);
      propertyUtilitiesActions.checkCoolingSystem();
      propertyUtilitiesActions.addCoolingSystemParameters(testData.heatingCoolingSystemType, testData.allSystemsLocation);
      propertyUtilitiesActions.verifyHeatingCoolingCommentary(testData.heatingCollingCommentary);
      propertyUtilitiesActions.checkGasMeters();
      propertyUtilitiesActions.addGasMetersParameters(testData.gasElectricMetersType, testData.allSystemsLocation);
      propertyUtilitiesActions.verifyGasMetersCommentary(testData.gasMetersCommentary);
      propertyUtilitiesActions.checkElectricMetersCheckbox();
      propertyUtilitiesActions.addElectricMetersParameters(testData.gasElectricMetersType, testData.allSystemsLocation);
      propertyUtilitiesActions.verifyElectricMetersCommentary(testData.electricComm);
      propertyUtilitiesActions.checkHotWaterSystemsCheckbox();
      propertyUtilitiesActions.addHotWaterSystemParameters(testData.hotWaterSystemType, testData.allSystemsLocation);
      propertyUtilitiesActions.verifyHotWaterSystemCommentary(testData.hotWaterSystemCommentary);
      propertyUtilitiesActions.clickSaveContinueButton();
      propertyAmenitiesActions.addParkingPlaces(testData.numberOfParkingPlaces);
      propertyAmenitiesActions.checkHasNoUnitAmenities();
      propertyAmenitiesActions.clickSaveContinueButton();
      propertyMapsActions.uploadZoningMap(testData.zoningMapFileName);
      propertyMapsActions.uploadFloodMap(testData.floodMapFileName);
      propertyMapsActions.chooseCornerByValue(testData.cornerValue);
      propertyMapsActions.uploadTaxMap(testData.taxMapFileName);
      propertyMapsActions.captureSubjectMap();
      propertyMapsActions.clickSaveContinueButton();
      propertyPhotosActions.uploadPhotosBySectionName(testData.facadeSection, testData.facadePhotosFolder,
          testData.facadePhotosFileNames);
      propertyPhotosActions.uploadPhotosBySectionName(testData.subjectSection, testData.subjectStreetPhotosFolder,
          testData.subjectStreetFileNames);
      propertyPhotosActions.uploadPhotosBySectionName(testData.exteriorSection, testData.exteriorEntranceFolder,
          testData.exteriorEntranceFileNames);
      propertyPhotosActions.uploadPhotosBySectionName(testData.stairwaySection, testData.typicalStairwayFolder,
          testData.typicalStairwayFiles);
      propertyPhotosActions.uploadPhotosBySectionName(testData.hallwaySection, testData.typicalHallwayFolder,
          testData.typicalHallwayFiles);
      propertyPhotosActions.uploadPhotosBySectionName(testData.kitchenSection, testData.kitchenFolder, testData.kitchenFiles);
      propertyPhotosActions.uploadPhotosBySectionName(testData.bathroomSection, testData.bathroomFolder,
          testData.bathroomFiles);
      propertyPhotosActions.uploadPhotosBySectionName(testData.bedroomSection, testData.bedroomFolder, testData.bedroomFiles);
      propertyPhotosActions.uploadPhotosBySectionName(testData.livingRoomSection, testData.livingRoomFolder,
          testData.livingRoomFiles);
      propertyPhotosActions.uploadPhotosBySectionName(testData.electricMetersSection, testData.electricMetersFolder,
          testData.electricMetersFiles);
      propertyPhotosActions.uploadPhotosBySectionName(testData.gasMetersSection, testData.gasMetersFolder,
          testData.gasMetersFiles);
      propertyPhotosActions.editSectionName(testData.heatingSystemSectionOldName, testData.heatingSystemNewName);
      propertyPhotosActions.clickSaveButton();
      propertyPhotosActions.verifyProgressBarNotExist();
      cy.reload();
      propertyPhotosActions.uploadPhotosBySectionName(testData.heatingSystemNewName, testData.heatingSystemFolder,
          testData.heatingSystemPhotos);
      propertyPhotosActions.uploadPhotosBySectionName(testData.hotWaterSection, testData.hotWaterFolder,
          testData.hotWaterPhotos);
      propertyPhotosActions.clickSaveContinueButton();
      propertyZoningActions.enterZoneNameByZoneNumber(testData.subjectZoneName);
      propertyZoningActions.verifyPropertyIdentification(testData.siteArea, testData.cityToBe);
      propertyZoningActions.verifyPropIdentificationCommentary(testData.siteArea, testData.subjectZoneName,
          testData.cityToBe, testData.propIdentifierType, testData.identifier);
      propertyZoningActions.verifyIntroductionCommentary(testData.streetAddressToBe, testData.subjectZoneName);
      propertyZoningActions.clickUsesTab();
      propertyZoningActions.choosePermittedPropertyUse(testData.propertyUse);
      propertyZoningActions.chooseCurrentPropertyUse(testData.propertyUse);
      propertyZoningActions.chooseIsConformingAllowableUses();
   });
});