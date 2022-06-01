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

    clickSubmitButton(): this {
        homepagePage.submitButton.should("not.be.disabled").click({ force: true });
        return this;
    }

    clickToSearchResultRow(): this {
        homepagePage.searchResultsRows.should("be.visible").click();
        return this;
    }

    pullExternalData(value: boolean): this {
        homepagePage.pullExternalDataRadios.check(`${value.toString()}`);
        return this;
    }

    enterReportNumber(reportNumber: string): this {
        homepagePage.reportNumberInput.type(reportNumber).blur().should("have.value", reportNumber);
        return this;
    }

    checkTemplateType(typeValue: string): this {
        homepagePage.templateTypesRadios.check(typeValue);
        return this;
    }

    checkIncomeType(value: string): this {
        homepagePage.incomeTypesRadios.check(value);
        return this;
    }


    checkConclusionType(value: string): this {
        homepagePage.valueConclusionsRadios.check(value);
        return this;
    }

    clickCreateReportButton(): this {
        homepagePage.createReportButton.should("not.be.disabled").click();
        homepagePage.keyInfoBlock.should("be.visible");

        return this;
    }

    enterReportNumberToSearch(number: string): this {
        homepagePage.reportNumberSearchField.scrollIntoView().should("be.visible")
        .type(number).should("have.value", number);
        return this;
    }

    clickArchiveButton(reportNumber: string): this {
        homepagePage.getArchiveButton(reportNumber).should("exist").click({ force:true });
        return this;
    }

    verifyThatPageIsOpened(): this {
        homepagePage.createReportButton.should("be.visible");
        return this;
    }

    clickAdvancedSearchButton(): this {
        homepagePage.advancedSearchButton.click();
        return this;
    }

    deleteReport(reportNumber: string): this {
        this.verifyThatPageIsOpened()
            .enterReportNumberToSearch(reportNumber)
            .clickArchiveButton(reportNumber);
        return this;
    }

    clickSelectStateButton(): this {
        homepagePage.selectStateButton.click();
        return this;
    }

    selectStateByName(name: string): this {
        homepagePage.getStateByName(name).click();
        return this;
    }

    enterPropertyIdentifierType(type: string): this {
        homepagePage.propertyIdentifierTypeInput.type(type).should("have.value", type);
        return this;
    }

    enterPropertyIdentifier(value: string): this {
        homepagePage.propertyIdentifierInput.type(value).should("have.value", value);
        return this;
    }

    openReportByName(reportNumber: string): this {
        homepagePage.reportNumberCells.contains(reportNumber).click({ force: true });
        return this;
    }

    clickAllReportsTab(): this {
        homepagePage.allReportsTab.click();
        return this;
    }

}

export default new HomepageActions(homepagePage);