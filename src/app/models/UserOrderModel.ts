export class UserOrderModel {
    userId: number | null;
    userOrderId: number | null;
    comicOrders: number[];
    totalPrice: number;
    note: string | null;
    orderDate: Date | null;
    status: number | null;


    constructor() {
        this.userId = null;
        this.userOrderId = null;
        this.comicOrders = [];
        this.totalPrice = 0;
        this.note = null;
        this.orderDate = null;
        this.status = null;
    }
}