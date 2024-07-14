export class LoginFormValidModel {
    validUsernameLength: boolean;
    validUsernameFormat: boolean;
    validPassLength: boolean;
    validPassFormat: boolean;
    
    constructor() {
        this.validUsernameLength = true;
        this.validUsernameFormat = true;
        this.validPassLength = true;
        this.validPassFormat = true;
    }
}