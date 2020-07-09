import React, { useState, useEffect } from "react";
//Style
import "./App.scss";
//Inteface
import { Currency, CryptoChartData } from "./interfaces";
//Data
import cryptoList from "./data/crypto.json";
import currencyList from "./data/currency.json";
//Functions
import { unixToNormalDate, toEuropeanYearFormat } from "./_functions";
//Components
import CustomSelect from "./components/CustomSelect/CustomSelect";
import CryptoChart from "./components/Chart/Chart";
import CryptoInfo from "./components/CryptoInfo/CryptoInfo";

function App() {
    const [cryptoData, setCryptoData] = useState<CryptoChartData[] | []>([]);
    const [cryptoSymbol, setCryptoSymbol] = useState<Currency>({
        name: "Bitcoin",
        code: "BTC",
    });
    const [currency, setCurrency] = useState<Currency>({
        name: "Us Dollar",
        code: "USD",
    });
    const [compare, setCompare] = useState<boolean>(false);
    const [compareCryptoSymbol, setCompareCryptoSymbol] = useState<Currency>({
        name: "Bitcoin",
        code: "BTC",
    });
    const [compareCurrency, setCompareCurrency] = useState<Currency>({
        name: "Us Dollar",
        code: "USD",
    });
    const [compareCryptoData, setCompareCryptoData] = useState<
        CryptoChartData[] | []
    >([]);
    const CRYPTO_API = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${cryptoSymbol.code}&tsym=${currency.code}&limit=100`;
    const COMPARE_CRYPTO_API = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${compareCryptoSymbol.code}&tsym=${compareCurrency.code}&limit=100`;
    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(CRYPTO_API);
            const data = await resp.json();
            const { Data } = data.Data;
            const formatedData = Data.map((crypto: any) => {
                const date = toEuropeanYearFormat(
                    unixToNormalDate(crypto.time)
                );
                return {
                    date,
                    price: crypto.close,
                };
            });
            setCryptoData(formatedData);
        };
        fetchData();
    }, [CRYPTO_API]);
    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(COMPARE_CRYPTO_API);
            const data = await resp.json();
            const { Data } = data.Data;
            const formatedData = Data.map((crypto: any) => {
                const date = toEuropeanYearFormat(
                    unixToNormalDate(crypto.time)
                );
                return {
                    date,
                    price: crypto.close,
                };
            });
            setCompareCryptoData(formatedData);
        };
        fetchData();
    }, [COMPARE_CRYPTO_API]);
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
                {compare && (
                    <>
                        <CustomSelect
                            selected={compareCryptoSymbol}
                            setSelected={setCompareCryptoSymbol}
                            optionsList={cryptoList.cryptos}
                        />
                        <CustomSelect
                            selected={compareCurrency}
                            setSelected={setCompareCurrency}
                            optionsList={currencyList.currencies}
                        />
                    </>
                )}
            </section>
            <button
                className="compare-button"
                onClick={() => setCompare((prev) => !prev)}
            >
                Compare
            </button>
            <section className="crypto">
                <CryptoChart data={cryptoData} title={cryptoSymbol.name} />
                <CryptoInfo
                    cryptoSymbol={cryptoSymbol.code}
                    convertTo={currency.code}
                />
                {compare && (
                    <>
                        <CryptoChart
                            data={compareCryptoData}
                            title={compareCryptoSymbol.name}
                        />
                        <CryptoInfo
                            cryptoSymbol={compareCryptoSymbol.code}
                            convertTo={compareCurrency.code}
                        />
                    </>
                )}
            </section>
        </div>
    );
}
export default App;
