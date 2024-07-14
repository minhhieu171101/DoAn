export class AuthModel {
    accessToken: string;
    tokenType: string;
    tokenName: string;

    constructor() {
        this.accessToken = '';
        this.tokenName = '';
        this.tokenType = "Bearer ";
    }
}