import testData from 
    "../../fixtures/full_reports/full_bowery_multifamily_as_complete/fullBoweryMultifamilyAsComplete.fixtures";
import Homepage from "../../actions/base/homepage.actions";
import Report from "../../actions/report/report.manager";
import NavigationSection from "../../actions/base/navigationSection.actions";
import Property from "../../actions/property/property.manager";
import Income from "../../actions/income/income.manager";
import Final from "../../actions/final/final.manager";
import Sales from "../../actions/sales/sales.manager";
import proFormaTypesEnum from "../../enums/proFormaTypes.enum";
import tableExpenseHistoryCellNames from "../../../cypress/enums/expense/expenseHistoryTableRows.enum";
import { loginAction } from "../../actions/base/baseTest.actions";
import Enums from "../../enums/enums";

describe.skip("Full bowery way, multifamily as complete report", { tags: [ "@full_report" ] }, () => {
    it("Test", () => {
        loginAction();
        Homepage.createReport(testData.reportCreationData);
        Report.KeyInfo.choosePurpose(testData.keyInfoPurposeData.purposeValue)
            .checkAllInterestAppraisedByValues(testData.keyInfoPurposeData.interestAppraised)
            .enterDateByType(testData.keyInfoEngagementData._dueDateFixture)
            .enterDateByType(testData.keyInfoEngagementData._valuationDateFixture)
            .uploadFile(testData.keyInfoEngagementData.engagementFileName);
        NavigationSection.navigateToClientPage();
        Report.Client.enterClientName(testData.clientData.clientName);
        NavigationSection.navigateToPropertySummary();
        Property.Summary.verifySiteDetails(testData.siteDetails)
            .enterYearBuilt(testData.siteDetails.yearBuilt)
            .enterSiteArea(testData.siteDetails.siteArea)
            .fillAsCompleteBuildingDescription(testData.asCompleteDescription)
            .clickWalkUpTypeButtons()
            .fillCurrentBuildDescription(testData.currentDescription)
            .editAsCompleteExport(testData.asCompleteDescription.asCompleteExportText)
            .clickSaveContinueButton();
        Property.Market.verifyTimeOnMarket(testData.timeOnMarket)
            .fillMarketResearch(testData.marketResearch, Enums.MARKET_ANALYSIS_USES.multifamily, false)
            .enterMarketQuarter(testData.marketResearch.quarter)
            .clickPullFromDropbox()
            .verifyMarketByAnalysisUseHasFile(Enums.MARKET_ANALYSIS_USES.multifamily)
            .clickSaveContinueButton();
        Property.History.enterCurrentOwner(testData.owner.name)
            .checkIsUnderContractCheckbox()
            .enterContractDetails(testData.contractDetails)
            .clickSaveContinueButton();
        Property.Description.selectGeneralPropertyCondition(testData.siteInspection.generalPropertyCondition)
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
            .enterAgeEffective(testData.remainingEconomicLife.ageEffective)
            .clickSaveContinueButton();
        Property.SiteDescription
            .editTransportationDiscussionCommentary(testData.transportationSiteDescription.commentary)
            .checkSurroundingResidential()
            .verifySiteArea(testData.siteDescriptors.siteArea)
            .verifyPropertyShape(testData.siteDescriptors.propertyShape);
        NavigationSection.openMapsInProperty();
        Property.Maps.enterPropertyFrontage(testData.siteDescriptors.propertyFrontage);
        NavigationSection.openSiteDescriptionInProperty();
        Property.SiteDescription.verifyPropertyFrontage(testData.siteDescriptors.propertyFrontage)
            .verifySiteDescriptionItems(testData.siteDescriptors.siteDescriptionItems)
            .editFloodHazardCommentary(testData.siteDescriptors.floodHazardCommentary)
            .verifyUtilitiesItems(testData.utilitiesSiteDescription.utilitiesItems)
            .verifyUtilitiesDescriptions(testData.utilitiesSiteDescription.utilitiesDescription)
            .clickSaveContinueButton();
        Property.Utilities.checkHeatingSystem()
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
        Property.Amenities.addParkingPlaces(testData.amenities.numberOfParkingPlaces)
            .checkHasNoUnitAmenities()
            .clickSaveContinueButton();
        Property.Maps.uploadZoningMap(testData.propertyMaps.zoningMapFile)
            .uploadFloodMap(testData.propertyMaps.floodMapFile)
            .chooseCornerByValue(testData.propertyMaps.cornerValue)
            .uploadTaxMap(testData.propertyMaps.taxMapFile)
            .captureSubjectMap()
            .clickSaveContinueButton();
        Property.Photos.uploadPhotosBySectionName(testData.facadePhotos)
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
        Property.Photos.uploadPhotosBySectionName(testData.heatingSystemPhotos)
            .uploadPhotosBySectionName(testData.hotWaterPhotos)
            .clickSaveContinueButton();
        Property.Zoning.enterZoneNames(testData.zoningDescriptionInformation.zonesNames)
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
        Property.Renovations.chooseRenovationByValue(testData.prospectiveRenovations.dropValue)
            .clickTotalButton()
            .fillTotalTable(testData.prospectiveRenovations.period, testData.prospectiveRenovations.totalAmount)
            .verifyNetTotalRenovationBudget(testData.prospectiveRenovations.totalAmount)
            .editCommentary(testData.prospectiveRenovations.commentary)
            .clickSaveContinueButton();
        Property.ResidentialUnits.fillKitchenDescription(testData.typicalKitchenCondition)
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
        Income.Residential.InPlaceRentRoll.verifyNumberOfResidentialUnits(testData.currentDescription.numberOfUnits)
            .checkCheckboxByLabel(testData.inPLaceRentRoll.includePerRoom)
            .checkCheckboxByLabelAndVerify(testData.inPLaceRentRoll.forecastLabel, 
                testData.inPLaceRentRoll.forecastColumn)
            .setCheckListIsInspectedByRowNumbers(testData.inPLaceRentRoll.isInspectedRowsToCheck)
            .enterUnitNumbersByOrderToAll(testData.currentDescription.numberOfUnits)
            .enterAllEqualRoomsNumber(testData.inPLaceRentRoll.roomsNumber, testData.currentDescription.numberOfUnits)
            .enterAllEqualBedroomsNumber(testData.inPLaceRentRoll.bedroomsNumber, 
                testData.currentDescription.numberOfUnits)
            .enterAllEqualRentTypeCells(testData.inPLaceRentRoll.rentType)
            .enterAllEqualLeaseStatuses(testData.inPLaceRentRoll.leaseStatus)
            .enterAllEqualForecast(testData.inPLaceRentRoll.forecastValue, testData.currentDescription.numberOfUnits)
            .verifyMonthlyTotalForecastEqualValue()
            .verifyTotalAnnualForecast()
            .verifyRentRollCommentary(testData.inPLaceRentRoll.commentary)
            .clickSaveContinueButton();
        Income.Residential.UnitGroups.verifyRowsNumberEqualBedroomsNonComp(testData.inPLaceRentRoll.bedroomsNumber,
            testData.currentDescription.numberOfUnits)
            .verifyGLAPercentage()
            .verifyRoomSize()
            .verifyGLAValue(testData.currentDescription.grossArea)
            .enterAvgSFByUnitTypeValue(testData.unitGroups.unitType, testData.unitGroups.averageSF)
            .verifyGLACellValue(testData.currentDescription.grossArea)
            .verifyTotalAvgSqftEqualUnits(testData.unitGroups.averageSF, testData.currentDescription.numberOfUnits)
            .clickSaveContinueButton();
        testData.rentComparables.comparables.forEach((comp, i) => {
            Income.Residential.RentComps.BaseActions.openAddNewComparableFormAdvanced(comp);
            Income.Residential.RentComps.AddForm.fillNewRentCompWithoutNumbTypeSourceNameUrlNoteAmenities(comp);
            Income.Residential.RentComps.BaseActions.verifyComparableBedroomTableByNumber(i, comp);
        });
        Income.Residential.RentComps.BaseActions.clickSaveContinueButton();
        Income.Residential.RentCompsMap.uploadCompMap(testData.rentComparables.compMapPath)
            .clickSaveContinueButton();
        const bedroomsNumber = testData.inPLaceRentRoll.bedroomsNumber;
        const forecastValue = testData.inPLaceRentRoll.forecastValue;
        Income.Residential.RentReconciliation
            .verifyIntroCommentary(testData.residentialRentReconciliation.reconciliationIntroComm)
            .expandBedroomReconByNumber(bedroomsNumber)
            .verifyBedroomMinForecastByNumber(bedroomsNumber, forecastValue)
            .verifyBedroomAvgForecastByNumber(testData.inPLaceRentRoll, forecastValue)
            .verifyBedroomMaxForecastByNumber(bedroomsNumber, forecastValue)
            .verifyBedroomMinCompByNumber(bedroomsNumber, testData.rentComparables.comparables)
            .verifyBedroomAvgCompByNumber(bedroomsNumber, testData.rentComparables.comparables)
            .verifyBedroomMaxCompByNumber(bedroomsNumber, testData.rentComparables.comparables)
            .enterBedroomMarketConclusionByNumber(bedroomsNumber, 
                testData.residentialRentReconciliation.marketConclusion)
            .selectBedroomMarketBreakdownBedByNumber(bedroomsNumber, 
                testData.residentialRentReconciliation.marketBreakdown)
            .editBedroomCommentaryByBedNum(bedroomsNumber, 
                testData.residentialRentReconciliation.reconciliationCommentary)
            .clickSaveContinueButton();
        Income.Residential.StabilizedRentRoll.verifyUnitTypeAndRentConclusion(testData.unitGroups.unitType,
            testData.residentialRentReconciliation.marketConclusion)
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
            .verifyTotalMonthlyForecast(testData.currentDescription.numberOfUnits, 
                testData.inPLaceRentRoll.forecastValue)
            .verifyTotalAnnualForecast()
            .verifyRentRollDiscussionCommentary(testData.stabRentRoll.rentRollDiscussionComm)
            .editOccupancyRateCommentary(testData.stabRentRoll.occupancyRateComm)
            .clickSaveContinueButton();
        Income.Residential.StabRentRollSummary.verifyAnnualRentByRow(testData.stabRentRollSummary.marketAnnualRent)
            .verifyTotalAnnualRent(testData.stabRentRollSummary.marketAnnualRent)
            .verifyIncreaseValueByRow()
            .verifyPGICellByRow(testData.stabRentRollSummary.marketAnnualRent)
            .verifyPGITotal(testData.stabRentRollSummary.marketAnnualRent)
            .openDiscussionTab()
            .verifyStabRRSummaryDiscussion(testData.stabRentRollSummary.stabRRSummary)
            .verifyGrossIncomeDiscussion(testData.stabRentRollSummary.grossIncomeDiscussion)
            .verifyDistributionSummary(testData.stabRentRollSummary.distributionSummary)
            .clickSaveContinueButton();
        Income.Residential.ExpenseStructure.checkHeatExpensesByValue(testData.expenseStructure.tenantValue)
            .checkElectricityByValue(testData.expenseStructure.tenantValue)
            .checkCommonElectricityByValue(testData.expenseStructure.ownerValue)
            .checkGasByValue(testData.expenseStructure.tenantValue)
            .checkRefuseRemovalByValue(testData.expenseStructure.ownerValue)
            .checkWaterSewerByValue(testData.expenseStructure.ownerValue)
            .checkAreaMaintenanceByValue(testData.expenseStructure.ownerValue)
            .verifyTenantObligationsCommentary(testData.expenseStructure.tenantObligationsCommentary)
            .verifyOwnerObligationsCommentary(testData.expenseStructure.ownerObligationsCommentary)
            .clickSaveContinueButton();
        Income.Miscellaneous.Laundry.verifyNoLaundryButtonExists()
            .clickSaveContinueButton();
        Income.Miscellaneous.Storage.verifyNoStorageButtonExists()
            .clickSaveContinueButton();
        Income.Miscellaneous.Parking.checkIsFreeParkingCheckbox()
            .verifyParkingCommentary(testData.parking.commentary)
            .clickSaveContinueButton();
        Income.Miscellaneous.Other.verifyPageIsOpened()
            .clickSaveContinueButton();
        Income.PotentialGrossIncome.enterResVacancyCollLoss(testData.grossIncome.resVacancyCollLoss)
            .verifyResidentialVCLoss(testData.grossIncome.resVacancyCollLoss, 
                testData.stabRentRollSummary.marketAnnualRent)
            .enterCoStarSubmarketRate(testData.grossIncome.coStarRate)
            .enterCoStarMetroRate(testData.grossIncome.coStarRate)
            .editCommentary(testData.grossIncome.commentary)
            .verifyIncomeTable(testData.stabRentRollSummary.marketAnnualRent)
            .clickSaveContinueButton();
        Income.TaxInfo.checkBasisByValue(testData.currentTaxInfo.liabilityBasis)
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
            .verifyAppraiserOpinionLiabilityTotal(testData.summaryTaxInfo.liabilityValue, 
                testData.currentDescription.numberOfUnits)
            .verifyAppraiserOpinionTaxLiabilityPerBasis(testData.summaryTaxInfo.liabilityValue)
            .verifyAppraiserOpinionTaxRateCell(testData.currentTaxInfo.rateValue)
            .verifyAppraiserOpinionTaxableAssessedValueCell(testData.currentTaxInfo.rateValue)
            .verifyTaxSummaryDiscussion(testData.summaryTaxInfo.commentary)
            .clickSaveContinueButton();
        Income.ExpenseHistory.selectExpensePeriod(testData.expenseHistory.expensePeriod)
            .verifyExpenseYear(testData.expenseHistory.expenseYear)
            .clickAddExpenseYearButton()
            .enterIssueByColIndex(testData.expenseHistory.grossRevenue, tableExpenseHistoryCellNames.grossRevenue)
            .enterIssueByColIndex(testData.expenseHistory.realEstateTaxes, tableExpenseHistoryCellNames.realEstateTaxes)
            .clearCellWithTypeFirst(tableExpenseHistoryCellNames.insurance)
            .enterIssueByColIndex(testData.expenseHistory.electricityExpense, tableExpenseHistoryCellNames.electricity)
            .clearCellWithTypeFirst(tableExpenseHistoryCellNames.fuel)
            .enterIssueByColIndex(testData.expenseHistory.payrollBenefitsExpense, 
                tableExpenseHistoryCellNames.payrollAndBenefits)
            .verifyTotalOpExpensesTextByColIndex(testData.expenseHistory.toeToBe)
            .verifyTOEExcludingRETByIndex(testData.expenseHistory.realEstateTaxes)
            .verifyNetOpIncomeByIndex(testData.expenseHistory.grossRevenue)
            .verifyAverageTable()
            .verifyExpenseHistoryCommentary(testData.expenseHistory.commentary);
        NavigationSection.navigateToComparableExpenses();
        testData.comparableExpenses.comparables.forEach(comp => {
            Income.ComparableExpenses.clickAddBlankColumnButton()
                .enterAddressByColumnIndex(comp.address)
                .enterCityByColumnIndex(comp.city)
                .chooseExpensePeriodByColumnIndex(comp.period)
                .enterSquareFeetByColumnIndex(comp.squareFeet)
                .enterResidentialUnitsByColumnIndex(comp.resUnits)
                .enterCellDollarValueByColumnIndex(
                    Income.ComparableExpenses.Page.getUnifiedEditableAndTotalCells("insurance"),
                    comp.insurance)
                .enterCellDollarValueByColumnIndex(
                    Income.ComparableExpenses.Page.getUnifiedEditableAndTotalCells("electricity"),
                    comp.electricity)
                .enterCellDollarValueByColumnIndex(
                    Income.ComparableExpenses.Page.getUnifiedEditableAndTotalCells("repairsAndMaintenance"),
                    comp.repairsAndMaintenance)
                .enterCellDollarValueByColumnIndex(
                    Income.ComparableExpenses.Page.getUnifiedEditableAndTotalCells("payrollAndBenefits"),
                    comp.payrollAndBenefits)
                .enterCellDollarValueByColumnIndex(
                    Income.ComparableExpenses.Page.getUnifiedEditableAndTotalCells("generalAndAdministrative"),
                    comp.generalAndAdministrative)
                .enterCellDollarValueByColumnIndex(
                    Income.ComparableExpenses.Page.getUnifiedEditableAndTotalCells("management"),
                    comp.management)
                .verifyTOEByColumnIndex(comp.toe)
                .verifyTOEPerSFByColumnIndex()
                .verifyToePerUnitByColumnIndex();
        });
        Income.ComparableExpenses.verifyTableAverageValues();
        NavigationSection.navigateToExpenseForecast()
            .clickExpenseForecastBookmark();
        Income.ExpenseForecast.chooseForecastItemBasis(testData.expenseForecast.insuranceItem)
            .enterForecastItemForecast(testData.expenseForecast.insuranceItem)
            .verifyForecastItemCompMin(testData.expenseForecast.insuranceItem, testData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(testData.expenseForecast.insuranceItem, 
                testData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(testData.expenseForecast.insuranceItem, testData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(testData.expenseForecast.insuranceItem, testData.currentDescription)
            .chooseForecastItemBasis(testData.expenseForecast.electricityItem)
            .enterForecastItemForecast(testData.expenseForecast.electricityItem)
            .verifyForecastItemCompMin(testData.expenseForecast.electricityItem, 
                testData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(testData.expenseForecast.electricityItem, 
                testData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(testData.expenseForecast.electricityItem, 
                testData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(testData.expenseForecast.electricityItem, testData.currentDescription)
            .verifyForecastItemByExpensePeriodType(testData.expenseForecast.electricityItem, 
                testData.currentDescription, "Owner's Projection")
            .chooseForecastItemBasis(testData.expenseForecast.fuelItem)
            .chooseForecastItemBasis(testData.expenseForecast.waterSewerItem)
            .chooseForecastItemBasis(testData.expenseForecast.repairsMaintenance)
            .enterForecastItemForecast(testData.expenseForecast.repairsMaintenance)
            .verifyForecastItemCompMin(testData.expenseForecast.repairsMaintenance, 
                testData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(testData.expenseForecast.repairsMaintenance, 
                testData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(testData.expenseForecast.repairsMaintenance, 
                testData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(testData.expenseForecast.repairsMaintenance, testData.currentDescription)
            .chooseForecastItemBasis(testData.expenseForecast.payrollBenefits)
            .enterForecastItemForecast(testData.expenseForecast.payrollBenefits)
            .verifyForecastItemCompMin(testData.expenseForecast.payrollBenefits, 
                testData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(testData.expenseForecast.payrollBenefits, 
                testData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(testData.expenseForecast.payrollBenefits, 
                testData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(testData.expenseForecast.payrollBenefits, testData.currentDescription)
            .verifyForecastItemByExpensePeriodType(testData.expenseForecast.payrollBenefits, 
                testData.currentDescription, "Owner's Projection")
            .chooseForecastItemBasis(testData.expenseForecast.general)
            .enterForecastItemForecast(testData.expenseForecast.general)
            .verifyForecastItemCompMin(testData.expenseForecast.general, testData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(testData.expenseForecast.general, testData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(testData.expenseForecast.general, testData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(testData.expenseForecast.general, testData.currentDescription)
            .chooseForecastItemBasis(testData.expenseForecast.legalProf)
            .chooseForecastItemBasis(testData.expenseForecast.miscellaneous)
            .chooseForecastItemBasis(testData.expenseForecast.management)
            .changeStateOfPercentOfEGICheckbox()
            .enterPercentOfEgi(testData.expenseForecast.percentOfEgi);
        const managementForecastEgi = Income.ExpenseForecast
            .getManagementForecastEgiPercent(testData.expenseForecast.management, 
                testData.expenseForecast.effectiveGrossIncome, 
                testData.expenseForecast.percentOfEgi, testData.currentDescription);
        Income.ExpenseForecast.verifyManagementForecast(managementForecastEgi)
            .verifyForecastItemCompMin(testData.expenseForecast.management, testData.comparableExpenses.comparables)
            .verifyForecastItemCompAverage(testData.expenseForecast.management, testData.comparableExpenses.comparables)
            .verifyForecastItemCompMax(testData.expenseForecast.management, testData.comparableExpenses.comparables)
            .verifyForecastItemBasisMoney(testData.expenseForecast.management, 
                testData.currentDescription, managementForecastEgi)
            .chooseForecastItemBasis(testData.expenseForecast.reserves)
            .enterForecastItemForecast(testData.expenseForecast.reserves)
            .verifyForecastItemBasisMoney(testData.expenseForecast.reserves, testData.currentDescription)
            .chooseForecastItemBasis(testData.expenseForecast.total)
            .verifyToeCompMinPerBasis(testData.expenseForecast.total.basis, testData.comparableExpenses.comparables)
            .verifyToeCompAvgPerBasis(testData.expenseForecast.total.basis, testData.comparableExpenses.comparables)
            .verifyToeCompMaxPerBasis(testData.expenseForecast.total.basis, testData.comparableExpenses.comparables)
            .verifyOwnersProFormaValue()
            .verifyTotalForecast();
        NavigationSection.navigateToProForma();
        Income.ProForma.verifyCategoryRow(testData.proForma.potentialResIncomeRow, proFormaTypesEnum.potentialResIncome)
            .verifyCategoryRow(testData.proForma.potentialGrossIncomeRow, proFormaTypesEnum.potentialGrossIncome)
            .verifyCategoryRow(testData.proForma.vcLossRow, proFormaTypesEnum.residentialVCLoss)
            .verifyCategoryRow(testData.proForma.effectiveGrossRow, proFormaTypesEnum.effectiveGrossIncome)
            .verifyCategoryRow(testData.proForma.reTaxesRow, proFormaTypesEnum.realEstateTaxes)
            .verifyCategoryRow(testData.proForma.insuranceRow, proFormaTypesEnum.insurance)
            .verifyCategoryRow(testData.proForma.electricityRow, proFormaTypesEnum.electricity)
            .verifyCategoryRow(testData.proForma.repairsRow, proFormaTypesEnum.repairAndMaintenance)
            .verifyCategoryRow(testData.proForma.payrollRow, proFormaTypesEnum.payrollBenefits)
            .verifyCategoryRow(testData.proForma.generalRow, proFormaTypesEnum.generalAndAdministrative)
            .verifyCategoryRow(testData.proForma.managementRow, proFormaTypesEnum.managementFees)
            .verifyCategoryRow(testData.proForma.reservesRow, proFormaTypesEnum.replacementsAndReserves)
            .verifyCategoryRow(testData.proForma.toeRow, proFormaTypesEnum.totalOperatingExpenses)
            .verifyCategoryRow(testData.proForma.toeNetReRow, proFormaTypesEnum.totalOperatingExpensesExTaxes)
            .verifyCategoryRow(testData.proForma.netOpIncomeRow, proFormaTypesEnum.netOperatingIncome)
            .verifyOperatingExpenseRatio(testData.proForma.opExpenseRatio, proFormaTypesEnum.operatingExpenseRatio);
        NavigationSection.navigateToSupportingCapRates();
        Income.SupportingCapRates.uncheckIncludePersonalSurvey()
            .verifyIncomeCapitalizationCommentary(testData.supportingCapRates.incomeCapComm)
            .clickSelectedLoanSectionButton()
            .verifySelectedLoanTermsSection(testData.supportingCapRates.selectedLoanTermsSection)
            .clickSelectedLoanSectionButton()
            .clickBandOfInvestmentSectionButton()
            .enterEquityDividendRate(testData.supportingCapRates.bandInvestmentSection.equityDividendRate)
            .verifyBandInvestmentSection(testData.supportingCapRates.bandInvestmentSection)
            .clickSaveContinueButton();
        Income.CapRateConclusion.verifyBandOfInvestments(testData.capRateConclusion.bandOfInvestmentsValue)
            .navigateToCapRateComps();
        Final.CapRateComps.verifyPageIsOpened();
        testData.capRateComps.comparables.forEach((comp, i) => {
            Final.CapRateComps.addComparable(comp)
                .fillAddedCompWithInfo(comp, i);
        });
        const capRatesArray = testData.capRateComps.comparables.map(comp => Number(comp.capRate));
        const minCapRate = Math.min(...capRatesArray);
        const maxCapRate = Math.max(...capRatesArray);
        const capRateSum = capRatesArray.reduce((sum, current) => sum + current, 0);
        const avgCapRate = (capRateSum / capRatesArray.length).toFixed(2);
        Final.CapRateComps.verifyCapRateCommentary(minCapRate, maxCapRate, avgCapRate)
            .chooseCompIncomePotential(testData.capRateComps.compIncomePotential)
            .chooseCompPropertyConditions(testData.capRateComps.compPropertyConditions)
            .chooseCompPropertyLocations(testData.capRateComps.compPropertyLocations);
        NavigationSection.navigateToCapRateConclusion();
        Income.CapRateConclusion.verifyCompCapRatesCell(minCapRate, maxCapRate)
            .enterConclusionSectionConcludedCapRate(testData.capRateConclusion.concludedCapRate)
            .enterMonthsOfRentLoss(testData.capRateConclusion.asCompleteMonthsOfRentLoss, 
                testData.valueConclusionKeyAsComplete)
            .enterMonthsOfRentLoss(testData.capRateConclusion.asStabilizedMonthsOfRentLoss, 
                testData.valueConclusionKeyAsStabilized)
            .selectRoundingFactor(testData.capRateConclusion.roundingFactorValue)
            .verifyNetOperatingIncome(testData.capRateConclusion.netOperatingIncome)
            .verifyConcludedCapRateCell(testData.capRateConclusion.concludedCapRate)
            .verifyAsStabilizedTablePart(testData.capRateConclusion.asStabilizedPart, 
                testData.valueConclusionAsStabilized)
            .verifyAsCompleteTablePart(testData.capRateConclusion.asCompletePart, 
                testData.valueConclusionAsStabilized)
            .enterLessEntrepreneurialProfit(
                testData.capRateConclusion.asCompletePart.lessEntrepreneurialProfit, 
                testData.valueConclusionKeyAsStabilized)
            .verifyAsIsMarketTablePart(testData.capRateConclusion.asIsMarketPart, 
                testData.valueConclusionAsStabilized)
            .clickSaveContinueButton();
        testData.findComps.comparables.forEach((comp) => {
            Sales.FindComps.addExistingComparable(comp.address)
                .verifyAddedCompAddress(comp.address);
        });
        Sales.FindComps.clickSaveContinueButton();
        Sales.CreateCompMap.captureScreen()
            .clickSaveContinueButton();
        Sales.AdjustComps.checkCalculationUnitsRadio(testData.adjustComps.calculationUnitsRadioValue)
            .checkIncomeAdjustmentLevel(testData.adjustComps.incomeAdjustmentType);
        testData.adjustComps.comparables.forEach((comp, i) => {
            Sales.AdjustComps.enterSizeAdjustmentByColumn(comp.size, i)
                .enterConditionAdjustmentByColumn(comp.condition, i);
            if (i === 0) {
                Sales.AdjustComps.clickAddOtherAdjustmentButton();
            }
            Sales.AdjustComps.enterOtherAdjustmentByColumn(comp.other, 0, i)
                .verifyTrendedPriceByColumn(comp.trendedPrice, i)
                .verifyAdjustedPriceByColumn(i);
        });
        Sales.AdjustComps.editOtherAdjustmentRowName("Other Adjustment", testData.adjustComps.otherAdjustmentNewName)
            .clickSaveContinueButton();
        Sales.ValueConclusion.verifyUnadjustedPrices(testData.valueConclusion.unadjustedPrices)
            .verifyAdjustedPrices(testData.valueConclusion.adjustedPrices)
            .verifyIncomeApproachConclusion(testData.valueConclusion.incomeApproachConclusion)
            .enterSaleValueConclusion(testData.valueConclusion.saleValueConclusion)
            .verifyAsStabilizedRow(testData.valueConclusionAsStabilized, testData.valueConclusion.asStabilizedRow)
            .verifyAsCompleteRow(testData.valueConclusionAsComplete, testData.valueConclusion.asCompleteRow)
            .verifyAsIsMarketRow(testData.valueConclusionAsIs, testData.valueConclusion.asIsMarketRow)
            .clickSaveContinueButton();
        Final.FinalValuesReconciliation.closeUserSurveyIfExist()
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
        Final.PropertySalesConclusion.verifyContractPrice(testData.propertySalesConclusion.contractPrice)
            .verifyContractDate(testData.propertySalesConclusion.contractDate)
            .verifyContractChangeInValue(testData.propertySalesConclusion.asIsMarketFinalValue)
            .clickSaveContinueButton();
        Final.AssumptionsConditions.addExtraordinaryAssumption(testData.assumptions.extraordinaryAssumption)
            .clickSaveContinueButton();
        Final.SWOTAnalysis.uncheckIncludeInReportCheckbox()
            .clickSaveContinueButton();
        Final.HighestBestUse.verifyZoneNameByRow(testData.zoningDescriptionInformation.zonesNames[0])
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
            .verifyAsVacantHighestUse(testData.highestBestUse.marketCharPropType, 
                testData.highestBestUse.feasiblePropTypeWord)
            .verifyAsImprovedHighestUse(testData.highestBestUse.marketCharPropType, 
                testData.highestBestUse.feasiblePropTypeWord)
            .clickProbableBuyerTab()
            .checkLocalCheckbox()
            .checkRegionalCheckbox()
            .clickSaveContinueButton();
        Final.UnitInspection.verifyNumberOfInspectedUnitsRows(testData.inPLaceRentRoll.isInspectedRowsToCheck.length)
            .chooseListReadyForOccupancyValues(testData.unitInspection.readyForOccupancyValues)
            .verifyNumberOfInspectedUnitsCommentary(testData.inPLaceRentRoll.isInspectedRowsToCheck.length)
            .clickSaveContinueButton();
        Final.Scope.verifyNumberOfItems()
            .clickSaveContinueButton();
        Final.SourceInformation.verifySiteSizeSources()
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
        Final.CapRateComps.clickSaveContinueButton();
        Final.CapRateDiscussion.verifyCapRateTable(testData.capRateDiscussion.capRateTable)
            .verifyPwCRow(testData.capRateDiscussion.pwcRow)
            .verifySitusRow(testData.capRateDiscussion.situsRow)
            .clickCapRateCompsTab()
            .verifyCapRateCompsTable(testData.capRateDiscussion.capRateCompsTable)
            .clickIncomeSpikesTab()
            .verifyIncomeSpikesTable(testData.capRateDiscussion.incomeSpikesTable)
            .checkIncomeSpikesRadios(testData.capRateDiscussion.incomeSpikesRadios)
            .clickSaveContinueButton();
        NavigationSection.clickInsurableReplacementCostBookmark();
        Final.InsurableReplacementCost.verifySubjectState(testData.insurableReplacementCost.subjectState)
            .verifySubjectLocale(testData.insurableReplacementCost.subjectLocale)
            .verifyLocalMultiplier()
            .clickSaveContinueButton();
    });
});
