import { toast } from "react-toastify";


export const handleApiError = (err, customFallback = "Something went wrong. Please try again.") => {
  console.error(err);

  let msg = customFallback;

  if (err?.response) {
    const { status, data } = err.response;

    if (status === 400 || status === 409) {
      console.log(data);
      
      if (data?.detail?.includes("already") || data?.email) {
        msg = "This email is already registered. Please log in instead.";
      } 
      else if (data?.detail) {
        msg = data.detail;
      } else {
        msg = "Invalid input. Please check your information.";
      }
    } else if (status === 422) {
      msg = "Some fields are missing or invalid.";
    } else if (status === 500) {
      msg = "Server error. Please try again later.";
    } else {
      msg = data?.detail || "Unexpected error occurred.";
    }
  } else if (err?.message?.includes("Network")) {
    msg = "Network error. Please check your internet connection.";
  }

  toast.error(msg);
  return msg;
}
