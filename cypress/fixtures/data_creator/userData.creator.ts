import enums from "../../enums/enums";
import { BoweryAutomation } from "../../types/boweryAutomation.type";
import { BoweryReports } from "../../types/boweryReports.type";

let UserCreationData = function (username: string, roleName: BoweryAutomation.OrganizationRoles[], 
    prefix: BoweryReports.OrganizationAddresseePrefix, firstName: string, middleName: string,
    lastName: string, userSuffix: string, positionInOrg: string, 
    boweryOffice: BoweryReports.BoweryOffices, phone: string) {
        
    this.username = username;
    this.roleName = roleName;
    this.prefix = prefix;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.userSuffix = userSuffix;
    this.positionInOrg = positionInOrg;
    this.boweryOffice = boweryOffice;
    this.phone = phone;
};

class UserCreator {

    username: string

    roleName: BoweryAutomation.OrganizationRoles[]

    prefix?: BoweryReports.OrganizationAddresseePrefix

    firstName: string

    middleName?: string

    lastName: string

    userSuffix?: string

    positionInOrg?: string

    boweryOffice?: BoweryReports.BoweryOffices
    
    phone?: string

    setUsername(username?: string) {
        this.username = username ?? "test.username@boweryvaluation.com";
        return this;
    }

    setRoleName(roleName?: BoweryAutomation.OrganizationRoles[]) {
        this.roleName = roleName ?? [ enums.USER_ROLES.appraiser ];
        return this;
    }

    setPrefix(prefix?: BoweryReports.OrganizationAddresseePrefix) {
        this.prefix = prefix ?? enums.ORGANIZATION_ADDRESSEE_PREFIX.mr;
        return this;
    }

    setFirstName(firstName?: string) {
        this.firstName = firstName ?? "DummyTestUser";
        return this;
    }

    setMiddleName(middleName?: string) {
        this.middleName = middleName ?? " ";
        return this;
    }

    setLastName(lastName?: string) {
        this.lastName = lastName ?? "LastNameTest";
        return this;
    }

    setUserSuffix(userSuffix?: string) {
        this.userSuffix = userSuffix ?? "Pre";
        return this;
    }

    setPositionInOrg(positionToOrg?: string) {
        this.positionInOrg = positionToOrg ?? "Engineer";
        return this;
    }

    setBoweryOffice(boweryOffice?: BoweryReports.BoweryOffices) {
        this.boweryOffice = boweryOffice ?? enums.BOWERY_OFFICES.miami;
        return this;
    }

    setPhone(phone?: string) {
        this.phone = phone ?? "555-BETTER-CALL-SAUL";
        return this;
    }

    build() {
        return new
        UserCreationData(this.username, this.roleName, this.prefix, this.firstName,
            this.middleName, this.lastName, this.userSuffix, this.positionInOrg, 
            this.boweryOffice, this.phone);
    }

    getDefaultUserData() {
        return this.setUsername()
            .setRoleName()
            .setPrefix()
            .setFirstName()
            .setMiddleName()
            .setLastName()
            .setUserSuffix()
            .setPositionInOrg()
            .setBoweryOffice()
            .setPhone()
            .build();
    }

    getUserData(options?: BoweryAutomation.OrganizationCreateNewUserData) {
        options?.username == undefined 
            ? this.setUsername() 
            : this.setUsername(options.username);
        options?.roleName == undefined 
            ? this.setRoleName() 
            : this.setRoleName(options.roleName);
        options?.prefix == undefined 
            ? this.setPrefix() 
            : this.setPrefix(options.prefix);
        options?.firstName == undefined 
            ? this.setFirstName() 
            : this.setFirstName(options.firstName);
        options?.middleName == undefined 
            ? this.setMiddleName() 
            : this.setMiddleName(options.middleName);
        options?.lastName == undefined 
            ? this.setLastName() 
            : this.setLastName(options.lastName);
        options?.userSuffix == undefined 
            ? this.setUserSuffix() 
            : this.setUserSuffix(options.userSuffix);
        options?.positionInOrg == undefined 
            ? this.setPositionInOrg() 
            : this.setPositionInOrg(options.positionInOrg);
        options?.boweryOffice == undefined 
            ? this.setBoweryOffice() 
            : this.setBoweryOffice(options.boweryOffice);
        options?.phone == undefined 
            ? this.setPhone() 
            : this.setPhone(options.phone);
        return this.build();
    }
}

export default new UserCreator();