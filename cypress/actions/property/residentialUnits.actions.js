import BaseActions from "../base/base.actions";
import residentialUnitsPage from "../../pages/property/residentialUnits.page";

class ResidentialUnitsActions extends BaseActions{
    chooseKitchenCondition(value) {
        residentialUnitsPage.kitchenConditionRadio.check(value).should("be.checked");
    }

    chooseKitchenFlooring(value) {
        residentialUnitsPage.kitchenFlooring.check(value).should("be.checked");
    }

    chooseCounterTops(value) {
        residentialUnitsPage.counterTops.check(value).should("be.checked");
    }

    chooseCabinetry(value) {
        residentialUnitsPage.cabinetry.check(value).should("be.checked");
    }

    chooseStovetops(value) {
        residentialUnitsPage.stovetops.check(value).should("be.checked");
    }

    chooseRefrigerators(value) {
        residentialUnitsPage.refrigerators.check(value).should("be.checked");
    }

    fillKitchenDescription(generalCondition, flooring, counterTops, cabinetry, stovetops, refrigerators) {
        this.chooseKitchenCondition(generalCondition);
        this.chooseKitchenFlooring(flooring);
        this.chooseCounterTops(counterTops);
        this.chooseCabinetry(cabinetry);
        this.chooseStovetops(stovetops);
        this.chooseRefrigerators(refrigerators);
    }

    verifyKitchenConditionCommentary(generalCondition, flooring, counterTops, cabinetry, stovetops, refrigerators) {
        generalCondition = generalCondition.toLowerCase();
        flooring = flooring.toLowerCase();
        counterTops = counterTops.toLowerCase();
        cabinetry = cabinetry.toLowerCase();
        stovetops = stovetops.replace("/", " ").toLowerCase();
        refrigerators = refrigerators.toLowerCase();
        residentialUnitsPage.kitchenConditionCommentary.should("have.text", `The units will feature ${generalCondition} ` +
            "quality kitchen finishes relative to typical units in similar walk-up buildings in the subject's area. " +
            `The units will contain ${flooring} flooring, ${counterTops} counter tops, ${cabinetry} cabinets, ` +
            `${stovetops} stovetops, and ${refrigerators} refrigerators.`);
    }

    chooseBathroomCondition(value) {
        residentialUnitsPage.bathroomCondition.check(value).should("be.checked");
    }

    chooseBathroomFlooring(value) {
        residentialUnitsPage.bathroomFlooring.check(value).should("be.checked");
    }

    chooseBathroomTub(value) {
        residentialUnitsPage.bathroomTub.check(value).should("be.checked");
    }

    chooseSink(value) {
        residentialUnitsPage.sink.check(value).should("be.checked");
    }

    chooseToilet(value) {
        residentialUnitsPage.toilet.check(value).should("be.checked");
    }

    fillBathroomDescription(generalCondition, flooring, tub, sink, toilet) {
        this.chooseBathroomCondition(generalCondition);
        this.chooseBathroomFlooring(flooring);
        this.chooseBathroomTub(tub);
        this.chooseSink(sink);
        this.chooseToilet(toilet);
    }

    verifyBathroomCommentary(generalCondition, flooring, tub, sink, toilet) {
        generalCondition = generalCondition.toLowerCase();
        flooring = flooring.toLowerCase();
        tub = tub.replace("/", " ").replace("-", " ").toLowerCase();
        sink = sink.replace("-", " ").toLowerCase();
        toilet = toilet.replace("-", " ").toLowerCase();
        residentialUnitsPage.bathroomConditionCommentary.should("have.text", `The units will feature ${generalCondition} ` +
            "quality bathroom finishes relative to typical units in similar walk-up buildings in the subject's area. " +
            `The units will contain ${flooring} flooring, ${tub} tubs, ${sink} sinks, and ${toilet} toilets.`);
    }

    chooseBedroomCondition(value) {
        residentialUnitsPage.bedroomCondition.check(value).should("be.checked");
    }

    chooseBedroomFlooring(value) {
        residentialUnitsPage.bedroomFlooring.check(value).should("be.checked");
    }

    chooseBedroomWalls(value) {
        residentialUnitsPage.bedroomWalls.check(value).should("be.checked");
    }

    fillBedroomDescription(condition, flooring, walls) {
        this.chooseBedroomCondition(condition);
        this.chooseBedroomFlooring(flooring);
        this.chooseBedroomWalls(walls);
    }

    verifyBedroomCommentary(condition, flooring, walls) {
        condition = condition.toLowerCase();
        flooring = flooring.toLowerCase();
        walls = walls.replace("-", " ").toLowerCase();
        residentialUnitsPage.bedroomCommentary.should("have.text", `The units will feature ${condition} quality ` +
            "bedroom finishes relative to typical units in similar walk-up buildings in the subject's area. " +
            `The units will contain ${flooring} flooring, and ${walls} walls.`);
    }

    chooseLivingRoomCondition(value) {
        residentialUnitsPage.livingRoomCondition.check(value).should("be.checked");
    }

    chooseLivingRoomFlooring(value) {
        residentialUnitsPage.livingRoomFlooring.check(value).should("be.checked");
    }

    chooseLivingRoomWalls(value) {
        residentialUnitsPage.livingRoomWalls.check(value).should("be.checked");
    }

    fillLivingRoomDescription(condition, flooring, walls) {
        this.chooseLivingRoomCondition(condition);
        this.chooseLivingRoomFlooring(flooring);
        this.chooseLivingRoomWalls(walls);
    }

    verifyLivingRoomCommentary(condition, flooring, walls) {
        condition = condition.toLowerCase();
        flooring = flooring.toLowerCase();
        walls = walls.replace("-", " ").toLowerCase();
        residentialUnitsPage.livingRoomCommentary.should("have.text", `The units will feature ${condition} quality ` +
            "living room finishes relative to typical units in similar walk-up buildings in the subject's area. " +
            `The units will contain ${flooring} flooring, and ${walls} walls.`);
    }

    enterNumberOfStairs(number) {
        residentialUnitsPage.numberOfStairsInput.clear().type(number).should("have.value", number);
    }

    chooseStairsStart(value) {
        residentialUnitsPage.stairsStart.check(value).should("be.checked");
    }

    chooseStairsEnd(value) {
        residentialUnitsPage.stairsEnd.check(value).should("be.checked");
    }

    fillStairsDescription(numberOfStairs, start, end) {
        this.enterNumberOfStairs(numberOfStairs);
        this.chooseStairsStart(start);
        this.chooseStairsEnd(end);
    }

    editStairsCommentary(newCommentary) {
        residentialUnitsPage.stairsCommentaryEditButton.click();
        residentialUnitsPage.stairsCommentaryInput.clear().type(newCommentary).should("have.text", newCommentary);
    }
}

export default new ResidentialUnitsActions();
