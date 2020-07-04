import React, { useState, useEffect } from "react";
import { currency } from "./interfaces";
import CustomSelect from "./components/CustomSelect/CustomSelect";
import CryptoChart from "./components/Chart/Chart";

function App() {
    const [cryptoData, setCryptoData] = useState<object[] | []>([]);
    const [cryptoSymbol, setCryptoSymbol] = useState<currency>({
        name: "Bitcoin",
        code: "BTC",
    });
    const [currency, setCurrency] = useState<currency>({
        name: "Dollar",
        code: "USD",
    });
    const symbolList = [
        {
            index: 0,
            name: "Bitcoin",
            code: "BTC",
        },
        {
            index: 1,
            name: "Etherium",
            code: "ETH",
        },
        {
            index: 2,
            name: "404",
            code: "404",
        },
    ];
    const currencyList = [
        {
            index: 0,
            name: "Yen",
            code: "JPY",
        },
        {
            index: 1,
            name: "Dollar",
            code: "USD",
        },
        {
            index: 2,
            name: "Euro",
            code: "EUR",
        },
    ];
    const CRYPTO_API = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${cryptoSymbol.code}&tsym=${currency.code}&limit=100`;
    useEffect(() => {
        fetch(CRYPTO_API)
            .then((resp) => resp.json())
            .then(({ Data }) => {
                console.log(Data.Data);
                setCryptoData(Data.Data);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cryptoSymbol, currency]);
    return (
        <div className="App">
            <CustomSelect
                selected={cryptoSymbol}
                setSelected={setCryptoSymbol}
                optionsList={symbolList}
            />
            <CustomSelect
                selected={currency}
                setSelected={setCurrency}
                optionsList={currencyList}
            />
            <CryptoChart data={cryptoData} />
        </div>
    );
}

export default App;
