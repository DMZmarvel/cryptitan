import { ReactNode } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type TableShellProps = {
  title?: ReactNode;
  head: string[];
  children?: React.ReactNode;
  rowsLabel?: string;
  className?: string;
};

export default function TableShell({
  title,
  head,
  children,
  rowsLabel = "No rows",
}: TableShellProps) {
  return (
    <div className="bg-[#1f2937] rounded-xl overflow-hidden">
      {title && (
        <div className="px-4 py-3 border-b border-white/10">{title}</div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-200">
          <thead className="text-left text-gray-400 bg-white/5">
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
