import React, { useEffect, useState } from "react";
import { CryptoData } from "../../interfaces";
import { netChange } from "../../_functions";

interface Props {
    cryptoSymbol: string;
    convertTo: string;
}

const CryptoInfo: React.FC<Props> = ({ cryptoSymbol, convertTo }) => {
    const [cryptoData, setCryptoData] = useState<CryptoData>({
        currentPrice: "Loading...",
        netChange: "Loading...",
    });
    const CURRENT_PRICE = `https://min-api.cryptocompare.com/data/price?fsym=${cryptoSymbol}&tsyms=${convertTo}`;
    const CRYPTO_API = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${cryptoSymbol}&tsym=${convertTo}&limit=100`;
    useEffect(() => {
        fetch(CURRENT_PRICE)
            .then((resp) => resp.json())
            .then((resp) => {
                const currentPrice =
                    Object.values<string>(resp)[0] + " " + convertTo;
                setCryptoData((prev) => ({
                    ...prev,
                    currentPrice,
                }));
            });
        return () => {};
    }, [CURRENT_PRICE, convertTo, cryptoSymbol]);

    useEffect(() => {
        fetch(CRYPTO_API)
            .then((resp) => resp.json())
            .then(({ Data }) => {
                const today: number = Data.Data[Data.Data.length - 2].close;
                const yesterday: number = Data.Data[Data.Data.length - 1].close;
                const calcNetChange = netChange(today, yesterday);
                setCryptoData((prev) => ({
                    ...prev,
                    netChange: calcNetChange,
                }));
            });
        return () => {};
    }, [CRYPTO_API, convertTo, cryptoSymbol]);
    return (
        <>
            <h1>Current price: {cryptoData.currentPrice}</h1>
            <h1>
                Change(24H):{" "}
                <span
                    style={{
                        color:
                            cryptoData.netChange[0] !== "-"
                                ? cryptoData.netChange === "Loading..."
                                    ? "black"
                                    : "green"
                                : "red",
                    }}
                >
                    {cryptoData.netChange}
                </span>
            </h1>
        </>
    );
};
export default CryptoInfo;
