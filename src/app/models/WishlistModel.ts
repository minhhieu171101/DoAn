export class WishlistModel {
    id: number | null;
    comicId: number | null;
    createdBy: number | null;
    comicName: string | null;
    typeComicName: string | null;
    contents: string | null;
    comicImg: string | null;
    username: string | null;
    authorName: string | null;
    page: number;
    pageSize: number;


    constructor() {
        this.id = null;
        this.comicId = null;
        this.createdBy = null;
        this.comicName = null;
        this.typeComicName = null;
        this.contents = null;
        this.comicImg = null;
        this.username =null;
        this.authorName = null;
        this.page = 0;
        this.pageSize = 0;
    }
}