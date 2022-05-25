import { interceptReportId, setReportId } from "../../../utils/intercept.utils";
import homepagePage from "../../pages/base/homepage.page";
import BaseActionsExt from "./base.actions.ext";

class HomepageActions extends BaseActionsExt<typeof homepagePage> {

    createReport(data: BoweryAutomation.ReportCreationData): this {
        interceptReportId();
        if(data?.state) {
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
        }
        else {
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

    clickNewReportButton(): this {
        homepagePage.newReportButton.should("be.enabled").click();
        return this;
    }

    enterAddressToSearch(address: string): this {
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

    pullExternalData(value: boolean) {
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

    checkIncomeType(value: string) {
        homepagePage.incomeTypesRadios.check(value);
        return this;
    }


    checkConclusionType(value: string) {
        homepagePage.valueConclusionsRadios.check(value);
        return this;
    }

    clickCreateReportButton(): HomepageActions {
        homepagePage.createReportButton.should("not.be.disabled").click();
        homepagePage.keyInfoBlock.should("be.visible");

        return this;
    }

    enterReportNumberToSearch(number: string): HomepageActions {
        homepagePage.reportNumberSearchField.scrollIntoView().should("be.visible")
        .type(number).should("have.value", number);
        return this;
    }

    clickArchiveButton(reportNumber: string): this {
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

    deleteReport(reportNumber: string): this {
        this.verifyThatPageIsOpened()
            .enterReportNumberToSearch(reportNumber)
            .clickArchiveButton(reportNumber);
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

}

export default new HomepageActions(homepagePage);