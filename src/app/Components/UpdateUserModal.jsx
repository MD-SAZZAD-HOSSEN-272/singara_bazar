import { useEffect, useState } from "react";

export default function UpdateUserModal({ user, handleUpdateDataFrom, onClose }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateDataFrom({ role: formData.role }, user._id); // only send role
    onClose();
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Update User Role
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name (read only) */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Email (read only) */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Role (editable) */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer"
          >
            Update Role
          </button>
        </form>
      </div>
    </div>
  );
}
