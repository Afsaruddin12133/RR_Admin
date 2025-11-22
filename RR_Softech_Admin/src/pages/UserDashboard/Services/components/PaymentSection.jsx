import React, { useEffect, useRef, useState } from "react";
import {
  fetchPaymentProvider,
  postIntiPayment,
} from "../../../../api/UserDashboard/payment";

export default function PaymentSection({ milestoneId }) {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const [inputAmount, setInputAmount] = useState("");
  const [processingFee, setProcessingFee] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const [paymentUrl, setPaymentUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ======================================================
  // Fetch Providers
  // ======================================================
  useEffect(() => {
    const loadProviders = async () => {
      try {
        const response = await fetchPaymentProvider();
        setProviders(response || []);
      } catch (err) {
        console.error("Failed to load payment providers", err);
      }
    };
    loadProviders();
  }, []);

  // ======================================================
  // Initialize Payment API (Milestone OR Custom)
  // ======================================================
  const initPayment = async (provider, customAmount = null) => {
    setLoading(true);
    setError("");

    try {
      const payload = {
        provider_code: provider.provider_name_code,
      };

      if (customAmount !== null) {
        payload.custom_amount = customAmount;
      }

      const response = await postIntiPayment(payload, milestoneId);

      setInputAmount(response.milestone_amount ?? customAmount);
      setProcessingFee(response.processing_fee);
      setFinalAmount(response.final_charge_amount);
      setPaymentUrl(response.payment_url);
    } catch (err) {
      console.error("Payment init failed:", err);
      setError("Unable to initialize payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // Provider Selection Logic
  // ======================================================
  const handleProviderSelect = async (provider) => {
    setSelectedProvider(provider);
    setError("");

    if (!inputAmount && milestoneId) {
      await initPayment(provider);
    } else if (inputAmount) {
      const num = Number(inputAmount);

      if (num < provider.min_amount) {
        return setError(`Minimum amount is $${provider.min_amount}`);
      }
      if (num > provider.max_amount) {
        return setError(`Maximum amount is $${provider.max_amount}`);
      }

      console.log(num);

      await initPayment(provider, num);
    }
  };

  // ======================================================
  // Amount Change Logic (For Custom Payments Only)
  // ======================================================
  const debounceRef = useRef(null);

  const handleAmountChange = (e) => {
    const value = e.target.value;

    if (!selectedProvider) {
      setError("Select a payment provider first.");
      return;
    }

    if (value === "") {
      setInputAmount("");
      setError("");
      return;
    }

    const num = Number(value);
    setInputAmount(num);

    if (num < selectedProvider.min_amount) {
      setError(`Minimum amount is $${selectedProvider.min_amount}`);
      return;
    }
    if (num > selectedProvider.max_amount) {
      setError(`Maximum amount is $${selectedProvider.max_amount}`);
      return;
    }

    setError("");
    

    // Clear previous timer (user is still typing)
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Start a new timer
    debounceRef.current = setTimeout(() => {
      console.log("User finished typing, now calling API...");
      console.log(num);
      
      initPayment(selectedProvider, num.toString()); 
    }, 3000); // 600ms debounce
  };

  const isPayNowDisabled =
    !selectedProvider ||
    !inputAmount ||
    Boolean(error) ||
    loading ||
    Number(inputAmount) <= 0;

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-6 shadow-sm">
      {/* Provider Selection */}
      <div className="flex flex-col gap-3">
        <label className="text-sm text-gray-600 font-medium">
          Select Payment Provider
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {providers.map((provider) => (
            <div
              key={provider.id}
              onClick={() => handleProviderSelect(provider)}
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition 
                  ${
                    selectedProvider?.id === provider.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300 hover:bg-gray-50"
                  }
                `}
            >
              <img
                src={provider.logo}
                alt={provider.title}
                className="w-10 h-10 object-contain"
              />
              <div>
                <p className="font-semibold text-gray-800">{provider.title}</p>
                <p className="text-xs text-gray-500">
                  Min ${provider.min_amount} — Max ${provider.max_amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Amount Input (disabled for milestone payments) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">Enter Amount</label>
        <input
          type="number"
          className={`border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
            milestoneId ? "bg-gray-100" : ""
          }`}
          value={inputAmount}
          onChange={handleAmountChange}
          placeholder={
            selectedProvider
              ? `Min ${selectedProvider.min_amount} - Max ${selectedProvider.max_amount}`
              : "Select a provider first"
          }
        />

        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>

      {/* Breakdown */}
      {selectedProvider && inputAmount > 0 && (
        <div className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Payment Breakdown
          </h3>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Main Amount</span>
            <span className="font-medium text-gray-900">${inputAmount}</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">
              Processing Fee ({selectedProvider.processing_fee_percentage}%)
            </span>
            <span className="font-medium text-gray-900">${processingFee}</span>
          </div>

          <div className="flex justify-between text-base font-semibold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total Payable</span>
            <span>${finalAmount}</span>
          </div>
        </div>
      )}

      {/* Pay Now Button */}
      <button
        disabled={isPayNowDisabled}
        onClick={() => paymentUrl && window.open(paymentUrl, "_blank")}
        className={`w-full text-center py-3 rounded-lg text-white font-medium transition 
            ${
              isPayNowDisabled
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }
          `}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
