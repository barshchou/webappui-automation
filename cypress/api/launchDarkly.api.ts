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

  private readonly baseUrl = "https://app.launchdarkly.com/api/v2/flags/";

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

  private jsonPatch(op: Operations, path: string, value?: string | object) {
    return {
      op,
      path,
      value,
    };
  }

  private baseRequest(featureFlagKey?: Utils.FeatureFlagKeysType, method: Methods = "GET", options?: object): Cypress.Chainable<Cypress.Response<any>> {
    const _url = featureFlagKey ? `${this.baseUrl}${this.projectKey}/${featureFlagKey}`
      : `${this.baseUrl}${this.projectKey}`;
    if (method === "PATCH") {
      return cy.request({
        method,
        url: `${this.baseUrl}${this.projectKey}/${featureFlagKey}`,
        headers: this.headersContent,
        body : JSON.stringify({
          patch: [ options ]
        })
      }); 
    } else {
      return cy.request({
        method,
        url: _url,
        headers: this.headersContent
      });
    }
  }

  private removeTarget(featureFlagKey: Utils.FeatureFlagKeysType, variationIndex: number): null {
    this.baseRequest(featureFlagKey, "PATCH", this.jsonPatch(
      "remove",
      `/environments/${this.environmentKey}/targets/${variationIndex}`
    ));
    return null;
  }

  getFeatureFlag(featureFlagKey?: Utils.FeatureFlagKeysType): LaunchDarkly {
    this.baseRequest(featureFlagKey).then(resp => {
      featureFlagKey ? cy.log("Feature Flag Key", resp.body) : cy.log("Feature Flags", resp.body);
    }).its("status").should("eq", 200);

    return this;
  }

  setFeatureFlagForUser(featureFlagKey: Utils.FeatureFlagKeysType, variationIndex: number, userId = this.userId): LaunchDarkly {
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

      if (existingTargetIndex === -1) {
        cy.log(`Adding feature flag ${featureFlagKey} for ${userId}`);

        this.baseRequest(featureFlagKey, "PATCH", jsonPatchObj).its("status").should("eq", 200);
      } else {
        this.baseRequest(featureFlagKey, "PATCH", jsonPatchObj).its("status").should("eq", 200);
      }
      cy.log(`Set ${featureFlagKey} feature flag`);
    });
    return this;
  }

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
    if(existingUserTarget.values.length === 1) {
      // A single user in the target, need to remove the entire target
      this.removeTarget(featureFlagKey, existingUserTargetIndex);
      // Recursively continue removing the user targets
      // since the same user can have multiple targets
      return this.removeUserTarget(featureFlagKey, userId);
    }

    const userIndex = existingUserTarget.values.indexOf(userId);

    this.baseRequest(featureFlagKey, "PATCH", this.jsonPatch(
      "remove",
      `/environments/${this.environmentKey}/targets/${existingUserTargetIndex}/values/${userIndex}`,
      userId
    )).its("status").should("eq", 200);
    
    cy.log(`User ${userId} has been deleted`);
    });
    return null;
  }

}

export default new LaunchDarkly();