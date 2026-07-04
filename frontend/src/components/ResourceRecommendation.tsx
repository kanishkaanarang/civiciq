import type { AnalysisResult } from "../types/analysis";

interface Props{

    result:AnalysisResult;

}

export default function ResourceRecommendation({result}:Props){

    const r=result.resource_recommendation;

    return(

        <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

            <h2 className="text-3xl font-bold mb-8">

                AI Resource Recommendation

            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <Card
                title="Police Officers"
                value={String(r.police_officers)}
                />

                <Card
                title="Traffic Marshals"
                value={String(r.traffic_marshals)}
                />

                <Card
                title="Tow Trucks"
                value={String(r.tow_trucks)}
                />

                <Card
                title="Ambulances"
                value={String(r.ambulances)}
                />

                <Card
                title="Barricades"
                value={String(r.barricades)}
                />

                <Card
                title="Estimated Cost"
                value={r.estimated_cost}
                />

            </div>

            <div className="mt-8 rounded-2xl bg-black border border-zinc-800 p-6">

                <h3 className="text-xl font-bold">

                    AI Justification

                </h3>

                <p className="mt-4 leading-8 text-zinc-300">

                    {r.justification}

                </p>

            </div>

        </div>

    )

}

function Card({

    title,

    value

}:{

    title:string;

    value:string;

}){

    return(

        <div className="rounded-2xl bg-black border border-zinc-800 p-6">

            <p className="text-zinc-400">

                {title}

            </p>

            <h3 className="mt-4 text-4xl font-bold text-blue-400">

                {value}

            </h3>

        </div>

    )

}