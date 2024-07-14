export class MailModel {
    mail: string;
    subject: string;
    message: string;

    public constructor() {
        this.mail = '';
        this.subject = '';
        this.message = '';
    }
}