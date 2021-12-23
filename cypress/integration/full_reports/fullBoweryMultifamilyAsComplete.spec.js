import testData from "../../fixtures/full_reports/full_bowery_multifamily_as_complete/fullBoweryMultifamilyAsComplete.fixtures";
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
        cy.login();
        cy.wait(5000);
        homepageActions.createReportAdvancedSearch(testData.reportCreationData);
        keyInfoActions.choosePurpose(testData.keyInfoPurposeData.purposeValue)
            .checkAllInterestAppraisedByValues(testData.keyInfoPurposeData.interestAppraised)
            .enterDateByType(testData.keyInfoEngagementData.dueDate)
            .enterDateByType(testData.keyInfoEngagementData.dateOfValuation)
            .uploadFile(testData.keyInfoEngagementData.engagementFileName);
        navSectionActions.openClientPageInReport();
        clientActions.enterClientName(testData.clientData.clientName);
        navSectionActions.navigateToPropertySummary();
        summaryActions.verifySiteDetails(testData.siteDetails)
            .enterYearBuilt(testData.siteDetails.yearBuilt)
            .enterSiteArea(testData.siteDetails.siteArea)
            .fillAsCompleteBuildingDescription(testData.asCompleteDescription)
            .clickWalkUpTypeButtons()
            .fillCurrentBuildDescription(testData.currentDescription)
            .editAsCompleteExport(testData.asCompleteDescription.asCompleteExportText)
            .clickSaveContinueButton();
        marketActions.verifyTimeOnMarket(testData.timeOnMarket)
            .fillMarketResearch(testData.marketResearch)
            .clickPullFromDropbox()
            .verifyAnyDocumentInputIsNotEmpty()
            .clickSaveContinueButton();
        historyActions.enterCurrentOwner(testData.owner.name)
            .checkIsUnderContractCheckbox()
            .enterContractDetails(testData.contractDetails)
            .clickSaveContinueButton();
        descriptionActions.selectGeneralPropertyCondition(testData.siteInspection.generalPropertyCondition)
            .selectAsStabilizedPropertyCondition(testData.siteInspection.stabilizedCondition)
            .checkListCheckboxesByLabels(testData.siteInspection.locationsInspectedLabels)
            .checkStairConditionByValue(testData.siteInspection.stairCondition)
            .checkFoundationByValue(testData.descriptionOfImprovements.foundationValue)
            .checkStructuralSystemByValue(testData.descriptionOfImprovements.structuralSystemValue)
            .checkListCheckboxesByLabels(testData.descriptionOfImprovements.externalWallsLabels)
            .checkFramingByValue(testData.descriptionOfImprovements.framingValue)
            .checkRoofTypeByValue(testData.descriptionOfImprovements.roofType)
            .checkListCheckboxesByLabels(testData.descriptionOfImprovements.windowsLabels)
            .checkListCheckboxesByLabels(testData.descriptionOfImprovements.plumbingLabels)
            .checkSprinklersByValue(testData.descriptionOfImprovements.sprinklersValue)
            .checkListCheckboxesByLabels(testData.descriptionOfImprovements.securityLabels)
            .checkContainsBasement()
            .checkListCheckboxesByLabels(testData.descriptionOfImprovements.basementAccess)
            .checkBasementStateByValue(testData.descriptionOfImprovements.basementState)
            .verifyTotalEconomicLife(testData.remainingEconomicLife.totalEconomicLifeToBe)
            .enterAgeEffective(testData.remainingEconomicLife.ageEffective)
            .clickSaveContinueButton();
        siteDescriptionActions.editTransportationDiscussionCommentary(testData.transportationSiteDescription.commentary)
            .checkSurroundingResidential()
            .verifySiteArea(testData.siteDescriptors.siteArea)
            .verifyPropertyShape(testData.siteDescriptors.propertyShape);
        navSectionActions.openMapsInProperty();
        mapsActions.enterPropertyFrontage(testData.siteDescriptors.propertyFrontage);
        navSectionActions.openSiteDescriptionInProperty();
        siteDescriptionActions.verifyPropertyFrontage(testData.siteDescriptors.propertyFrontage)
            .verifySiteDescriptionItems(testData.siteDescriptors.siteDescriptionItems)
            .editFloodHazardCommentary(testData.siteDescriptors.floodHazardCommentary)
            .verifyUtilitiesItems(testData.utilitiesSiteDescription.utilitiesItems)
            .verifyUtilitiesDescriptions(testData.utilitiesSiteDescription.utilitiesDescription)
            .clickSaveContinueButton();
        utilitiesActions.checkHeatingSystem()
            .addHeatingSystemParameters(testData.heatingCoolingSystemsUtilities)
            .checkCoolingSystem()
            .addCoolingSystemParameters(testData.heatingCoolingSystemsUtilities)
            .verifyHeatingCoolingCommentary(testData.heatingCoolingSystemsUtilities.commentary)
            .checkGasMeters()
            .addGasMetersParameters(testData.gasMetersUtilities)
            .verifyGasMetersCommentary(testData.gasMetersUtilities.commentary)
            .checkElectricMetersCheckbox()
            .addElectricMetersParameters(testData.electricMetersUtilities)
            .verifyElectricMetersCommentary(testData.electricMetersUtilities.commentary)
            .checkHotWaterSystemsCheckbox()
            .addHotWaterSystemParameters(testData.hotWaterSystemsUtilities)
            .verifyHotWaterSystemCommentary(testData.hotWaterSystemsUtilities.commentary)
            .clickSaveContinueButton();
        amenitiesActions.addParkingPlaces(testData.amenities.numberOfParkingPlaces)
            .checkHasNoUnitAmenities()
            .clickSaveContinueButton();
        mapsActions.uploadZoningMap(testData.propertyMaps.zoningMapFile)
            .uploadFloodMap(testData.propertyMaps.floodMapFile)
            .chooseCornerByValue(testData.propertyMaps.cornerValue)
            .uploadTaxMap(testData.propertyMaps.taxMapFile)
            .captureSubjectMap()
            .clickSaveContinueButton();
        photosActions.uploadPhotosBySectionName(testData.facadePhotos)
            .uploadPhotosBySectionName(testData.subjectPhotos)
            .uploadPhotosBySectionName(testData.exteriorEntrancePhotos)
            .uploadPhotosBySectionName(testData.stairwayPhotos)
            .uploadPhotosBySectionName(testData.hallwayPhotos)
            .uploadPhotosBySectionName(testData.kitchenPhotos)
            .uploadPhotosBySectionName(testData.bathroomPhotos)
            .uploadPhotosBySectionName(testData.bedroomPhotos)
            .uploadPhotosBySectionName(testData.livingRoomPhotos)
            .uploadPhotosBySectionName(testData.electricMetersPhotos)
            .uploadPhotosBySectionName(testData.gasMetersPhotos)
            .editSectionName(testData.heatingSystemPhotos)
            .clickSaveButton()
            .verifyProgressBarNotExist();
        cy.reload();
        photosActions.uploadPhotosBySectionName(testData.heatingSystemPhotos)
            .uploadPhotosBySectionName(testData.hotWaterPhotos)
            .clickSaveContinueButton();
        zoningActions.enterZoneNames(testData.zoningDescriptionInformation.zonesNames)
            .verifyPropertyIdentification(testData.zoningDescriptionInformation)
            .verifyPropIdentificationCommentary(testData.zoningDescriptionInformation.propertyIdentificationCommentary)
            .verifyIntroductionCommentary(testData.zoningDescriptionInformation.introductionCommentary)
            .clickUsesTab()
            .choosePermittedPropertyUse(testData.zoningDescriptionUses.permittedPropertyUse)
            .chooseCurrentPropertyUse(testData.zoningDescriptionUses.currentPropertyUse)
            .chooseIsConformingAllowableUses()
            .verifyConformingUseCommentary(testData.zoningDescriptionUses)
            .clickBulkTab()
            .deleteRowsByRegulationValues(testData.zoningDescriptionBulk.regulationValuesDelete)
            .addBulkRegulation(testData.zoningDescriptionBulk.regulationNew)
            .editListRegulationsDataByNames(testData.zoningDescriptionBulk.existingRegulations)
            .verifyComplyingCommentary(testData.zoningDescriptionBulk.complyingCommentary)
            .clickParkingTab()
            .verifyParkingResidentialUnits(testData.zoningDescriptionParking.numberOfUnits)
            .verifyActualParkingSpaces(testData.zoningDescriptionParking.numberOfParkingPlaces)
            .enterRequiredParkingSpaces(testData.zoningDescriptionParking.requiredParkingPlaces)
            .chooseIsConformingWithParkingRequirements(testData.zoningDescriptionParking.isConforming)
            .verifyParkingConformityCommentary(testData.zoningDescriptionParking)
            .clickSaveContinueButton();
        renovationsActions.chooseRenovationByValue(testData.prospectiveRenovations.dropValue)
            .clickTotalButton()
            .fillTotalTable(testData.prospectiveRenovations.period, testData.prospectiveRenovations.totalAmount)
            .verifyNetTotalRenovationBudget(testData.prospectiveRenovations.totalAmount)
            .editCommentary(testData.prospectiveRenovations.commentary)
            .clickSaveContinueButton();
        residentialUnitsActions.fillKitchenDescription(testData.typicalKitchenCondition)
            .verifyKitchenConditionCommentary(testData.typicalKitchenCondition)
            .fillBathroomDescription(testData.typicalBathroomCondition)
            .verifyBathroomCommentary(testData.typicalBathroomCondition)
            .fillBedroomDescription(testData.bedroomCondition)
            .verifyBedroomCommentary(testData.bedroomCondition)
            .fillLivingRoomDescription(testData.livingRoomCondition)
            .verifyLivingRoomCommentary(testData.livingRoomCondition)
            .fillStairsDescription(testData.stairsData)
            .editStairsCommentary(testData.stairsData.commentary)
            .clickSaveContinueButton();
        inPlaceRentRollActions.verifyNumberOfResidentialUnits(testData.currentDescription.numberOfUnits)
            .checkCheckboxByLabelAndVerify(testData.inPLaceRentRoll.forecastLabel, testData.inPLaceRentRoll.forecastColumn)
            .checkListIsInspectedByRowNumbers(testData.inPLaceRentRoll.isInspectedRowsToCheck)
            .enterUnitNumbersByOrderToAll(testData.currentDescription.numberOfUnits)
            .enterAllEqualRoomsNumber(testData.inPLaceRentRoll.roomsNumber, testData.currentDescription.numberOfUnits)
            .enterAllEqualBedroomsNumber(testData.inPLaceRentRoll.bedroomsNumber, testData.currentDescription.numberOfUnits)
            .fillAllRentTypeCellsWithEqualValue(testData.inPLaceRentRoll.rentType)
            .enterAllEqualLeaseStatuses(testData.inPLaceRentRoll.leaseStatus, testData.currentDescription.numberOfUnits)
            .enterAllEqualForecast(testData.inPLaceRentRoll.forecastValue, testData.currentDescription.numberOfUnits)
            .verifyMonthlyTotalForecastEqualValue()
            .verifyAnnuallyTotalForecastEqualValue()
            .verifyRentRollCommentary(testData.inPLaceRentRoll.commentary)
            .clickSaveContinueButton();
        unitGroupsActions.verifyRowsNumberEqualBedroomsNonComp(testData.inPLaceRentRoll.bedroomsNumber,
            testData.currentDescription.numberOfUnits)
            .verifyGLAPercentage()
            .verifyRoomSize()
            .verifyGLAValue(testData.currentDescription.grossArea)
            .enterAvgSFByUnitTypeValue(testData.unitGroups.unitType, testData.unitGroups.averageSF)
            .verifyGLACellValue(testData.currentDescription.grossArea)
            .verifyTotalAvgSqftEqualUnits(testData.unitGroups.averageSF, testData.currentDescription.numberOfUnits)
            .clickSaveContinueButton();
        testData.rentComparables.comparables.forEach((comp, i) => {
            rentCompsActions.openAddNewComparableFormAdvanced(comp);
            addCompFormActions.fillNewRentCompWithoutNumbTypeSourceNameUrlNoteAmenities(comp);
            rentCompsActions.verifyComparableBedroomTableByNumber(i, comp);
        });
        rentCompsActions.clickSaveContinueButton();
        rentCompsMapActions.uploadCompMap(testData.rentComparables.compMapPath)
            .clickSaveContinueButton();
        const bedroomsNumber = testData.inPLaceRentRoll.bedroomsNumber;
        const forecastValue = testData.inPLaceRentRoll.forecastValue;
        rentReconciliationActions.verifyIntroCommentary(testData.resRentReconcil.reconcilIntroComm)
            .expandBedroomReconByNumber(bedroomsNumber)
            .verifyBedroomMinForecastByNumber(bedroomsNumber, forecastValue)
            .verifyBedroomAvgForecastByNumber(testData.inPLaceRentRoll, forecastValue)
            .verifyBedroomMaxForecastByNumber(bedroomsNumber, forecastValue)
            .verifyBedroomMinCompByNumber(bedroomsNumber, testData.rentComparables.comparables)
            .verifyBedroomAvgCompByNumber(bedroomsNumber, testData.rentComparables.comparables)
            .verifyBedroomMaxCompByNumber(bedroomsNumber, testData.rentComparables.comparables)
            .enterBedroomMarketConclusionByNumber(bedroomsNumber, testData.resRentReconcil.marketConclusion)
            .selectBedroomMarketBreakdownBedByNumber(bedroomsNumber, testData.resRentReconcil.marketBreakdown)
            .editBedroomCommentaryByBedNum(bedroomsNumber, testData.resRentReconcil.reconcilCommentary)
            .clickSaveContinueButton();
        stabilizedRentRollActions.verifyUnitTypeAndRentConclusion(testData.unitGroups.unitType,
            testData.resRentReconcil.marketConclusion)
            .verifyRowsNumber(testData.currentDescription.numberOfUnits)
            .verifyCheckedIsInspected(testData.inPLaceRentRoll.isInspectedRowsToCheck)
            .verifyUnitsNumberByOrder()
            .verifyAllRoomsNumbers(testData.inPLaceRentRoll.roomsNumber)
            .verifyAllBedroomsNumbers(testData.inPLaceRentRoll.bedroomsNumber)
            .verifyAllRentTypeCells(testData.inPLaceRentRoll.rentType)
            .enterAllMonthlyRents(testData.stabRentRoll.monthlyRentStab)
            .verifyTotalMonthlyRent(testData.currentDescription.numberOfUnits, testData.stabRentRoll.monthlyRentStab)
            .verifyTotalAnnualRent()
            .verifyAllPerRoomCells(testData.inPLaceRentRoll.roomsNumber, testData.stabRentRoll.monthlyRentStab)
            .verifyAllLeaseStatusesCells(testData.inPLaceRentRoll.leaseStatus)
            .verifyAllRentForecasts(testData.inPLaceRentRoll.forecastValue)
            .verifyTotalMonthlyForecast(testData.currentDescription.numberOfUnits, testData.inPLaceRentRoll.forecastValue)
            .verifyTotalAnnualForecast()
            .verifyRentRollDiscussionCommentary(testData.stabRentRoll.rentRollDiscussionComm)
            .editOccupancyRateCommentary(testData.stabRentRoll.occupancyRateComm)
            .clickSaveContinueButton();
        stabRentRollSummaryActions.verifyAnnualRentByRow(testData.stabRentRollSummary.marketAnnualRent)
            .verifyTotalAnnualRent(testData.stabRentRollSummary.marketAnnualRent)
            .verifyIncreaseValueByRow()
            .verifyPGICellByRow(testData.stabRentRollSummary.marketAnnualRent)
            .verifyPGITotal(testData.stabRentRollSummary.marketAnnualRent)
            .openDiscussionTab()
            .verifyStabRRSummaryDiscussion(testData.stabRentRollSummary.stabRRSummary)
            .verifyGrossIncomeDiscussion(testData.stabRentRollSummary.grossIncomeDiscussion)
            .verifyDistributionSummary(testData.stabRentRollSummary.distributionSummary)
            .clickSaveContinueButton();
        expensesStructureActions.checkHeatExpensesByValue(testData.expenseStructure.tenantValue)
            .checkElectricityByValue(testData.expenseStructure.tenantValue)
            .checkCommonElectricityByValue(testData.expenseStructure.ownerValue)
            .checkGasByValue(testData.expenseStructure.tenantValue)
            .checkRefuseRemovalByValue(testData.expenseStructure.ownerValue)
            .checkWaterSewerByValue(testData.expenseStructure.ownerValue)
            .checkAreaMaintenanceByValue(testData.expenseStructure.ownerValue)
            .verifyTenantObligationsCommentary(testData.expenseStructure.tenantObligationsCommentary)
            .verifyOwnerObligationsCommentary(testData.expenseStructure.ownerObligationsCommentary)
            .clickSaveContinueButton();
        laundryActions.verifyNoLaundryButtonExists()
            .clickSaveContinueButton();
        storageActions.verifyNoStorageButtonExists()
            .clickSaveContinueButton();
        parkingActions.checkIsFreeParkingCheckbox()
            .verifyParkingCommentary(testData.parking.commentary)
            .clickSaveContinueButton();
        otherActions.verifyPageIsOpened()
            .clickSaveContinueButton();
        grossIncomeActions.enterResVacancyCollLoss(testData.grossIncome.resVacancyCollLoss)
            .verifyResidentialVCLoss(testData.grossIncome.resVacancyCollLoss, testData.stabRentRollSummary.marketAnnualRent)
            .enterCoStarSubmarketRate(testData.grossIncome.coStarRate)
            .enterCoStarMetroRate(testData.grossIncome.coStarRate)
            .editCommentary(testData.grossIncome.commentary)
            .verifyIncomeTable(testData.stabRentRollSummary.marketAnnualRent)
            .clickSaveContinueButton();
        taxInfoActions.checkBasisByValue(testData.currentTaxInfo.liabilityBasis)
            .fillTaxableAssessedValues(testData.currentTaxInfo)
            .editTaxRatesWithoutAddingNew(testData.currentTaxInfo)
            .verifyTaxLiabilityInfo(testData.currentTaxInfo)
            .verifyTaxLiabilityTable(testData.currentTaxInfo.rateValue, testData.currentDescription.numberOfUnits)
            .verifyTaxLiabilityCommentary(testData.currentTaxInfo.liabilityCommentary)
            .clickProjectedTab()
            .checkProjectedIncludeCheckbox()
            .verifyProjectedLiabilityCommentary(testData.projectedTaxInfo.liabilityComm)
            .clickComparablesTab()
            .addListTaxComparablesWithoutSourceInfoData(testData.comparablesTaxInfo.comparables)
            .verifyListAddedComparables(testData.comparablesTaxInfo.comparables)
            .verifyTaxCompsCommentary(testData.comparablesTaxInfo.commentary)
            .clickSummaryTab()
            .checkConcludedLiabilityTypeByValue(testData.summaryTaxInfo.liabilityType)
            .enterConcludedLiabilityPerBasis(testData.summaryTaxInfo.liabilityValue)
            .verifyAppraiserOpinionLiabilityTotal(testData.summaryTaxInfo.liabilityValue, testData.currentDescription.numberOfUnits)
            .verifyAppraiserOpinionTaxLiabilityPerBasis(testData.summaryTaxInfo.liabilityValue)
            .verifyAppraiserOpinionTaxRateCell(testData.currentTaxInfo.rateValue)
            .verifyAppraiserOpinionTaxableAssessedValueCell(testData.currentTaxInfo.rateValue)
            .verifyTaxSummaryCommentary(testData.summaryTaxInfo.commentary)
            .clickSaveContinueButton();
        expenseHistoryActions.selectExpensePeriod(testData.expenseHistory.expensePeriod)
            .verifyExpenseYear(testData.expenseHistory.expenseYear)
            .clickAddExpenseYearButton()
            .checkGrossRevenueCheckboxByColumnIndex()
            .enterGrossRevenueByColIndex(testData.expenseHistory.grossRevenue)
            .enterRealEstateTaxesByColIndex(testData.expenseHistory.realEstateTaxes)
            .enterInsuranceByColIndex(testData.expenseHistory.insuranceExpense)
            .enterElectricityByColIndex(testData.expenseHistory.electricityExpense)
            .enterFuelByColIndex(testData.expenseHistory.fuelExpense)
            .uncheckFuelCheckboxByColIndex()
            .uncheckWaterSewerCheckboxByColIndex()
            .enterPayrollBenefitsByColIndex(testData.expenseHistory.payrollBenefitsExpense)
            .verifyTotalOpExpensesByColIndex(testData.expenseHistory.toeToBe)
            .verifyTOEExcludingRETByIndex(testData.expenseHistory.realEstateTaxes)
            .verifyNetOpIncomeByIndex(testData.expenseHistory.grossRevenue)
            .verifyAverageTable()
            .verifyExpenseHistoryCommentary(testData.expenseHistory.commentary)
            .clickSaveContinueButton();
        testData.comparableExpenses.comparables.forEach((comp, i) => {
            compExpensesActions.clickAddBlankColumnButton()
                .enterAddressByColumnIndex(comp.address, i)
                .enterLocationByColumnIndex(comp.location, i)
                .chooseExpensePeriodByColumnIndex(comp.period, i)
                .enterSquareFeetByColumnIndex(comp.squareFeet, i)
                .enterResidentialUnitsByColumnIndex(comp.resUnits, i)
                .enterInsuranceByColumnIndex(comp.insurance, i)
                .enterElectricityByColumnIndex(comp.electricity, i)
                .enterRepairsMaintenanceByColumnIndex(comp.repairsAndMaintenance, i)
                .enterPayrollBenefitsByColumnIndex(comp.payrollAndBenefits, i)
                .enterGeneralAdministrativeByColumnIndex(comp.generalAndAdministrative, i)
                .enterManagementFeesByColumnIndex(comp.management, i)
                .verifyTOEByColumnIndex(comp.toe, i)
                .verifyTOEPerSFByColumnIndex(i)
                .verifyToePerUnitByColumnIndex(i);
        });
        compExpensesActions.verifyTableAverageValues()
            .clickSaveContinueButton();
        navSectionActions.clickExpenseForecastBookmark();
        expenseForecastActions.chooseForecastItemBasis(testData.expenseForecast.insuranceItem)
            .enterForecastItemForecast(testData.expenseForecast.insuranceItem)
            .verifyForecastItemCompMin(testData.expenseForecast.insuranceItem, testData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(testData.expenseForecast.insuranceItem, testData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(testData.expenseForecast.insuranceItem, testData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(testData.expenseForecast.insuranceItem, testData.currentDescription)
            .chooseForecastItemBasis(testData.expenseForecast.electricityItem)
            .enterForecastItemForecast(testData.expenseForecast.electricityItem)
            .verifyForecastItemCompMin(testData.expenseForecast.electricityItem, testData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(testData.expenseForecast.electricityItem, testData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(testData.expenseForecast.electricityItem, testData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(testData.expenseForecast.electricityItem, testData.currentDescription)
            .verifyForecastItemOwnerProjection(testData.expenseForecast.electricityItem, testData.currentDescription)
            .chooseForecastItemBasis(testData.expenseForecast.fuelItem)
            .chooseForecastItemBasis(testData.expenseForecast.waterSewerItem)
            .chooseForecastItemBasis(testData.expenseForecast.repairsMaintenance)
            .enterForecastItemForecast(testData.expenseForecast.repairsMaintenance)
            .verifyForecastItemCompMin(testData.expenseForecast.repairsMaintenance, testData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(testData.expenseForecast.repairsMaintenance, testData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(testData.expenseForecast.repairsMaintenance, testData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(testData.expenseForecast.repairsMaintenance, testData.currentDescription)
            .chooseForecastItemBasis(testData.expenseForecast.payrollBenefits)
            .enterForecastItemForecast(testData.expenseForecast.payrollBenefits)
            .verifyForecastItemCompMin(testData.expenseForecast.payrollBenefits, testData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(testData.expenseForecast.payrollBenefits, testData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(testData.expenseForecast.payrollBenefits, testData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(testData.expenseForecast.payrollBenefits, testData.currentDescription)
            .verifyForecastItemOwnerProjection(testData.expenseForecast.payrollBenefits, testData.currentDescription)
            .chooseForecastItemBasis(testData.expenseForecast.general)
            .enterForecastItemForecast(testData.expenseForecast.general)
            .verifyForecastItemCompMin(testData.expenseForecast.general, testData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(testData.expenseForecast.general, testData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(testData.expenseForecast.general, testData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(testData.expenseForecast.general, testData.currentDescription)
            .chooseForecastItemBasis(testData.expenseForecast.legalProf)
            .chooseForecastItemBasis(testData.expenseForecast.miscellaneous)
            .chooseForecastItemBasis(testData.expenseForecast.management)
            .checkPercentOfEGICheckbox()
            .enterPercentOfEgi(testData.expenseForecast.percentOfEgi);
        const managementForecastEgi = expenseForecastActions
            .getManagementForecastEgiPercent(testData.expenseForecast, testData.currentDescription);
        expenseForecastActions.verifyManagementForecast(managementForecastEgi)
            .verifyForecastItemCompMin(testData.expenseForecast.management, testData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(testData.expenseForecast.management, testData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(testData.expenseForecast.management, testData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(testData.expenseForecast.management, testData.currentDescription, managementForecastEgi)
            .chooseForecastItemBasis(testData.expenseForecast.reserves)
            .enterForecastItemForecast(testData.expenseForecast.reserves)
            .verifyForecastItemBasisMoney(testData.expenseForecast.reserves, testData.currentDescription)
            .chooseForecastItemBasis(testData.expenseForecast.total)
            .verifyToeCompMinPerBasis(testData.expenseForecast.total.basis, testData.comparableExpenses.comparables)
            .verifyToeCompAvgPerBasis(testData.expenseForecast.total.basis, testData.comparableExpenses.comparables)
            .verifyToeCompMaxPerBasis(testData.expenseForecast.total.basis, testData.comparableExpenses.comparables)
            .verifyOwnersProFormaValue()
            .verifyTotalForecast()
            .clickSaveContinueButton();
        proFormaActions.verifyPotentialResIncomeRow(testData.proForma.potentialResIncomeRow)
            .verifyPotentialGrossIncomeRow(testData.proForma.potentialGrossIncomeRow)
            .verifyResVCLossRow(testData.proForma.vcLossRow)
            .verifyEffectiveGrossRow(testData.proForma.effectiveGrossRow)
            .verifyRETaxesRow(testData.proForma.reTaxesRow)
            .verifyInsuranceRow(testData.proForma.insuranceRow)
            .verifyElectricityRow(testData.proForma.electricityRow)
            .verifyRepairsRow(testData.proForma.repairsRow)
            .verifyPayrollRow(testData.proForma.payrollRow)
            .verifyGeneralRow(testData.proForma.generalRow)
            .verifyManagementRow(testData.proForma.managementRow)
            .verifyReservesRow(testData.proForma.reservesRow)
            .verifyToeRow(testData.proForma.toeRow)
            .verifyToeNetReRow(testData.proForma.toeNetReRow)
            .verifyNetOpIncomeRow(testData.proForma.netOpIncomeRow)
            .verifyOperatingExpenseRatio(testData.proForma.opExpenseRatio)
            .clickSaveContinueButton();
        supportingCapRatesActions.uncheckIncludePersonalSurvey()
            .verifyIncomeCapitalizationCommentary(testData.supportingCapRates.incomeCapComm)
            .clickSelectedLoanSectionButton()
            .verifySelectedLoanTermsSection(testData.supportingCapRates.selectedLoanTermsSection)
            .clickSelectedLoanSectionButton()
            .clickBandOfInvestmentSectionButton()
            .enterEquityDividendRate(testData.supportingCapRates.bandInvestmentSection.equityDividendRate)
            .verifyBandInvestmentSection(testData.supportingCapRates.bandInvestmentSection)
            .clickSaveContinueButton();
        capRateConclusionActions.verifyBandOfInvestments(testData.capRateConclusion.bandOfInvestmentsValue)
            .navigateToCapRateComps();
        capRateCompsActions.verifyPageIsOpened();
        testData.capRateComps.comparables.forEach((comp, i) => {
            capRateCompsActions.addComparable(comp)
                .fillAddedCompWithInfo(comp, i);
        });
        const capRatesArray = testData.capRateComps.comparables.map(comp => Number(comp.capRate));
        const minCapRate = Math.min(...capRatesArray);
        const maxCapRate = Math.max(...capRatesArray);
        const capRateSum = capRatesArray.reduce((sum, current) => sum + current, 0);
        const avgCapRate = (capRateSum / capRatesArray.length).toFixed(2);
        capRateCompsActions.verifyCapRateCommentary(minCapRate, maxCapRate, avgCapRate)
            .chooseCompIncomePotential(testData.capRateComps.compIncomePotential)
            .chooseCompPropertyConditions(testData.capRateComps.compPropertyConditions)
            .chooseCompPropertyLocations(testData.capRateComps.compPropertyLocations);
        navSectionActions.navigateToCapRateConclusion();
        capRateConclusionActions.verifyCompCapRatesCell(minCapRate, maxCapRate)
            .enterConclusionSectionConcludedCapRate(testData.capRateConclusion.concludedCapRate)
            .enterAsCompleteMonthsOfRentLoss(testData.capRateConclusion.asCompleteMonthsOfRentLoss)
            .enterASStabilizedMonthsOfRentLoss(testData.capRateConclusion.asStabilizedMonthsOfRentLoss)
            .selectRoundingFactor(testData.capRateConclusion.roundingFactorValue)
            .verifyNetOperatingIncome(testData.capRateConclusion.netOperatingIncome)
            .verifyConcludedCapRateCell(testData.capRateConclusion.concludedCapRate)
            .verifyAsStabilizedTablePart(testData.capRateConclusion.asStabilizedPart)
            .verifyAsCompleteTablePart(testData.capRateConclusion.asCompletePart)
            .enterAsCompleteLessEntrepreneurialProfit(testData.capRateConclusion.asCompletePart.lessEntrepreneurialProfit)
            .verifyAsIsMarketTablePart(testData.capRateConclusion.asIsMarketPart)
            .clickSaveContinueButton();
        testData.findComps.comparables.forEach((comp, i) => {
            findCompsActions.addComparable(comp.address)
                .verifyAddedCompAddressByIndex(comp.address, i + 1);
        });
        findCompsActions.clickSaveContinueButton();
        createSalesCompMap.captureScreen()
            .clickSaveContinueButton();
        adjustCompsActions.checkCalculationUnitsRadio(testData.adjustComps.calculationUnitsRadioValue)
            .checkIncomeAdjustmentLevel(testData.adjustComps.incomeAdjustmentType);
        testData.adjustComps.comparables.forEach((comp, i) => {
            adjustCompsActions.enterSizeAdjustmentByColumn(comp.size, i)
                .enterConditionAdjustmentByColumn(comp.condition, i)
                .enterOtherAdjustmentByColumn(comp.other, i)
                .verifyTrendedPriceByColumn(comp.trendedPrice, i)
                .verifyAdjustedPriceByColumn(comp.adjustedPrice, i);
        });
        adjustCompsActions.editOtherAdjustmentRowName(testData.adjustComps.otherAdjustmentNewName)
            .clickSaveContinueButton();
        valueConclusionActions.verifyUnadjustedPrices(testData.valueConclusion.unadjustedPrices)
            .verifyAdjustedPrices(testData.valueConclusion.adjustedPrices)
            .verifyIncomeApproachConclusion(testData.valueConclusion.incomeApproachConclusion)
            .enterSaleValueConclusion(testData.valueConclusion.saleValueConclusion)
            .verifyAsStabilizedRow(testData.valueConclusion.asStabilizedRow)
            .verifyAsCompleteRow(testData.valueConclusion.asCompleteRow)
            .verifyAsIsMarketRow(testData.valueConclusion.asIsMarketRow)
            .clickSaveContinueButton();
        finalValuesReconciliationActions.closeSatisfactionSurvey()
            .checkPerUnitCheckbox()
            .verifyIncomeStabDate(testData.finalValuesReconciliation.stabilizedCompleteDate)
            .verifyIncomeCompleteDate(testData.finalValuesReconciliation.stabilizedCompleteDate)
            .verifyIncomeMarketDate(testData.finalValuesReconciliation.marketDate)
            .verifySalesStabilizedDate(testData.finalValuesReconciliation.stabilizedCompleteDate)
            .verifySalesCompleteDate(testData.finalValuesReconciliation.stabilizedCompleteDate)
            .verifySalesMarketDate(testData.finalValuesReconciliation.marketDate)
            .checkFinalValueApproachRadio(testData.finalValuesReconciliation.finalValueApproach)
            .verifyFinalValueAsStabDate(testData.finalValuesReconciliation.stabilizedCompleteDate)
            .verifyFinalValueAsCompleteDate(testData.finalValuesReconciliation.stabilizedCompleteDate)
            .verifyFinalValueAsIsDate(testData.finalValuesReconciliation.marketDate)
            .clickSaveContinueButton();
        propertySalesConclusionActions.verifyContractPrice(testData.propertySalesConclusion.contractPrice)
            .verifyContractDate(testData.propertySalesConclusion.contractDate)
            .verifyContractChangeInValue(testData.propertySalesConclusion.asIsMarketFinalValue)
            .clickSaveContinueButton();
        assumptionsConditionsActions.addExtraordinaryAssumption(testData.assumptions.extraordinaryAssumption)
            .clickSaveContinueButton();
        swotAnalysisActions.uncheckIncludeInReportCheckbox()
            .clickSaveContinueButton();
        highestBestUseActions.verifyZoneNameByRow(testData.zoningDescriptionInformation.zonesNames[0])
            .verifyAllowableUsesByRow(testData.zoningDescriptionUses.permittedPropertyUse)
            .verifySiteAreaByRow(testData.siteDetails.siteArea)
            .verifyZoningAreaByRow(testData.currentDescription.grossArea)
            .clickPhysicallyTab()
            .verifyPropertyFrontage(testData.siteDescriptors.propertyFrontage)
            .verifyPropertyCondition(testData.highestBestUse.propertyCondition)
            .verifyComplyingBulk(testData.highestBestUse.complyingBulk)
            .verifyConformingUse(testData.highestBestUse.conformingUse)
            .verifyUnitType(testData.unitGroups.unitType)
            .verifyUnitsNumber(testData.currentDescription.numberOfUnits)
            .checkSizeWithinRangeCheckbox()
            .checkUtilitiesAvailableCheckbox()
            .clickFinanciallyTab()
            .checkSubjectMarketRadioValue(testData.highestBestUse.marketCharPropType)
            .checkAsVacantBestUsePropTypeRadioValue(testData.highestBestUse.marketCharPropType)
            .addFinanciallyFeasiblePropertyTypesAsVacant(testData.highestBestUse.feasiblePropertyType)
            .uncheckNewConstructionFeasibleCheckbox()
            .checkAsImprovedBestUseRadioValue(testData.highestBestUse.marketCharPropType)
            .addFinanciallyFeasiblePropertyTypesAsImproved(testData.highestBestUse.feasiblePropertyType)
            .clickHighestUseTab()
            .verifyAsVacantHighestUse(testData.highestBestUse.marketCharPropType, testData.highestBestUse.feasiblePropTypeWord)
            .verifyAsImprovedHighestUse(testData.highestBestUse.marketCharPropType, testData.highestBestUse.feasiblePropTypeWord)
            .clickProbableBuyerTab()
            .checkLocalCheckbox()
            .checkRegionalCheckbox()
            .clickSaveContinueButton();
        unitInspectionActions.verifyNumberOfInspectedUnitsRows(testData.inPLaceRentRoll.isInspectedRowsToCheck.length)
            .chooseListReadyForOccupancyValues(testData.unitInspection.readyForOccupancyValues)
            .verifyNumberOfInspectedUnitsCommentary(testData.inPLaceRentRoll.isInspectedRowsToCheck.length)
            .clickSaveContinueButton();
        scopeActions.verifyNumberOfItems()
            .clickSaveContinueButton();
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
            .verifyComparableSalesDataSources()
            .clickSaveContinueButton();
        capRateCompsActions.clickSaveContinueButton();
        capRateDiscussionActions.verifyCapRateTable(testData.capRateDiscussion.capRateTable)
            .verifyPwCRow(testData.capRateDiscussion.pwcRow)
            .verifySitusRow(testData.capRateDiscussion.situsRow)
            .clickCapRateCompsTab()
            .verifyCapRateCompsTable(testData.capRateDiscussion.capRateCompsTable)
            .clickIncomeSpikesTab()
            .verifyIncomeSpikesTable(testData.capRateDiscussion.incomeSpikesTable)
            .checkIncomeSpikesRadios(testData.capRateDiscussion.incomeSpikesRadios)
            .clickSaveContinueButton();
        navSectionActions.clickInsurableReplacementCostBookmark();
        insurableReplacementCostActions.verifySubjectState(testData.insurableReplacementCost.subjectState)
            .verifySubjectLocale(testData.insurableReplacementCost.subjectLocale)
            .verifyLocalMultiplier()
            .clickSaveContinueButton();
    });
});
