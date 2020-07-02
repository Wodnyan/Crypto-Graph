import React, { useState, useEffect } from "react";
import CryptoChart from "./components/Chart/Chart";

function App() {
    const [cryptoData, setCryptoData] = useState<object[] | []>([]);
    const [cryptoSymbol, setCryptoSymbol] = useState<string>("BTC");
    const [currency, setCurrency] = useState<string>("USD")
    // const BITCOIN_API = "https://api.coindesk.com/v1/bpi/historical/close.json";
    const CRYPTO_API = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${cryptoSymbol}&tsym=${currency}&limit=100`;
    useEffect(() => {
        fetch(CRYPTO_API)
            .then((resp) => resp.json())
			.then(({ Data }) => {
				const historicalData = Data.Data;
				console.log(historicalData);
				setCryptoData(historicalData);
                // console.log(bpi);
                // const myData = Object.keys(bpi).map((date) => {
                //     return {
                //         price: bpi[date],
                //         date: date,
                //     };
                // });
                // setData(myData);
            });
	}, [cryptoSymbol, setCryptoSymbol]);
	function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
		setCurrency(e.target.value)
	}
    return (
        <div className="App">
        	<form>
        		<input />
        		<select value={currency} onChange={handleSelectChange}>
        			<option value="EUR">Euro</option>
        			<option value="USD">Dollar(USD)</option>
        			<option value="JPY">Yen</option>
        		</select>
        	</form>
            <CryptoChart data={cryptoData} />
        </div>
    );
}

export default App;
