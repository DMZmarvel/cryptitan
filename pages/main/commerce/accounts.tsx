import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

export default function CommerceAccount() {
  const [form, setForm] = useState({
    businessName: "",
    about: "",
    email: "",
    phone: "",
    website: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Account</h1>
          <div className="text-sm text-gray-400">
            Main <span className="mx-1">›</span>{" "}
            <span className="text-white">…</span>
            <span className="mx-1">›</span>{" "}
            <span className="text-white">Account</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 bg-[#1f2937] rounded-xl p-4 shadow-md">
            <p className="text-gray-300 text-sm mb-3">Store Details</p>

            <label className="block text-xs text-gray-400 mb-1">
              Business Name*
            </label>
            <input
              name="businessName"
              value={form.businessName}
              onChange={onChange}
              className="w-full h-10 bg-[#111827] border border-white/10 rounded-lg px-3 text-sm text-gray-200"
              placeholder="Your store name"
            />

            <label className="block text-xs text-gray-400 mt-4 mb-1">
              About
            </label>
            <textarea
              name="about"
              value={form.about}
              onChange={onChange}
              rows={6}
              className="w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200"
              placeholder="Tell customers about your store"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Email*
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="w-full h-10 bg-[#111827] border border-white/10 rounded-lg px-3 text-sm text-gray-200"
                  placeholder="noreply@store.com"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Phone
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  className="w-full h-10 bg-[#111827] border border-white/10 rounded-lg px-3 text-sm text-gray-200"
                  placeholder="+1 000-000-0000"
                />
              </div>
            </div>

            <label className="block text-xs text-gray-400 mt-4 mb-1">
              Website
            </label>
            <input
              name="website"
              value={form.website}
              onChange={onChange}
              className="w-full h-10 bg-[#111827] border border-white/10 rounded-lg px-3 text-sm text-gray-200"
              placeholder="https://example.com"
            />
          </div>

          {/* Extras / Submit */}
          <div className="space-y-4">
            <div className="bg-[#1f2937] rounded-xl p-4 shadow-md">
              <p className="text-gray-300 text-sm mb-3">Store Extras</p>
              <div className="aspect-square rounded-lg bg-[#111827] border border-dashed border-white/10 grid place-items-center text-gray-400">
                Upload Logo
              </div>
            </div>
            <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2.5 rounded-lg shadow">
              Update Account
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
