import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  value: string;
}

export default function InfoCard({
  icon,
  title,
  value,
}: Props) {
  return (
    <div className="rounded-2xl bg-black border border-zinc-800 p-6">

      <div className="flex items-center gap-3 text-blue-400">

        {icon}

        <span className="font-semibold">
          {title}
        </span>

      </div>

      <h3 className="mt-5 text-3xl font-bold">
        {value}
      </h3>

    </div>
  );
}