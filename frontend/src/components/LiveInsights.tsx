const insights = [
  "West Delhi congestion increased by 18%",
  "Illegal parking hotspot detected near Tilak Nagar",
  "Women's safety alert generated",
  "Garbage complaints reduced by 12%",
];

export default function LiveInsights() {
  return (
    <section className="max-w-6xl mx-auto px-10 mt-16">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

        <h2 className="text-3xl font-bold mb-8">
          AI Insights
        </h2>

        <div className="space-y-5">

          {insights.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-zinc-800 bg-black p-5"
            >
              {item}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}