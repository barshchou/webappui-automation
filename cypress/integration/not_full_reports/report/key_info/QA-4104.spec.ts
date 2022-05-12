import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4104.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import {_NavigationSection} from "../../../../actions/base";
import { Report, ReviewExport } from "../../../../actions";


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

        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
        .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);

        deleteReport(testData.reportCreationData.reportNumber);
    });

    // it("Check export", () => {
    //     cy.task("getFilePath", {_reportName: testData.reportCreationData.reportNumber, _docx_html: "html"}).then(file => {
    //         cy.log(<string>file);
    //         cy.stepInfo("5. Check that this sentence exports in the Introduction, replacing the boilerplate sentence currently exported there");
    //         cy.visit(<string>file);

    //         cy.contains("Definition of Market Value").next().scrollIntoView();
    //     });
    // });

    it("Check export",() => {
        cy.task("getFilePath",
        {_reportName: testData.reportCreationData.reportNumber, _docx_html: "html"}
        ).then(file => {
            cy.log(<string>file);
            cy.stepInfo(`
            2. Go to the Commercial Stabilized Rent Roll table in the export and check:
                removed the leading # column; 
                removed the decimal place for Annual Rent, represent as a whole number;
                removed the decimal place for Monthly Rent, represent as a whole number.
            `);
            cy.visit(<string>file);
            
            cy.contains("Lease Structure").prev().scrollIntoView().within(() => {
                cy.get("tr").eq(0).find("p").eq(0).should("not.have.text","#");
                
                cy.get("tr").eq(1).find("p").eq(0).invoke("attr","text").then(value => {
                    expect(Number.isInteger(Number.parseInt(value)),
                    "The value in cell is not Number"
                    ).to.be.equal(false);
                });

                cy.get("tr").eq(1).find("p").filter(':contains("$0")').then(value => {
                    value.toArray().slice(0,1).forEach(elem => {
                        expect(
                            (elem.textContent.endsWith(".00")),
                            "Not ends with decimal part"
                        ).to.be.equal(false);
                    });
                });
            });
        });
    });
    
});