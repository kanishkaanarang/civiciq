import type { AnalysisResult } from "../types/analysis";

interface Props{
    result:AnalysisResult;
}

export default function OperationalForecast({result}:Props){

    const forecast=result.operational_forecast;

    return(

        <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

            <h2 className="text-3xl font-bold">

                AI Operational Forecast

            </h2>

            <p className="text-zinc-400 mt-2">

                Predicted impact if immediate action is not taken.

            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-8">

                <ForecastCard
                    title="Next 6 Hours"
                    data={forecast.next_6_hours}
                />

                <ForecastCard
                    title="Next 24 Hours"
                    data={forecast.next_24_hours}
                />

            </div>

            <div className="mt-8 rounded-2xl bg-black border border-zinc-800 p-6">

                <h3 className="text-xl font-bold">

                    AI Assessment

                </h3>

                <p className="mt-4 leading-8 text-zinc-300">

                    {forecast.ai_summary}

                </p>

            </div>

        </div>

    );

}

function ForecastCard({

    title,

    data

}:{

    title:string;

    data:any;

}){

    return(

        <div className="rounded-2xl border border-zinc-800 bg-black p-6">

            <h3 className="text-2xl font-bold mb-6">

                {title}

            </h3>

            <div className="space-y-5">

                <Row
                    label="Traffic Increase"
                    value={data.traffic_increase}
                />

                <Row
                    label="People Affected"
                    value={data.additional_people_affected}
                />

                <Row
                    label="Emergency Delay"
                    value={data.emergency_delay ?? "-"}
                />

                <Row
                    label="Risk Level"
                    value={data.risk_level}
                />

            </div>

        </div>

    );

}

function Row({

    label,

    value

}:{

    label:string;

    value:string;

}){

    return(

        <div className="flex justify-between">

            <span className="text-zinc-400">

                {label}

            </span>

            <span className="font-bold text-blue-400">

                {value}

            </span>

        </div>

    );

}