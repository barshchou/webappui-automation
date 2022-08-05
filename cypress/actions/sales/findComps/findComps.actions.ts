/* eslint-disable @typescript-eslint/no-explicit-any */
import { findCompsPage } from "../../../pages/sales/findComps.page";
import { getUploadFixture } from "../../../../utils/fixtures.utils";
import { isNumber, numberWithCommas } from "../../../../utils/numbers.utils";
import BaseActionsExt from "../../base/base.actions.ext";
import saleInfoFormActions from "./drm/saleInfoForm.actions";
import propertyDescActions from "./drm/propertyDescForm.actions";
import salesCompDetailsActions from "./drm/salesCompDetails.actions";
import propertyInfoFormActions from "./drm/propertyInfoForm.actions";
import { Alias, gqlOperationNames } from "../../../utils/alias.utils";
import { Utils } from "../../../types/utils.type";
import { _map, _mutateArrayInMap } from "../../../support/commands";
import { recurse } from "cypress-recurse";
import mapKeysUtils from "../../../utils/mapKeys.utils";
import { BoweryReports } from "../../../types/boweryReports.type";
import { isDateHasCorrectFormat } from "../../../../utils/date.utils";

class FindCompsActions extends BaseActionsExt<typeof findCompsPage> {
    selectedCompsSetSort(sortType: BoweryReports.FindComps.SelectedComparablesSortType) {
        this.Page.sortSalesCompsSelectList.click();
        this.Page.sortSalesCompsSelectListOption(sortType).click();
        return this;
    }

    get SaleInfo() {
        return saleInfoFormActions;
    }

    get PropertyDesc() {
        return propertyDescActions;
    }

    get PropertyInfo() {
        return propertyInfoFormActions;
    }

    get SalesCompDetails() {
        return salesCompDetailsActions;
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

    clickAddNewCompContinueButton(): FindCompsActions {
        findCompsPage.newCompContinueButton.should('exist').should('be.enabled').focus().realClick({ clickCount: 15 });
        return this;
    }

    clickAddNewCompSaveAndCloseButton(): FindCompsActions {
        findCompsPage.saveAndCloseButton.should('exist').should('be.enabled').focus().click();
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

    openAddNewComparableFormSearchResult(address: string, searchResultIndex = -1): FindCompsActions {
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

    verifyUploadCompsSucceeded(): FindCompsActions {
        findCompsPage.loadingModalCSV.should('exist');
        findCompsPage.loadingModalCSV.should('not.exist');
        findCompsPage.salesCompsDateSold.should(($compsDateList) => {
            expect($compsDateList.length).to.be.above(1);
        });
        return this;
    }

    selectFilterSalePeriodValue(periodValue: BoweryReports.FindComps.SalePeriodValues): FindCompsActions {
        findCompsPage.filterSalePeriod.should('exist').click();
        findCompsPage.filterSalePeriodValue(periodValue).should('exist').click();
        findCompsPage.filterSalePeriod.children().should('contain', `${periodValue}`);
        return this;
    }

    resetAllFilters(): FindCompsActions {
        findCompsPage.resetAllButton.click();
        findCompsPage.loadingModalSpinner.should('exist');
        /*
         * TODO add cy.wait(@${Alias.gql.SearchSalesTransactions}, { timeout: 180000 }) but with option, when this alias
         * is clearable (for multiply action using)
         */
        findCompsPage.loadingModalSpinner.should('not.exist');
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
            () => _map.get(mapKeysUtils.searchResultSalesComp) != undefined, { delay: 2000, timeout: 60000 }
        );
        findCompsPage.getSelectCompFromMapButtonByAddress(address).scrollIntoView().click({ force: true });
        this.checkFindSingleSalesComp();
        /*
         * TODO: [QA-6233] Invstigate on ways we can click "Add" btn on Search Comps List safely
         * ernst: delay to not accidentaly dispatch click to "Remove" btn on SearchList
         */
        cy.wait(1500);
        /*
         * We should delete 'mapKeysUtils.searchResultSalesComp' every time after comp addition
         * because for proper _scrollAndSearchComp and recurse methods work 
         * 'mapKeysUtils.searchResultSalesComp' must be undefined
         */
        cy.then(() => {
            _map.delete(mapKeysUtils.searchResultSalesComp);
            cy.log('Key mapKeysUtils.searchResultSalesComp deleted'); 
        });
        //TODO add action for list scrolling up, after every comp addition
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
        // ernst: delay to no accidentally dispatch click to "Remove" btn in SalesComps search list
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
                mapKeysUtils.salesCompsIds,
                interception.response.body.data.findTransactionByIdAndVersion.id,
                "Sales_IDs array"
            );

            /**
             * Pushing comps addresses upon their addition
             */
            _mutateArrayInMap(
                mapKeysUtils.salesCompsAddresses,
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
                uiAddresses => cy.log("Addresses from SelectedComps table: " + <any>uiAddresses)
            );

            cy._mapGet(mapKeysUtils.salesCompsAddresses).then(apiAddresses => {
                cy.log(apiAddresses);
                if (option.reverse) {
                    expect(comps).to.not.deep.equal(apiAddresses);
                } else {
                    expect(comps).to.deep.equal(apiAddresses);
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

    addDeletedCompByAddress(address: string): FindCompsActions {
        findCompsPage.addRemovedCompButtonByAddress(address).should("exist").click();
        return this;
    }

    //TODO upgrade this method, cos it cant add two imports because of scroll.
    /**
     * Action enters report id into field 'Report ID' on 'JOB SEARCH' tab
     */
    enterReportToSearchComp(reportID: string): FindCompsActions {
        cy.intercept("GET", `/salesComps/eventIds/${reportID}`)
            .as(Alias.salesCompsEventIds);
        findCompsPage.reportIdInput
            .should('exist')       
            .realClick({ clickCount: 10 })
            .type("textforclear", { force: true })
            .realClick({ clickCount: 10 })
            .focus()
            .clear( { force: true })
            .realClick({ clickCount: 10 })
            .should('be.focused')
            .realType(`${reportID}{enter}`);
        findCompsPage.reportIdInput.should("have.value", reportID);
        return this;
    }

    clickImportCompsFromReportButton(): FindCompsActions {
        findCompsPage.addToReportCompsButton.should("be.visible")
            .should("be.enabled").click();
        return this;
    }

    clickSelectCompsIconOnMap(): FindCompsActions {
        findCompsPage.selectCompsIconOnMap.should('exist');
        cy.wait(1000);
        findCompsPage.selectCompsIconOnMap.click();
        findCompsPage.selectCompsButton.should('exist');
        return this;
    }

    clickSearchButton(): FindCompsActions {
        findCompsPage.searchButton.should('exist')
            .should('be.enabled').click();
        return this;
    }

    clickSelectCompsButton(): FindCompsActions {
        findCompsPage.selectCompsButton.should('exist')
            .should('be.enabled').click();
        return this;
    }

    clickSelectAllButton(): FindCompsActions {
        findCompsPage.selectAllButton.should('exist').should('be.enabled');
        findCompsPage.selectedForReportTitle.should('exist');
        findCompsPage.selectAllButton.click();
        return this;
    }

    /**
     * Checks WebApp REST request /salesComps/eventIds/:report_id
     * which returns salesEventId which in its turn will be passed to DRM's GraphQL API
     */
    checkSingleSalesCompsByEventId(): FindCompsActions {
        cy.wait(`@${Alias.salesCompsEventIds}`).then(({ response }) => {
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
     * Checks `findTransactionsByIdsAndVersions` gql operation whether 
     * its response has correct salesEventId ("salesCompId")
     * 
     * TODO: [QA-6132] Add assertion on salesEventId
     */
    checkSelectedSingleSalesComps() {
        cy.wait(`@${Alias.gql.FindTransactionsByIdsAndVersions}`).then(({ request, response }) => {
            let req: Utils.GraphQLRequest = request.body;
            expect(req.operationName).to.equal(gqlOperationNames.findTransactionsByIdsAndVersions);
            cy.log(response.body.data.findTransactionsByIdsAndVersions.map(e => e.id));
            /*
             * TODO: Need to add data-qa attribute to verify this
             * expect(response.body.data.findTransactionsByIdsAndVersions.map(e => e.id))
             * .to.include.members(_map.get(mapKeysUtils.sales_comps_ids));
             */
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
        cy.get(`@${elementAlias}`)
            .realClick().type("4235", { force: true }).clear({ force: true });
        return this;
    }

    enterNumericInputNewComp(elementAlias: string, numberOfUnits: number | string): FindCompsActions {
        this.clearNumericInputNewComp(elementAlias);
        // ernst: little hack to work with commercialAreaNewComp input due its specific behavior
        if (elementAlias != Alias.pageElements.compPlex.commercialAreaNewComp) {
            cy.get(`@${elementAlias}`).realClick();
        } else {
            cy.get(`@${elementAlias}`).focus();
        }
        cy.get(`@${elementAlias}`)
            .realType(`{enter}${numberOfUnits}`, { pressDelay: 45, delay: 50 });
        this.verifyNumericInputNewComp(elementAlias, numberOfUnits);
        return this;
    }

    verifyNumericInputNewComp(elementAlias: string, numberOfUnits: number | string): FindCompsActions {
        const valueToBe = isNumber(numberOfUnits) ? numberWithCommas(`${numberOfUnits}`.replace("-", "")) : "";
        cy.get(`@${elementAlias}`, { timeout: 10000 }).should("have.value", valueToBe);
        return this;
    }

    /** 
     * Function takes all comps and create an array from values of column "Date Sold" (focusArray), 
     * then compare this array with array, that was created and sorted (arrayForCompare). 
     */
    checkSalesCompSortedByDateSold() {
        this.Page.salesCompsDateSold.then(element => {
            let focusArray =  [];
            let wordsArray = [];
            let numberArray = [];
            for (let i = 1; i < element.length; i++) {
                if (isDateHasCorrectFormat(element[i].textContent, "/")) {
                    focusArray.push(Date.parse(element[i].textContent));
                    numberArray.push(Date.parse(element[i].textContent));
                }  else { 
                    focusArray.push(element[i].textContent);
                    wordsArray.push(element[i].textContent);
                }
            }            
            numberArray.sort((firstEl, secondEl) => (firstEl < secondEl) ? 1 : -1);
            wordsArray.sort((firstEl, secondEl) => (firstEl > secondEl) ? 1 : -1);
            let arrayForCompare = wordsArray.concat(numberArray);
            cy.log(<any>focusArray); 
            cy.log(<any>arrayForCompare); 
            expect(focusArray.length === arrayForCompare.length && focusArray.every((value, index) => 
                value === arrayForCompare[index])
            ).to.be.equal(true);
        });
        return this;
    }

    /**
     * Action opens 'JOB SEARCH' tab, enters report id, finds comp on map
     * and imports comps to existing report
     */
    addNewCompViaReportId(reportId: string): FindCompsActions {
        this.openJobSearchTab()
            .enterReportToSearchComp(reportId)
            .clickSearchButton()
            .clickSelectCompsIconOnMap()
            .clickSelectCompsButton()
            .clickSelectAllButton()
            .clickImportCompsFromReportButton();
        return this;
    }

    openJobSearchTab(): FindCompsActions {
        findCompsPage.jobSearchTab.click();
        findCompsPage.reportIdInput.should('exist');
        return this;
    }

    openCompSearchTab(): FindCompsActions {
        findCompsPage.compSearchTab.click();
        findCompsPage.resetAllButton.should('exist');
        return this;
    }

    openDetailsModal(address: string): FindCompsActions {
        this.Page.detailsButtonByAddress(address).should('exist').click();
        this.Page.propertyInfoEditBtn.should('exist');
        return this;
    }
    

    
}

export default new FindCompsActions(findCompsPage);

/**
 * list of elements -> iterate over it 
 * -> if elem includes address = record it to map 
 * | if list over -> scroll to the last elem of the list
 * 
 * Run this function using cypress-recurse 
 */
const _scrollAndSearchComp = (compAddress: string) => {
    return cy.get('[aria-label="grid"] > div > div').each((elem, index, list) => {
        if (elem.text().includes(compAddress)) {
            cy.log(`Found SalesComps in next list ${list} with index ${index}`);
            _map.set(mapKeysUtils.searchResultSalesComp, elem);
            return;
        } else if (list.length == index + 1) {
            if (_map.get(mapKeysUtils.searchResultSalesComp) == undefined) {
                cy.log("Scrolling to last comp in to continue search");
                cy.wrap(elem).scrollIntoView();
                return;
            }
            return;
        }
    });
};
