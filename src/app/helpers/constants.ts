export function calculatePrice(price: number | null, sale: number | null): number | null {
    if (price !== null && sale !== null) {
        return price * (100 - sale) / 100;
    }
    return price;
}