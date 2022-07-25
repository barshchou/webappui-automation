import Enums from "../../../../enums/enums";
import bondTypesEnum from "../../../../enums/organization/bondTypes.enum";
import { BoweryReports } from "../../../../types/boweryReports.type";

const _adminUsername = Cypress.env(`${Enums.USERS.webappAdminUsername}`);
const _adminPassword = Cypress.env(`${Enums.USERS.webappAdminPassword}`);

const _url = (ticker: string): string => {
    return `https://api.stlouisfed.org/fred/series/observations?series_id=` + 
    `${ticker}` + 
    `&api_key=7ab383546af7583fae8a058915edc868&observation_start=`;
};

const _ticker10YearsBonds = bondTypesEnum.tenYearTreasuryBond;
const _ticker30YearsBonds = bondTypesEnum.thirtyYearTreasuryBond;
const _tickerCorporateBonds = bondTypesEnum.corporateBonds;

const _tenYearsBondType = 
    Object.keys(bondTypesEnum)[Object.values(bondTypesEnum).indexOf(_ticker10YearsBonds)] as BoweryReports.BondTypes;
const _thirtyYearsBondType = 
    Object.keys(bondTypesEnum)[Object.values(bondTypesEnum).indexOf(_ticker30YearsBonds)] as BoweryReports.BondTypes;
const _corporateBondType = 
    Object.keys(bondTypesEnum)[Object.values(bondTypesEnum).indexOf(_tickerCorporateBonds)] as BoweryReports.BondTypes;

const _url10YearsBonds = _url(_ticker10YearsBonds);
const _url30YearsBonds = _url(_ticker30YearsBonds);
const _urlCorporateBonds = _url(_tickerCorporateBonds);

export default {
    adminUsername: _adminUsername,
    adminPassword: _adminPassword,
    url10YearsBonds: _url10YearsBonds,
    url30YearsBonds: _url30YearsBonds,
    urlCorporateBonds: _urlCorporateBonds,
    ticker10YearsBonds: _ticker10YearsBonds,
    ticker30YearsBonds: _ticker30YearsBonds,
    tickerCorporateBonds: _tickerCorporateBonds,
    tenYearsBondType: _tenYearsBondType,
    thirtyYearsBondType: _thirtyYearsBondType,
    corporateBondType: _corporateBondType
};