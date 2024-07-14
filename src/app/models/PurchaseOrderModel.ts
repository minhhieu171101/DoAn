export class PurchaseOrderModel {
    userId: number | null;
    userOrderId: number | null;
    fullName: string | null;
    address : string | null;
    phone : string | null;
    totalPrice: number;
    dateOrder: Date | null;
    status: number | null;
    page: number;
    pageSize: number
    username: string | null;
    searchKey: string | null;

    constructor() {
        this.userId = null;
        this.userOrderId = null;
        this.fullName = null;
        this.address = null;
        this.phone = null;
        this.totalPrice = 0;
        this.dateOrder = null;
        this.status = null;
        this.page = 0;
        this.pageSize = 0;
        this.username = null;
        this.searchKey = null;
    }
}