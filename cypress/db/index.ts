/* eslint-disable no-console */
import { MongoClient } from 'mongodb';
import mapKeysUtils from '../utils/mapKeys.utils';
import { CompPlex } from "../types/compplex.type";

class ComplexDatabaseModule {
    
    /**
     * Function determines url and name of comp-plex database, then  connects to database and retrieve 
     * the array (max = 10) of comps with necessary property and its value 
     * @param compProperty Comp property path in database collection
     * @param compPropertyValue Comp property value in database collection
     */
    setCompsArrayFromDb = (compProperty: CompPlex.AddressSearch.CompPropertyInDB, 
        compPropertyValue: string) => {
        const { mongoUrl, dbName } = this.selectDatabaseSecrets();
        cy.task('retrieveDataFromDb', { dbUrl: mongoUrl, dbName: dbName, 
            compPropertyPathInDB: compProperty, compPropertyValueInDB: compPropertyValue }).then(data => {
            cy.log(<string>data);
            cy._mapSet(mapKeysUtils.arrayOfCompsFromDB, data);
        });
    };
 
    /**
     * Function connects to Comp-plex database and retrieve the array (max = 10) of comps with 
     * necessary property and its value 
     * @param compPropertyPathInDB Comp property path in database collection
     * @param compPropertyValueInDB Comp property value in database collection
     */
    retrieveDataFromDb = async (url: string, dbName: string, compPropertyPathInDB: string, 
        compPropertyValueInDB: string) => {
        const client = new MongoClient(url);
        const collectionName = "sales-transactions";
        const filter = { [compPropertyPathInDB] : compPropertyValueInDB } ;
        try {
            await client.connect();
            console.log('Connected successfully to server');
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            let data = await collection.find(filter, { limit:10 }).toArray();
            client.close();
            return data; 
        } catch (error) {
            console.log(error);
        } 
    };

    /**
     * Function determines what environment was passed when test was started and returns 
     * necessary secrets for relative comp-plex database 
     */
    selectDatabaseSecrets = () => {
        cy.log(`Secrets to Comp-plex database on ${Cypress.env("url")} env`);
        return this.databaseSecrets()[Cypress.env("url")];
    };

    /**
     * Function returns a list of secrets for different comp-plex databases
     */
    databaseSecrets = () => {
        return {
            "dev":{
                mongoUrl: Cypress.env("COMP_PLEX_DEV_DATABASE"), 
                dbName: Cypress.env("COMP_PLEX_DB_DEV_NAME")
            },
            "compDev":{
                mongoUrl: Cypress.env("COMP_PLEX_DEV_DATABASE"),
                dbName: Cypress.env("COMP_PLEX_DB_DEV_NAME")
            },
            "custom":{
                mongoUrl: Cypress.env("COMP_PLEX_DEV_DATABASE"),
                dbName: Cypress.env("COMP_PLEX_DB_DEV_NAME")
            },
            //We don't have keys for prod db yet
            "prod":{
                mongoUrl: Cypress.env("-"),
                dbName: Cypress.env("-")
            },
            "staging":{
                mongoUrl: Cypress.env("COMP_PLEX_STAGE_DATABASE"),
                dbName: Cypress.env("COMP_PLEX_DB_STAGE_NAME")
            },
            "compStage":{
                mongoUrl: Cypress.env("COMP_PLEX_STAGE_DATABASE"),
                dbName: Cypress.env("COMP_PLEX_DB_STAGE_NAME")
            }
        };
    };

}

export default new ComplexDatabaseModule();