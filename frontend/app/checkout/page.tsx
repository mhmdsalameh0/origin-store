"use client";

import { useCart } from "@/components/cart/CartProvider";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { apiUrl } from "@/lib/api";
import { formatPrice } from "@/lib/productCatalog";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

const requiredFields = ["email", "country", "firstName", "lastName", "address", "city", "district", "postalCode", "phone"] as const;

type RequiredField = (typeof requiredFields)[number];
type CheckoutForm = Record<RequiredField, string> & {
  apartment: string;
  notes: string;
  coupon: string;
  terms: boolean;
};

const initialForm: CheckoutForm = {
  email: "",
  country: "United States",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  district: "",
  postalCode: "",
  phone: "",
  notes: "",
  coupon: "",
  terms: false
};

function Field({
  error,
  label,
  name,
  onChange,
  value,
  type = "text"
}: {
  error?: string;
  label: string;
  name: RequiredField | "apartment" | "notes" | "coupon";
  onChange: (name: keyof CheckoutForm, value: string) => void;
  value: string;
  type?: string;
}) {
  const id = `checkout-${name}`;

  return (
    <label className="grid gap-2 text-sm font-semibold text-[#202329]" htmlFor={id}>
      {label}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-12 rounded-[6px] border border-origin-line px-4 text-base font-normal outline-none transition focus:border-[#202329]"
      />
      {error ? (
        <span id={`${id}-error`} className="text-xs font-semibold text-[#c62828]">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export default function CheckoutPage() {
  const { clearCart, items, subtotal } = useCart();
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`
  );

  const hasItems = items.length > 0;
  const total = subtotal;

  const paymentMessage = useMemo(
    () =>
      "Payment is not connected yet. Configure a real order API and payment provider before enabling live order placement.",
    []
  );

  const updateField = (name: keyof CheckoutForm, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const nextErrors: Partial<Record<keyof CheckoutForm, string>> = {};

    requiredFields.forEach((field) => {
      if (!form[field].trim()) {
        nextErrors[field] = "This field is required.";
      }
    });

    if (!form.terms) {
      nextErrors.terms = "Please acknowledge the terms and privacy policy.";
    }

    if (!hasItems) {
      nextErrors.coupon = "Your cart is empty. Add a product before checkout.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(apiUrl("/orders"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idempotencyKey,
          customer: {
            email: form.email,
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone
          },
          delivery: {
            country: form.country,
            address: form.address,
            apartment: form.apartment,
            city: form.city,
            district: form.district,
            postalCode: form.postalCode
          },
          notes: form.notes,
          items
        })
      });

      const data = (await response.json().catch(() => null)) as
        | {
            orderNumber?: string;
            error?: string;
            code?: string;
            fields?: Partial<Record<keyof CheckoutForm | "items" | "idempotencyKey", string>>;
          }
        | null;

      if (!response.ok || !data?.orderNumber) {
        if (data?.fields) {
          setErrors((current) => ({ ...current, ...data.fields }));
        }

        const safeReason = data?.code ? `${data.error ?? "Unable to place order."} (${data.code})` : data?.error;

        throw new Error(safeReason ?? "Unable to place order. Please try again.");
      }

      clearCart();
      setIdempotencyKey(typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
      router.push(`/order-success?order=${encodeURIComponent(data.orderNumber)}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to place order. Please try again.";
      setSubmitError(
        message === "Failed to fetch"
          ? "Unable to reach the order server. Please check the API URL or try again in a moment."
          : message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-white pt-[83px] font-sans text-origin-ink">
        <form className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 lg:grid-cols-[1fr_430px]" onSubmit={handleSubmit} noValidate>
          <section>
            <p className="text-sm font-semibold text-origin-muted">Secure checkout</p>
            <h1 className="mt-2 text-[42px] font-bold leading-none text-black md:text-[64px]">Checkout</h1>

            <div className="mt-10 grid gap-8">
              <div>
                <h2 className="text-2xl font-bold text-black">Contact</h2>
                <div className="mt-4">
                  <Field error={errors.email} label="Contact email" name="email" type="email" value={form.email} onChange={updateField} />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-black">Delivery</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <Field error={errors.country} label="Country/region" name="country" value={form.country} onChange={updateField} />
                  </div>
                  <Field error={errors.firstName} label="First name" name="firstName" value={form.firstName} onChange={updateField} />
                  <Field error={errors.lastName} label="Last name" name="lastName" value={form.lastName} onChange={updateField} />
                  <div className="md:col-span-2">
                    <Field error={errors.address} label="Address" name="address" value={form.address} onChange={updateField} />
                  </div>
                  <div className="md:col-span-2">
                    <Field label="Apartment/suite" name="apartment" value={form.apartment} onChange={updateField} />
                  </div>
                  <Field error={errors.city} label="City" name="city" value={form.city} onChange={updateField} />
                  <Field error={errors.district} label="District/state" name="district" value={form.district} onChange={updateField} />
                  <Field error={errors.postalCode} label="Postal code" name="postalCode" value={form.postalCode} onChange={updateField} />
                  <Field error={errors.phone} label="Phone" name="phone" type="tel" value={form.phone} onChange={updateField} />
                </div>
              </div>

              <label className="grid gap-2 text-sm font-semibold text-[#202329]" htmlFor="checkout-notes">
                Order notes
                <textarea
                  id="checkout-notes"
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  className="min-h-32 rounded-[6px] border border-origin-line px-4 py-3 text-base font-normal outline-none transition focus:border-[#202329]"
                />
              </label>

              <div className="rounded-[8px] border border-origin-line bg-[#f8fafc] p-5">
                <h2 className="text-xl font-bold text-black">Payment options</h2>
                <p className="mt-3 text-sm leading-6 text-origin-muted">{paymentMessage}</p>
              </div>

              <label className="flex items-start gap-3 text-sm font-semibold text-[#202329]">
                <input
                  type="checkbox"
                  checked={form.terms}
                  onChange={(event) => {
                    setForm((current) => ({ ...current, terms: event.target.checked }));
                    setErrors((current) => ({ ...current, terms: undefined }));
                  }}
                  className="mt-1 size-4 accent-[#202329]"
                  aria-invalid={Boolean(errors.terms)}
                />
                <span>
                  I acknowledge the terms, privacy policy, and research-use-only notice.
                  {errors.terms ? <span className="mt-1 block text-xs text-[#c62828]">{errors.terms}</span> : null}
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-full bg-[#202329] px-8 text-sm font-bold text-white transition hover:bg-[#0f1115] disabled:cursor-not-allowed disabled:opacity-70 md:w-fit"
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>

              {submitError ? (
                <p className="text-sm font-semibold text-[#c62828]" role="alert">
                  {submitError}
                </p>
              ) : null}
            </div>
          </section>

          <aside className="h-fit rounded-[8px] border border-origin-line p-6 shadow-[0_16px_45px_rgba(29,36,25,.06)] lg:sticky lg:top-28">
            <h2 className="text-2xl font-bold text-black">Order summary</h2>
            {items.length === 0 ? (
              <div className="mt-6 rounded bg-[#f8fafc] p-5 text-sm text-origin-muted">
                Your cart is empty. <Link href="/products" className="font-bold text-[#202329]">View products</Link>.
                {errors.coupon ? <p className="mt-2 text-xs font-semibold text-[#c62828]">{errors.coupon}</p> : null}
              </div>
            ) : (
              <div className="mt-6 grid gap-5">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.dosage}`} className="grid grid-cols-[64px_1fr_auto] items-center gap-3">
                    <div className="relative grid h-20 place-items-center rounded bg-[#f5f7fb]">
                      <Image src={item.image} alt="" width={50} height={70} className="h-[64px] w-auto object-contain" />
                      <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-[#202329] text-[11px] font-bold text-white">{item.quantity}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-black">{item.name}</p>
                      <p className="mt-1 text-xs text-origin-muted">Dosage: {item.dosage}</p>
                    </div>
                    <p className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex gap-2">
              <input
                value={form.coupon}
                onChange={(event) => updateField("coupon", event.target.value)}
                className="h-11 min-w-0 flex-1 rounded-[6px] border border-origin-line px-3 text-sm outline-none focus:border-[#202329]"
                placeholder="Coupon code"
                aria-label="Coupon code"
              />
              <button type="button" className="h-11 rounded-[6px] bg-[#202329] px-4 text-sm font-bold text-white">
                Apply
              </button>
            </div>

            <div className="mt-6 grid gap-3 border-t border-origin-line pt-5">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-black">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </aside>
        </form>
      </main>
      <Footer />
    </>
  );
}
