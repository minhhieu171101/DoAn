export class ComicOrderModel {
    userId: number | null;
    comicId: number | null;
    comicOrderId: number | null;
    comicName: string | null;
    imgComic: string | null;
    quantity: number;
    totalPrice: number;
    typeName: string | null;
    status: number;

    constructor() {
        this.userId = null;
        this.comicId = null;
        this.comicOrderId = null;
        this.comicName = null;
        this.imgComic = null;
        this.quantity = 0;
        this.totalPrice = 0;
        this.typeName = null;
        this.status = 0;
    }
}