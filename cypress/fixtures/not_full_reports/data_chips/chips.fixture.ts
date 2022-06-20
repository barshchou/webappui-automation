class Chips {

    private _numberOfCommercialUnits = 2;

    private _numberOfResidentialUnits = 2;

    private _buildingName = 'Test Building Name';

    private _grossBuildingArea = 5999;

    private _siteArea = 735000;

    private _currentNumberOfCommercialUnits = 5;

    private _currentNumberOfResidentialUnits = 4;

    private _block = '962';

    private _streetAddress = '462 1st Avenue';

    private _lotValue = '100';

    private _streetName = '1st Avenue';

    get NumberOfCommercialUnits() {
        return this._numberOfCommercialUnits;
    }

    set NumberOfCommercialUnits(commercialUnits: number){
        this._numberOfCommercialUnits = commercialUnits;
    }

    get NumberOfResidentialUnits() {
        return this._numberOfResidentialUnits;
    }

    set NumberOfResidentialUnits(residentialUnits: number){
        this._numberOfResidentialUnits = residentialUnits;
    }

    get BuildngName() {
        return this._buildingName;
    }

    set BuildngName(buildingName: string){
        this._buildingName = buildingName;
    }

    get GrossBuildingAre() {
        return this._grossBuildingArea;
    }

    set GrossBuildingAre(grossBuildingArea: number){
        this._grossBuildingArea = grossBuildingArea;
    }

    get SiteArea() {
        return this._siteArea;
    }

    set SiteArea(siteArea: number){
        this._siteArea = siteArea;
    }

    get CurrentNumberOfCommercialUnits() {
        return this._currentNumberOfCommercialUnits;
    }

    set CurrentNumberOfCommercialUnits(currentCommercialUnits: number){
        this._currentNumberOfCommercialUnits = currentCommercialUnits;
    }

    get CurrentNumberOfResidentialUnits() {
        return this._currentNumberOfResidentialUnits;
    }

    set CurrentNumberOfResidentialUnits(currentResidentialUnits: number){
        this._currentNumberOfResidentialUnits = currentResidentialUnits;
    }

    get Block() {
        return this._block;
    }

    set Block(block: string){
        this._block = block;
    }

    get StreetAddress() {
        return this._streetAddress;
    }

    set StreetAddress(streetAdress: string){
        this._streetAddress = streetAdress;
    }

    get LotValue() {
        return this._lotValue;
    }

    set LotValue(lot: string){
        this._lotValue = lot;
    }

    get StreetName() {
        return this._streetName;
    }

    set StreetName(streetName: string){
        this._streetName = streetName;
    }

    constructor(block: string, buildingName: string, grossBuildingArea: number, lotValue: string,
                numberOfCommercialUnits: number, numberOfResidentialUnits: number, siteArea: number,
                streetAddress: string, streetName: string, 
                currentCommercialUnits?: number, currentResidentialUnits?: number){

        this._block = block;
        this._buildingName = buildingName;
        this._grossBuildingArea = grossBuildingArea;
        this._lotValue = lotValue;
        this._numberOfCommercialUnits = numberOfCommercialUnits;
        this._numberOfResidentialUnits = numberOfResidentialUnits;
        this._siteArea = siteArea;
        this._streetAddress = streetAddress;
        this._streetName = streetName;
        this._currentNumberOfCommercialUnits = currentCommercialUnits;
        this._currentNumberOfResidentialUnits = currentResidentialUnits;
    }

    stabilized_chip() {
        return [
            {
                suggestionName: 'Block',
                typeSuggestValue: 'Bloc',
                verifySuggest: this.Block,
                verifyExport: this.Block
            }, 
            {
                suggestionName: 'Building Name',
                typeSuggestValue: 'Buildin',
                verifySuggest: this.BuildngName,
                verifyExport: this.BuildngName
            }, 
            {
                suggestionName: 'Concluded Cap Rate',
                typeSuggestValue: 'Conclude',
                verifySuggest: '0%',
                verifyExport: 'Conclude'
            }, 
            {
                suggestionName: 'Foreclosure Sale',
                typeSuggestValue: 'Foreclosur',
                verifySuggest: 'The above transaction reflects a foreclosure sale of the property. Typically in a foreclosure sale, the buyer assumes all encumbrances on the site, including any outstanding mortgage amount and legal fees ("upset costs"), delinquent taxes and water and sewer charges, foreclosure sale fee, and realty transfer taxes. This information was requested from the owner; however, not provided.',
                verifyExport: 'foreclosure sale'
            }, 
            {
                suggestionName: 'Sherrif\'s Sale',
                typeSuggestValue: 'Sherri',
                verifySuggest: "The above transaction reflects a Sheriff's sale of the property. Typically in a Sheriff’s sale, the buyer assumes all encumbrances on the site, including any outstanding mortgage amount and legal fees (\"upset costs\"), delinquent taxes and water and sewer charges, Sheriff's sale fee, and realty transfer taxes. This information was requested from the owner; however, not provided.",
                verifyExport: "The above transaction reflects a Sheriff's sale of the property. Typically in a Sheriff’s sale, the buyer assumes all encumbrances on the site, including any outstanding mortgage amount and legal fees (\"upset costs\"), delinquent taxes and water and sewer charges, Sheriff's sale fee, and realty transfer taxes. This information was requested from the owner; however, not provided."
            },
            {
                suggestionName: 'Gross Building Area',
                typeSuggestValue: 'Gros',
                verifySuggest: this.GrossBuildingAre,
                verifyExport: this.GrossBuildingAre
            }, 
            {
                suggestionName: 'Site Area',
                typeSuggestValue: 'Sit',
                verifySuggest: this.SiteArea,
                verifyExport: this.SiteArea
            }, 
            {
                suggestionName: 'Street Address',
                typeSuggestValue: 'Street',
                verifySuggest: this.StreetAddress,
                verifyExport: this.StreetAddress
            },
            {
                suggestionName: 'Lot',
                typeSuggestValue: 'Lo',
                verifySuggest: this.LotValue,
                verifyExport: this.LotValue
            },  
            {
                suggestionName: 'Street Name',
                typeSuggestValue: 'Stree',
                verifySuggest: this.StreetName,
                verifyExport: this.StreetName
            }, 
            {
                suggestionName: 'Unchanged Renovations',
                typeSuggestValue: 'Unchange',
                verifySuggest: 'Upon renovation, the subject unit count and gross building area will remain unchanged.',
                verifyExport: 'Upon renovation, the subject unit count and gross building area will remain unchanged.'
            },
            {
                suggestionName: 'Zone(s)',
                typeSuggestValue: 'Zone',
                verifySuggest: 'R8',
                verifyExport: 'R8'
            }, 
        ];
    }
    

}

export { Chips };
// export default new Chips();