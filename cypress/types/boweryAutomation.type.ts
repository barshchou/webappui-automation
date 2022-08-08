/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as KeyInfo from '../enums/enumKeys.enum';
import Enums from "../enums/enums";
import { BoweryReports } from './boweryReports.type';

export namespace BoweryAutomation {
    /**
     * Base data for report setup
     */
    export type BaseReportCreationData = {
        incomeValue: typeof Enums.INCOME_TYPE[KeyInfo.IncomeTypeKeys],
        address: string, 
        isSalesForcePull: boolean,
        reportNumber: string, 
        templateValue: typeof Enums.TEMPLATE_TYPE[KeyInfo.TemplateTypesKeys],
        conclusionValue: BoweryReports.ConclusionValue
    }

    /**
     * Common data for report setup
     */
    export type ReportCreationData = {
        state: string,
        identifierType: string,
        identifier: string
    } & BaseReportCreationData

    export type OrganizationCreateNewClientData = {
        prefix?: BoweryReports.OrganizationAddresseePrefix,
        title?: string,
        firstName: string,
        middleInitial?: string,
        lastName: string,
        clientSuffix?: string,
        clientCompanyName: string,
        streetAddress: string,
        city: string,
        state?: BoweryReports.OrganizationState,
        zipCode?: string | number
    };

    export type OrganizationCreateNewUserData = {
        username: string,
        roleName: BoweryAutomation.OrganizationRoles[],
        prefix?: BoweryReports.OrganizationAddresseePrefix,
        firstName: string,
        middleName?: string,
        lastName: string,
        userSuffix?: string,
        positionInOrg?: string,
        boweryOffice?: BoweryReports.BoweryOffices,
        phone?: string,
    }

    export type OrganizationRoles = typeof Enums.USER_ROLES[KeyInfo.UserRoles]
}