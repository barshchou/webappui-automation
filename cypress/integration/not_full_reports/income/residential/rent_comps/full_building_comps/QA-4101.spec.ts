import { createReport } from "../../../../../../actions/base/baseTest.actions";
import testData from 
    "../../../../../../fixtures/not_full_reports/income/residential/rent_comps/full_building_comps/QA-4101.fixture";
import { _NavigationSection } from "../../../../../../actions/base";
import { Income } from "../../../../../../actions";
import { _IncomeTitles } from "../../../../../../enums/pages_titles";
import Enums from "../../../../../../enums/enums";
import { conditionalDescribe } from "../../../../../checkIsProd.utils";


conditionalDescribe("Property Conditions tests", { tags: [ "@residential", "@rent_comps",
    "@full_building_comps", "@property_conditions" ] }, () => {
    beforeEach("Create report, navigate to Property Conditions", () => {
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToResidentialRentComps();
        cy.stepInfo("1. Add comparable, click edit button");
        Income._Residential.RentComps.BaseActions.changeToBuildingSearch()
            .clickAddRemoveBuildingCompByAddress(testData.compAddress)
            .clickEditBuildingCompButtonByAddress(testData.compAddress);
        _NavigationSection.submitSaveChangesModal();
    });

    it(`[QA-4101] The 'Average' option is displayed for each property condition 
    on the Property Conditions page`, () => {
        cy.stepInfo(`2. Open property conditions, verify all radio buttons`);
        Income._Residential.RentComps.FullBuildingComps._PropertyConditions.openNavigationTab()
            .Page.pageTitle.should("exist").and("have.text", _IncomeTitles._Residential.PROPERTY_CONDITIONS);
        const conditions = Object.values(Enums.PROPERTY_CONDITIONS);
        const radios = Object.values(Enums.PROPERTY_CONDITIONS_RADIOS);
        radios.forEach(radio => {
            conditions.forEach(condition => {
                Income._Residential.RentComps.FullBuildingComps._PropertyConditions.checkRadio(radio, condition);
            });
        });
    });
});