import { Sales } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-5135.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import mapKeysUtils from "../../../../utils/mapKeys.utils";

describe(`[Sales > Find Comps] Check the comps order when "custom" dropdown is chosen`, 
    { tags: [ "@sales", "@find_comps", "@comp_plex" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-5135]", () => {
            cy.stepInfo(`1. User navigates to SalesComps Search page `);
            _NavigationSection.navigateToFindComps();
            Sales._FindComps.Actions.selectedCompsSetSort(testData.sortSalesCompsCustom)
                .Page.sortSalesCompsSelectValue.should('contain', testData.sortSalesCompsCustom);
        
            cy.stepInfo(`2. User selects n-first comps from map`);
            Sales._FindComps.AddressSearch.openAddressSearchTab()
                .addCompByParameter({ $or: [ { [testData.compProperty]:testData.compStatusDate } ] }, 0);

            Sales._FindComps.verifyComparablesNumber(testData.compsToAdd)
                .saveAddedCompsAddressesToMap();

            cy.stepInfo(`3. When a comp gets added, it gets automatically added to the bottom`);
            Sales._FindComps.checkSalesCompAddedToList();
        
            cy.stepInfo(`4. Order doesn't change upon selection of “custom“ choice, 
                    until the appraiser manually moves comps around`);
            Sales._FindComps.Actions.checkSalesCompAddedToList()
                .moveComparableByDnD(Sales._FindComps.Page.selectorDraggableElement(1), 0, "down", 2)
                .checkSalesCompAddedToList({ reverse: true });

            cy.stepInfo(`5. If user selected custom order at first, 
            re-ordered comps and after that selected “Date Sold” sorting -> comps get 
            reordered by sale date on the fly.`);

            Sales._FindComps.Actions.selectedCompsSetSort(testData.sortSalesCompsDateSold)
                .checkSalesCompSortedByDateSold();
        });

        afterEach("Clear sales comps map", () => {
            cy._mapSet(mapKeysUtils.salesCompsIds, undefined);
            cy._mapSet(mapKeysUtils.salesCompsAddresses, undefined);
        });
    });
