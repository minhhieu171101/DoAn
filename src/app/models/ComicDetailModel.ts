export class ComicDetailModel {
    id: number | null;
    comicName: string | null;
    authorName: string | null;
    contents: string | null;
    price: number;
    sale: number;
    residualQuantity: number;
    releaseDate: Date | null;
    imgComic: string | null;
    status: number | null;
    typeComicId: number | null;
    typeComicIds: string | null;
    typeName: string | null;

    constructor() {
        this.id = null;
        this.comicName = null;
        this.authorName = null;
        this.contents = null;
        this.price = 0;
        this.sale = 0;
        this.residualQuantity = 0;
        this.releaseDate = null;
        this.imgComic = null;
        this.status = null;
        this.typeComicId = null;
        this.typeComicIds = null;
        this.typeName = null;
    }
}
