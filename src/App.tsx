import React, { useState, useEffect } from "react";
//Style
import "./App.scss";
//Inteface
import { currency } from "./interfaces";
//Data
import cryptoList from "./data/crypto.json";
import currencyList from "./data/currency.json";
//Components
import CustomSelect from "./components/CustomSelect/CustomSelect";
import CryptoChart from "./components/Chart/Chart";

function App() {
    const [cryptoData, setCryptoData] = useState<object[] | []>([]);
    const [cryptoSymbol, setCryptoSymbol] = useState<currency>({
        name: "Bitcoin",
        code: "BTC",
    });
    const [currency, setCurrency] = useState<currency>({
        name: "Us Dollar",
        code: "USD",
    });
    const CRYPTO_API = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${cryptoSymbol.code}&tsym=${currency.code}&limit=100`;
    useEffect(() => {
        fetch(CRYPTO_API)
            .then((resp) => resp.json())
            .then(({ Data }) => {
                console.log(Data.Data);
                const formatedData = Data.Data.map((crypto: any) => {
                    const unixToNormalDate = new Date(crypto.time * 1000);
                    const date = `${unixToNormalDate.getFullYear()}.${pushZeroToDateNumber(
                        unixToNormalDate.getMonth() + 1
                    )}.${pushZeroToDateNumber(unixToNormalDate.getDate())}`;
                    return {
                        close: crypto.close,
                        time: date,
                    };
                });
                setCryptoData(formatedData);
            });
    }, [CRYPTO_API]);
    return (
        <div className="App">
            <section className="search">
                <CustomSelect
                    selected={cryptoSymbol}
                    setSelected={setCryptoSymbol}
                    optionsList={cryptoList.cryptos}
                />
                <CustomSelect
                    selected={currency}
                    setSelected={setCurrency}
                    optionsList={currencyList.currencies}
                />
            </section>
            <CryptoChart data={cryptoData} title={cryptoSymbol.name} />
        </div>
    );
}
function pushZeroToDateNumber(number: number) {
    return number < 10 ? "0" + number.toString() : number;
}
export default App;
