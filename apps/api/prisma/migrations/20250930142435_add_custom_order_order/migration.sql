/*
  Warnings:

  - Added the required column `kind` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lineLabel` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceCents` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCents` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CustomOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "width" REAL,
    "height" REAL,
    "colors" TEXT,
    "inspirationUrl" TEXT,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "requesterName" TEXT,
    "requesterEmail" TEXT,
    "userId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CustomOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CustomOrder" ("colors", "createdAt", "height", "id", "inspirationUrl", "notes", "status", "updatedAt", "width") SELECT "colors", "createdAt", "height", "id", "inspirationUrl", "notes", "status", "updatedAt", "width" FROM "CustomOrder";
DROP TABLE "CustomOrder";
ALTER TABLE "new_CustomOrder" RENAME TO "CustomOrder";
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kind" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "productId" INTEGER,
    "customOrderId" INTEGER,
    "lineLabel" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "priceCents" INTEGER NOT NULL,
    "taxCents" INTEGER NOT NULL DEFAULT 0,
    "shippingCents" INTEGER NOT NULL DEFAULT 0,
    "totalCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "email" TEXT NOT NULL,
    "address" TEXT,
    "userId" INTEGER,
    "stripeSessionId" TEXT,
    "stripePaymentIntentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Order_customOrderId_fkey" FOREIGN KEY ("customOrderId") REFERENCES "CustomOrder" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("address", "createdAt", "email", "id", "productId", "quantity", "updatedAt", "userId") SELECT "address", "createdAt", "email", "id", "productId", "quantity", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_customOrderId_key" ON "Order"("customOrderId");
CREATE INDEX "Order_productId_idx" ON "Order"("productId");
CREATE INDEX "Order_userId_idx" ON "Order"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
