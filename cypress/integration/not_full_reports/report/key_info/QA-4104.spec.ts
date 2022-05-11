import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4104.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import {_NavigationSection} from "../../../../actions/base";
import { Report } from "../../../../actions";


describe("[QA-4104] Verify the Market Value generated commentary", () => {

    before("Login, create report", () => {
        cy.stepInfo(`1. Create report while creating set the same Job number as report from SalesForce has (e.g. JOB-1764459005) 
            Make sure that there is no Inspection Date in the Salesforce job`);
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("2. Go to Report > Key Info > Definition of Market Value");
        _NavigationSection.navigateToReportInformation();
        Report._KeyInfo.clickYesButton();
        
        cy.stepInfo("3. Check that this sentence exports in the Introduction, replacing the boilerplate sentence currently exported there");
        Report._KeyInfo.Page.textBoxDefinitionOfMarketValue.should("include.text", testData.verifyText);

        cy.stepInfo("4. Check that there is a tooltip letting know where the text exports.");
        Report._KeyInfo.Page.iconDefinitionOfMarketValue.trigger("mouseover");
        Report._KeyInfo.Page.tooltipDefinitionOfMarketValue.should("include.text", testData.tooltipText);

        // Need add logic to verify export

        deleteReport(testData.reportCreationData.reportNumber);
    });
});