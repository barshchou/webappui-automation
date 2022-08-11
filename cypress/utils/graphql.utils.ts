import { CyHttpMessages } from "cypress/types/net-stubbing";
import { _gqlAlias } from "./alias.utils";

/* eslint-disable no-prototype-builtins */
/**
 * Utility to match GraphQL requests based on the operation name
 */
export const hasOperationName = (req: CyHttpMessages.IncomingHttpRequest, operationName: string) => {
    const { body } = req;
    return (
        body.hasOwnProperty('operationName') && body.operationName === operationName
    );
};
  
/**
 * Alias query if operationName matches
 */
export const aliasQuery = (req: CyHttpMessages.IncomingHttpRequest, operationName: string) => {
    if (hasOperationName(req, operationName)) {
        req.alias = _gqlAlias(operationName);
    }
};