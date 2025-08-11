import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function AccountLimits() {
  const dailyUsed = 45;
  const monthlyUsed = 70;

  return (
    <div className="bg-[#1f2937] rounded-xl shadow border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Account Limits
      </h3>

      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-20 h-20">
            <CircularProgressbar
              value={dailyUsed}
              text={`${dailyUsed}%`}
              styles={buildStyles({
                pathColor: "#10B981",
                textColor: "#111827",
                trailColor: "#E5E7EB",
                textSize: "28px",
              })}
            />
          </div>
          <p className="text-xs text-gray-500">Daily Limit</p>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <div className="w-20 h-20">
            <CircularProgressbar
              value={monthlyUsed}
              text={`${monthlyUsed}%`}
              styles={buildStyles({
                pathColor: "#2563EB",
                textColor: "#111827",
                trailColor: "#E5E7EB",
                textSize: "28px",
              })}
            />
          </div>
          <p className="text-xs text-gray-500">Monthly Limit</p>
        </div>
      </div>
    </div>
  );
}
