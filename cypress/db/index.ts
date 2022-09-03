import { Alias } from './../utils/alias.utils';
import { MongoClient } from 'mongodb';


export  function  getDataFromDb (filterPath: string, filterValue: string)  {
    //  Connection URL
    const url =  determinePassedEnv().passedEnv; 
    cy.log(url);

    // Database Name
    const dbName = determinePassedEnv().passedDbName;
    cy.log(dbName);
    
    cy.task('retrieveDataFromDb', { url: url, dbName: dbName, 
        filterPath: filterPath, filterValue: filterValue }).then(data => {
        cy.log(<string>data);
        cy.wrap(data).as('compAlias');
    });
    return getDataFromDb;
}


const retrieveDataFromDb = async (url: string, dbName: string, filterPath: string, filterValue: string) => {
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

export function determinePassedEnv () {
    let passedEnv: string;
    let passedDbName: string;
    switch (Cypress.env("url")) {
        case "dev":
            cy.log("dev");
            passedEnv = Cypress.env("COMP_PLEX_DEV_DATABASE"); 
            passedDbName = Cypress.env("COMP_PLEX_DB_DEV_NAME"); 
            break;
        case "compDev":
            cy.log("compDev");
            passedEnv = Cypress.env("COMP_PLEX_DEV_DATABASE"); 
            passedDbName = Cypress.env("COMP_PLEX_DB_DEV_NAME"); 
            break;
        case "custom":
            cy.log("dev");
            //Keys may be different
            passedEnv = Cypress.env("COMP_PLEX_DEV_DATABASE"); 
            passedDbName = Cypress.env("COMP_PLEX_DB_DEV_NAME"); 
            break;
        case "prod":
            cy.log("prod");
            //We don't have keys for prod db
            passedEnv = Cypress.env("???"); 
            passedDbName = Cypress.env("???"); 
            break;
        case "stage":
            cy.log("stage");
            passedEnv = Cypress.env("COMP_PLEX_STAGE_DATABASE"); 
            passedDbName = Cypress.env("COMP_PLEX_DB_STAGE_NAME"); 
            break;
        case "compStage":
            cy.log("compStage");
            passedEnv = Cypress.env("COMP_PLEX_STAGE_DATABASE"); 
            passedDbName = Cypress.env("COMP_PLEX_DB_STAGE_NAME"); 
            break;
        default:
            cy.log("stage");
            passedEnv = Cypress.env("COMP_PLEX_STAGE_DATABASE"); 
            passedDbName = Cypress.env("COMP_PLEX_DB_STAGE_NAME"); 
    }
    return { passedEnv, passedDbName };
}



export default {
    getDataFromDb,
    retrieveDataFromDb
};
 