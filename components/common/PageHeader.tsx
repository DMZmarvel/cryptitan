import { ReactNode } from "react";

export default function PageHeader({
  title,
  path = "Main",
  current,
  extra,
}: {
  title: string;
  path?: string;
  current?: string;
  extra?: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-white">
          {title}
        </h1>
        <div className="text-sm text-gray-400">
          {path} <span className="mx-1">›</span>{" "}
          <span className="text-white">{current || title}</span>
        </div>
      </div>
      {extra && <div className="mt-3 md:mt-0">{extra}</div>}
    </div>
  );
}
