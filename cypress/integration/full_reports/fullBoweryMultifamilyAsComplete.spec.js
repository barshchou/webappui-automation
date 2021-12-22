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
            .fillAsCompleteBuildingDescription(newTestData.asCompleteDescription)
            .clickWalkUpTypeButtons()
            .fillCurrentBuildDescription(newTestData.currentDescription)
            .editAsCompleteExport(newTestData.asCompleteDescription.asCompleteExportText)
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
        inPlaceRentRollActions.verifyNumberOfResidentialUnits(newTestData.currentDescription.numberOfUnits)
            .checkCheckboxByLabelAndVerify(newTestData.inPLaceRentRoll.forecastLabel, newTestData.inPLaceRentRoll.forecastColumn)
            .checkListIsInspectedByRowNumbers(newTestData.inPLaceRentRoll.isInspectedRowsToCheck)
            .enterUnitNumbersByOrderToAll(newTestData.currentDescription.numberOfUnits)
            .enterAllEqualRoomsNumber(newTestData.inPLaceRentRoll.roomsNumber, newTestData.currentDescription.numberOfUnits)
            .enterAllEqualBedroomsNumber(newTestData.inPLaceRentRoll.bedroomsNumber, newTestData.currentDescription.numberOfUnits)
            .fillAllRentTypeCellsWithEqualValue(newTestData.inPLaceRentRoll.rentType)
            .enterAllEqualLeaseStatuses(newTestData.inPLaceRentRoll.leaseStatus, newTestData.currentDescription.numberOfUnits)
            .enterAllEqualForecast(newTestData.inPLaceRentRoll.forecastValue, newTestData.currentDescription.numberOfUnits)
            .verifyMonthlyTotalForecastEqualValue()
            .verifyAnnuallyTotalForecastEqualValue()
            .verifyRentRollCommentary(newTestData.inPLaceRentRoll.commentary)
            .clickSaveContinueButton();
        unitGroupsActions.verifyRowsNumberEqualBedroomsNonComp(newTestData.inPLaceRentRoll.bedroomsNumber,
            newTestData.currentDescription.numberOfUnits)
            .verifyGLAPercentage()
            .verifyRoomSize()
            .verifyGLAValue(newTestData.currentDescription.grossArea)
            .enterAvgSFByUnitTypeValue(newTestData.unitGroups.unitType, newTestData.unitGroups.averageSF)
            .verifyGLACellValue(newTestData.currentDescription.grossArea)
            .verifyTotalAvgSqftEqualUnits(newTestData.unitGroups.averageSF, newTestData.currentDescription.numberOfUnits)
            .clickSaveContinueButton();
        newTestData.rentComparables.comparables.forEach((comp, i) => {
            rentCompsActions.openAddNewComparableFormAdvanced(comp);
            addCompFormActions.fillNewRentCompWithoutNumbTypeSourceNameUrlNoteAmenities(comp);
            rentCompsActions.verifyComparableBedroomTableByNumber(i, comp);
        });
        rentCompsActions.clickSaveContinueButton();
        rentCompsMapActions.uploadCompMap(newTestData.rentComparables.compMapPath)
            .clickSaveContinueButton();
        const bedroomsNumber = newTestData.inPLaceRentRoll.bedroomsNumber;
        const forecastValue = newTestData.inPLaceRentRoll.forecastValue;
        rentReconciliationActions.verifyIntroCommentary(newTestData.resRentReconcil.reconcilIntroComm)
            .expandBedroomReconByNumber(bedroomsNumber)
            .verifyBedroomMinForecastByNumber(bedroomsNumber, forecastValue)
            .verifyBedroomAvgForecastByNumber(newTestData.inPLaceRentRoll, forecastValue)
            .verifyBedroomMaxForecastByNumber(bedroomsNumber, forecastValue)
            .verifyBedroomMinCompByNumber(bedroomsNumber, newTestData.rentComparables.comparables)
            .verifyBedroomAvgCompByNumber(bedroomsNumber, newTestData.rentComparables.comparables)
            .verifyBedroomMaxCompByNumber(bedroomsNumber, newTestData.rentComparables.comparables)
            .enterBedroomMarketConclusionByNumber(bedroomsNumber, newTestData.resRentReconcil.marketConclusion)
            .selectBedroomMarketBreakdownBedByNumber(bedroomsNumber, newTestData.resRentReconcil.marketBreakdown)
            .editBedroomCommentaryByBedNum(bedroomsNumber, newTestData.resRentReconcil.reconcilCommentary)
            .clickSaveContinueButton();
        stabilizedRentRollActions.verifyUnitTypeAndRentConclusion(newTestData.unitGroups.unitType,
            newTestData.resRentReconcil.marketConclusion)
            .verifyRowsNumber(newTestData.currentDescription.numberOfUnits)
            .verifyCheckedIsInspected(newTestData.inPLaceRentRoll.isInspectedRowsToCheck)
            .verifyUnitsNumberByOrder()
            .verifyAllRoomsNumbers(newTestData.inPLaceRentRoll.roomsNumber)
            .verifyAllBedroomsNumbers(newTestData.inPLaceRentRoll.bedroomsNumber)
            .verifyAllRentTypeCells(newTestData.inPLaceRentRoll.rentType)
            .enterAllMonthlyRents(newTestData.stabRentRoll.monthlyRentStab)
            .verifyTotalMonthlyRent(newTestData.currentDescription.numberOfUnits, newTestData.stabRentRoll.monthlyRentStab)
            .verifyTotalAnnualRent()
            .verifyAllPerRoomCells(newTestData.inPLaceRentRoll.roomsNumber, newTestData.stabRentRoll.monthlyRentStab)
            .verifyAllLeaseStatusesCells(newTestData.inPLaceRentRoll.leaseStatus)
            .verifyAllRentForecasts(newTestData.inPLaceRentRoll.forecastValue)
            .verifyTotalMonthlyForecast(newTestData.currentDescription.numberOfUnits, newTestData.inPLaceRentRoll.forecastValue)
            .verifyTotalAnnualForecast()
            .verifyRentRollDiscussionCommentary(newTestData.stabRentRoll.rentRollDiscussionComm)
            .editOccupancyRateCommentary(newTestData.stabRentRoll.occupancyRateComm)
            .clickSaveContinueButton();
        stabRentRollSummaryActions.verifyAnnualRentByRow(newTestData.stabRentRollSummary.marketAnnualRent)
            .verifyTotalAnnualRent(newTestData.stabRentRollSummary.marketAnnualRent)
            .verifyIncreaseValueByRow()
            .verifyPGICellByRow(newTestData.stabRentRollSummary.marketAnnualRent)
            .verifyPGITotal(newTestData.stabRentRollSummary.marketAnnualRent)
            .openDiscussionTab()
            .verifyStabRRSummaryDiscussion(newTestData.stabRentRollSummary.stabRRSummary)
            .verifyGrossIncomeDiscussion(newTestData.stabRentRollSummary.grossIncomeDiscussion)
            .verifyDistributionSummary(newTestData.stabRentRollSummary.distributionSummary)
            .clickSaveContinueButton();
        expensesStructureActions.checkHeatExpensesByValue(newTestData.expenseStructure.tenantValue)
            .checkElectricityByValue(newTestData.expenseStructure.tenantValue)
            .checkCommonElectricityByValue(newTestData.expenseStructure.ownerValue)
            .checkGasByValue(newTestData.expenseStructure.tenantValue)
            .checkRefuseRemovalByValue(newTestData.expenseStructure.ownerValue)
            .checkWaterSewerByValue(newTestData.expenseStructure.ownerValue)
            .checkAreaMaintenanceByValue(newTestData.expenseStructure.ownerValue)
            .verifyTenantObligationsCommentary(newTestData.expenseStructure.tenantObligationsCommentary)
            .verifyOwnerObligationsCommentary(newTestData.expenseStructure.ownerObligationsCommentary)
            .clickSaveContinueButton();
        laundryActions.verifyNoLaundryButtonExists()
            .clickSaveContinueButton();
        storageActions.verifyNoStorageButtonExists()
            .clickSaveContinueButton();
        parkingActions.checkIsFreeParkingCheckbox()
            .verifyParkingCommentary(newTestData.parking.commentary)
            .clickSaveContinueButton();
        otherActions.verifyPageIsOpened()
            .clickSaveContinueButton();
        grossIncomeActions.enterResVacancyCollLoss(newTestData.grossIncome.resVacancyCollLoss)
            .verifyResidentialVCLoss(newTestData.grossIncome.resVacancyCollLoss, newTestData.stabRentRollSummary.marketAnnualRent)
            .enterCoStarSubmarketRate(newTestData.grossIncome.coStarRate)
            .enterCoStarMetroRate(newTestData.grossIncome.coStarRate)
            .editCommentary(newTestData.grossIncome.commentary)
            .verifyIncomeTable(newTestData.stabRentRollSummary.marketAnnualRent)
            .clickSaveContinueButton();
        taxInfoActions.checkBasisByValue(newTestData.currentTaxInfo.liabilityBasis)
            .fillTaxableAssessedValues(newTestData.currentTaxInfo)
            .editTaxRatesWithoutAddingNew(newTestData.currentTaxInfo)
            .verifyTaxLiabilityInfo(newTestData.currentTaxInfo)
            .verifyTaxLiabilityTable(newTestData.currentTaxInfo.rateValue, newTestData.currentDescription.numberOfUnits)
            .verifyTaxLiabilityCommentary(newTestData.currentTaxInfo.liabilityCommentary)
            .clickProjectedTab()
            .checkProjectedIncludeCheckbox()
            .verifyProjectedLiabilityCommentary(newTestData.projectedTaxInfo.liabilityComm)
            .clickComparablesTab()
            .addListTaxComparablesWithoutSourceInfoData(newTestData.comparablesTaxInfo.comparables)
            .verifyListAddedComparables(newTestData.comparablesTaxInfo.comparables)
            .verifyTaxCompsCommentary(newTestData.comparablesTaxInfo.commentary)
            .clickSummaryTab()
            .checkConcludedLiabilityTypeByValue(newTestData.summaryTaxInfo.liabilityType)
            .enterConcludedLiabilityPerBasis(newTestData.summaryTaxInfo.liabilityValue)
            .verifyAppraiserOpinionLiabilityTotal(newTestData.summaryTaxInfo.liabilityValue, newTestData.currentDescription.numberOfUnits)
            .verifyAppraiserOpinionTaxLiabilityPerBasis(newTestData.summaryTaxInfo.liabilityValue)
            .verifyAppraiserOpinionTaxRateCell(newTestData.currentTaxInfo.rateValue)
            .verifyAppraiserOpinionTaxableAssessedValueCell(newTestData.currentTaxInfo.rateValue)
            .verifyTaxSummaryCommentary(newTestData.summaryTaxInfo.commentary)
            .clickSaveContinueButton();
        expenseHistoryActions.selectExpensePeriod(newTestData.expenseHistory.expensePeriod)
            .verifyExpenseYear(newTestData.expenseHistory.expenseYear)
            .clickAddExpenseYearButton()
            .checkGrossRevenueCheckboxByColumnIndex()
            .enterGrossRevenueByColIndex(newTestData.expenseHistory.grossRevenue)
            .enterRealEstateTaxesByColIndex(newTestData.expenseHistory.realEstateTaxes)
            .enterInsuranceByColIndex(newTestData.expenseHistory.insuranceExpense)
            .enterElectricityByColIndex(newTestData.expenseHistory.electricityExpense)
            .enterFuelByColIndex(newTestData.expenseHistory.fuelExpense)
            .uncheckFuelCheckboxByColIndex()
            .uncheckWaterSewerCheckboxByColIndex()
            .enterPayrollBenefitsByColIndex(newTestData.expenseHistory.payrollBenefitsExpense)
            .verifyTotalOpExpensesByColIndex(newTestData.expenseHistory.toeToBe)
            .verifyTOEExcludingRETByIndex(newTestData.expenseHistory.realEstateTaxes)
            .verifyNetOpIncomeByIndex(newTestData.expenseHistory.grossRevenue)
            .verifyAverageTable()
            .verifyExpenseHistoryCommentary(newTestData.expenseHistory.commentary)
            .clickSaveContinueButton();
        newTestData.comparableExpenses.comparables.forEach((comp, i) => {
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
        expenseForecastActions.chooseForecastItemBasis(newTestData.expenseForecast.insuranceItem)
            .enterForecastItemForecast(newTestData.expenseForecast.insuranceItem)
            .verifyForecastItemCompMin(newTestData.expenseForecast.insuranceItem, newTestData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(newTestData.expenseForecast.insuranceItem, newTestData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(newTestData.expenseForecast.insuranceItem, newTestData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(newTestData.expenseForecast.insuranceItem, newTestData.currentDescription)
            .chooseForecastItemBasis(newTestData.expenseForecast.electricityItem)
            .enterForecastItemForecast(newTestData.expenseForecast.electricityItem)
            .verifyForecastItemCompMin(newTestData.expenseForecast.electricityItem, newTestData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(newTestData.expenseForecast.electricityItem, newTestData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(newTestData.expenseForecast.electricityItem, newTestData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(newTestData.expenseForecast.electricityItem, newTestData.currentDescription)
            .verifyForecastItemOwnerProjection(newTestData.expenseForecast.electricityItem, newTestData.currentDescription)
            .chooseForecastItemBasis(newTestData.expenseForecast.fuelItem)
            .chooseForecastItemBasis(newTestData.expenseForecast.waterSewerItem)
            .chooseForecastItemBasis(newTestData.expenseForecast.repairsMaintenance)
            .enterForecastItemForecast(newTestData.expenseForecast.repairsMaintenance)
            .verifyForecastItemCompMin(newTestData.expenseForecast.repairsMaintenance, newTestData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(newTestData.expenseForecast.repairsMaintenance, newTestData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(newTestData.expenseForecast.repairsMaintenance, newTestData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(newTestData.expenseForecast.repairsMaintenance, newTestData.currentDescription)
            .chooseForecastItemBasis(newTestData.expenseForecast.payrollBenefits)
            .enterForecastItemForecast(newTestData.expenseForecast.payrollBenefits)
            .verifyForecastItemCompMin(newTestData.expenseForecast.payrollBenefits, newTestData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(newTestData.expenseForecast.payrollBenefits, newTestData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(newTestData.expenseForecast.payrollBenefits, newTestData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(newTestData.expenseForecast.payrollBenefits, newTestData.currentDescription)
            .verifyForecastItemOwnerProjection(newTestData.expenseForecast.payrollBenefits, newTestData.currentDescription)
            .chooseForecastItemBasis(newTestData.expenseForecast.general)
            .enterForecastItemForecast(newTestData.expenseForecast.general)
            .verifyForecastItemCompMin(newTestData.expenseForecast.general, newTestData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(newTestData.expenseForecast.general, newTestData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(newTestData.expenseForecast.general, newTestData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(newTestData.expenseForecast.general, newTestData.currentDescription)
            .chooseForecastItemBasis(newTestData.expenseForecast.legalProf)
            .chooseForecastItemBasis(newTestData.expenseForecast.miscellaneous)
            .chooseForecastItemBasis(newTestData.expenseForecast.management)
            .checkPercentOfEGICheckbox()
            .enterPercentOfEgi(newTestData.expenseForecast.percentOfEgi);
        const managementForecastEgi = expenseForecastActions
            .getManagementForecastEgiPercent(newTestData.expenseForecast, newTestData.currentDescription);
        expenseForecastActions.verifyManagementForecast(managementForecastEgi)
            .verifyForecastItemCompMin(newTestData.expenseForecast.management, newTestData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(newTestData.expenseForecast.management, newTestData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(newTestData.expenseForecast.management, newTestData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(newTestData.expenseForecast.management, newTestData.currentDescription, managementForecastEgi)
            .chooseForecastItemBasis(newTestData.expenseForecast.reserves)
            .enterForecastItemForecast(newTestData.expenseForecast.reserves)
            .verifyForecastItemBasisMoney(newTestData.expenseForecast.reserves, newTestData.currentDescription)
            .chooseForecastItemBasis(newTestData.expenseForecast.total)
            .verifyToeCompMinPerBasis(newTestData.expenseForecast.total.basis, newTestData.comparableExpenses.comparables)
            .verifyToeCompAvgPerBasis(newTestData.expenseForecast.total.basis, newTestData.comparableExpenses.comparables)
            .verifyToeCompMaxPerBasis(newTestData.expenseForecast.total.basis, newTestData.comparableExpenses.comparables)
            .verifyOwnersProFormaValue()
            .verifyTotalForecast()
            .clickSaveContinueButton();
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
