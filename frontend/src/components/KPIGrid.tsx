const stats = [
  {
    title: "City Health",
    value: "84%",
    color: "text-green-400",
  },
  {
    title: "Critical Incidents",
    value: "12",
    color: "text-red-400",
  },
  {
    title: "Pending Reports",
    value: "31",
    color: "text-yellow-400",
  },
  {
    title: "Resolved Today",
    value: "184",
    color: "text-blue-400",
  },
];

export default function KPIGrid() {
  return (
    <section className="max-w-6xl mx-auto px-10 mt-20">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map((stat) => (

          <div
            key={stat.title}
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 hover:border-blue-600 transition"
          >

            <p className="text-zinc-400">
              {stat.title}
            </p>

            <h1 className={`mt-5 text-5xl font-bold ${stat.color}`}>
              {stat.value}
            </h1>

          </div>

        ))}

      </div>

    </section>
  );
}