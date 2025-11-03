import { Phone } from "lucide-react";
import { useState } from "react";

export default function FreeConsultancy() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="py-12 px-6 flex justify-center items-center bg-[#F5F5F5]">
      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-2xl w-full border border-blue-100">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-full shadow-md mb-4">
            <Phone className="text-white w-7 h-7" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Book a Free 30-Minute Consultation
          </h2>
          <p className="text-gray-600 mt-2 max-w-md">
            Let’s discuss your project requirements and how our experts can help
            you achieve success.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Briefly describe your project..."
              rows="4"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              Schedule Consultation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
