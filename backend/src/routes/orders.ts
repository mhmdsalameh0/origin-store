import { Prisma } from "@prisma/client";
import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const pendingPaymentStatus = "Pending Payment";

type OrderItemInput = {
  productId?: unknown;
  slug?: unknown;
  name?: unknown;
  image?: unknown;
  dosage?: unknown;
  price?: unknown;
  quantity?: unknown;
};

type OrderRequestBody = {
  idempotencyKey?: unknown;
  customer?: {
    email?: unknown;
    firstName?: unknown;
    lastName?: unknown;
    phone?: unknown;
  };
  delivery?: {
    country?: unknown;
    address?: unknown;
    apartment?: unknown;
    city?: unknown;
    district?: unknown;
    postalCode?: unknown;
  };
  notes?: unknown;
  items?: unknown;
};

type SavedOrder = Prisma.OrderGetPayload<{ include: { items: true } }>;
type OrderEmailStatus = {
  customerEmailStatus: "Pending" | "Sent" | "Failed";
  ownerEmailStatus: "Pending" | "Sent" | "Failed";
};

export const ordersRouter = Router();

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function cleanString(value: unknown) {
  return isString(value) ? value.trim() : "";
}

function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(cents / 100);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function generateOrderNumber() {
  const date = new Date();
  const stamp = [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0")
  ].join("");
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();

  return `OP-${stamp}-${suffix}`;
}

function safeErrorDetails(error: unknown) {
  if (!(error instanceof Error)) {
    return { name: "UnknownError", message: "Unknown error" };
  }

  const code = "code" in error && typeof error.code === "string" ? error.code : undefined;
  const message = error.message.includes("Can't reach database server")
    ? "Can't reach database server"
    : error.message.includes("Resend email failed")
      ? error.message.replace(/Resend email failed: (\d+).*/s, "Resend email failed: $1")
      : error.message;

  return {
    name: error.name,
    ...(code ? { code } : {}),
    message
  };
}

function isDatabaseConnectionError(error: unknown) {
  return error instanceof Error && error.name === "PrismaClientInitializationError";
}

function logOrderError(stage: string, error: unknown) {
  console.error("Order request failed", {
    stage,
    ...safeErrorDetails(error)
  });
}

async function createUniqueOrderNumber() {
  for (let index = 0; index < 5; index += 1) {
    const orderNumber = generateOrderNumber();
    const existingOrder = await prisma.order.findUnique({ where: { orderNumber } });

    if (!existingOrder) {
      return orderNumber;
    }
  }

  throw new Error("Unable to generate unique order number");
}

function validateOrderPayload(body: OrderRequestBody) {
  const customer = body.customer ?? {};
  const delivery = body.delivery ?? {};
  const rawItems = Array.isArray(body.items) ? (body.items as OrderItemInput[]) : [];

  const idempotencyKey = cleanString(body.idempotencyKey);
  const email = cleanString(customer.email).toLowerCase();
  const firstName = cleanString(customer.firstName);
  const lastName = cleanString(customer.lastName);
  const phone = cleanString(customer.phone);
  const country = cleanString(delivery.country);
  const address = cleanString(delivery.address);
  const apartment = cleanString(delivery.apartment);
  const city = cleanString(delivery.city);
  const district = cleanString(delivery.district);
  const postalCode = cleanString(delivery.postalCode);
  const notes = cleanString(body.notes);

  const errors: Record<string, string> = {};

  if (!idempotencyKey) errors.idempotencyKey = "Order submission key is required.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "A valid contact email is required.";
  if (!firstName) errors.firstName = "First name is required.";
  if (!lastName) errors.lastName = "Last name is required.";
  if (!phone) errors.phone = "Phone number is required.";
  if (!country) errors.country = "Country/region is required.";
  if (!address) errors.address = "Address is required.";
  if (!city) errors.city = "City is required.";
  if (!district) errors.district = "District/state is required.";
  if (!postalCode) errors.postalCode = "Postal code is required.";
  if (rawItems.length === 0) errors.items = "Your cart is empty. Add a product before checkout.";

  const items = rawItems
    .map((item) => {
      const unitPriceCents = Number(item.price);
      const quantity = Math.floor(Number(item.quantity));

      return {
        productId: cleanString(item.productId),
        slug: cleanString(item.slug),
        name: cleanString(item.name),
        image: cleanString(item.image) || null,
        dosage: cleanString(item.dosage),
        quantity,
        unitPriceCents,
        lineTotalCents: unitPriceCents * quantity
      };
    })
    .filter((item) => item.productId && item.slug && item.name && item.dosage && item.quantity > 0 && item.unitPriceCents >= 0);

  if (rawItems.length > 0 && items.length !== rawItems.length) {
    errors.items = "Every cart item must include a product, dosage, quantity, and price.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false as const, errors };
  }

  const subtotalCents = items.reduce((sum, item) => sum + item.lineTotalCents, 0);

  return {
    ok: true as const,
    order: {
      idempotencyKey,
      customerEmail: email,
      firstName,
      lastName,
      phone,
      country,
      address,
      apartment: apartment || null,
      city,
      district,
      postalCode,
      notes: notes || null,
      subtotalCents,
      totalCents: subtotalCents,
      items
    }
  };
}

function orderRows(order: SavedOrder) {
  return order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:12px;border-bottom:1px solid #e7e2f3;">${escapeHtml(item.name)}</td>
          <td style="padding:12px;border-bottom:1px solid #e7e2f3;">${escapeHtml(item.dosage)}</td>
          <td style="padding:12px;border-bottom:1px solid #e7e2f3;text-align:center;">${item.quantity}</td>
          <td style="padding:12px;border-bottom:1px solid #e7e2f3;text-align:right;">${formatMoney(item.unitPriceCents)}</td>
          <td style="padding:12px;border-bottom:1px solid #e7e2f3;text-align:right;">${formatMoney(item.lineTotalCents)}</td>
        </tr>
      `
    )
    .join("");
}

function emailShell(title: string, body: string) {
  return `
    <!doctype html>
    <html>
      <body style="margin:0;background:#f7f5fb;font-family:Manrope,Arial,sans-serif;color:#202329;">
        <div style="padding:28px 16px;">
          <div style="max-width:720px;margin:0 auto;overflow:hidden;border-radius:18px;background:#ffffff;border:1px solid #e5def5;box-shadow:0 18px 48px rgba(38,31,57,.08);">
            <div style="background:linear-gradient(135deg,#191a22,#22202d 55%,#171820);padding:26px 30px;color:#ffffff;">
              <div style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#dbcaff;font-weight:800;">Origin Peptides</div>
              <h1 style="margin:10px 0 0;font-size:28px;line-height:1.15;">${escapeHtml(title)}</h1>
            </div>
            <div style="padding:28px 30px;">
              ${body}
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function ownerEmailHtml(order: SavedOrder) {
  const address = [order.address, order.apartment, order.city, order.district, order.postalCode, order.country].filter(Boolean).join(", ");
  const createdAt = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(order.createdAt);

  return emailShell(
    `New Order ${order.orderNumber}`,
    `
      <p style="margin:0 0 18px;font-size:16px;line-height:1.6;">A new order was saved successfully and is awaiting payment confirmation.</p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 22px;font-size:14px;">
        <tr><td style="padding:6px 0;color:#697386;">Order number</td><td style="padding:6px 0;text-align:right;font-weight:800;">${escapeHtml(order.orderNumber)}</td></tr>
        <tr><td style="padding:6px 0;color:#697386;">Date</td><td style="padding:6px 0;text-align:right;">${escapeHtml(createdAt)}</td></tr>
        <tr><td style="padding:6px 0;color:#697386;">Status</td><td style="padding:6px 0;text-align:right;font-weight:800;color:#7650d8;">${escapeHtml(order.status)}</td></tr>
      </table>
      <h2 style="font-size:18px;margin:0 0 10px;">Customer</h2>
      <p style="margin:0 0 22px;line-height:1.7;color:#4d5563;">
        ${escapeHtml(order.firstName)} ${escapeHtml(order.lastName)}<br />
        ${escapeHtml(order.customerEmail)}<br />
        ${escapeHtml(order.phone)}<br />
        ${escapeHtml(address)}
      </p>
      <h2 style="font-size:18px;margin:0 0 10px;">Products</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#f7f3ff;color:#202329;">
            <th style="padding:12px;text-align:left;">Product</th>
            <th style="padding:12px;text-align:left;">Dosage</th>
            <th style="padding:12px;text-align:center;">Qty</th>
            <th style="padding:12px;text-align:right;">Unit</th>
            <th style="padding:12px;text-align:right;">Line</th>
          </tr>
        </thead>
        <tbody>${orderRows(order)}</tbody>
      </table>
      <table style="width:100%;border-collapse:collapse;margin-top:18px;font-size:15px;">
        <tr><td style="padding:6px 0;color:#697386;">Subtotal</td><td style="padding:6px 0;text-align:right;font-weight:800;">${formatMoney(order.subtotalCents)}</td></tr>
        <tr><td style="padding:6px 0;color:#202329;font-weight:800;">Total</td><td style="padding:6px 0;text-align:right;font-size:20px;font-weight:900;">${formatMoney(order.totalCents)}</td></tr>
      </table>
      <h2 style="font-size:18px;margin:22px 0 10px;">Order Notes</h2>
      <p style="margin:0;line-height:1.7;color:#4d5563;">${escapeHtml(order.notes ?? "No notes provided.")}</p>
    `
  );
}

function customerEmailHtml(order: SavedOrder) {
  const address = [order.address, order.apartment, order.city, order.district, order.postalCode, order.country].filter(Boolean).join(", ");

  return emailShell(
    `Thank you for your order`,
    `
      <p style="margin:0 0 18px;font-size:16px;line-height:1.6;">Thank you for your order. We received your request and our team will contact you regarding payment and confirmation.</p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 22px;font-size:14px;">
        <tr><td style="padding:6px 0;color:#697386;">Order number</td><td style="padding:6px 0;text-align:right;font-weight:800;">${escapeHtml(order.orderNumber)}</td></tr>
        <tr><td style="padding:6px 0;color:#697386;">Status</td><td style="padding:6px 0;text-align:right;font-weight:800;color:#7650d8;">${escapeHtml(order.status)}</td></tr>
      </table>
      <h2 style="font-size:18px;margin:0 0 10px;">Order Summary</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#f7f3ff;color:#202329;">
            <th style="padding:12px;text-align:left;">Product</th>
            <th style="padding:12px;text-align:left;">Dosage</th>
            <th style="padding:12px;text-align:center;">Qty</th>
            <th style="padding:12px;text-align:right;">Unit</th>
            <th style="padding:12px;text-align:right;">Line</th>
          </tr>
        </thead>
        <tbody>${orderRows(order)}</tbody>
      </table>
      <p style="margin:18px 0 0;text-align:right;font-size:20px;font-weight:900;">Total: ${formatMoney(order.totalCents)}</p>
      <h2 style="font-size:18px;margin:22px 0 10px;">Delivery Information</h2>
      <p style="margin:0;line-height:1.7;color:#4d5563;">${escapeHtml(order.firstName)} ${escapeHtml(order.lastName)}<br />${escapeHtml(address)}</p>
    `
  );
}

async function sendResendEmail({ html, subject, to }: { html: string; subject: string; to: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    throw new Error("Email is not configured. Set RESEND_API_KEY and EMAIL_FROM.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ from, to, subject, html })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend email failed: ${response.status} ${errorText}`);
  }
}

async function sendOrderEmails(order: SavedOrder): Promise<OrderEmailStatus> {
  const ownerEmail = process.env.ORDER_NOTIFICATION_EMAIL;

  if (!ownerEmail) {
    const message = "ORDER_NOTIFICATION_EMAIL is not configured.";
    await prisma.order.update({
      where: { id: order.id },
      data: {
        ownerEmailStatus: "Failed",
        customerEmailStatus: "Pending",
        emailError: message
      }
    });
    console.error("Order email failed", {
      orderNumber: order.orderNumber,
      stage: "email_configuration",
      message
    });
    return { ownerEmailStatus: "Failed", customerEmailStatus: "Pending" };
  }

  const results = await Promise.allSettled([
    sendResendEmail({
      to: ownerEmail,
      subject: `New Origin Peptides Order ${order.orderNumber}`,
      html: ownerEmailHtml(order)
    }),
    sendResendEmail({
      to: order.customerEmail,
      subject: `Origin Peptides order confirmation ${order.orderNumber}`,
      html: customerEmailHtml(order)
    })
  ]);

  const ownerResult = results[0];
  const customerResult = results[1];
  const errors = results
    .filter((result): result is PromiseRejectedResult => result.status === "rejected")
    .map((result) => (result.reason instanceof Error ? result.reason.message : String(result.reason)));

  await prisma.order.update({
    where: { id: order.id },
    data: {
      ownerEmailStatus: ownerResult.status === "fulfilled" ? "Sent" : "Failed",
      customerEmailStatus: customerResult.status === "fulfilled" ? "Sent" : "Failed",
      emailError: errors.length > 0 ? errors.join("\n").slice(0, 4000) : null
    }
  });

  if (errors.length > 0) {
    console.error("Order email failed", {
      orderNumber: order.orderNumber,
      stage: "email_sending",
      errors: errors.map((error) => error.replace(/Resend email failed: (\d+).*/s, "Resend email failed: $1"))
    });
  }

  return {
    ownerEmailStatus: ownerResult.status === "fulfilled" ? "Sent" : "Failed",
    customerEmailStatus: customerResult.status === "fulfilled" ? "Sent" : "Failed"
  };
}

ordersRouter.post("/", async (req, res) => {
  const validation = validateOrderPayload(req.body as OrderRequestBody);

  if (!validation.ok) {
    res.status(400).json({ error: "Validation failed", fields: validation.errors });
    return;
  }

  try {
    const existingOrder = await prisma.order.findUnique({
      where: { idempotencyKey: validation.order.idempotencyKey },
      include: { items: true }
    });

    if (existingOrder) {
      res.json({ orderNumber: existingOrder.orderNumber, duplicate: true });
      return;
    }

    const orderNumber = await createUniqueOrderNumber();

    const order = await prisma.$transaction((tx) =>
      tx.order.create({
        data: {
          orderNumber,
          status: pendingPaymentStatus,
          idempotencyKey: validation.order.idempotencyKey,
          customerEmail: validation.order.customerEmail,
          firstName: validation.order.firstName,
          lastName: validation.order.lastName,
          phone: validation.order.phone,
          country: validation.order.country,
          address: validation.order.address,
          apartment: validation.order.apartment,
          city: validation.order.city,
          district: validation.order.district,
          postalCode: validation.order.postalCode,
          notes: validation.order.notes,
          subtotalCents: validation.order.subtotalCents,
          totalCents: validation.order.totalCents,
          items: {
            create: validation.order.items
          }
        },
        include: { items: true }
      })
    );

    let emailStatus: OrderEmailStatus = { ownerEmailStatus: "Pending", customerEmailStatus: "Pending" };

    try {
      emailStatus = await sendOrderEmails(order);
    } catch (emailError) {
      logOrderError("email_status_update", emailError);
    }

    res.status(201).json({
      orderNumber: order.orderNumber,
      email: emailStatus
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      const duplicateOrder = await prisma.order.findUnique({
        where: { idempotencyKey: validation.order.idempotencyKey },
        include: { items: true }
      });

      if (duplicateOrder) {
        res.json({ orderNumber: duplicateOrder.orderNumber, duplicate: true });
        return;
      }
    }

    const databaseUnavailable = isDatabaseConnectionError(error);
    logOrderError(databaseUnavailable ? "database_connection" : "database_save", error);
    res.status(databaseUnavailable ? 503 : 500).json({
      error: databaseUnavailable
        ? "Order service cannot reach the database. Please try again soon."
        : "Order could not be saved. Please try again.",
      code: databaseUnavailable ? "DATABASE_UNAVAILABLE" : "ORDER_SAVE_FAILED"
    });
  }
});
