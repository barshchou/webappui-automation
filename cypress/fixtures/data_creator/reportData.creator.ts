import Enums from "../../enums/enums";

let ReportCreationData = function (address, isSalesForcePull, number, templateValue, incomeValue, conclusionValue) {
    this.address = address;
    this.isSalesForcePull = isSalesForcePull,
    this.reportNumber = number;
    this.templateValue = templateValue;
    this.incomeValue = incomeValue;
    this.conclusionValue = conclusionValue;
};

class ReportCreator {
    address: string;

    isSalesForcePull: boolean;

    reportNumber: string;

    templateValue: string;

    incomeValue: string;

    conclusionValue: string;

    setAddress(address?) {
        this.address = address ?? "462 1st Avenue, New York, USA";
        return this;
    }

    setReportNumber(testNumber: string, isSaleForcePull: BoweryReports.isSalesForcePull) {
        this.reportNumber = isSaleForcePull ? `${testNumber}` : `TestAutoReport-QA-${testNumber}`;
        return this;
    }

    setTemplateValue(templateValue?) {
        this.templateValue = templateValue ?? Enums.TEMPLATE_TYPE.FREDDIE_MAC;
        return this;
    }

    setIncomeValue(incomeValue?) {
        this.incomeValue = incomeValue ?? Enums.INCOME_TYPE.RESIDENTIAL;
        return this;
    }

    setConclusionValue(conclusionValue?: BoweryReports.ConclusionValue | string) {
        this.conclusionValue = conclusionValue ?? Enums.VALUE_CONCLUSION_TYPE.AS_IS;
        return this;
    }

    build() {
        return new
        ReportCreationData(this.address, this.isSalesForcePull, this.reportNumber, this.templateValue, this.incomeValue, this.conclusionValue);
    }

    getReportSpecificConclusionValue(conclusionValue, testNumber, isSaleForcePull = false) {
        this.isSalesForcePull = isSaleForcePull;
        return this.setReportNumber(testNumber, isSaleForcePull).setAddress().setTemplateValue().setIncomeValue()
            .setConclusionValue(conclusionValue).build();
    }

    getReportSpecificIncomeValue(incomeValue, testNumber, isSaleForcePull = false) {
        this.isSalesForcePull = isSaleForcePull;
        return this.setReportNumber(testNumber, isSaleForcePull).setAddress().setTemplateValue().setIncomeValue(incomeValue)
            .setConclusionValue().build();
    }

    getDefaultReportData(testNumber, isSaleForcePull = false) {
        this.isSalesForcePull = isSaleForcePull;
        return this.setReportNumber(testNumber, isSaleForcePull).setAddress().setIncomeValue().setTemplateValue().setConclusionValue().build();
    }

    getReportData(testNumber: string, options?: BoweryReports.ReportCreationOptions){
        this.isSalesForcePull = false;

        if(options?.incomeValue){
            this.setIncomeValue(options.incomeValue);
        }
        
        if(options?.conclusionValue){
            this.setConclusionValue(options.conclusionValue);
        }
        if(options?.isSalesForcePull){
            this.isSalesForcePull = options.isSalesForcePull;
        }
        return this.setReportNumber(testNumber, this.isSalesForcePull).setAddress().setTemplateValue().build();
    }
}

export default new ReportCreator();