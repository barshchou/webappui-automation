import enums from "../../../../enums/enums";
import { findCompsPage } from "../../../../pages/sales/findComps.page";
import { CompPlex } from "../../../../types/compplex.type";
import { Alias } from "../../../../utils/alias.utils";

const { numberFilters, salePeriod, propertyType } = enums.COMPPLEX_ENUM._jobSearch;


class JobSearchActions {
    Page: typeof findCompsPage;

    constructor(page: typeof findCompsPage) {
        this.Page = page;
    }

    openJobSearchTab() {
        findCompsPage.jobSearchTab.click();
        cy.wait(`@${Alias.gql.SearchJobs}`, { timeout: 120000 });
        findCompsPage.reportIdInput.should('exist');
        return this;
    }

    /**
     * Checks whether filters in JobSearch screen exists
     */
    checkFiltersAreExist() {
        this.Page.jobSearchFilterCompletedIn.should("exist");
        this.Page.jobSearchFilterCapRate.should("exist");
        this.Page.jobSearchFilterCommercialUnits.should("exist");
        this.Page.jobSearchFilterPricePerSF.should("exist");
        this.Page.jobSearchFilterPricePerUnit.should("exist");
        this.Page.jobSearchFilterPropertyType.should("exist");
        this.Page.jobSearchFilterResidentialUnits.should("exist");
        this.Page.jobSearchOnAppJobCheckbox.should("exist");
        return this;
    }

    checkFiltersAreEnabled() {
        this.Page.jobSearchFilterCompletedIn.should("be.enabled");
        this.Page.jobSearchFilterCapRate.should("be.enabled");
        this.Page.jobSearchFilterCommercialUnits.should("be.enabled");
        this.Page.jobSearchFilterPricePerSF.should("be.enabled");
        this.Page.jobSearchFilterPricePerUnit.should("be.enabled");
        this.Page.jobSearchFilterPropertyType.should("be.enabled");
        this.Page.jobSearchFilterResidentialUnits.should("be.enabled");
        this.Page.jobSearchOnAppJobCheckbox.should("be.enabled");
        return this;
    }

    /**
     * Sets min or/and max value to the filter 
     * @param filterName name of the filter which takes **only** number input
     * @param minmax Min value or Max value to input
     */
    jobSearchFilterSetMinMax(
        filterName: CompPlex.JobSearch.NumberFilters, minmax: CompPlex.JobSearch.FilterMinMax) {
        // `numberFilter` can be `undefined` or `null` (since it's optional) - we need to have this check
        if (!Cypress._.isNil(minmax)) {
            // we need this to make our actions definitely synchronous  
            cy.get("body").then(() => {
                // iterating over keys and values in `minmax` object
                for (const [ key, value ] of Object.entries(minmax)) {
                    /*
                     *  making sure that `min` or `max` in not null or undefined 
                     *  (since it's optional - it can be null/undefined)
                     */
                    if (!Cypress._.isNil(value)) {
                        /*
                         * composing selector from key (min or max) and filterName,
                         * accessing to data (`minmax["min"]`) and casting `number` to `string`
                         */
                        this.Page.jobSearchGetFilterInput(key, filterName).type(minmax[key].toString());
                        // waiting map to be updated since every enter to filter triggers gql query
                        cy.wait(`@${Alias.gql.SearchJobs}`, { timeout: 120000 });
                    }   
                }
            });
        } else {
            cy.log("No min-max value was sent to filter");
        }
        return this;
    }
    
    /**
     * Checks whether data from card matches the min-max range (or equals max/min value)
     */
    jobSearchFilterVerifyMinMaxRange(
        value: number, filterObject: CompPlex.JobSearch.JobFilter, numberFilter: CompPlex.JobSearch.NumberFilters) {
        // value - is the value we get from sales-comp object (`searchJobs` gql query response)
        this.verifyMaxMinFilter(value, filterObject[numberFilter], numberFilter);
        return this;
    }

    /**
     * Verification method which check whether the value is included in min/max range (or equals min/max).
     *
     * Example: value - 1000, min - 1000, max - 1100 => 
     * 1000 >= 100 (at.least) 
     * 1000 <= 1100 (at.most).
     * 
     * @param value 
     * @param filter 
     * @param filterName 
     */
    private verifyMaxMinFilter(
        value: number, filter: CompPlex.JobSearch.FilterMinMax, filterName: CompPlex.JobSearch.NumberFilters) {
        /*
         *  ernst: we need two assertions in a row since it's informative rather than having 
         * `expect(true).toEqual(value >= min && value <= max)`
         */

        // because filter is optional - it can null/undefined 
        if (Cypress._.isNil(filter)) {
            cy.log(`No number filter ${filterName}  for JobSearch was provided. Skip check.`);
            return;
        }
        if (!Cypress._.isNil(filter.max)) {
            // necessary logging
            cy.log(filterName);
            cy.get("body").then(() => expect(value).to.be.at.most(filter.max));
        }  
        if (!Cypress._.isNil(filter.min)) {
            // necessary logging
            cy.log(filterName);
            cy.get("body").then(() => expect(value).to.be.at.least(filter.min));
        }
    }

    jobSearchSetSalePeriod(period: CompPlex.JobSearch.SalePeriod) {
        if (!Cypress._.isNil(period)) {
            cy.log(`Sale Period for JobFilter: ${salePeriod[period]}`);
            this.Page.filterSalePeriod.click();
            this.Page.filterSalePeriodValue(salePeriod[period]).click();
            cy.wait(`@${Alias.gql.SearchJobs}`, { timeout: 120000 });
        } else {
            cy.log("No Sale Period was sent to filter");
        }
        return this;        
    }

    /**
     * Selects PropertyType in JobSearch / CompSearch
     *
     * todo: adapt method to select different checkboxes (probably, need to refactor type also)
     * if not - just call method during foreach or whatever
     * @param type Type(s) of property in JobSearch (can select one or more)
     */
    jobSearchSetPropertyTypes(type: CompPlex.JobSearch.PropertyType) {
        this.Page.jobSearchFilterPropertyType.click();
        this.Page.filterPropertyTypeValue(propertyType[type]).type(`{esc}`, { force:true });
        cy.wait(`@${Alias.gql.SearchJobs}`, { timeout: 120000 });
        return this;
    }

    /**
     * Setup Job-Search filters based on sending filter setup
     * @param filter Filter data we usually setup in test fixture
     */
    jobSearchSetupFilter(filter: CompPlex.JobSearch.JobFilter, setSalePeriod = true, setPropertyTypes= true, 
        setOnAppJobs = true) {
        if (setSalePeriod === true)  { this.jobSearchSetSalePeriod(filter.salePeriod); }
        if (setPropertyTypes === true)  { this.jobSearchSetPropertyTypes(filter.propertyType); }
        if (setOnAppJobs === true)  { this.jobSearchSetOnAppJobs(filter.isShowOnlyOnAppJobs); }
        // iterating over existing filters and setting the value
        Object.values(numberFilters).forEach(element => {
            this.jobSearchFilterSetMinMax(element, filter[element]);
        });
        return this;
    }

    jobSearchSetOnAppJobs(isCheck: boolean) {
        // optional, so check is required
        if (!Cypress._.isNil(isCheck)) {
            this.Page.jobSearchOnAppJobCheckbox.check();
        }
        return this;
    }

    /**
     * Focuses on first available job icon on map and opens its job-card
     */
    focusOnJobIcon(iconIndex = 0) {
        this.Page.selectCompsIconOnMap.eq(iconIndex).dblclick({ force:true });// cy.pause();
        cy.wait(`@${Alias.gql.SearchJobs}`, { timeout: 120000 }).as(Alias.jobSearch.jobCardComp);
        /**
         * We need cy.wait here, because after gql response spinner sometimes exists, sometimes not
         */
        cy.wait(1000);
        findCompsPage.loadingModalSpinner.should('not.exist');
        /** 
         * We need cy.wait here, because after spinner some of the comp 
         * icons still in process of rendering their position on the map
         */
        cy.wait(1000);
        this.Page.selectCompsIconOnMap.eq(iconIndex).click();
        this.Page.jobCard.should("be.visible");
        findCompsPage.loadingModalSpinner.should('not.exist');
        // ernst: after job-card became visible - we need retrieve all necessary comp data for further manipulations
        this.retrieveJobCardData(Alias.jobSearch.jobCardComp, Alias.jobSearch.selectedCompData);
        return this;
    }

    /**
     * Parse data from intercepted request `searchJobs` when we zoom in to JobCard
     * @param jobAlias alias for intercepted `searchJobs` gql request 
     */
    private retrieveJobCardData(jobAlias: string, selectedCompDataAlias: string) {
        this.Page.jobCardAddress.then(elem => {
            let address = elem.text();
            cy.get(`@${jobAlias}`).then(val => {
                /*
                 * ernst: sales comp data which we focused on map
                 * based on address from JobCard we get from UI - we looking for our SalesComp
                 */
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                let comp = val.response.body.data.searchJobs.find(c => c.address.streetAddress == address);
                cy.wrap(comp).as(selectedCompDataAlias);
            });
        });
        return this;
    }

    verifyJobCardOnAppJob(value: boolean, filterObject: CompPlex.JobSearch.JobFilter) {
        if (!Cypress._.isNil(filterObject.isShowOnlyOnAppJobs)) {
            cy.log(`isShowOnlyOnAppJobs filter provided, checking the JobCard`);
            cy.get("body").then(() => expect(value).to.be.equal(filterObject.isShowOnlyOnAppJobs));
        }
        return this;
    }

    verifyJobCardPropertyType(value: string, filterObject:CompPlex.JobSearch.JobFilter) {
        if (!Cypress._.isNil(filterObject.propertyType)) {
            cy.log(
                `Filter PropertyType is provided (${propertyType[filterObject.propertyType]}), checking the JobCard`
            );
            cy.get("body").then(() => expect(value).to.be.equal(propertyType[filterObject.propertyType]));
        }
        return;
    }

    /**
     * Verifies filters which was set to JobSearch with selected on map JobCard
     * @param compDataAlias alias for saved sales-comp data during `focusOnJobIcon` method
     * @param filterObject Filter setup 
     */
    verifyJobCardDataAndFilters(filterObject: CompPlex.JobSearch.JobFilter) {
        cy.get(`@${Alias.jobSearch.selectedCompData}`).then(_comp => {
            // Sales-Comp object in its glory, types in comp-plex repo, sorry 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let comp: any = _comp;

            this.jobSearchFilterVerifyMinMaxRange(comp.saleInformation.capRate, filterObject, "capRate")
                .jobSearchFilterVerifyMinMaxRange(
                    comp.propertyInformation.commercialUnits, filterObject, "commercialUnits"
                ).jobSearchFilterVerifyMinMaxRange(
                    comp.propertyInformation.grossBuildingArea, filterObject, "grossBuildingArea"
                )
                .jobSearchFilterVerifyMinMaxRange(comp.pricePerSF, filterObject, "pricePerSF")
                .jobSearchFilterVerifyMinMaxRange(comp.pricePerUnit, filterObject, "pricePerUnit")
                .jobSearchFilterVerifyMinMaxRange(
                    comp.propertyInformation.residentialUnits, filterObject, "residentialUnits"
                )
                .jobSearchFilterVerifyMinMaxRange(comp.saleInformation.salePrice, filterObject, "salePrice")
                .verifyJobCardOnAppJob(comp.jobInformation.onApp, filterObject)
                .verifyJobCardPropertyType(comp.propertyInformation.propertyType, filterObject);
        });
        return this;
    }
    
    /**
     * Action opens 'JOB SEARCH' tab, enters report id, finds comp on map
     * and imports comps to existing report
     */
    addNewCompViaReportId(reportId: string) {
        this.enterReportToSearchComp(reportId)
            .clickSearchButton()
            .clickSelectCompsIconOnMap()
            .clickSelectCompsButton()
            .clickSelectAllButton()
            .clickImportCompsFromReportButton();
        return this;
    }

    //TODO upgrade this method, cos it cant add two imports because of scroll.
    /**
     * Action enters report id into field 'Report ID' on 'JOB SEARCH' tab
     */
    enterReportToSearchComp(reportID: string) {
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

    clickSearchButton() {
        findCompsPage.searchButton.should('exist')
            .should('be.enabled').click();
        return this;
    }
    
    clickSelectCompsIconOnMap(index = 0) {
        findCompsPage.selectCompsIconOnMap.should('exist');
        findCompsPage.selectCompsIconOnMap.eq(index).click();
        findCompsPage.selectCompsButton.should('exist');
        return this;
    }

    clickSelectCompsButton() {
        findCompsPage.selectCompsButton.should('exist')
            .should('be.enabled').click();
        return this;
    }
    
    clickSelectAllButton() {
        findCompsPage.selectAllButton.should('exist').should('be.enabled');
        findCompsPage.selectedForReportTitle.should('exist');
        findCompsPage.selectAllButton.click();
        return this;
    }

    clickImportCompsFromReportButton() {
        findCompsPage.addToReportCompsButton.should("be.visible")
            .should("be.enabled").click();
        return this;
    }
}
export default new JobSearchActions(findCompsPage);