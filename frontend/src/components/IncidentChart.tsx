const data = [
  {
    name: "Public Safety",
    value: 42,
    color: "bg-red-500",
  },
  {
    name: "Road Damage",
    value: 28,
    color: "bg-yellow-500",
  },
  {
    name: "Water",
    value: 18,
    color: "bg-blue-500",
  },
  {
    name: "Garbage",
    value: 12,
    color: "bg-green-500",
  },
];

export default function IncidentChart() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="text-2xl font-bold mb-8">
        Incident Distribution
      </h2>

      <div className="space-y-6">

        {data.map((item) => (

          <div key={item.name}>

            <div className="flex justify-between mb-2">

              <span>{item.name}</span>

              <span>{item.value}%</span>

            </div>

            <div className="h-3 rounded-full bg-zinc-800">

              <div
                className={`${item.color} h-3 rounded-full`}
                style={{
                  width: `${item.value}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}