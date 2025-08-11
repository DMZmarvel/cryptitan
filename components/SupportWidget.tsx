import { FiMessageSquare } from "react-icons/fi";

export default function SupportWidget() {
  return (
    <div className="bg-green-50 rounded-lg p-4 mt-6">
      <h4 className="text-sm font-semibold text-gray-700 mb-1">
        Need some help?
      </h4>
      <p className="text-sm text-gray-500 mb-3">
        Contact one of our support agents.
      </p>
      <button className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition">
        <div className="flex items-center justify-center gap-2 text-sm">
          <FiMessageSquare className="text-lg" />
          Get Support
        </div>
      </button>
    </div>
  );
}
