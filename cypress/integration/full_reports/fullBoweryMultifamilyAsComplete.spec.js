const testData = require("../../fixtures/full_reports/full_bowery_multifamily_as_complete/fullBoweryMultifamilyAsComplete.fixtures.json");
import newTestData from "../../fixtures/full_reports/full_bowery_multifamily_as_complete/fullBoweryMultifamilyAsComplete.fixtures";
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
import finalValuesReconciliationActions from "../../actions/final/finalValuesReconciliation.actions";
import propertySalesConclusionActions from "../../actions/final/propertySaleConclusion.actions";
import assumptionsConditionsActions from "../../actions/final/assumptionsConditions.actions";
import swotAnalysisActions from "../../actions/final/swotAnalysis.actions";
import highestBestUseActions from "../../actions/final/highestBestUse.actions";
import unitInspectionActions from "../../actions/final/unitInspection.actions";
import scopeActions from "../../actions/final/scope.actions";
import sourceInformationActions from "../../actions/final/sourceInformation.actions";
import capRateDiscussionActions from "../../actions/final/capRateDiscussion.actions";
import insurableReplacementCostActions from "../../actions/final/insurableReplacementCost.actions";

describe("Full bowery way, multifamily as complete report", () => {
    it("Test", () => {
        cy.loginByApi();
        homepageActions.createReportAdvancedSearch(newTestData.reportCreationData);
        keyInfoActions.choosePurpose(newTestData.keyInfoPurposeData.purposeValue)
            .checkAllInterestAppraisedByValues(newTestData.keyInfoPurposeData.interestAppraised)
            .enterDateByType(newTestData.keyInfoEngagementData.dueDate)
            .enterDateByType(newTestData.keyInfoEngagementData.dateOfValuation)
            .uploadFile(newTestData.keyInfoEngagementData.engagementFileName);
        navSectionActions.openClientPageInReport();
        clientActions.enterClientName(newTestData.clientData.clientName);
        navSectionActions.navigateToPropertySummary();
        summaryActions.verifySiteDetails(newTestData.siteDetails)
            .enterYearBuilt(newTestData.siteDetails.yearBuilt)
            .enterSiteArea(newTestData.siteDetails.siteArea)
            .fillAsCompleteBuildingDescription(newTestData.asCompleteBuildingDescription)
            .clickWalkUpTypeButtons()
            .fillCurrentBuildDescription(newTestData.currentBuildingDescription)
            .editAsCompleteExport(newTestData.asCompleteBuildingDescription.asCompleteExportText)
            .clickSaveContinueButton();
        marketActions.verifyTimeOnMarket(newTestData.timeOnMarket)
            .fillMarketResearch(newTestData.marketResearch)
            .clickPullFromDropbox()
            .verifyAnyDocumentInputIsNotEmpty()
            .clickSaveContinueButton();
        historyActions.enterCurrentOwner(newTestData.owner.name)
            .checkIsUnderContractCheckbox()
            .enterContractDetails(newTestData.contractDetails)
            .clickSaveContinueButton();
        descriptionActions.selectGeneralPropertyCondition(newTestData.siteInspection.generalPropertyCondition)
            .selectAsStabilizedPropertyCondition(newTestData.siteInspection.stabilizedCondition)
            .checkListCheckboxesByLabels(newTestData.siteInspection.locationsInspectedLabels)
            .checkStairConditionByValue(newTestData.siteInspection.stairCondition)
            .checkFoundationByValue(newTestData.descriptionOfImprovements.foundationValue)
            .checkStructuralSystemByValue(newTestData.descriptionOfImprovements.structuralSystemValue)
            .checkListCheckboxesByLabels(newTestData.descriptionOfImprovements.externalWallsLabels)
            .checkFramingByValue(newTestData.descriptionOfImprovements.framingValue)
            .checkRoofTypeByValue(newTestData.descriptionOfImprovements.roofType)
            .checkListCheckboxesByLabels(newTestData.descriptionOfImprovements.windowsLabels)
            .checkListCheckboxesByLabels(newTestData.descriptionOfImprovements.plumbingLabels)
            .checkSprinklersByValue(newTestData.descriptionOfImprovements.sprinklersValue)
            .checkListCheckboxesByLabels(newTestData.descriptionOfImprovements.securityLabels)
            .checkContainsBasement()
            .checkListCheckboxesByLabels(newTestData.descriptionOfImprovements.basementAccess)
            .checkBasementStateByValue(newTestData.descriptionOfImprovements.basementState)
            .verifyTotalEconomicLife(newTestData.remainingEconomicLife.totalEconomicLifeToBe)
            .enterAgeEffective(newTestData.remainingEconomicLife.ageEffective)
            .clickSaveContinueButton();
        siteDescriptionActions.editTransportationDiscussionCommentary(newTestData.transportationSiteDescription.commentary)
            .checkSurroundingResidential()
            .verifySiteArea(newTestData.siteDescriptors.siteArea)
            .verifyPropertyShape(newTestData.siteDescriptors.propertyShape);
        navSectionActions.openMapsInProperty();
        mapsActions.enterPropertyFrontage(newTestData.siteDescriptors.propertyFrontage);
        navSectionActions.openSiteDescriptionInProperty();
        siteDescriptionActions.verifyPropertyFrontage(newTestData.siteDescriptors.propertyFrontage)
            .verifySiteDescriptionItems(newTestData.siteDescriptors.siteDescriptionItems)
            .editFloodHazardCommentary(newTestData.siteDescriptors.floodHazardCommentary)
            .verifyUtilitiesItems(newTestData.utilitiesSiteDescription.utilitiesItems)
            .verifyUtilitiesDescriptions(newTestData.utilitiesSiteDescription.utilitiesDescription)
            .clickSaveContinueButton();
        utilitiesActions.checkHeatingSystem()
            .addHeatingSystemParameters(newTestData.heatingCoolingSystemsUtilities)
            .checkCoolingSystem()
            .addCoolingSystemParameters(newTestData.heatingCoolingSystemsUtilities)
            .verifyHeatingCoolingCommentary(newTestData.heatingCoolingSystemsUtilities.commentary)
            .checkGasMeters()
            .addGasMetersParameters(newTestData.gasMetersUtilities)
            .verifyGasMetersCommentary(newTestData.gasMetersUtilities.commentary)
            .checkElectricMetersCheckbox()
            .addElectricMetersParameters(newTestData.electricMetersUtilities)
            .verifyElectricMetersCommentary(newTestData.electricMetersUtilities.commentary)
            .checkHotWaterSystemsCheckbox()
            .addHotWaterSystemParameters(newTestData.hotWaterSystemsUtilities)
            .verifyHotWaterSystemCommentary(newTestData.hotWaterSystemsUtilities.commentary)
            .clickSaveContinueButton();
        amenitiesActions.addParkingPlaces(newTestData.amenities.numberOfParkingPlaces)
            .checkHasNoUnitAmenities()
            .clickSaveContinueButton();
        mapsActions.uploadZoningMap(newTestData.propertyMaps.zoningMapFile)
            .uploadFloodMap(newTestData.propertyMaps.floodMapFile)
            .chooseCornerByValue(newTestData.propertyMaps.cornerValue)
            .uploadTaxMap(newTestData.propertyMaps.taxMapFile)
            .captureSubjectMap()
            .clickSaveContinueButton();
        photosActions.uploadPhotosBySectionName(newTestData.facadePhotos)
            .uploadPhotosBySectionName(newTestData.subjectPhotos)
            .uploadPhotosBySectionName(newTestData.exteriorEntrancePhotos)
            .uploadPhotosBySectionName(newTestData.stairwayPhotos)
            .uploadPhotosBySectionName(newTestData.hallwayPhotos)
            .uploadPhotosBySectionName(newTestData.kitchenPhotos)
            .uploadPhotosBySectionName(newTestData.bathroomPhotos)
            .uploadPhotosBySectionName(newTestData.bedroomPhotos)
            .uploadPhotosBySectionName(newTestData.livingRoomPhotos)
            .uploadPhotosBySectionName(newTestData.electricMetersPhotos)
            .uploadPhotosBySectionName(newTestData.gasMetersPhotos)
            .editSectionName(newTestData.heatingSystemPhotos)
            .clickSaveButton()
            .verifyProgressBarNotExist();
        cy.reload();
        photosActions.uploadPhotosBySectionName(newTestData.heatingSystemPhotos)
            .uploadPhotosBySectionName(newTestData.hotWaterPhotos)
            .clickSaveContinueButton();
        zoningActions.enterZoneNames(newTestData.zoningDescriptionInformation.zonesNames)
            .verifyPropertyIdentification(newTestData.zoningDescriptionInformation)
            .verifyPropIdentificationCommentary(newTestData.zoningDescriptionInformation.propertyIdentificationCommentary)
            .verifyIntroductionCommentary(newTestData.zoningDescriptionInformation.introductionCommentary)
            .clickUsesTab()
            .choosePermittedPropertyUse(newTestData.zoningDescriptionUses.permittedPropertyUse)
            .chooseCurrentPropertyUse(newTestData.zoningDescriptionUses.currentPropertyUse)
            .chooseIsConformingAllowableUses()
            .verifyConformingUseCommentary(newTestData.zoningDescriptionUses)
            .clickBulkTab()
            .deleteRowsByRegulationValues(newTestData.zoningDescriptionBulk.regulationValuesDelete)
            .addBulkRegulation(newTestData.zoningDescriptionBulk.regulationNew)
            .editListRegulationsDataByNames(newTestData.zoningDescriptionBulk.existingRegulations)
            .verifyComplyingCommentary(newTestData.zoningDescriptionBulk.complyingCommentary)
            .clickParkingTab()
            .verifyParkingResidentialUnits(newTestData.zoningDescriptionParking.numberOfUnits)
            .verifyActualParkingSpaces(newTestData.zoningDescriptionParking.numberOfParkingPlaces)
            .enterRequiredParkingSpaces(newTestData.zoningDescriptionParking.requiredParkingPlaces)
            .chooseIsConformingWithParkingRequirements(newTestData.zoningDescriptionParking.isConforming)
            .verifyParkingConformityCommentary(newTestData.zoningDescriptionParking)
            .clickSaveContinueButton();
        renovationsActions.chooseRenovationByValue(newTestData.prospectiveRenovations.renovationDropValue)
            .clickTotalButton()
            .fillTotalTable(newTestData.prospectiveRenovations.renovationsPeriod, newTestData.prospectiveRenovations.renovationTotalAmount)
            .verifyNetTotalRenovationBudget(newTestData.prospectiveRenovations.renovationTotalAmount)
            .editCommentary(newTestData.prospectiveRenovations.renovationsCommentary)
            .clickSaveContinueButton();
        residentialUnitsActions.fillKitchenDescription(newTestData.typicalKitchenCondition)
            .verifyKitchenConditionCommentary(newTestData.typicalKitchenCondition)
            .fillBathroomDescription(newTestData.typicalBathroomCondition)
            .verifyBathroomCommentary(newTestData.typicalBathroomCondition)
            .fillBedroomDescription(newTestData.bedroomCondition)
            .verifyBedroomCommentary(newTestData.bedroomCondition)
            .fillLivingRoomDescription(newTestData.livingRoomCondition)
            .verifyLivingRoomCommentary(newTestData.livingRoomCondition)
            .fillStairsDescription(newTestData.stairsData)
            .editStairsCommentary(newTestData.stairsData.commentary)
            .clickSaveContinueButton();
        inPlaceRentRollActions.verifyNumberOfResidentialUnits(newTestData.currentBuildingDescription.numberOfUnits)
            .checkCheckboxByLabelAndVerify(newTestData.inPLaceRentRoll.forecastLabel, newTestData.inPLaceRentRoll.forecastColumn)
            .checkListIsInspectedByRowNumbers(newTestData.inPLaceRentRoll.isInspectedRowsToCheck)
            .enterUnitNumbersByOrderToAll(newTestData.currentBuildingDescription.numberOfUnits)
            .enterAllEqualRoomsNumber(newTestData.inPLaceRentRoll.roomsNumber, newTestData.currentBuildingDescription.numberOfUnits)
            .enterAllEqualBedroomsNumber(newTestData.inPLaceRentRoll.bedroomsNumber, newTestData.currentBuildingDescription.numberOfUnits)
            .fillAllRentTypeCellsWithEqualValue(newTestData.inPLaceRentRoll.rentType)
            .enterAllEqualLeaseStatuses(newTestData.inPLaceRentRoll.leaseStatus, newTestData.currentBuildingDescription.numberOfUnits)
            .enterAllEqualForecast(newTestData.inPLaceRentRoll.forecastValue, newTestData.currentBuildingDescription.numberOfUnits)
            .verifyMonthlyTotalForecastEqualValue()
            .verifyAnnuallyTotalForecastEqualValue()
            .verifyRentRollCommentary(newTestData.inPLaceRentRoll.commentary)
            .clickSaveContinueButton();
        unitGroupsActions.verifyRowsNumberEqualBedroomsNonComp(newTestData.inPLaceRentRoll.bedroomsNumber,
            newTestData.currentBuildingDescription.numberOfUnits)
            .verifyGLAPercentage()
            .verifyRoomSize()
            .verifyGLAValue(newTestData.currentBuildingDescription.grossArea)
            .enterAvgSFByUnitTypeValue(newTestData.unitGroups.unitType, newTestData.unitGroups.averageSF)
            .verifyGLACellValue(newTestData.currentBuildingDescription.grossArea)
            .verifyTotalAvgSqftEqualUnits(newTestData.unitGroups.averageSF, newTestData.currentBuildingDescription.numberOfUnits)
            .clickSaveContinueButton();
        newTestData.rentComparables.comparables.forEach((comp, i) => {
            rentCompsActions.openAddNewComparableFormAdvanced(comp);
            addCompFormActions.fillNewRentCompWithoutNumbTypeSourceNameUrlNoteAmenities(comp);
            rentCompsActions.verifyComparableBedroomTableByNumber(i, comp);
        });
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
        finalValuesReconciliationActions.closeSatisfactionSurvey()
            .checkPerUnitCheckbox()
            .verifyIncomeStabDate(testData.stabilizedCompleteDate)
            .verifyIncomeCompleteDate(testData.stabilizedCompleteDate)
            .verifyIncomeMarketDate(testData.marketDate)
            .verifySalesStabilizedDate(testData.stabilizedCompleteDate)
            .verifySalesCompleteDate(testData.stabilizedCompleteDate)
            .verifySalesMarketDate(testData.marketDate)
            .checkFinalValueApproachRadio(testData.finalValueApproach)
            .verifyFinalValueAsStabDate(testData.stabilizedCompleteDate)
            .verifyFinalValueAsCompleteDate(testData.stabilizedCompleteDate)
            .verifyFinalValueAsIsDate(testData.marketDate).clickSaveContinueButton();
        propertySalesConclusionActions.verifyContractPrice(testData.contractPrice)
            .verifyContractDate(testData.contractDateForPropSale)
            .verifyContractChangeInValue(testData.asIsMarketFinalValue).clickSaveContinueButton();
        assumptionsConditionsActions.addExtraordinaryAssumption(testData.extraordinaryAssumption).clickSaveContinueButton();
        swotAnalysisActions.uncheckIncludeInReportCheckbox().clickSaveContinueButton();
        highestBestUseActions.verifyZoneNameByRow(testData.zonesNames[0])
            .verifyAllowableUsesByRow(testData.propertyUse)
            .verifySiteAreaByRow(testData.siteArea)
            .verifyZoningAreaByRow(testData.grossArea)
            .clickPhysicallyTab()
            .verifyPropertyFrontage(testData.propertyFrontage)
            .verifyPropertyCondition(testData.propertyCondition)
            .verifyComplyingBulk(testData.complyingBulk)
            .verifyConformingUse(testData.conformingUse)
            .verifyUnitType(testData.unitType)
            .verifyUnitsNumber(testData.numberOfUnits)
            .checkSizeWithinRangeCheckbox()
            .checkUtilitiesAvailableCheckbox()
            .clickFinanciallyTab()
            .checkSubjectMarketRadioValue(testData.subjectMarketCharacteristicsAndPropTypeValue)
            .checkAsVacantBestUsePropTypeRadioValue(testData.subjectMarketCharacteristicsAndPropTypeValue)
            .addFinanciallyFeasiblePropertyTypesAsVacant(testData.feasiblePropertyType)
            .uncheckNewConstructionFeasibleCheckbox()
            .checkAsImprovedBestUseRadioValue(testData.subjectMarketCharacteristicsAndPropTypeValue)
            .addFinanciallyFeasiblePropertyTypesAsImproved(testData.feasiblePropertyType)
            .clickHighestUseTab()
            .verifyAsVacantHighestUse(testData.subjectMarketCharacteristicsAndPropTypeValue, testData.feasiblePropTypeWord)
            .verifyAsImprovedHighestUse(testData.subjectMarketCharacteristicsAndPropTypeValue, testData.feasiblePropTypeWord)
            .clickProbableBuyerTab()
            .checkLocalCheckbox()
            .checkRegionalCheckbox().clickSaveContinueButton();
        unitInspectionActions.verifyNumberOfInspectedUnitsRows(testData.isInspectedRowsToCheck.length)
            .chooseListReadyForOccupancyValues(testData.readyForOccupancyValues)
            .verifyNumberOfInspectedUnitsCommentary(testData.isInspectedRowsToCheck.length).clickSaveContinueButton();
        scopeActions.verifyNumberOfItems().clickSaveContinueButton();
        sourceInformationActions.verifySiteSizeSources()
            .verifyExcessSurplusLandSources()
            .verifyGrossSizeUnitsSources()
            .verifyResidentialSFSources()
            .verifyNumberOfBuildingsSources()
            .verifyAmenitiesSources()
            .verifyDeferredMaintenanceSources()
            .verifyAreaAnalysisSources()
            .verifyIncomeDataSources()
            .verifyExpenseDataSources()
            .verifyArchitecturalPlansSources()
            .verifyComparableRentalDataSources()
            .verifyComparableSalesDataSources().clickSaveContinueButton();
        capRateCompsActions.clickSaveContinueButton();
        capRateDiscussionActions.verifyCapRateTable(testData.capRateTable)
            .verifyPwCRow(testData.pwcRow)
            .verifySitusRow(testData.situsRow)
            .clickCapRateCompsTab()
            .verifyCapRateCompsTable(testData.capRateCompsTable)
            .clickIncomeSpikesTab()
            .verifyIncomeSpikesTable(testData.incomeSpikesTable)
            .checkIncomeSpikesRadios(testData.incomeSpikesRadios).clickSaveContinueButton();
        navSectionActions.clickInsurableReplacementCostBookmark();
        insurableReplacementCostActions.verifySubjectState(testData.subjectState)
            .verifySubjectLocale(testData.subjectLocale)
            .verifyLocalMultiplier().clickSaveContinueButton();
    });
});
