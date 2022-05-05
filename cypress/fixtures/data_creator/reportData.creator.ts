import Enums from "../../enums/enums";

let ReportCreationData = function (address, number, templateValue, incomeValue, conclusionValue) {
    this.address = address;
    this.reportNumber = number;
    this.templateValue = templateValue;
    this.incomeValue = incomeValue;
    this.conclusionValue = conclusionValue;
};

class ReportCreator {
    address: string;

    reportNumber: string;

    templateValue: string;

    incomeValue: string;

    conclusionValue: string;

    setAddress(address?) {
        this.address = address ?? "462 1st Avenue, New York, USA";
        return this;
    }

    setReportNumber(testNumber) {
        this.reportNumber = `TestAutoReport-QA-${testNumber}`;
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
        ReportCreationData(this.address, this.reportNumber, this.templateValue, this.incomeValue, this.conclusionValue);
    }

    getReportSpecificConclusionValue(conclusionValue, testNumber) {
        return this.setReportNumber(testNumber).setAddress().setTemplateValue().setIncomeValue()
            .setConclusionValue(conclusionValue).build();
    }

    getReportSpecificIncomeValue(incomeValue, testNumber) {
        return this.setReportNumber(testNumber).setAddress().setTemplateValue().setIncomeValue(incomeValue)
            .setConclusionValue().build();
    }

    getDefaultReportData(testNumber) {
        return this.setReportNumber(testNumber).setAddress().setIncomeValue().setTemplateValue().setConclusionValue().build();
    }

    getReportData(testNumber: string, options?: BoweryReports.ReportCreationOptions){

        options?.address == undefined ? this.setAddress() : this.setAddress(options.address);
        options?.templateValue == undefined ? this.setTemplateValue() : this.setTemplateValue(options.templateValue);
        options?.incomeValue == undefined ? this.setIncomeValue() : this.setIncomeValue(options.incomeValue);
        options?.conclusionValue == undefined ? this.setConclusionValue() : this.setConclusionValue(options.conclusionValue);
        
        return this.setReportNumber(testNumber).build();
    }
}

export default new ReportCreator();