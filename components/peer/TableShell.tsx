// components/peer/TableShell.tsx
import { ReactNode } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type TableShellProps = {
  title?: ReactNode;
  head: string[];
  children?: React.ReactNode;
  rowsLabel?: string;
  className?: string;
  /** Optional: rows rendered as cards on small screens */
  mobileRows?: Array<Record<string, ReactNode>>;
};

export default function TableShell({
  title,
  head,
  children,
  rowsLabel = "No rows",
  mobileRows,
  className = "",
}: TableShellProps) {
  const hasRows =
    (!!children && (Array.isArray(children) ? children.length > 0 : true)) ||
    (mobileRows && mobileRows.length > 0);

  return (
    <div className={`bg-[#1f2937] rounded-xl overflow-hidden ${className}`}>
      {title && (
        <div className="px-4 py-3 border-b border-white/10">{title}</div>
      )}

      {/* Desktop / tablet table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full min-w-[880px] text-sm text-gray-200">
          <thead className="text-left text-gray-400 bg-white/5 sticky top-0 z-10">
            <tr>
              {head.map((h, i) => (
                <th key={i} className="py-2 px-4 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {children ? (
              children
            ) : (
              <tr>
                <td colSpan={head.length} className="py-12">
                  <div className="mx-4 rounded-lg bg-[#111827] h-20 flex items-center justify-center text-gray-400">
                    {rowsLabel}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="block sm:hidden p-3">
        {!hasRows ? (
          <div className="rounded-lg bg-[#111827] h-20 flex items-center justify-center text-gray-400">
            {rowsLabel}
          </div>
        ) : (
          <div className="space-y-3">
            {(mobileRows ?? []).map((row, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-[#111827] border border-white/10 p-3 space-y-1.5"
              >
                {head.map((label) => (
                  <div
                    key={label}
                    className="flex items-start justify-between gap-3"
                  >
                    <span className="text-xs text-gray-400">{label}</span>
                    <span className="text-sm text-gray-100 text-right">
                      {row[label] ?? "—"}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/10 text-xs text-gray-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          Rows per page:
          <button className="bg-[#111827] border border-white/10 px-2 py-1 rounded">
            10
          </button>
        </div>
        <div className="flex items-center gap-4">
          0–0 of 0
          <div className="flex items-center gap-2">
            <button className="opacity-60">
              <FiChevronLeft />
            </button>
            <button className="opacity-60">
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
