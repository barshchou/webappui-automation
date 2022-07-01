/* eslint-disable @typescript-eslint/no-explicit-any */
import { Utils } from "../types/utils.type";

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

  private jsonPatch(op: Operations, path: string, value: string | object) {
    return {
      op,
      path,
      value,
    };
  }

  private baseRequest(featureFlagKey: Utils.FeatureFlagKeysType, method: Methods = "GET", options?: object): Cypress.Chainable<Cypress.Response<any>> {
    if (method === "PATCH") {
      return cy.request({
        method,
        url: `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}/${featureFlagKey}`,
        headers: this.headersContent,
        body : JSON.stringify({
          patch: [ options ]
        })
      }); 
    } else {
      return cy.request({
        method,
        url: `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}/${featureFlagKey}`,
        headers: this.headersContent
      });
    }
 
  }

  getFeatureFlag(featureFlagKey?: Utils.FeatureFlagKeysType): LaunchDarkly {
    const _url = featureFlagKey ? `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}/${featureFlagKey}`
      : `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}`;
    cy.request({
      method: "GET",
      url: _url,
      headers: this.headersContent
    }).then(resp => {
      featureFlagKey ? cy.log("Feature Flag Key", resp.body) : cy.log("Feature Flags", resp.body);
    }).its("status").should("eq", 200);

    return this;
  }

  setFeatureFlagForUser(featureFlagKey: Utils.FeatureFlagKeysType, variationIndex: number, userId = this.userId): LaunchDarkly {
    this.baseRequest(featureFlagKey).then(resp => {
      const targets = resp.body.environments[this.environmentKey].targets;
      const existingTargetIndex = targets.findIndex(target => target.variation === variationIndex);
      if (existingTargetIndex === -1) {
        cy.log(`Adding feature flag ${featureFlagKey} for ${userId}`);

        this.baseRequest(featureFlagKey, "PATCH", this.jsonPatch(
          "add",
          `/environments/${this.environmentKey}/targets/-`,
          {
            variation: variationIndex,
            values: [ userId ],
          },
        )).its("status").should("eq", 200);
      } else {
        this.baseRequest(featureFlagKey, "PATCH", this.jsonPatch(
          "add",
          `/environments/${this.environmentKey}/targets/${existingTargetIndex}/values/-`,
          userId
        )).its("status").should("eq", 200);
      }
      cy.log(`Set ${featureFlagKey} feature flag`);
    });
    return this;
  }

  removeUserTarget(featureFlagKey: Utils.FeatureFlagKeysType, variationIndex: number, userId = this.userId): LaunchDarkly {
    this.baseRequest(featureFlagKey).then(resp => {
        const targets = resp.body.environments[this.environmentKey].targets.map(el => el.values)[variationIndex];
        const userIndex = targets.indexOf(userId);

        if (userIndex === -1) {
          // Nothing to remove
          return null;
        }

        this.baseRequest(featureFlagKey, "PATCH", this.jsonPatch(
          "remove",
          `/environments/${this.environmentKey}/targets/${variationIndex}/values/${userIndex}`,
          userId
        )).its("status").should("eq", 200);
        
        cy.log(`User ${userId} has been deleted`);
    });
    return this;
  }

}

export default new LaunchDarkly();