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
        renovationsActions.chooseRenovationByValue(newTestData.prospectiveRenovations.dropValue)
            .clickTotalButton()
            .fillTotalTable(newTestData.prospectiveRenovations.period, newTestData.prospectiveRenovations.totalAmount)
            .verifyNetTotalRenovationBudget(newTestData.prospectiveRenovations.totalAmount)
            .editCommentary(newTestData.prospectiveRenovations.commentary)
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
        proFormaActions.verifyPotentialResIncomeRow(newTestData.proForma.potentialResIncomeRow)
            .verifyPotentialGrossIncomeRow(newTestData.proForma.potentialGrossIncomeRow)
            .verifyResVCLossRow(newTestData.proForma.vcLossRow)
            .verifyEffectiveGrossRow(newTestData.proForma.effectiveGrossRow)
            .verifyRETaxesRow(newTestData.proForma.reTaxesRow)
            .verifyInsuranceRow(newTestData.proForma.insuranceRow)
            .verifyElectricityRow(newTestData.proForma.electricityRow)
            .verifyRepairsRow(newTestData.proForma.repairsRow)
            .verifyPayrollRow(newTestData.proForma.payrollRow)
            .verifyGeneralRow(newTestData.proForma.generalRow)
            .verifyManagementRow(newTestData.proForma.managementRow)
            .verifyReservesRow(newTestData.proForma.reservesRow)
            .verifyToeRow(newTestData.proForma.toeRow)
            .verifyToeNetReRow(newTestData.proForma.toeNetReRow)
            .verifyNetOpIncomeRow(newTestData.proForma.netOpIncomeRow)
            .verifyOperatingExpenseRatio(newTestData.proForma.opExpenseRatio)
            .clickSaveContinueButton();
        supportingCapRatesActions.uncheckIncludePersonalSurvey()
            .verifyIncomeCapitalizationCommentary(newTestData.supportingCapRates.incomeCapComm)
            .clickSelectedLoanSectionButton()
            .verifySelectedLoanTermsSection(newTestData.supportingCapRates.selectedLoanTermsSection)
            .clickSelectedLoanSectionButton()
            .clickBandOfInvestmentSectionButton()
            .enterEquityDividendRate(newTestData.supportingCapRates.bandInvestmentSection.equityDividendRate)
            .verifyBandInvestmentSection(newTestData.supportingCapRates.bandInvestmentSection)
            .clickSaveContinueButton();
        capRateConclusionActions.verifyBandOfInvestments(newTestData.capRateConclusion.bandOfInvestmentsValue)
            .verifyPWCCell(newTestData.capRateConclusion.pwcValue)
            .verifySitusCell(newTestData.capRateConclusion.situsValue);
        capRateConclusionActions.navigateToCapRateComps();
        capRateCompsActions.verifyPageIsOpened();
        newTestData.capRateComps.comparables.forEach((comp, i) => {
            capRateCompsActions.addComparable(comp)
                .fillAddedCompWithInfo(comp, i);
        });
        const capRatesArray = newTestData.capRateComps.comparables.map(comp => Number(comp.capRate));
        const minCapRate = Math.min(...capRatesArray);
        const maxCapRate = Math.max(...capRatesArray);
        const capRateSum = capRatesArray.reduce((sum, current) => sum + current, 0);
        const avgCapRate = (capRateSum / capRatesArray.length).toFixed(2);
        capRateCompsActions.verifyCapRateCommentary(minCapRate, maxCapRate, avgCapRate)
            .chooseCompIncomePotential(newTestData.capRateComps.compIncomePotential)
            .chooseCompPropertyConditions(newTestData.capRateComps.compPropertyConditions)
            .chooseCompPropertyLocations(newTestData.capRateComps.compPropertyLocations);
        navSectionActions.navigateToCapRateConclusion();
        capRateConclusionActions.verifyCompCapRatesCell(minCapRate, maxCapRate)
            .enterConclusionSectionConcludedCapRate(newTestData.capRateConclusion.concludedCapRate)
            .enterAsCompleteMonthsOfRentLoss(newTestData.capRateConclusion.asCompleteMonthsOfRentLoss)
            .enterASStabilizedMonthsOfRentLoss(newTestData.capRateConclusion.asStabilizedMonthsOfRentLoss)
            .selectRoundingFactor(newTestData.capRateConclusion.roundingFactorValue)
            .verifyNetOperatingIncome(newTestData.capRateConclusion.netOperatingIncome)
            .verifyConcludedCapRateCell(newTestData.capRateConclusion.concludedCapRate)
            .verifyAsStabilizedTablePart(newTestData.capRateConclusion.asStabilizedPart)
            .verifyAsCompleteTablePart(newTestData.capRateConclusion.asCompletePart)
            .enterAsCompleteLessEntrepreneurialProfit(newTestData.capRateConclusion.asCompletePart.lessEntrepreneurialProfit)
            .verifyAsIsMarketTablePart(newTestData.capRateConclusion.asIsMarketPart)
            .clickSaveContinueButton();
        newTestData.findComps.comparables.forEach((comp, i) => {
            findCompsActions.addComparable(comp.address)
                .verifyAddedCompByIndex(comp.address, i + 1, comp.capRate);
        });
        findCompsActions.clickSaveContinueButton();
        createSalesCompMap.captureScreen()
            .clickSaveContinueButton();
        adjustCompsActions.checkCalculationUnitsRadio(newTestData.adjustComps.calculationUnitsRadioValue)
            .checkIncomeAdjustmentLevel(newTestData.capRateComps.incomeAdjustmentType);
        newTestData.adjustComps.comparables.forEach((comp, i) => {
            adjustCompsActions.enterSizeAdjustmentByColumn(comp.size, i)
                .enterConditionAdjustmentByColumn(comp.condition, i)
                .enterOtherAdjustmentByColumn(comp.other, i)
                .verifyTrendedPriceByColumn(comp.trendedPrice, i)
                .verifyAdjustedPriceByColumn(comp.adjustedPrice, i);
        });
        adjustCompsActions.editOtherAdjustmentRowName(newTestData.adjustComps.otherAdjustmentNewName)
            .clickSaveContinueButton();
        valueConclusionActions.verifyUnadjustedPrices(newTestData.valueConclusion.unadjustedPrices)
            .verifyAdjustedPrices(newTestData.valueConclusion.adjustedPrices)
            .verifyIncomeApproachConclusion(newTestData.valueConclusion.incomeApproachConclusion)
            .enterSaleValueConclusion(newTestData.valueConclusion.saleValueConclusion)
            .verifyAsStabilizedRow(newTestData.valueConclusion.asStabilizedRow)
            .verifyAsCompleteRow(newTestData.valueConclusion.asCompleteRow)
            .verifyAsIsMarketRow(newTestData.valueConclusion.asIsMarketRow)
            .clickSaveContinueButton();
        finalValuesReconciliationActions.closeSatisfactionSurvey()
            .checkPerUnitCheckbox()
            .verifyIncomeStabDate(newTestData.finalValuesReconciliation.stabilizedCompleteDate)
            .verifyIncomeCompleteDate(newTestData.finalValuesReconciliation.stabilizedCompleteDate)
            .verifyIncomeMarketDate(newTestData.finalValuesReconciliation.marketDate)
            .verifySalesStabilizedDate(newTestData.finalValuesReconciliation.stabilizedCompleteDate)
            .verifySalesCompleteDate(newTestData.finalValuesReconciliation.stabilizedCompleteDate)
            .verifySalesMarketDate(newTestData.finalValuesReconciliation.marketDate)
            .checkFinalValueApproachRadio(newTestData.finalValuesReconciliation.finalValueApproach)
            .verifyFinalValueAsStabDate(newTestData.finalValuesReconciliation.stabilizedCompleteDate)
            .verifyFinalValueAsCompleteDate(newTestData.finalValuesReconciliation.stabilizedCompleteDate)
            .verifyFinalValueAsIsDate(newTestData.finalValuesReconciliation.marketDate)
            .clickSaveContinueButton();
        propertySalesConclusionActions.verifyContractPrice(newTestData.propertySalesConclusion.contractPrice)
            .verifyContractDate(newTestData.propertySalesConclusion.contractDate)
            .verifyContractChangeInValue(newTestData.propertySalesConclusion.asIsMarketFinalValue)
            .clickSaveContinueButton();
        assumptionsConditionsActions.addExtraordinaryAssumption(testData.extraordinaryAssumption)
            .clickSaveContinueButton();
        swotAnalysisActions.uncheckIncludeInReportCheckbox()
            .clickSaveContinueButton();
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
