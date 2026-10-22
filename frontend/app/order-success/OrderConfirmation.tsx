"use client";

import { apiUrl } from "@/lib/api";
import { readOrderAccessKey, saveOrderAccessKey } from "@/lib/orderAccess";
import Link from "next/link";
import { useEffect, useState } from "react";

const paymentEmail = "support@originrestored.com";

type Address = {
  country: string;
  address: string;
  apartment: string | null;
  city: string;
  district: string;
  postalCode: string;
};

type OrderDetails = {
  orderNumber: string;
  createdAt: string;
  paymentMethod: string;
  status: string;
  customer: { email: string; firstName: string; lastName: string; phone: string };
  billingAddress: Address;
  shippingAddress: Address;
  items: Array<{
    id: string;
    name: string;
    dosage: string;
    quantity: number;
    unitPriceCents: number;
    lineTotalCents: number;
  }>;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
};

function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

function AddressBlock({ address, name }: { address: Address; name: string }) {
  return (
    <address className="mt-3 not-italic leading-7 text-origin-muted">
      <span className="font-semibold text-[#202329]">{name}</span><br />
      {address.address}{address.apartment ? `, ${address.apartment}` : ""}<br />
      {address.city}, {address.district} {address.postalCode}<br />
      {address.country}
    </address>
  );
}

export function OrderConfirmation({ orderNumber }: { orderNumber: string }) {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [error, setError] = useState("");
  const [storageRevision, setStorageRevision] = useState(0);

  useEffect(() => {
    if (!orderNumber) {
      setError("No order number was provided.");
      return;
    }

    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const hashAccessKey = hashParams.get("access") ?? "";
    const storedAccessKey = readOrderAccessKey(orderNumber);
    if (hashAccessKey) saveOrderAccessKey(orderNumber, hashAccessKey);

    const accessKey = hashAccessKey || storedAccessKey;

    if (!accessKey) {
      setError("For your privacy, order details are available only from the browser used to place the order.");
      const handleStorage = (event: StorageEvent) => {
        if (event.key === `order-access:${orderNumber}` && event.newValue) {
          setError("");
          setStorageRevision((revision) => revision + 1);
        }
      };
      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    }

    const controller = new AbortController();

    async function loadOrder() {
      try {
        const response = await fetch(apiUrl(`/orders/${encodeURIComponent(orderNumber)}`), {
          headers: { "x-order-access-key": accessKey },
          signal: controller.signal
        });
        const data = (await response.json().catch(() => null)) as (OrderDetails & { error?: string }) | null;
        if (!response.ok || !data?.orderNumber) throw new Error(data?.error ?? "Order details could not be loaded.");
        setOrder(data);
        if (hashAccessKey) {
          window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
        }
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        setError(loadError instanceof Error ? loadError.message : "Order details could not be loaded.");
      }
    }

    void loadOrder();
    return () => controller.abort();
  }, [orderNumber, storageRevision]);

  if (!order) {
    return (
      <main className="grid min-h-[calc(100vh-360px)] place-items-center bg-origin-cream px-5 pt-[83px] font-sans text-origin-ink">
        <section className="my-16 w-full max-w-2xl rounded-[12px] border border-origin-line bg-white p-8 text-center shadow-[0_18px_55px_rgba(29,36,25,.08)] md:p-12">
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-origin-green">Order Confirmation</p>
          <h1 className="mt-4 text-3xl font-bold text-black">{error ? "We couldn’t display this order" : "Loading your order…"}</h1>
          {error ? <p className="mt-5 leading-7 text-origin-muted">{error}</p> : null}
          {error ? <p className="mt-3 text-sm text-origin-muted">Contact <a className="font-bold text-origin-green underline" href={`mailto:${paymentEmail}`}>{paymentEmail}</a> and include order number <strong>{orderNumber || "not available"}</strong>.</p> : null}
        </section>
      </main>
    );
  }

  const customerName = `${order.customer.firstName} ${order.customer.lastName}`;

  return (
    <main className="bg-origin-cream px-5 pb-20 pt-[115px] font-sans text-origin-ink md:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[14px] border border-origin-line bg-white p-6 shadow-[0_18px_55px_rgba(29,36,25,.08)] md:p-10">
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-origin-green">Order Received</p>
          <div className="mt-3 flex flex-col gap-4 border-b border-origin-line pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-[34px] font-bold leading-tight text-black md:text-[48px]">Thank you for your order</h1>
              <p className="mt-3 max-w-2xl leading-7 text-origin-muted">Your order has been saved and is awaiting payment. It has not been marked as paid.</p>
            </div>
            <span className="w-fit rounded-full border border-[#ccd5b9] bg-[#f3f6ec] px-4 py-2 text-sm font-bold text-origin-green">{order.status}</span>
          </div>

          <dl className="grid gap-5 border-b border-origin-line py-7 sm:grid-cols-2 lg:grid-cols-4">
            <div><dt className="text-xs font-bold uppercase tracking-wider text-origin-muted">Order Number</dt><dd className="mt-2 font-bold text-black">{order.orderNumber}</dd></div>
            <div><dt className="text-xs font-bold uppercase tracking-wider text-origin-muted">Order Date</dt><dd className="mt-2 font-bold text-black">{new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(order.createdAt))}</dd></div>
            <div><dt className="text-xs font-bold uppercase tracking-wider text-origin-muted">Payment Method</dt><dd className="mt-2 font-bold text-black">{order.paymentMethod}</dd></div>
            <div><dt className="text-xs font-bold uppercase tracking-wider text-origin-muted">Payment Status</dt><dd className="mt-2 font-bold text-black">{order.status}</dd></div>
          </dl>

          <div className="py-8">
            <h2 className="text-2xl font-bold text-black">Order details</h2>
            <div className="mt-5 overflow-x-auto rounded-[8px] border border-origin-line">
              <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                <thead className="bg-[#f3f6ec] text-[#202329]"><tr><th className="p-4">Product</th><th className="p-4">Quantity</th><th className="p-4 text-right">Price</th><th className="p-4 text-right">Total</th></tr></thead>
                <tbody>{order.items.map((item) => (
                  <tr key={item.id} className="border-t border-origin-line">
                    <td className="p-4 font-semibold text-black">{item.name}<span className="mt-1 block text-xs font-normal text-origin-muted">Dosage: {item.dosage}</span></td>
                    <td className="p-4">{item.quantity}</td><td className="p-4 text-right">{formatMoney(item.unitPriceCents)}</td><td className="p-4 text-right font-bold">{formatMoney(item.lineTotalCents)}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <dl className="ml-auto mt-5 grid max-w-sm gap-3 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-bold">{formatMoney(order.subtotalCents)}</dd></div>
              <div className="flex justify-between"><dt>Shipping</dt><dd className="font-bold">{formatMoney(order.shippingCents)}</dd></div>
              <div className="flex justify-between border-t border-origin-line pt-3 text-lg"><dt className="font-bold text-black">Total</dt><dd className="font-extrabold text-black">{formatMoney(order.totalCents)}</dd></div>
            </dl>
          </div>

          <section className="rounded-[10px] border border-[#ccd5b9] bg-[#f3f6ec] p-6 md:p-8">
            <h2 className="text-2xl font-bold text-black">Order Confirmation – Interac E-Transfer Payment</h2>
            <p className="mt-4 leading-7">Thank you for your order with <strong>Origin Restored</strong>.</p>
            <p className="mt-4 leading-7">To complete your purchase, please send your payment via <strong>Interac E-Transfer</strong> using the details below:</p>
            <dl className="mt-5 grid gap-3 rounded-[8px] bg-white p-5 text-sm sm:text-base">
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between"><dt className="font-bold">Payment Email:</dt><dd><a className="font-bold text-origin-green underline" href={`mailto:${paymentEmail}`}>{paymentEmail}</a></dd></div>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between"><dt className="font-bold">Amount:</dt><dd className="font-bold">{formatMoney(order.totalCents)}</dd></div>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between"><dt className="font-bold">Payment Reference:</dt><dd className="font-bold">{order.orderNumber}</dd></div>
            </dl>
            <p className="mt-5 leading-7"><strong>Important:</strong> Please include your order number in the e-transfer message to help us identify and process your payment.</p>
            <p className="mt-4 leading-7">Your order will be confirmed to your e-mail, phone number and prepared for shipment once payment has been received.</p>
            <p className="mt-4 leading-7">You will receive a notification when your order has been shipped.</p>
          </section>

          <div className="grid gap-8 border-b border-origin-line py-8 md:grid-cols-2">
            <section><h2 className="text-xl font-bold text-black">Billing Address</h2><AddressBlock address={order.billingAddress} name={customerName} /></section>
            <section><h2 className="text-xl font-bold text-black">Shipping Address</h2><AddressBlock address={order.shippingAddress} name={customerName} /></section>
          </div>

          <section className="pt-8">
            <h2 className="text-2xl font-bold text-black">Customer Support</h2>
            <p className="mt-3 leading-7 text-origin-muted">Have questions about your order, payment, or shipping? Our customer support team is here to help.</p>
            <p className="mt-3"><strong>Email:</strong> <a className="font-bold text-origin-green underline" href={`mailto:${paymentEmail}`}>{paymentEmail}</a></p>
            <p className="mt-3 leading-7 text-origin-muted">Please include your order number when contacting us so we can assist you efficiently.</p>
            <p className="mt-6 leading-7">Thank you for choosing <strong>Origin Restored!</strong><br /><strong>The Origin Restored Team</strong></p>
            <Link href="/products" className="mt-7 inline-grid h-12 place-items-center rounded-full bg-[#202329] px-8 text-sm font-bold text-white transition hover:bg-[#0f1115]">Continue shopping</Link>
          </section>
        </section>
      </div>
    </main>
  );
}
