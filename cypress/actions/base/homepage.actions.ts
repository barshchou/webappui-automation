import { interceptReportId, setReportId } from "../../../utils/intercept.utils";
import homepagePage from "../../pages/base/homepage.page";
import { BoweryAutomation } from "../../types/boweryAutomation.type";
import { BoweryReports } from "../../types/boweryReports.type";
import BaseActionsExt from "./base.actions.ext";
import { _DataCollectionsTitles } from "../../enums/pages_titles";

class HomepageActions extends BaseActionsExt<typeof homepagePage> {

    createReport(data: BoweryAutomation.ReportCreationData): HomepageActions {
        interceptReportId();
        if (data?.state) {
            this.clickNewReportButton()
                .clickAdvancedSearchButton()
                .clickSelectStateButton()
                .selectStateByName(data.state)
                .enterAddressToSearch(data.address)
                .enterPropertyIdentifierType(data.identifierType)
                .enterPropertyIdentifier(data.identifier)
                .clickSubmitButton()
                .pullExternalData(data.isSalesForcePull)
                .enterReportNumber(data.reportNumber)
                .checkTemplateType(data.templateValue)
                .checkIncomeType(data.incomeValue)
                .checkConclusionType(data.conclusionValue)
                .clickCreateReportButton();
        } else {
            this.clickNewReportButton()
                .enterAddressToSearch(data.address)
                .clickSubmitButton()
                .clickToSearchResultRow()
                .clickSubmitButton()
                .pullExternalData(data.isSalesForcePull)
                .enterReportNumber(data.reportNumber)
                .checkTemplateType(data.templateValue)
                .checkIncomeType(data.incomeValue)
                .checkConclusionType(data.conclusionValue)
                .clickCreateReportButton();
        }
        setReportId();
        return this;
    }

    clickNewReportButton(): HomepageActions {
        homepagePage.newReportButton.should("be.enabled").click();
        return this;
    }

    enterAddressToSearch(address: string): HomepageActions {
        homepagePage.searchAddressField.type(`${address}{enter}`).should("have.value", address);
        return this;
    }

    clickSubmitButton(): HomepageActions {
        homepagePage.submitButton.should("not.be.disabled").click({ force: true });
        return this;
    }

    clickToSearchResultRow(): HomepageActions {
        homepagePage.searchResultsRows.should("be.visible").click();
        return this;
    }

    pullExternalData(value: boolean): HomepageActions {
        homepagePage.pullExternalDataRadios.check(`${value.toString()}`);
        return this;
    }

    enterReportNumber(reportNumber: string): HomepageActions {
        homepagePage.reportNumberInput.type(reportNumber).blur().should("have.value", reportNumber);
        return this;
    }

    checkTemplateType(typeValue: string): HomepageActions {
        homepagePage.templateTypesRadios.check(typeValue);
        return this;
    }

    checkIncomeType(value: string): HomepageActions {
        homepagePage.incomeTypesRadios.check(value);
        return this;
    }


    checkConclusionType(value: string): HomepageActions {
        homepagePage.valueConclusionsRadios.check(value);
        return this;
    }

    clickCreateReportButton(): HomepageActions {
        homepagePage.createReportButton.should("not.be.disabled").click();
        this.Page.pageTitle.should("have.text", _DataCollectionsTitles.subjectPropertyData);

        return this;
    }

    enterReportNumberToSearch(number: string): HomepageActions {
        homepagePage.reportNumberSearchField.scrollIntoView().should("be.visible")
            .type(number).should("have.value", number);
        return this;
    }

    clickArchiveButton(reportNumber: string): HomepageActions {
        homepagePage.getArchiveButton(reportNumber).should("exist").click({ force:true });
        return this;
    }

    verifyThatPageIsOpened(): HomepageActions {
        homepagePage.createReportButton.should("be.visible");
        return this;
    }

    clickAdvancedSearchButton(): HomepageActions {
        homepagePage.advancedSearchButton.click();
        return this;
    }

    deleteReport(reportNumber: string): HomepageActions {
        this.verifyThatPageIsOpened()
            .enterReportNumberToSearch(reportNumber)
            .clickArchiveButton(reportNumber);
        return this;
    }

    filterReportsByReportNumber(reportNumber: string): HomepageActions {
        this.verifyThatPageIsOpened()
            .enterReportNumberToSearch(reportNumber);
        cy.intercept({ method: 'GET', url: '*report/currentUser?filters*' }).as('filtering');
        cy.wait(`@filtering`, { timeout: 10000 }).then(({ response }) => {
            expect(response.statusCode).equal(200);
            expect(response.body.totalCount).equal(1);
        });
        return this;
    }

    verifyReportStatus(status: BoweryReports.ReportStatus, reportNumber: string): HomepageActions {
        homepagePage.reportStatus(reportNumber).invoke('text').then($status => {
            expect($status).to.be.eq(status, `Report status: ${$status} doesn't correspond expected: ${status}!`);
        });
        return this;
    }

    clickSelectStateButton(): HomepageActions {
        homepagePage.selectStateButton.click();
        return this;
    }

    selectStateByName(name: string): HomepageActions {
        homepagePage.getStateByName(name).click();
        return this;
    }

    enterPropertyIdentifierType(type: string): HomepageActions {
        homepagePage.propertyIdentifierTypeInput.type(type).should("have.value", type);
        return this;
    }

    enterPropertyIdentifier(value: string): HomepageActions {
        homepagePage.propertyIdentifierInput.type(value).should("have.value", value);
        return this;
    }

    openReportByName(reportNumber: string): HomepageActions {
        homepagePage.reportNumberCells.contains(reportNumber).click({ force: true });
        return this;
    }

    clickAllReportsTab(): HomepageActions {
        homepagePage.allReportsTab.click();
        return this;
    }

}

export default new HomepageActions(homepagePage);