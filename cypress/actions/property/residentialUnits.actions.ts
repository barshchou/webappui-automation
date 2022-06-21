import residentialUnitsPage from "../../pages/property/residentialUnits.page";
import BaseActionsExt from "../base/base.actions.ext";

class ResidentialUnitsActions extends BaseActionsExt<typeof residentialUnitsPage>{

    chooseKitchenCondition(value: string): ResidentialUnitsActions {
        residentialUnitsPage.kitchenConditionRadio.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    private verifyRadioIsChecked(value: string) {
        residentialUnitsPage.getElementToCheckRadio(value).should("exist");
    }

    chooseKitchenFlooring(value: string): ResidentialUnitsActions {
        residentialUnitsPage.kitchenFlooring.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    chooseCounterTops(value: string): ResidentialUnitsActions {
        residentialUnitsPage.counterTops.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    chooseCabinetry(value: string): ResidentialUnitsActions {
        residentialUnitsPage.cabinetry.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    chooseStovetops(value: string): ResidentialUnitsActions {
        residentialUnitsPage.stovetops.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    chooseRefrigerators(value: string): ResidentialUnitsActions {
        residentialUnitsPage.refrigerators.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    fillKitchenDescription(kitchenConditionData: Readonly<{condition: string, flooring: string,
        counterTops: string, cabinetry: string, 
        stovetops: string, refrigerators: string}>): ResidentialUnitsActions {
        this.chooseKitchenCondition(kitchenConditionData.condition)
            .chooseKitchenFlooring(kitchenConditionData.flooring)
            .chooseCounterTops(kitchenConditionData.counterTops)
            .chooseCabinetry(kitchenConditionData.cabinetry)
            .chooseStovetops(kitchenConditionData.stovetops)
            .chooseRefrigerators(kitchenConditionData.refrigerators);
        return this;
    }

    verifyKitchenConditionCommentary(bathroomConditionData: Readonly<{condition: string, flooring: string, 
        counterTops: string, cabinetry: string, 
        stovetops: string,refrigerators: string}>): ResidentialUnitsActions {
        const commentaryObject = {
            condition: bathroomConditionData.condition.toLowerCase(),
            flooring: bathroomConditionData.flooring.toLowerCase(),
            counterTops: bathroomConditionData.counterTops.toLowerCase(),
            cabinetry: bathroomConditionData.cabinetry.toLowerCase(),
            stovetops: bathroomConditionData.stovetops.replace("/", " ").toLowerCase(),
            refrigerators: bathroomConditionData.refrigerators.toLowerCase()
        };
        residentialUnitsPage.kitchenConditionCommentary.should("have.text",
            this.getKitchenConditionCommentary(commentaryObject));
        return this;
    }

     private getKitchenConditionCommentary(bathroomConditionData: {condition: string, flooring: string,
        counterTops: string, cabinetry: string, stovetops: string, refrigerators: string}): string {
        return `The units will feature ${bathroomConditionData.condition} ` +
            "quality kitchen finishes relative to typical units in similar walk-up buildings in the subject's area. " +
            `The units will contain ${bathroomConditionData.flooring} flooring, ${bathroomConditionData.counterTops} ` +
            `counter tops, ${bathroomConditionData.cabinetry} cabinets, ${bathroomConditionData.stovetops} stovetops,` +
            ` and ${bathroomConditionData.refrigerators} refrigerators.`;
    }

    chooseBathroomCondition(value: string): ResidentialUnitsActions {
        residentialUnitsPage.bathroomCondition.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    chooseBathroomFlooring(value: string): ResidentialUnitsActions {
        residentialUnitsPage.bathroomFlooring.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    chooseBathroomTub(value: string): ResidentialUnitsActions {
        residentialUnitsPage.bathroomTub.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    chooseSink(value: string): ResidentialUnitsActions {
        residentialUnitsPage.sink.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    chooseToilet(value: string): ResidentialUnitsActions {
        residentialUnitsPage.toilet.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    fillBathroomDescription(bathroomConditionData: Readonly<{condition: string, flooring: string, 
        tub: string, sink: string, toilet: string}>): ResidentialUnitsActions {
        this.chooseBathroomCondition(bathroomConditionData.condition)
            .chooseBathroomFlooring(bathroomConditionData.flooring)
            .chooseBathroomTub(bathroomConditionData.tub)
            .chooseSink(bathroomConditionData.sink)
            .chooseToilet(bathroomConditionData.toilet);
        return this;
    }

    verifyBathroomCommentary(bathroomConditionData: Readonly<{condition: string, flooring: string, 
        tub: string, sink: string, toilet: string}>): ResidentialUnitsActions {
        const commentaryObject = {
            condition: bathroomConditionData.condition.toLowerCase(),
            flooring: bathroomConditionData.flooring.toLowerCase(),
            tub: bathroomConditionData.tub.replace("/", " ").replace("-", " ").toLowerCase(),
            sink: bathroomConditionData.sink.replace("-", " ").toLowerCase(),
            toilet: bathroomConditionData.toilet.replace("-", " ").toLowerCase()
        };
        residentialUnitsPage.bathroomConditionCommentary.should("have.text",
            this.getBathroomCommentary(commentaryObject));
        return this;
    }

   
    private getBathroomCommentary(bathroomConditionData: {condition: string, flooring: string, tub: string, sink: string, toilet: string}): string {
        return `The units will feature ${bathroomConditionData.condition} quality bathroom finishes relative to typical ` +
            `units in similar walk-up buildings in the subject's area. The units will contain ${bathroomConditionData.flooring} flooring,` +
            ` ${bathroomConditionData.tub} tubs, ${bathroomConditionData.sink} sinks, and ${bathroomConditionData.toilet} toilets.`;
    }

    chooseBedroomCondition(value: string): ResidentialUnitsActions {
        residentialUnitsPage.bedroomCondition.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    chooseBedroomFlooring(value: string): ResidentialUnitsActions {
        residentialUnitsPage.bedroomFlooring.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    chooseBedroomWalls(value: string): ResidentialUnitsActions {
        residentialUnitsPage.bedroomWalls.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    fillBedroomDescription(bedroomConditionData: Readonly<{condition: string, flooring: string, walls: string}>): ResidentialUnitsActions {
        this.chooseBedroomCondition(bedroomConditionData.condition)
            .chooseBedroomFlooring(bedroomConditionData.flooring)
            .chooseBedroomWalls(bedroomConditionData.walls);
        return this;
    }

    verifyBedroomCommentary(bedroomConditionData: Readonly<{condition: string, flooring: string, walls: string}>): ResidentialUnitsActions {
        const commentaryObject = {
            condition: bedroomConditionData.condition.toLowerCase(),
            flooring: bedroomConditionData.flooring.toLowerCase(),
            walls: bedroomConditionData.walls.replace("-", " ").toLowerCase()
        };
        residentialUnitsPage.bedroomCommentary.should("have.text", this.getBedroomCommentary(commentaryObject));
        return this;
    }

    private getBedroomCommentary(bedroomConditionData: {condition: string, flooring: string, walls: string}): string {
        return `The units will feature ${bedroomConditionData.condition} quality ` +
            "bedroom finishes relative to typical units in similar walk-up buildings in the subject's area. " +
            `The units will contain ${bedroomConditionData.flooring} flooring, and ${bedroomConditionData.walls} walls.`;
    }

    chooseLivingRoomCondition(value: string): ResidentialUnitsActions {
        residentialUnitsPage.livingRoomCondition.check(value);
        this.verifyRadioIsChecked(value);
        return  this;
    }

    chooseLivingRoomFlooring(value: string): ResidentialUnitsActions {
        residentialUnitsPage.livingRoomFlooring.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    chooseLivingRoomWalls(value: string): ResidentialUnitsActions {
        residentialUnitsPage.livingRoomWalls.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    fillLivingRoomDescription(livingRoomConditionData: Readonly<{condition: string, flooring: string, walls: string}>): ResidentialUnitsActions {
        this.chooseLivingRoomCondition(livingRoomConditionData.condition)
            .chooseLivingRoomFlooring(livingRoomConditionData.flooring)
            .chooseLivingRoomWalls(livingRoomConditionData.walls);
        return this;
    }

    verifyLivingRoomCommentary(livingRoomCondition: Readonly<{condition: string, flooring: string, walls: string}>): ResidentialUnitsActions {
        const commentaryObject = {
            condition: livingRoomCondition.condition.toLowerCase(),
            flooring: livingRoomCondition.flooring.toLowerCase(),
            walls: livingRoomCondition.walls.replace("-", " ").toLowerCase()
        };
        residentialUnitsPage.livingRoomCommentary.should("have.text", this.getLivingRoomCommentary(commentaryObject));
        return this;
    }

    private getLivingRoomCommentary(livingRoomCondition: {condition: string, flooring: string, walls: string}): string {
        return `The units will feature ${livingRoomCondition.condition} quality ` +
            "living room finishes relative to typical units in similar walk-up buildings in the subject's area. " +
            `The units will contain ${livingRoomCondition.flooring} flooring, and ${livingRoomCondition.walls} walls.`;
    }

    enterNumberOfStairs(number: number | string): ResidentialUnitsActions {
        residentialUnitsPage.numberOfStairsInput.clear().type(`${number}`).should("have.value", number);
        return this;
    }

    chooseStairsStart(value: string): ResidentialUnitsActions {
        residentialUnitsPage.stairsStart.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    chooseStairsEnd(value: string): ResidentialUnitsActions {
        residentialUnitsPage.stairsEnd.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    fillStairsDescription(stairsData: Readonly<{numberOfStairs: string | number, stairsStart: string, stairsEnd: string}>): ResidentialUnitsActions {
        this.enterNumberOfStairs(stairsData.numberOfStairs)
            .chooseStairsStart(stairsData.stairsStart)
            .chooseStairsEnd(stairsData.stairsEnd);
        return this;
    }

    editStairsCommentary(newCommentary: string): ResidentialUnitsActions {
        residentialUnitsPage.stairsCommentaryEditButton.click();
        residentialUnitsPage.stairsCommentaryInput.clear().type(newCommentary).should("have.text", newCommentary);
        return this;
    }
}

export default new ResidentialUnitsActions(residentialUnitsPage);
