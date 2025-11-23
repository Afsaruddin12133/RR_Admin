import React, { useEffect, useState } from "react";
import { Banknote, CreditCard } from "lucide-react";
import {
  fetchPaymentProviders,
  createPaymentProvider,
  updatePaymentProvider,
} from "../../../api/admin/paymentProviders";
import PaymentProviderModal from "./paymentProviderModal";

// card for each provider
function PaymentProviderCard({ icon: Icon, title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:border-indigo-500 hover:shadow-md"
    >
      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
        <Icon className="h-5 w-5 text-indigo-600" />
      </div>
      <div>
        <h2 className="font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </button>
  );
}

const initialState = {
  manual: {
    id: null,
    title: "Manual or Banking",
    provider_name_code: "bank",
    logo: "",
    account_number: "",
    description: "",
    is_active: true,
    bank_details: "",
    processing_fee_percentage: "",
    type: "BANK_TRANSFER",
    min_amount: "",
    max_amount: "",
  },
  riskpay: {
    id: null,
    title: "Riskpay",
    provider_name_code: "riskpay",
    logo: "",
    account_number: "",
    description: "",
    is_active: true,
    bank_details: "",
    processing_fee_percentage: "",
    type: "CRYPTO",
    min_amount: "",
    max_amount: "",
  },
};

export default function Settings() {
  const [providerConfig, setProviderConfig] = useState(initialState);
  const [openProvider, setOpenProvider] = useState(null); // "manual" | "riskpay" | null
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProviders() {
      try {
        const list = await fetchPaymentProviders();
        const updated = { ...initialState };

        list.forEach((p) => {
          if (p.provider_name_code === "MANUAL_BANKING") {
            updated.manual = { ...updated.manual, ...p };
          } else if (p.provider_name_code === "RISKPAY") {
            updated.riskpay = { ...updated.riskpay, ...p };
          }
        });

        setProviderConfig(updated);
      } catch (err) {
        console.error("Failed to load payment providers", err);
      } finally {
        setLoading(false);
      }
    }

    loadProviders();
  }, []);

const handleSave = async (providerKey, formValues) => {
  try {
    setSaving(true);

    // base fields
    const fields = {
      title: formValues.title,
      provider_name_code: formValues.provider_name_code,
      account_number: formValues.account_number,
      description: formValues.description,
      is_active: formValues.is_active ?? true,
      bank_details: formValues.bank_details,
      processing_fee_percentage: formValues.processing_fee_percentage,
      type: formValues.type,
      min_amount: formValues.min_amount,
      max_amount: formValues.max_amount,
    };

    // build FormData
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    // append logo file if present
    if (formValues.logo instanceof File) {
      formData.append("logo", formValues.logo);
    }

    let saved;
    if (formValues.id) {
      saved = await updatePaymentProvider(formValues.id, formData);
    } else {
      saved = await createPaymentProvider(formData);
    }

    setProviderConfig((prev) => ({
      ...prev,
      [providerKey]: { ...prev[providerKey], ...saved },
    }));

    alert(`Payment provider "${saved.title}" saved successfully.`);
    setOpenProvider(null);
  } catch (err) {
    console.error(err);
    alert("Could not save provider. Check console for details.");
  } finally {
    setSaving(false);
  }
};


  if (loading) {
    return (
      <div className="h-full w-full bg-background p-6">
        <h1 className="mb-4 text-xl font-semibold text-slate-800">Settings</h1>
        <p className="text-sm text-slate-500">Loading payment providers...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-background p-6">
      <h1 className="mb-4 text-xl font-semibold text-slate-800">Settings</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <PaymentProviderCard
          icon={Banknote}
          title="Manual or Banking"
          description="Configure bank transfer or manual payment instructions."
          onClick={() => setOpenProvider("manual")}
        />
        <PaymentProviderCard
          icon={CreditCard}
          title="Riskpay"
          description="Set up your Riskpay gateway configuration."
          onClick={() => setOpenProvider("riskpay")}
        />
      </div>

      <PaymentProviderModal
        type={openProvider}
        open={Boolean(openProvider)}
        onClose={() => setOpenProvider(null)}
        data={openProvider ? providerConfig[openProvider] : null}
        onSave={handleSave}
        loading={saving}
      />
    </div>
  );
}
