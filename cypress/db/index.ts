import { MongoClient } from 'mongodb';
import mapKeysUtils from '../utils/mapKeys.utils';
import { CompPlex } from "../types/compplex.type";


class ComplexDatabaseModule {

    /**
     * Function determines url and name of comp-plex database, then  connects to database and retrieve 
     * the array (max = 10) of comps with necessary property (@param filterPath) value (@param filterValue)
     */
    setCompsArrayFromDb = (filterPath: CompPlex.AddressSearch.CompPropertyInDB, 
        filterValue: string) => {
        const { mongoUrl, dbName } = this.determinePassedEnv();
        cy.task('retrieveDataFromDb', { dbUrl: mongoUrl, dbName: dbName, 
            filterPath: filterPath, filterValue: filterValue }).then(data => {
            cy.log(<string>data);
            cy._mapSet(mapKeysUtils.arrayOfCompsFromDB, data);
        });
    };


    /**
     * Function connects to Comp-plex database and retrieve the array (max = 10) of comps with 
     * necessary property (@param filterPath) value (@param filterValue)
     */
    retrieveDataFromDb = async (url: string, dbName: string, filterPath: string, filterValue: string) => {
        const client = new MongoClient(url);
        const collectionName = "sales-transactions";
        const filter = { [filterPath] : filterValue } ;
        await client.connect();
        // eslint-disable-next-line no-console
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        let data = await collection.find(filter, { limit:10 }).toArray();
        client.close();
        return data;
    };

    /**
     * Function determines what environment was passed when test was started
     */
    determinePassedEnv = () => {
        const databaseSecrets = {
            "dev":{
                mongoUrl: Cypress.env("CYPRESS_COMP_PLEX_DEV_DATABASE"), //move + divide Cypress.env
                dbName: Cypress.env("CYPRESS_COMP_PLEX_DB_DEV_NAME")
            },
            "compDev":{
                mongoUrl: Cypress.env("CYPRESS_COMP_PLEX_DEV_DATABASE"),
                dbName: Cypress.env("CYPRESS_COMP_PLEX_DB_DEV_NAME")
            },
            "custom":{
                mongoUrl: Cypress.env("CYPRESS_COMP_PLEX_DEV_DATABASE"),
                dbName: Cypress.env("CYPRESS_COMP_PLEX_DB_DEV_NAME")
            },
            //We don't have keys for prod db yet
            "prod":{
                mongoUrl: Cypress.env("-"),
                dbName: Cypress.env("-")
            },
            "staging":{
                mongoUrl: Cypress.env("CYPRESS_COMP_PLEX_STAGE_DATABASE"),
                dbName: Cypress.env("CYPRESS_COMP_PLEX_DB_STAGE_NAME")
            },
            "compStage":{
                mongoUrl: Cypress.env("CYPRESS_COMP_PLEX_STAGE_DATABASE"),
                dbName: Cypress.env("CYPRESS_COMP_PLEX_DB_STAGE_NAME")
            }
        };
        return databaseSecrets[Cypress.env("url")];
    };
}

export default new ComplexDatabaseModule();