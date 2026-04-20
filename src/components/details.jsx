import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { wqiDetails } from "../services/auth.services";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export default function Details() {
    const { id: station_code } = useParams();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await wqiDetails(station_code);
                // result.data is now an array of time series records
                setChartData(result.data);
            } catch (err) {
                console.error(err);
            }
        };
        if (station_code) getData();
    }, [station_code]);

    if (!chartData || chartData.length === 0) {
        return <div className="text-white p-4">Loading...</div>;
    }

    return (
        <div className="h-[400px] w-full bg-slate-900 p-4">
            <h2 className="text-white text-xl mb-4">WQI Time Series for Station {station_code}</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="id" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="wqi"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
} 