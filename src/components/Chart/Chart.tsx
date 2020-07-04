import React from "react";
import { Tooltip, LineChart, XAxis, YAxis, Line } from "recharts";

// Bitcoin 		XBT/BTC
// Ether		ETH
// Litecoin		LTC
// Ripple XRP	XRP

interface CryptoData {
    data: object[] | undefined;
}

export default function CryptoChart({ data }: CryptoData) {
    if (!data) {
        return (
            <>
                <h1>No Such Symbol</h1>
            </>
        );
    }
    return (
        <div className="chart-container">
            <h1>Bitcoin</h1>
            <LineChart
                width={700}
                height={200}
                data={data}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                {/* <CartesianGrid stroke="#f5f5f5" /> */}
                <YAxis />
                <XAxis dataKey="time" />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="close"
                    stroke="#ff7300"
                    dot={false}
                    strokeWidth={5}
                />
            </LineChart>
        </div>
    );
}
