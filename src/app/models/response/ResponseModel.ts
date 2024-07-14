export class ResponseModel<T> {
    status: string | null;
    data: T | null;
    message: string | undefined;

    constructor() {
        this.status = null;
        this.data = null;
        this.message = undefined;
    }
}