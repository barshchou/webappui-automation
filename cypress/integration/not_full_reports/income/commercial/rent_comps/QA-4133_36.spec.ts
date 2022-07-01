import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4133_36.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";
import { _map } from "../../../../../support/commands";
import mapKeysUtils from "../../../../../utils/mapKeys.utils";
import { getNumberFromDollarNumberWithCommas } from "../../../../../../utils/numbers.utils";

describe("[QA-4133][QA-4136]", { tags: [ "@income", "@commercial", "@rent_comps" ] }, () => {

    before("Create report", () => {
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToCommercialRentComps()
            .verifyProgressBarNotExist();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("[QA-4133] Check that Computed Values Panel grid is visible on the page", () => {
        Income._CommercialManager.RentComps.hideHeader()
            .matchElementSnapshot(Income._CommercialManager.RentComps.Page.computedPanel,
            testData.snapshotName);
    });

    it("[QA-4136] State of Comps column in the Computed Values Panel grid", () => {
        cy.stepInfo("Add several comps from map, save prices");
        Income._CommercialManager.RentComps.openMap()
            .verifyProgressBarNotExist()
            .addNumberFirstComparables(testData.compsNumber)
            .saveCompPricesPerSFPerYearToAliasNumberFirstComps(testData.compsNumber);
        cy.stepInfo("Verify comps min, avg and max values");
        Income._CommercialManager.RentComps.Page.computedCompsColumn.then(() => {
            let values = [];
            for (let i = 0; i < testData.compsNumber; i++) {
               values.push(_map.get(`${i + 1}${mapKeysUtils.rent_per_sf}`));
            }
            Income._CommercialManager.RentComps.verifyComputedCompsColumn(values);
        });
        Income._CommercialManager.RentComps.saveComputedCompsColumnValues();
        cy.stepInfo("Remove comp, verify, that values changed");
        Income._CommercialManager.RentComps.clickRemoveCompButtonGroupTableByIndex();
        Income._CommercialManager.RentComps.Page.getRemoveCompButtonsFromGroupTable().should("have.length", 2);
        Income._CommercialManager.RentComps.Page.computedCompsColumn.then(() => {
            let values = [];
            for (let i = 1; i < testData.compsNumber; i++) {
                values.push(_map.get(`${i + 1}${mapKeysUtils.rent_per_sf}`));
            }
            Income._CommercialManager.RentComps.verifyComputedCompsColumn(values);
        });
        Income._CommercialManager.RentComps.Page.computedCompsAvgCell.invoke("text").then(cellValue => {
            const priceNumber = getNumberFromDollarNumberWithCommas(cellValue);
            expect(priceNumber).not.to.be.eq(_map.get(mapKeysUtils.computed_comps_avg));
        });
        deleteReport(testData.reportCreationData.reportNumber);
    });
});
