export class CommentModel {
      id: number | null;
      userId: number | null;
      comicId: number | null;
      fullName: string | null;
      comicName: string | null;
      content: string | null;
      datePost: Date | null;
      imgComment: string | null;
      page : number;
      pageSize: number;
      searchKey: string | null;

      constructor() {
          this.id = null;
          this.userId = null;
          this.comicId = null;
          this.fullName = null;
          this.comicName = null;
          this.content = null;
          this.datePost = null;
          this.imgComment = null;
          this.page = 0;
          this.pageSize= 0;
          this.searchKey = null;
      }
}