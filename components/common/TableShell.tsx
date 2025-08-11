import { ReactNode } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function TableShell({
  columns,
  rows,
  empty = "No rows",
  footer = { from: 0, to: 0, total: 0, perPage: 10 },
}: {
  columns: string[];
  rows: ReactNode;
  empty?: string;
  footer?: { from: number; to: number; total: number; perPage: number };
}) {
  const isEmpty = !rows;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-400">
            <tr>
              {columns.map((c) => (
                <th key={c} className="py-2 pr-4">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isEmpty ? (
              <tr>
                <td colSpan={columns.length} className="py-10">
                  <div className="h-20 rounded-lg bg-[#111827] flex items-center justify-center text-gray-400">
                    {empty}
                  </div>
                </td>
              </tr>
            ) : (
              rows
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-700 mt-4 pt-3 text-xs text-gray-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          Rows per page:
          <button className="bg-[#111827] border border-gray-700 px-2 py-1 rounded">
            {footer.perPage}
          </button>
        </div>
        <div className="flex items-center gap-4">
          {footer.from}–{footer.to} of {footer.total}
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
    </>
  );
}
