import { ReactNode } from "react";

export default function SectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#1f2937] rounded-xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white/90">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}
