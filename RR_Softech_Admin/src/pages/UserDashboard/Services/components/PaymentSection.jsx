import React, { useEffect, useMemo, useState } from "react";
import { fetchPaymentProvider, postIntiPayment } from "../../../../api/UserDashboard/payment";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function PaymentSection({ milestoneId }) {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const [inputAmount, setInputAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processingFee, setProcessingFee] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetchPaymentProvider();
        if (!mounted) return;
        setProviders(res || []);
      } catch (err) {
        console.log(err);
        
        toast.error("Failed to load payment providers");
      }
    };
    load();
    return () => (mounted = false);
  }, []);

  const initPayment = async (provider, customAmount = null) => {
    if (!provider) return;
    setLoading(true);
    setError("");

    try {
      const payload = {
        provider_code: provider.provider_name_code,
      };
      if (customAmount !== null) payload.custom_amount = String(customAmount);

      const response = await postIntiPayment(payload, milestoneId);

      // NOTE: Fees & total only update based on backend response,
      // not from typing.
      const milestoneAmount = response?.milestone_amount ?? inputAmount;

      setInputAmount(milestoneAmount);
      setProcessingFee(response?.processing_fee ?? 0);
      setFinalAmount(response?.final_charge_amount ?? 0);
      setPaymentUrl(response?.payment_url ?? "");

      return response;
    } catch (err) {
      console.log(err);
      
      setError("Unable to initialize payment. Try again.");
      setPaymentUrl("");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSelect = async (provider) => {
    if (!provider) return;
    setSelectedProvider(provider);
    setIsCustom(false);
    setError("");
    setPaymentUrl("");
    await initPayment(provider);
  };

  const handleAmountChange = (e) => {
    setError("");

    const val = e.target.value;

    if (val === "") {
      setInputAmount("");
      return;
    }
    if (/^-/.test(val)) return;

    const num = Number(val);
    if (Number.isNaN(num)) return;

    // ONLY update main amount visually (no backend fee update)
    setInputAmount(val);
  };

  const handlePayNow = async () => {
    setError("");

    if (!selectedProvider) {
      setError("Please select a payment provider.");
      return;
    }

    // Normal flow
    if (!isCustom) {
      if (!paymentUrl) {
        const res = await initPayment(selectedProvider);
        if (!res?.payment_url) {
          setError("Payment initialization failed. Please try again.");
          return;
        }
        window.open(res.payment_url, "_blank");
        return;
      }
      window.open(paymentUrl, "_blank");
      return;
    }

    // Custom flow
    if (inputAmount === "" || Number(inputAmount) <= 0) {
      setError("Enter a valid custom amount.");
      return;
    }

    const num = Number(inputAmount);
    const min = selectedProvider.min_amount ?? 0;
    const max = selectedProvider.max_amount ?? Infinity;

    if (num < min) {
      setError(`Minimum amount is $${min}`);
      return;
    }
    if (num > max) {
      setError(`Maximum amount is $${max}`);
      return;
    }

    setLoading(true);
    try {
      const res = await initPayment(selectedProvider, num);
      if (!res?.payment_url) {
        setError("Failed to initialize custom payment. Try again.");
        return;
      }
      window.open(res.payment_url, "_blank");
    } finally {
      setLoading(false);
    }
  };

  const isPayDisabled = () => {
    if (!selectedProvider) return true;
    if (loading) return true;

    if (!isCustom) {
      return !paymentUrl && (!inputAmount || Number(inputAmount) <= 0);
    }

    if (!inputAmount || Number(inputAmount) <= 0) return true;

    const num = Number(inputAmount);
    return num < (selectedProvider.min_amount ?? 0) ||
           num > (selectedProvider.max_amount ?? Infinity);
  };

  const displayAmount = useMemo(() => {
    if (inputAmount === "") return "";
    return inputAmount;
  }, [inputAmount]);

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-6 shadow-sm">
      
      {/* Providers */}
      <div className="flex flex-col gap-3">
        <label className="text-sm text-gray-600 font-medium">Select Payment Provider</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {providers.map((p) => {
            const active = selectedProvider?.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleProviderSelect(p)}
                className={`flex items-center gap-3 p-3 border rounded-lg text-left transition-colors w-full
                  ${active ? "border-blue-600 bg-blue-50" : "border-gray-300 hover:bg-gray-50"}
                `}
              >
                <img src={p.logo} alt={p.title} className="w-10 h-10 object-contain" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{p.title}</p>
                  <p className="text-xs text-gray-500">
                    Min ${p.min_amount} — Max ${p.max_amount}
                  </p>
                </div>
                {active && <div className="text-xs text-blue-600 font-medium">Selected</div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Amount */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <label className="text-sm text-gray-600 font-medium">Amount</label>

          {/* Custom toggle */}
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={isCustom}
              onChange={(e) => {
                setIsCustom(e.target.checked);
                if (!e.target.checked && selectedProvider) {
                  initPayment(selectedProvider);
                }
              }}
              className="h-4 w-4"
            />
            <span className="text-gray-700">Pay custom amount</span>
          </label>
        </div>

        <input
          type="number"
          value={displayAmount}
          onChange={handleAmountChange}
          placeholder={selectedProvider ? `Min ${selectedProvider.min_amount} - Max ${selectedProvider.max_amount}` : "Select a provider first"}
          className={`border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none ${!isCustom ? "bg-gray-100 text-gray-700" : "bg-white"}`}
          disabled={!selectedProvider || !isCustom}
        />

        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>

      {/* Breakdown */}
      {selectedProvider && (
        <div className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Payment Breakdown</h3>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Main Amount</span>
            <span className="font-medium text-gray-900">${displayAmount || "0"}</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Processing Fee</span>
            <span className="font-medium text-gray-900">${processingFee}</span>
          </div>

          <div className="flex justify-between text-base font-semibold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total Payable</span>
            <span>${finalAmount}</span>
          </div>
        </div>
      )}

      {/* Pay Now */}
      <button
        type="button"
        onClick={handlePayNow}
        disabled={isPayDisabled()}
        className={`w-full text-center py-3 rounded-lg text-white font-medium transition
          ${isPayDisabled() ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
        `}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          <span>Pay Now</span>
        )}
      </button>
    </div>
  );
}
