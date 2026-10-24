-- Defaults preserve the historical totals of orders created before tax and shipping were introduced.
ALTER TABLE "Order"
ADD COLUMN "taxCents" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "shippingCents" INTEGER NOT NULL DEFAULT 0;
