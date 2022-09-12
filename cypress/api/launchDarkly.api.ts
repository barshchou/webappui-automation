/* eslint-disable @typescript-eslint/no-explicit-any */
import { Utils } from "../types/utils.type";

/**
 * @param apiKey This is a token for authorization in Launch Darkly
 * @param projectKey Project name in Launch Darkly. There are two project Bowery Valuation and Off-app activity tracker
 * @param environmentKey Environment name in Launch Darkly for requests
 */
interface IConfig {
    apiKey: string,
    projectKey: string,
    environmentKey: Utils.EnvLaunchDarklyType
}

type Methods = "GET" | "PATCH"

type Operations = "add" | "remove"

class LaunchDarkly {
    private readonly apiKey = Cypress.env("LAUNCH_DARKLY_AUTH_TOKEN");

    private readonly projectKey = Cypress.env("LAUNCH_DARKLY_PROJECT_KEY");

    private readonly baseUrl = "https://app.launchdarkly.com/api/v2/flags/";

    /*
     * @param environmentKey For Bowery Valuation there are 5 environment keys: 
     * staging, production, test, development, local
     */
    private environmentKey: Utils.EnvLaunchDarklyType = 'staging'

    private userId = Cypress.env("USERNAME");

    private readonly headersContent = {
        'content-type': 'application/json',
        Authorization: this.apiKey,
    }

    constructor(config?: IConfig) {
        if (config) {
            this.apiKey = config.apiKey;
            this.projectKey = config.projectKey;
            this.environmentKey = config.environmentKey;
        }
    }

    /**
     * Method for creating options template to pass in body patch 
     * @param op Type operation: add or remove
     * @param path Request path
     * @param value Value for patch
     * @returns object
     */
    private jsonPatch(op: Operations, path: string, value?: string | object) {
        return {
            op,
            path,
            value,
        };
    }

    /**
     * Method for creating a template for receiving a response to a flag feature request
     * @param featureFlagKey Name feature flag in style kebab-case  
     * @param method Request Method
     * @param options `jsonPatch()`
     * @returns `Cypress.Chainable<Cypress.Response<any>>`
     */
    private baseRequest(featureFlagKey?: Utils.FeatureFlagKeysType, method: Methods = "GET", 
        options?: object): Cypress.Chainable<Cypress.Response<any>> {
        const _url = featureFlagKey ? `${this.baseUrl}${this.projectKey}/${featureFlagKey}`
            : `${this.baseUrl}${this.projectKey}`;
        if (method === "PATCH") {
            return cy.request({
                method,
                url: _url,
                headers: this.headersContent,
                body : JSON.stringify({
                    patch: [ options ]
                }),
                failOnStatusCode: false
            })
                .then(resp => {
                    if (resp.status === 429) {
                        cy.log("Status code 429, repeat request");
                        this.baseRequest(featureFlagKey, method, options);
                    } else {
                        expect(resp.status).to.eq(200);
                        return;
                    }
                }); 
        } else {
            return cy.request({
                method,
                url: _url,
                headers: this.headersContent,
                failOnStatusCode: false
            }).then(resp => {
                if (resp.status === 429) {
                    cy.log("Status code 429, repeat request");
                    this.baseRequest(featureFlagKey, method, options);
                } else {
                    expect(resp.status).to.eq(200);
                    return;
                }
            }); 
        }
    }

    /**
     * Remove feature flag depending on variationIndex
     * @param featureFlagKey Name feature flag in style kebab-case
     * @param variationIndex Number feature flag variation 
     * @returns `null`
     */
    private removeTarget(featureFlagKey: Utils.FeatureFlagKeysType, variationIndex: number): null {
        this.baseRequest(featureFlagKey, "PATCH", this.jsonPatch(
            "remove",
            `/environments/${this.environmentKey}/targets/${variationIndex}`
        ));
        return null;
    }

    /**
     * Get feature flag or flags
     * @param featureFlagKey Name feature flag in style kebab-case. 
     * If passed without a parameter, it will return all feature flags
     * @returns  `this`
     */
    getFeatureFlag(featureFlagKey?: Utils.FeatureFlagKeysType): LaunchDarkly {
        this.baseRequest(featureFlagKey).then(resp => {
            featureFlagKey ? cy.log("Feature Flag Key", resp.body) : cy.log("Feature Flags", resp.body);
        });

        return this;
    }

    /**
     * Set feature flag. If the feature flag is already set, remove it and set it again 
     * @param featureFlagKey Name feature flag in style kebab-case
     * @param variationIndex Number feature flag variation 
     * @param userId User login credentials
     * @returns `this`
     */
    setFeatureFlagForUser(featureFlagKey: Utils.FeatureFlagKeysType, 
        variationIndex: number, userId = this.userId): LaunchDarkly {
        this.baseRequest(featureFlagKey).then(resp => {
            const targets = resp.body.environments[this.environmentKey].targets;
            const existingTargetIndex = targets.findIndex(target => target.variation === variationIndex);

            // Remove any existing targets for the user
            this.removeUserTarget(featureFlagKey, userId);

            const jsonPatchObj = (existingTargetIndex === -1) ? this.jsonPatch(
                "add",
                `/environments/${this.environmentKey}/targets/-`,
                {
                    variation: variationIndex,
                    values: [ userId ],
                }
            ) : this.jsonPatch(
                "add",
                `/environments/${this.environmentKey}/targets/${existingTargetIndex}/values/-`,
                userId
            );

            cy.log(`Adding feature flag ${featureFlagKey} for ${userId}`);
            this.baseRequest(featureFlagKey, "PATCH", jsonPatchObj);
        });
        return this;
    }

    /**
     * Remove the set feature flag for the user.
     * @param featureFlagKey Name feature flag in style kebab-case
     * @param userId User login credentials
     * @returns `null`
     */
    removeUserTarget(featureFlagKey: Utils.FeatureFlagKeysType, userId = this.userId): null {
        this.baseRequest(featureFlagKey).then(resp => {
            const targets = resp.body.environments[this.environmentKey].targets;
            const existingUserTargetIndex = targets.findIndex((target) =>
                target.values.includes(userId),
            );

            if (existingUserTargetIndex === -1) {
                // Nothing to remove
                return null;
            }

            const existingUserTarget = targets[existingUserTargetIndex];
            if (existingUserTarget.values.length === 1) {
                // A single user in the target, need to remove the entire target
                this.removeTarget(featureFlagKey, existingUserTargetIndex);
                /*
                 * Recursively continue removing the user targets
                 * since the same user can have multiple targets
                 */
                cy.log(`User ${userId} has been deleted`);
                return this.removeUserTarget(featureFlagKey, userId);
            }

            const userIndex = existingUserTarget.values.indexOf(userId);

            this.baseRequest(featureFlagKey, "PATCH", this.jsonPatch(
                "remove",
                `/environments/${this.environmentKey}/targets/${existingUserTargetIndex}/values/${userIndex}`,
                userId
            ));
    
            cy.log(`User ${userId} has been deleted`);
        });
        return null;
    }
}

export default new LaunchDarkly();