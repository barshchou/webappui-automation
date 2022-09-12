import ReportDataCreator from "../../fixtures/data_creator/reportData.creator";
import { createReport } from "../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../actions/base";
import { Income, Sales } from "../../actions";
import Enums from "../../enums/enums";
import { _IncomeTitles, _SalesTitles } from "../../enums/pages_titles";
import { BoweryAutomation } from "../../types/boweryAutomation.type";
import mapKeysUtils from "../../utils/mapKeys.utils";

const reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("criticalPages", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE,
    templateValue: Enums.TEMPLATE_TYPE.freddieMac
});

describe("Verify that critical pages are opening", { tags: [ "@smoke" ] }, () => {
    before("Create report", () => {
        createReport(reportCreationData);
        cy.saveLocalStorage();
    });

    beforeEach("Restore local storage", () => {
        cy.restoreLocalStorage();
        cy._mapGet(mapKeysUtils.reportId).then(_reportId => {
            cy.visit(`/report/${_reportId}/report-information`);
        });
    });

    it("Residential In-Place Rent Roll", () => {
        _NavigationSection.navigateToResInPlaceRentRoll();
        Income._Residential.InPlaceRentRoll.Page.pageTitle
            .should("have.text", _IncomeTitles._Residential.IN_PLACE_RENT_ROLL);
    });

    it("Residential Stabilized Rent Roll", () => {
        _NavigationSection.navigateToResidentialStabilizedRentRoll();
        Income._Residential.StabilizedRentRoll.Page.pageTitle
            .should("have.text", _IncomeTitles._Residential.STABILIZED_RENT_ROLL);
    });

    it("Commercial In-Place Rent Roll", () => {
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income._CommercialManager.InPlaceRentRoll.Page.pageTitle
            .should("have.text", _IncomeTitles._Commercial.IN_PLACE_RENT_ROLL);
    });

    it("Commercial Stabilized Rent Roll", () => {
        _NavigationSection.navigateToCommercialStabilizedRentRoll();
        Income._CommercialManager.StabilizedRentRoll.Page.pageTitle
            .should("have.text", _IncomeTitles._Commercial.STABILIZED_RENT_ROLL);
    });

    it("Expense Forecast Page", () => {
        _NavigationSection.navigateToExpenseForecast();
        Income._ExpenseForecastActions.Page.pageTitle
            .should("have.text", _IncomeTitles.EXPENSE_FORECAST);
    });

    it("Residential Rent Comps", () => {
        _NavigationSection.navigateToRentComps();
        Income._Residential.RentComps.BaseActions.Page.pageTitle
            .should("have.text", _IncomeTitles._Residential.RENT_COMPS);
    });

    it("Commercial Rent Comps", () => {
        _NavigationSection.navigateToCommercialRentComps();
        Income._CommercialManager.RentComps.Page.pageTitle
            .should("have.text", _IncomeTitles._Commercial.RENT_COMPS);
    });

    it("Adjust Comps page", () => {
        _NavigationSection.navigateToAdjustComps();
        Sales._AdjustComps.Page.pageTitle.should("contain.text", _SalesTitles.ADJUST_COMPS);
    });

    it("Sales Value Conclusion page", () => {
        _NavigationSection.navigateToSalesValueConclusion();
        Sales._ValueConclusion.Page.pageTitle.should("have.text", _SalesTitles.VALUE_CONCLUSION);
    });

    it("Pro Forma page", () => {
        _NavigationSection.navigateToProForma();
        Income._ProFormaActions.Page.pageTitle.should("have.text", _IncomeTitles.PRO_FORMA);
    });
});