import React, { useEffect, useState } from "react";
import { fetchPaymentProvider } from "../../../../api/UserDashboard/payment";
import { postIntiPayment } from "../../../../api/UserDashboard/payment";

export default function PaymentSection({ milestoneId }) {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const [inputAmount, setInputAmount] = useState("");
  const [processingFee, setProcessingFee] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const [paymentUrl, setPaymentUrl] = useState("");
  const [error, setError] = useState("");

  // ======================================================
  // Fetch Payment Providers
  // ======================================================
  useEffect(() => {
    const loadProviders = async () => {
      try {
        const response = await fetchPaymentProvider();
        setProviders(response || []);
      } catch (e) {
        console.error("Failed to load payment providers", e);
      }
    };

    loadProviders();
  }, []);

  // ======================================================
  // Auto-calculation
  // ======================================================
  const calculateFees = (value, provider = selectedProvider) => {
    if (!provider) return;

    const feePercent = Number(provider.processing_fee_percentage);
    const fee = (value * feePercent) / 100;

    setProcessingFee(fee.toFixed(2));
    setFinalAmount((value + fee).toFixed(2));
  };

  // ======================================================
  // When clicking provider:
  // 1) Auto-call API
  // 2) Auto-set amounts
  // 3) Auto-show breakdown
  // 4) Auto-enable Pay Now
  // ======================================================
  const handleProviderSelect = async (provider) => {
    setSelectedProvider(provider);
    setError("");

    try {
      const payload = {
        provider_code: provider.provider_name_code,
      };

      const response = await postIntiPayment(payload, milestoneId);
      console.log("Initial Payment API Response:", response);

      // 🔥 SET DATA FROM API RESPONSE
      const apiAmount = response.milestone_amount;
      const apiFee = response.processing_fee;
      const apiFinal = response.final_charge_amount;

      setInputAmount(apiAmount);
      setProcessingFee(apiFee);
      setFinalAmount(apiFinal);
      setPaymentUrl(response.payment_url);
    } catch (err) {
      console.error("Payment init failed:", err);
    }
  };

  // ======================================================
  // User Editable Input (ONLY when milestoneId is null)
  // ======================================================
  const handleAmountChange = (e) => {
    if (milestoneId) return; // 🔒 Input locked if milestone payment

    const value = e.target.value;

    if (!selectedProvider) {
      setError("Please select a payment provider first.");
      return;
    }

    if (value === "") {
      setInputAmount("");
      setError("");
      return;
    }

    const num = Number(value);
    setInputAmount(num);

    const min = Number(selectedProvider.min_amount);
    const max = Number(selectedProvider.max_amount);

    if (num < min) {
      setError(`Minimum amount is $${min}`);
    } else if (num > max) {
      setError(`Maximum amount is $${max}`);
    } else {
      setError("");
    }

    calculateFees(num);
  };

  // ======================================================
  // Pay Now → Open new tab
  // ======================================================
  const handlePayNow = () => {
    if (paymentUrl) {
      window.open(paymentUrl, "_blank");
    }
  };

  const isPayNowDisabled =
    !selectedProvider ||
    !inputAmount ||
    Boolean(error) ||
    Number(inputAmount) <= 0;

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-6 shadow-sm">

      <h2 className="text-center text-xl font-semibold text-gray-800">
        RR-Soft Payment
      </h2>

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

      {/* Amount Input */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">Enter Amount</label>
        <input
          type="number"
          className="border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={inputAmount}
          onChange={handleAmountChange}
          placeholder={
            selectedProvider
              ? `Min ${selectedProvider.min_amount} - Max ${selectedProvider.max_amount}`
              : "Select a provider first"
          }
          disabled={milestoneId && milestoneId !== null} // 🔒 Auto lock when milestone payment
        />

        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>

      {/* Breakdown */}
      {selectedProvider && (
        <div className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Payment Breakdown
          </h3>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Main Amount</span>
            <span className="font-medium text-gray-900">${inputAmount || 0}</span>
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

      {/* Pay Button */}
      <button
        disabled={isPayNowDisabled}
        onClick={handlePayNow}
        className={`w-full text-center py-3 rounded-lg text-white font-medium transition 
          ${
            isPayNowDisabled
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }
        `}
      >
        Pay Now
      </button>
    </div>
  );
}
