import React, { useEffect, useState } from "react";

export default function PaymentSection() {
  const MIN_AMOUNT = 50;
  const MAX_AMOUNT = 1750;
  const PROCESS_FEE_PERCENT = 12;

  const [inputAmount, setInputAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [processingFee, setProcessingFee] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (inputAmount === "" || Number(inputAmount) <= 0) {
      setProcessingFee(0);
      setFinalAmount(0);
      return;
    }
    calculateFees(Number(inputAmount));
  }, [inputAmount]);

  const calculateFees = (val) => {
    const fee = (val * PROCESS_FEE_PERCENT) / 100;
    setProcessingFee(fee.toFixed(2));
    setFinalAmount((val + fee).toFixed(2));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Allow empty input
    if (value === "") {
      setInputAmount("");
      setError("");
      return;
    }

    const num = Number(value);
    setInputAmount(num);

    if (num < MIN_AMOUNT) {
      setError(`Minimum amount is $${MIN_AMOUNT}`);
    } else if (num > MAX_AMOUNT) {
      setError(`Maximum amount is $${MAX_AMOUNT}`);
    } else {
      setError("");
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-5 shadow-sm">
      {/* Title */}
      <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
        RR-Soft Payment
      </h2>

      {/* Payment Type */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 font-medium">
          Select Payment Type
        </label>

        <div className="relative">
          <select
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white  transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer appearance-none"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="" disabled className="text-gray-400">
              Choose a payment type
            </option>
            <option value="bkash">bKash</option>
            <option value="nagad">Nagad</option>
            <option value="bank">Bank Transfer</option>
            <option value="cash">Cash</option>
          </select>

          {/* Dropdown Arrow */}
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            ▼
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">Enter Amount</label>
        <input
          type="number"
          className="border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={inputAmount}
          onChange={handleAmountChange}
          placeholder="Enter payment amount"
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>

      {/* Min/Max Display */}
      <div className="text-sm text-gray-600 flex flex-col gap-1">
        <p>
          Minimum Amount: <span className="font-medium">${MIN_AMOUNT}</span>
        </p>
        <p>
          Maximum Amount: <span className="font-medium">${MAX_AMOUNT}</span>
        </p>
      </div>

      {/* Payment Breakdown */}
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
            Processing & Gateway Fee ({PROCESS_FEE_PERCENT}%)
          </span>
          <span className="font-medium text-gray-900">${processingFee}</span>
        </div>

        <div className="flex justify-between text-base font-semibold text-gray-900 pt-2 border-t border-gray-200">
          <span>Total Payable</span>
          <span>${finalAmount}</span>
        </div>
      </div>

      {/* Pay Button */}
      <button
        disabled={
          inputAmount === "" ||
          Boolean(error) ||
          Number(inputAmount) < MIN_AMOUNT
        }
        className={`w-full text-center py-3 rounded-lg text-white font-medium transition 
          ${
            inputAmount === "" || error || Number(inputAmount) < MIN_AMOUNT
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
