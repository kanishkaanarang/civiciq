import { FileText } from "lucide-react";

interface Props {
  title: string;
  text: string;
}

export default function Section({
  title,
  text,
}: Props) {
  return (
    <div className="mt-10">

      <div className="flex items-center gap-2 mb-4">

        <FileText size={18} />

        <h3 className="text-2xl font-bold">
          {title}
        </h3>

      </div>

      <div className="rounded-2xl border border-zinc-800 bg-black p-6 leading-8 text-zinc-300">

        {text}

      </div>

    </div>
  );
}