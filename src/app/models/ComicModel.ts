export class ComicModel {
    id: number | null;
    comicName: string | null;
    authorName: string | null;
    contents: string | null;
    price: number | null;
    sale: number | null;
    residualQuantity: number | null;
    imgComic: string | null;
    page: number;
    pageSize: number;
    typeComicId: number | null;
    typeName: string | null;
    releaseDate: Date | null| string;
    file: File | null;
    searchKey: string | null;

    constructor() {
        this.id = null;
        this.comicName = null;
        this.authorName = null;
        this.contents = null;
        this.price = null;
        this.sale = null;
        this.residualQuantity = null;
        this.imgComic = null;
        this.page = 0;
        this.pageSize = 10;
        this.typeComicId = null;
        this.typeName = null;
        this.releaseDate = null;
        this.file = null;
        this.searchKey = null;
    }
}
