import React from "react";
import { Eye, EyeOff } from "lucide-react";

export default function CommonForm({
  fields = [],
  onSubmit,
  submitLabel = "Submit",
  extraFooter = null,
}) {
  const [values, setValues] = React.useState(
    fields.reduce((acc, f) => {
      acc[f.name] = f.defaultValue || "";
      return acc;
    }, {})
  );
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState({}); // track visibility for each field

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function togglePasswordVisibility(name) {
    setShowPassword((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {fields.map((f) => (
        <div key={f.name} className="flex flex-col relative">
          <label className="text-sm font-medium mb-1">{f.label}</label>
          <div className="relative">
            <input
              name={f.name}
              type={
                f.type === "password" && showPassword[f.name]
                  ? "text"
                  : f.type || "text"
              }
              placeholder={f.placeholder || ""}
              required={f.required || false}
              value={values[f.name]}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {f.type === "password" && (
              <button
                type="button"
                onClick={() => togglePasswordVisibility(f.name)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword[f.name] ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-md text-white bg-blue-600 cursor-pointer hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Please wait..." : submitLabel}
      </button>

      {extraFooter}
    </form>
  );
}
