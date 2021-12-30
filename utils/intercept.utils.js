const interceptGoogleScriptsLoad = () => {
    cy.intercept({
        url: "https://maps.googleapis.com/**",
        method: "GET"
    }).as("googleScripts");
};

const waitGoogleScriptsToLoad = () => {
    cy.wait("@googleScripts", {timeout: 10000}).its("response.statusCode").should("eq", 200);
};

export const interceptGoogleScriptsAndWaitLoad = () => {
    interceptGoogleScriptsLoad();
    waitGoogleScriptsToLoad();
};