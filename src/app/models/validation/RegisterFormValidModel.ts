export class RegisterFormValidModel {
    validUsernameLength: boolean;
    validUsernameFormat: boolean;
    validEmailFormat: boolean;
    validPhoneFormat: boolean;
    validPassFormat: boolean;
    validPassLength: boolean;
    validRePassFormat: boolean;
    validUsernameExist: boolean;
    
    constructor() {
        this.validUsernameLength = true;
        this.validUsernameFormat = true;
        this.validEmailFormat = true;
        this.validPhoneFormat = true;
        this.validPassFormat = true;
        this.validPassLength = true;
        this.validRePassFormat = true;
        this.validUsernameExist = true;
    }
}