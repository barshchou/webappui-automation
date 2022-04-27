import { _CommercialUnits } from './index';
import commercialUnitsPage from "../../pages/property/commercialUnits.page";
import {cutDecimalPartToNumberOfDigits, isHasDecimalPartMoreNumberOfDigits, numberWithCommas} from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

class CommercialUnitsActions extends BaseActionsExt<typeof commercialUnitsPage> {
    verifyImageHasRotated(rotateIndex: number){
        commercialUnitsPage.commercialUnitImage
        .last().invoke("attr","style").then(style => {
            expect(style).includes(`w_256,a_${90*rotateIndex}`);
        });
        return this;
    }

    /**
     *NOTE: Rotates last image
     */
    rotateImage(){
        commercialUnitsPage.iconRotateImage.last().click({force:true});
        return this;
    }

    uploadImages(imageType: "Interior Images" | "Exterior Images", pathToFile: string, inputMethod: "drag-n-drop" | "input") {
        let aliasImageUpload = "aliasImageUpload";
        cy.intercept("POST","/imageUpload").as(aliasImageUpload);
        cy.contains(imageType).next().find('input[type="file"]')
        .attachFile(pathToFile,{subjectType:inputMethod});
        cy.wait(`@${aliasImageUpload}`).then(({response}) => {
            expect(response.statusCode).equal(200);
            cy.log("imageUpload resolved");
        });
        return this;
    }

    clickCommercialUnitTabByIndex(index = 0): this {
        commercialUnitsPage.commercialUnitsTabs.eq(index).click();
        return this;
    }

    private clickRadioOrCheckbox(group: BoweryReports.CommercialUnitsGroups,
                                 value: BoweryReports.CommercialUnitGroupsValues, index = 0): this {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value, index).click();
        return this;
    }

    clickRadioButtonByValueAndUnitIndex(group: BoweryReports.CommercialUnitsGroups,
                                        value: BoweryReports.CommercialUnitGroupsValues, index = 0): this {
        this.clickRadioOrCheckbox(group, value, index)
            .verifyRadioIsChecked(group, value, index);
        if (value === "other") {
            commercialUnitsPage.getOtherFieldByGroup(group, index).should("exist")
                .should("have.attr", "required");
        }
        return this;
    }

    clickCheckboxToUncheck(group: BoweryReports.CommercialUnitsGroups, value: BoweryReports.CommercialUnitGroupsValues,
                           index = 0): this {
        this.clickRadioOrCheckbox(group, value, index)
            .verifyRadioIsNotChecked(group, value, index);
        if (value === "other") {
            commercialUnitsPage.getOtherFieldByGroup(group, index).should("not.exist");
        }
        return this;
    }

    verifyRadioIsChecked(group: BoweryReports.CommercialUnitsGroups, value: BoweryReports.CommercialUnitGroupsValues, index = 0): this {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value, index).parent().should("have.class", "Mui-checked");
        return this;
    }

    verifyRadioIsNotChecked(group: BoweryReports.CommercialUnitsGroups, value: BoweryReports.CommercialUnitGroupsValues, index = 0): this {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value, index).parent()
            .should("not.have.class", "Mui-checked");
        return this;
    }

    enterUnitSFByUnitIndex(squareFeet: number | string, index = 0): this {
        let squareFeetToBe: string | number = squareFeet;
        if (isHasDecimalPartMoreNumberOfDigits(squareFeet)) {
            squareFeetToBe = cutDecimalPartToNumberOfDigits(squareFeet);
        }
        squareFeetToBe = numberWithCommas(squareFeetToBe);
        commercialUnitsPage.commercialUnitsSFInputs.eq(index).clear().type(`${squareFeet}`)
            .should("have.value", squareFeetToBe);
        return this;
    }

    enterListUnitSF(squareFeetList: Array<number | string>, numberOfUnits: number): this {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterUnitSFByUnitIndex(squareFeetList[i], i);
        }
        return this;
    }

    verifyCommercialGrossLeasableAreaFieldIsDisabled (): this {
        commercialUnitsPage.commercialGrossLeasableAreaTextArea.should('have.attr', 'disabled');
        return this;
    }




/*

    readatrr( index = 0): this {
        cy.log( commercialUnitsPage.commercialUnitsSFInputs.eq(index).invoke('prop', 'defaultValue'))
      //  .then(defaultValue => cy.log(defaultValue));
           
        return this;
    }
*/
/*
   verifyCommercialUnitsSquareEquelToGrossLeasableAreaField (numberOfUnits: number, squareFeetList: Array<number>): this {
   this.sumAllUnitSFByUnitIndex(squareFeetList: Array<number>)


   
   }

*/

   sumAllUnitSFByUnitIndex(squareFeetList: Array<number>) {
  
    let sumOfUnitsSF = 0;
        for (let i = 0; i < squareFeetList.length; i++) {
            sumOfUnitsSF += squareFeetList[i];
        }
        return sumOfUnitsSF;
        }

  //  };
/*

        commercialUnitsPage.commercialUnitsSFInputs.invoke('value')

        commercialUnitsPage.commercialUnitsSFInputs.find('value');

invoke('val')
      .then(sometext => cy.log(sometext)));
        
    }}

*/

    sumCommercialGrossLeasableArea(squareFeetList: Array<number>): this {
        commercialUnitsPage.commercialGrossLeasableAreaTextArea.invoke('prop', 'defaultValue').should('be.equal', this.sumAllUnitSFByUnitIndex(squareFeetList))
   //   commercialUnitsPage.commercialGrossLeasableAreaTextArea.invoke('prop', 'defaultValue').then(dV => {
      //   const a= parseInt(dV)
     //    _CommercialUnits.sumAllUnitSFByUnitIndex(squareFeetList).should('be.equal', a)
    //    })
    
     // commercialUnitsPage.commercialGrossLeasableAreaTextArea.invoke('text')
      //.then(defaultValue => {defaultValue.parseInt()
 //   })
      //cy.log(@sss)
      //invoke('prop', 'defaultValue')//.then(defaultValue => return (defaultValue));
      
      return this
    //  .then(defaultValue => return (defaultValue));    parseInt('defaultValue').should('be.equal', this.sumAllUnitSFByUnitIndex(squareFeetList))
    //   return parseInt(sumCommercialGrossLeasableArea(squareFeetList));  
    }

    sumCommercialGrossLeasableArea1(): this {
      //  this.sumCommercialGrossLeasableArea()
        let a = parseInt(this.sumCommercialGrossLeasableArea())
        return this.sumCommercialGrossLeasableArea()
    }


    verifyCommercialUnitSFDiscussionTextAreaContains (): this {
        commercialUnitsPage.commercialGrossLeasableAreaTextArea.should("contain.text", text);
        return this;
    }

    verifyCommercialUnitSFDiscussionTextAreaNotContains(text: BoweryReports.CommercialUnitsUseValues): this {
        commercialUnitsPage.commercialUnitSFDiscussionTextArea.should("not.contain.text", text);
        return this;
    }

    enterOtherValueByGroupName(groupName: BoweryReports.CommercialUnitsGroups, value: string, index = 0): this {
        commercialUnitsPage.getOtherFieldByGroup(groupName, index).clear().type(value);
        this.verifyOtherValueByGroupName(groupName, value);
        return this;
    }

    verifyOtherValueByGroupName(groupName: BoweryReports.CommercialUnitsGroups, value: string, index = 0): this {
        commercialUnitsPage.getOtherFieldByGroup(groupName, index).should("have.value", value);
        return this;
    }
}

export default new CommercialUnitsActions(commercialUnitsPage);