import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";

Chart.register(ArcElement, Tooltip);

export default function PaymentDonut() {
  const available = 3511.52;
  const onTrade = 0;

  const data = {
    labels: ["Available", "On Trade"],
    datasets: [
      {
        data: [available, onTrade],
        backgroundColor: ["#10B981", "#4B5563"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "75%",
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="bg-[#1f2937] text-white rounded-xl p-4 shadow-md w-full flex flex-col items-center justify-between gap-4">
      <h2 className="text-base font-semibold self-start">Payment</h2>

      <div className="relative w-32 h-32">
        <Doughnut data={data} options={options as any} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs text-gray-400">USD</p>
            <p className="text-lg font-bold">
              {(available + onTrade).toFixed(3)}k
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full mt-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
          <span>Available</span>
        </div>
        <span className="bg-[#111827] px-2 py-1 rounded text-xs font-medium">
          ${available.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between w-full text-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-gray-500 rounded-full" />
          <span>On Trade</span>
        </div>
        <span className="bg-[#111827] px-2 py-1 rounded text-xs font-medium">
          ${onTrade.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
