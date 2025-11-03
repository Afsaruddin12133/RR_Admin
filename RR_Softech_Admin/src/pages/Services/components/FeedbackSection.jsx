import React, { useState } from "react";
import { Star } from "lucide-react";

const FeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, feedback, image });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto bg-white p-6 flex flex-col space-y-5"
    >
      {/* Rating */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Rate Your Experience
        </label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                className={`w-7 h-7 ${
                  (hover || rating) >= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                } transition-colors duration-200`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Textarea */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Your Feedback
        </label>
        <textarea
          className="w-full min-h-[120px] border border-gray-300 rounded-xl p-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          placeholder="Share your experiences with this service..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Add Image (Optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-600
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-medium
                     file:bg-blue-600 file:text-white
                     hover:file:bg-blue-700 cursor-pointer"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200"
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackSection;
