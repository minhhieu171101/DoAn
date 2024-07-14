export class StatisticComicModel {
    comicTypeName: string | null;
    totalSold: number;
    totalIncome: number;
    month: number | null;
    year: number |null;

    constructor() {
        this.comicTypeName = null;
        this.totalSold = 0;
        this.totalIncome = 0;
        this.month = null;
        this.year = null;
    }
}
