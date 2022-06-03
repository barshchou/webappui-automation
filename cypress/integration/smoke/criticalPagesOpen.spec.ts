import ReportDataCreator from "../../fixtures/data_creator/reportData.creator";
import { createReport } from "../../actions/base/baseTest.actions";
import { getReportId, setReportId } from "../../../utils/intercept.utils";
import { getEnvUrl } from "../../../utils/env.utils";
import { _NavigationSection } from "../../actions/base";
import { Income, Sales } from "../../actions";
import Enums from "../../enums/enums";

const reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("criticalPages", {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE,
    templateValue: Enums.TEMPLATE_TYPE.FREDDIE_MAC
});

describe("Verify that critical pages are opening", () => {

    before("Create report", () => {
        createReport(reportCreationData);
        cy.saveLocalStorage();
    });

    beforeEach("Restore local storage", () => {
        cy.restoreLocalStorage();
        setReportId();
        getReportId().then(id => {
            cy.visit(`${getEnvUrl()}/report/${id}/report-information`);
        });
    });

    it("Residential In-Place Rent Roll", () => {
        _NavigationSection.navigateToResInPlaceRentRoll();
        Income._Residential.InPlaceRentRoll.Page.pageTitle.should("have.text", "In-Place Rent Roll");
    });

    it("Residential Stabilized Rent Roll", () => {
        _NavigationSection.navigateToResidentialStabilizedRentRoll();
        Income._Residential.StabilizedRentRoll.Page.pageTitle.should("have.text", "Stabilized Rent Roll");
    });

    it("Commercial In-Place Rent Roll", () => {
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income._CommercialManager.InPlaceRentRoll.Page.pageTitle.should("have.text", "In-Place Rent Roll");
    });

    it("Commercial Stabilized Rent Roll", () => {
        _NavigationSection.navigateToCommercialStabilizedRentRoll();
        Income._CommercialManager.StabilizedRentRoll.Page.pageTitle.should("have.text", "Stabilized Rent Roll");
    });

    it("Expense Forecast Page", () => {
        _NavigationSection.navigateToExpenseForecast();
        Income._ExpenseForecastActions.Page.pageTitle.should("have.text", "Expense Forecast");
    });

    it("Residential Rent Comps", () => {
        _NavigationSection.navigateToRentComps();
        Income._Residential.RentComps.BaseActions.Page.pageTitle.should("have.text", "Rent Comps");
    });

    it("Commercial Rent Comps", () => {
        _NavigationSection.navigateToCommercialRentComps();
        Income._CommercialManager.RentComps.Page.pageTitle.should("have.text", "Rent Comps");
    });

    it("Adjust Comps page", () => {
        _NavigationSection.navigateToAdjustComps();
        Sales._AdjustComps.Page.pageTitle.should("contain.text", "Adjust Comps");
    });

    it("Sales Value Conclusion page", () => {
        _NavigationSection.navigateToSalesValueConclusion();
        Sales._ValueConclusion.Page.pageTitle.should("have.text", "Value Conclusion");
    });

    it("Pro Forma page", () => {
        _NavigationSection.navigateToProForma();
        Income._ProFormaActions.Page.pageTitle.should("have.text", "Pro Forma");
    });
});