import testData from "../../../../fixtures/not_full_reports/review_edit/introduction/QA-4464_67.fixture";
import { PreviewEdit, Final } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";


describe('Verify the "Property Rights Appraised" commentary on the Introduction page', 
    { tags:[ "@preview_edit", "@introduction" ] }, () => {
        
        beforeEach("Login, create report", () => {
            cy.stepInfo("1. Create a report");
            createReport(testData.reportCreationData);

            cy.stepInfo("2. Proceed to the Introduction page");
            _NavigationSection.navigateToIntroduction()
                .verifyProgressBarNotExist();

            PreviewEdit._Introduction.Page.SwitchEditBtn.click();
        });

        it("[QA-4464]", () => {
            cy.stepInfo(`3. Scope text and a bulleted list of the scope items as 
                        set on the Final > Scope page and verify from link page`);
            PreviewEdit._Introduction.Page.getUlTextListItem(testData.scopeOfTheAppraisal).then($li => {
                // Add text from li in array and verify with another text array
                const liText = $li.toArray().map(el => el.innerText);

                _NavigationSection.navigateToFinalScope()
                    .verifyProgressBarNotExist();

                Final._Scope.Page.itemsTextAreas.then($textarea => {
                    const textareaText = $textarea.toArray().map(el => el.innerHTML);
                    expect(textareaText).to.deep.eq(liText);
                });
            });
        });

        it("[QA-4467]", () => {
            cy.stepInfo(`3.Technical Expertise list copies the technical expertise items as set on the 
                        Final > Assumptions & Conditions page and verify from link page`);
            PreviewEdit._Introduction.Page.getUlTextListItem(testData.generalAssumptionsDiscussion).then($li => {
                // Add text from li in array and verify with another text array
                const liText = $li.toArray().map(el => el.innerText);

                _NavigationSection.navigateToAssumptionsConditions()
                    .verifyProgressBarNotExist();

                Final._AssumptionsConditions.Page.itemsGeneralAssumptionsTextarea.then($textarea => {
                    const textareaText = $textarea.toArray().map(el => el.innerHTML);
                    expect(textareaText).to.deep.eq(liText);
                });
            });
        });
    });
