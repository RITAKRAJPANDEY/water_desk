import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { wqiDetails } from "../services/auth.services";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { formatXaxis } from "../utils/component.util";

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
            <h2 className="text-white text-xl mb-4">WQI For {station_code}</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="time" tickFormatter={formatXaxis} minTickGap={30} stroke="#f38006" />
                    <YAxis  yAxisId="left" label={{value:'wqi', angle:-90,  position:'outsideLeft'}} stroke="#f38006" />
                    <YAxis  yAxisId="right" orientation="right" domain={[6, 9]} label={{value:'', angle:90,  position:'insideRight'}} stroke="#f38006" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#b9b6ff', borderRadius: '8px', border: 'none' }}
                        itemStyle={{ color: '#111b32' }}
                        labelStyle={{ fontWeight: 'bold', color: '#534be4' }}
                        cursor={{ stroke: '#4336c8', strokeWidth: 2 }} />
                        <Legend/>
                    <Line
                        type="linear"
                        dataKey="wqi"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="time" tickFormatter={formatXaxis} minTickGap={30} stroke="#f38006" />
                    <YAxis  yAxisId="left" label={{value:'dissolved oxygen', angle:-90,  position:'outsideLeft'}} stroke="#f38006" />
                    <YAxis  yAxisId="right" orientation="right" domain={[6, 9]} label={{value:'ph', angle:90,  position:'insideRight'}} stroke="#f38006" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#b9b6ff', borderRadius: '8px', border: 'none' }}
                        itemStyle={{ color: '#111b32' }}
                        labelStyle={{ fontWeight: 'bold', color: '#534be4' }}
                        cursor={{ stroke: '#4336c8', strokeWidth: 2 }} />
                        <Legend/>
                   
                    <Line
                        yAxisId="right"
                        type="linear"
                        dataKey="dissolved_oxygen"
                        stroke="#49bef1"
                        strokeWidth={2}
                        dot={false}
                    />
                    <Line
                        yAxisId="right"
                        type="linear"
                        dataKey="ph"
                        stroke="#3830c1"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
} 