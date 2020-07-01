import React, { useState, useEffect } from "react";
import {
	Tooltip,
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Line,
} from "recharts";

function App() {
	const BITCOIN_API = "https://api.coindesk.com/v1/bpi/historical/close.json";
	const [data, setData] = useState<object[] | []>([]);
	useEffect(() => {
		fetch(BITCOIN_API)
			.then((resp) => resp.json())
			.then(({ bpi }) => {
				console.log(bpi);
				const myData = Object.keys(bpi).map((date) => {
					return {
						price: bpi[date],
						date: date,
					};
				});
				setData(myData);
			});
	}, []);
	return (
		<div className="App">
			<h1>Bitcoin</h1>
			<LineChart
				width={400}
				height={200}
				data={data}
				margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
			>
				{/* <CartesianGrid stroke="#f5f5f5" /> */}
				<YAxis />
				<XAxis dataKey="date" />
				<Tooltip />
				<Line
					type="monotone"
					dataKey="price"
					stroke="#ff7300"
					dot={false}
					strokeWidth={5}
				/>
			</LineChart>
		</div>
	);
}

export default App;
