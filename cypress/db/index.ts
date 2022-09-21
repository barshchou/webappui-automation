/* eslint-disable no-console */
import { Filter, MongoClient } from 'mongodb';

class ComplexDatabaseModule {
    
    /**
     * Function determines url and name of comp-plex database, then  connects to database and retrieve 
     * the array (max = 10) of comps with necessary property and its value 
     * @param compProperty Comp property path in database collection
     * @param compPropertyValue Comp property value in database collection
     */
    getCompsArrayFromDb = (filter: Filter<object>) => {
        const { mongoUrl, dbName } = this.selectDatabaseSecrets();
        return cy.task('retrieveDataFromDb', { dbUrl: mongoUrl, dbName: dbName, filter });
    };
 
    /**
     * Function connects to Comp-plex database and retrieve the array (max = 10) of comps with 
     * necessary property and its value 
     * @param compPropertyPathInDB Comp property path in database collection
     * @param compPropertyValueInDB Comp property value in database collection
     */
    retrieveDataFromDb = async (url: string, dbName: string, filter: Filter<object>) => {
        const client = new MongoClient(url);
        const collectionName = "sales-transactions";
        try {
            await client.connect();
            console.log('Connected successfully to server');
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            let data = await collection.find(filter, { limit:10 }).toArray();
            return data; 
        } catch (error) {
            console.warn("Error occurred during DB connection or data retrieve");
            console.log(error);
        } finally {
            client.close();
            console.log("Disconnected from DB");
        }
    };

    /**
     * Function determines what environment was passed when test was started and returns 
     * necessary secrets for relative comp-plex database 
     */
    selectDatabaseSecrets = () => {
        cy.log(`Secrets to Comp-plex database on ${Cypress.env("url")} env are taken`);
        return this.databaseSecrets[Cypress.env("url")];
    };

    /**
     * Function returns a list of secrets for different comp-plex databases
     */
    get databaseSecrets() {
        return {
            "dev":{
                mongoUrl: Cypress.env("COMP_PLEX_DB_DEV_URL"), 
                dbName: Cypress.env("COMP_PLEX_DB_DEV_NAME")
            },
            "compDev":{
                mongoUrl: Cypress.env("COMP_PLEX_DB_DEV_URL"),
                dbName: Cypress.env("COMP_PLEX_DB_DEV_NAME")
            },
            "custom":{
                mongoUrl: Cypress.env("COMP_PLEX_DB_DEV_URL"),
                dbName: Cypress.env("COMP_PLEX_DB_DEV_NAME")
            },
            //We don't have keys for prod db yet
            "prod":{
                mongoUrl: Cypress.env("-"),
                dbName: Cypress.env("-")
            },
            "staging":{
                mongoUrl: Cypress.env("COMP_PLEX_DB_STAGE_URL"),
                dbName: Cypress.env("COMP_PLEX_DB_STAGE_NAME")
            },
            "compStage":{
                mongoUrl: Cypress.env("COMP_PLEX_DB_STAGE_URL"),
                dbName: Cypress.env("COMP_PLEX_DB_STAGE_NAME")
            }
        };
    }

}

export default new ComplexDatabaseModule();