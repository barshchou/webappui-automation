const testData = require("../../fixtures/full_reports/chicago8524South.fixtures.json");
import homepageActions from "../../actions/base/homepage.actions";
import keyInfoActions from "../../actions/report/keyInfo.actions";
import navSectionActions from "../../actions/base/navigationSection.actions";
import clientActions from "../../actions/report/client.actions";
import summaryActions from "../../actions/property/summary.actions";
import marketActions from "../../actions/property/market.actions";
import propertyHistoryActions from "../../actions/property/history.actions";

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
      navSectionActions.openMarketPageInProperty();
      marketActions.verifyTimeOnMarket(testData.minExposureMonths, testData.maxExposureMonths);
      marketActions.fillMarketResearch(testData);
      marketActions.clickPullFromDropbox();
      marketActions.verifyAnyDocumentInputIsNotEmpty();
      navSectionActions.openPropertyHistoryInProperty();
      propertyHistoryActions.enterCurrentOwner(testData.currentOwner);
      propertyHistoryActions.checkIsUnderContractCheckbox();
      propertyHistoryActions.enterContractDetails(testData.buyer, testData.contractDate, testData.contractPrice);
   });
});