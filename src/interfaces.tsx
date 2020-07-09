export interface Currency {
    index?: number;
    symbol?: string;
    name: string;
    code: string;
}

export interface CryptoChartData {
    date: string;
    price: number;
}
export interface CryptoData {
    currentPrice: string;
    netChange: string;
}
