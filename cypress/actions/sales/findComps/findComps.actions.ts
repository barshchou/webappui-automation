/* eslint-disable @typescript-eslint/no-explicit-any */
import { findCompsPage } from "../../../pages/sales/findComps.page";
import { getUploadFixture } from "../../../../utils/fixtures.utils";
import { isNumber, numberWithCommas } from "../../../../utils/numbers.utils";
import BaseActionsExt from "../../base/base.actions.ext";
import saleInfoFormActions from "./drm/saleInfoForm.actions";
import propertDescActions from "./drm/propertyDescForm.actions";
import propertyInfoFormActions from "./drm/propertyInfoForm.actions";
import { Alias, gqlOperationNames } from "../../../utils/alias.utils";
import { Utils } from "../../../types/utils.type";
import { _map, _mutateArrayInMap } from "../../../support/commands";
import { recurse } from "cypress-recurse";
import mapKeysUtils from "../../../utils/mapKeys.utils";
import { BoweryReports } from "../../../types/boweryReports.type";

class FindCompsActions extends BaseActionsExt<typeof findCompsPage> {
    selectedCompsSetSort(sortType: BoweryReports.SalesComps.SelectedComparablesSortType) {
        this.Page.sortSalesCompsSelectList.click();
        this.Page.sortSalesCompsSelectListOption(sortType).click();
        return this;
    }

    get SaleInfo() {
        return saleInfoFormActions;
    }

    get PropertyDesc() {
        return propertDescActions;
    }

    get PropertyInfo() {
        return propertyInfoFormActions;
    }

    addExistingComparable(address: string): FindCompsActions {
        this.clickCreateCompButton()
            .enterCompAddressToSearch(address)
            .clickSearchCompButton();
        findCompsPage.getSelectCompButtonByAddress(address).click();
        return this;
    }

    clickCreateCompButton(): FindCompsActions {
        findCompsPage.createCompButton.click();
        return this;
    }

    enterCompAddressToSearch(address: string): FindCompsActions {
        findCompsPage.searchCompAddressInput.type(address).type("{enter}");
        findCompsPage.findCompField.click();
        return this;
    }

    clickSearchCompButton(): FindCompsActions {
        findCompsPage.submitButton.click();
        return this;
    }

    openAddNewComparableFormSearchResult(address: string, searchResultIndex = 0): FindCompsActions {
        this.clickCreateCompButton()
            .enterCompAddressToSearch(address)
            .clickSearchCompButton();
        findCompsPage.createCompSearchResults.eq(searchResultIndex).click();
        findCompsPage.createNewCompButton.click();
        return this;
    }

    verifyAddedCompAddress(address: string): FindCompsActions {
        this.verifyProgressBarNotExist();
        findCompsPage.getRemoveSelectedCompButtonByAddress(address).should("exist");
        return this;
    }


    clickImportComparableButton(): FindCompsActions {
        findCompsPage.importCompsButton.click();
        return this;
    }

    verifyImportCompModalShown(): FindCompsActions {
        findCompsPage.importCompModal.should("be.visible");
        return this;
    }

    uploadComps(filePath: string): FindCompsActions {
        findCompsPage.csvInput.attachFile(getUploadFixture(filePath));
        return this;
    }

    verifyUploadCompsSucceded(): FindCompsActions {
        findCompsPage.loadingModalCSV.should('exist');
        findCompsPage.loadingModalCSV.should('not.exist');
        findCompsPage.salesCompsDateSold.should(($compsDateList) => {
            expect($compsDateList.length).to.be.above(1);
        });
        return this;
    }

    verifyComparablesNumber(number: number): FindCompsActions {
        const numberToBe = number + 1;
        findCompsPage.addressCells.should("have.length", numberToBe);
        return this;
    }

    selectCompFromMapByAddress(address: string): FindCompsActions {
        recurse(
            () => _scrollAndSearchComp(address),
            () => _map.get(mapKeysUtils.search_result_sales_comp) != undefined, { delay: 2000, timeout: 60000 }
        );
        findCompsPage.getSelectCompFromMapButtonByAddress(address).scrollIntoView().click({ force: true });
        this.checkFindSingleSalesComp();
        // TODO: [QA-6233] Invstigate on ways we can click "Add" btn on Search Comps List safely
        // ernst: delay to not accidentaly dispatch click to "Remove" btn on SearchList
        cy.wait(1500);
        return this;
    }

    /**
     * Selects first sales comp from search results.
     * Useful when we need to select n-random sales comps
     * @param index number of the comp. Default - 0 (first comp in a list).
     * NOTE: 0 - first, -1 - last in the list
     */
    selectCompFromMap(index = 0): FindCompsActions {
        findCompsPage.getSelectCompFromMapButton().eq(index).scrollIntoView().click({ force: true });
        this.checkFindSingleSalesComp();
        // ernst: delay to no accidentaly dispatch click to "Remove" btn in SalesComps search list
        cy.wait(1500);
        return this;
    }

    /**
     * Wait for request(`findTransactionByIdAndVersion`) for adding Sales Comp from Search List to be fulfilled,
     * and also retrieves some data (`id` and `address`) from request and writes into `_map`
     */
    checkFindSingleSalesComp(): FindCompsActions {
        cy.wait(`@${Alias.gql.FindTransactionByIdAndVersion}`, { timeout: 35000 }).then((interception) => {
            cy.log(interception.response.body.data.findTransactionByIdAndVersion.id);
            /**
             * Pushing comps ids upon their addition
             */
            _mutateArrayInMap(
                mapKeysUtils.sales_comps_ids,
                interception.response.body.data.findTransactionByIdAndVersion.id,
                "Sales_IDs array"
            );

            /**
             * Pushing comps addresses upon their addition
             */
            _mutateArrayInMap(
                mapKeysUtils.sales_comps_addresses,
                interception.response.body.data.findTransactionByIdAndVersion.address.streetAddress,
                "Sales_Comps addresses array"
            );
            cy.wrap(interception.response.body.data.findTransactionByIdAndVersion.id)
                .as(Alias.salesEventId);
        });
        return this;
    }

    /**
     * Checks whether when a comp gets added, 
     * it gets automatically added to the bottom.
     * 
     * The algorithm is next: we add SalesComp from SearchList 
     * -> we retrieve addresses from SalesComparables table 
     * -> we extract array of addresses we got from intercepted query (see `checkFindSingleSalesComp` method)
     * -> we compare both arrays
     * 
     * @param option If `reverse` true - checks whether list order changed comparing with default
     */
    checkSalesCompAddedToList(option = { reverse: false }) {
        this.Page.addressSalesComparablesTable.spread((...comps) => {
            /**
             * ernst: addresses from UI contains also city, state and postal code 
             * so we need to trim them and left only first address
             * Example: before -> "45 East 45 Street, New York, NY, 10017" / after -> '45 East 45 Street'
             */
            comps = comps.slice(1).map(elem => elem.innerText.split(",")[0]);
            cy.wrap(comps).as(Alias.salesComps.addressSelectedComps);

            cy.get(`@${Alias.salesComps.addressSelectedComps}`).then(
                _ui_addresses => cy.log("Addresses from SelectedComps table: " + <any>_ui_addresses)
            );

            cy._mapGet(mapKeysUtils.sales_comps_addresses).then(_api_addresses => {
                cy.log(_api_addresses);
                if (option.reverse) {
                    expect(comps).to.not.deep.equal(_api_addresses);
                }
                else {
                    expect(comps).to.deep.equal(_api_addresses);
                }

            });
        });
        return this;
    }

    removeCompByAddress(address: string): FindCompsActions {
        findCompsPage.getRemoveSelectedCompButtonByAddress(address).click();
        return this;
    }

    verifyCompIsInRemovedSection(address: string): FindCompsActions {
        findCompsPage.getRemoveDeletedCompButtonByAddress(address).should("exist");
        return this;
    }

    verifyCompIsInMap(address: string): FindCompsActions {
        findCompsPage.getSelectCompFromMapButtonByAddress(address).should("exist");
        return this;
    }

    removeDeletedCompByAddress(address: string): FindCompsActions {
        findCompsPage.getRemoveDeletedCompButtonByAddress(address).click();
        return this;
    }

    enterReportToSearchComp(reportID: string): FindCompsActions {
        cy.intercept("GET", `/salesComps/eventIds/${reportID}`)
            .as(Alias.salesComps_eventIds);
        findCompsPage.reportToSearchCompInput.type(reportID).should("have.value", reportID);
        return this;
    }

    clickImportCompsFromReportButton(): FindCompsActions {
        findCompsPage.importReportCompsButton.should("be.visible").click();
        return this;
    }

    clickSearchButton(): FindCompsActions {
        findCompsPage.searchButton.click();
        return this;
    }

    /**
     * Checks WebApp REST request /salesComps/eventIds/:report_id
     * which returns salesEventId which in its turn will be passed to DRM's GraphQL API
     */
    checkSingleSalesCompsByEventId(): FindCompsActions {
        cy.wait(`@${Alias.salesComps_eventIds}`).then(({ response }) => {
            cy.get(`@${Alias.salesEventId}`).then(_salesEventId => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let arr: Array<any> = response.body.selectedEventIds;
                expect(arr.find(val => val.salesEventId == _salesEventId))
                    .not.to.be.undefined;
            });
        });
        return this;
    }

    /**
     * Checks `findTransactionsByIdsAndVersions` gql operation whether its response has correct salesEventId ("salesCompId")
     * 
     * TODO: [QA-6132] Add assertion on salesEventId
     */
    checkSelectedSingleSalesComps() {
        cy.wait(`@${Alias.gql.FindTransactionsByIdsAndVersions}`).then(({ request, response }) => {
            let req: Utils.GraphQLRequest = request.body;
            expect(req.operationName).to.equal(gqlOperationNames.findTransactionsByIdsAndVersions);
            cy.log(response.body.data.findTransactionsByIdsAndVersions.map(e => e.id));
            // TODO: Need to add data-qa attribute to verify this
            // expect(response.body.data.findTransactionsByIdsAndVersions.map(e => e.id))
            // .to.include.members(_map.get(mapKeysUtils.sales_comps_ids));
        });
        return this;
    }

    selectAllCompsForImport(): FindCompsActions {
        findCompsPage.importCompsSelectButtons.each(el => {
            cy.wrap(el).click();
        });
        return this;
    }

    selectDropdownOptionNewComp(dropdownElement: Cypress.Chainable, title: string): FindCompsActions {
        dropdownElement.click();
        findCompsPage.getDropdownOption(title).click({ force: true });
        return this;
    }

    clearNumericInputNewComp(elementAlias: string): FindCompsActions {
        // Number "4235" means something for this input
        cy.get(`@${elementAlias}`, { includeShadowDom: true }).realClick().type("4235", { force: true }).clear({ force: true });
        return this;
    }

    enterNumericInputNewComp(elementAlias: string, numberOfUnits: number | string): FindCompsActions {
        this.clearNumericInputNewComp(elementAlias);

        // ernst: little hack to work with commercialAreaNewComp input due its specific behaviour
        if (elementAlias != Alias.pageElements.comp_plex.commercialAreaNewComp) {
            cy.get(`@${elementAlias}`, { includeShadowDom: true }).realClick();
        }
        else {
            cy.get(`@${elementAlias}`, { includeShadowDom: true }).focus();
        }
        cy.get(`@${elementAlias}`, { includeShadowDom: true }).realType(`{enter}${numberOfUnits}`, { pressDelay: 45, delay: 50 });
        this.verifyNumericInputNewComp(elementAlias, numberOfUnits);
        return this;
    }

    verifyNumericInputNewComp(elementAlias: string, numberOfUnits: number | string): FindCompsActions {
        const valueToBe = isNumber(numberOfUnits) ? numberWithCommas(`${numberOfUnits}`.replace("-", "")) : "";
        cy.get(`@${elementAlias}`, { includeShadowDom: true, timeout: 10000 }).should("have.value", valueToBe);
        return this;
    }


    checkSalesCompSortedByDateSold() {
        this.Page.salesCompsDateSold.then(element => {
            cy.log(element)

            for (let i = 1; i + 1 < element.length; i++) {

                let firstDateSoldString = element[i].textContent;
                let secondDateSoldString = element[(i + 1)].textContent;
                cy.log(firstDateSoldString, secondDateSoldString)
                if (firstDateSoldString === 'In-Contract') {
                    cy.log('In-Contract')
                    expect(secondDateSoldString).to.be.a('In-Contract' || 'Listing' || 'number');

                } else if (firstDateSoldString === 'Listing') {
                    cy.log('Listing')
                    expect(secondDateSoldString).to.be.a('Listing' || 'number');

                } else if (Date.parse(firstDateSoldString)) {
                    cy.log('DATE')
                    expect(Date.parse(secondDateSoldString)).to.be.a('number');
                    expect(Date.parse(firstDateSoldString)).to.be.above(Date.parse(secondDateSoldString));
                }
            }
        });
        return this;
    }
}


export default new FindCompsActions(findCompsPage);

/**
 * list of elems -> iterate over it 
 * -> if elem includes address = record it to map 
 * | if list over -> scroll to the last elem of the list
 * 
 * Run this function using cypress-recurse 
 */
const _scrollAndSearchComp = (compAddress: string) => {
    return cy.get('[aria-label="grid"] > div > div', { includeShadowDom: true }).each((elem, index, list) => {
        if (elem.text().includes(compAddress)) {
            cy.log(`Found SalesComps in next list ${list} with index ${index}`);
            _map.set(mapKeysUtils.search_result_sales_comp, elem);
            return;
        }
        else if (list.length == index + 1) {
            if (_map.get(mapKeysUtils.search_result_sales_comp) == undefined) {
                cy.log("Scrolling to last comp in to continue search");
                cy.wrap(elem).scrollIntoView();
                return;
            }
            return;
        }
    });
};