-- AlterTable
ALTER TABLE "CustomOrder" ADD COLUMN "backing" TEXT;
ALTER TABLE "CustomOrder" ADD COLUMN "materialCode" TEXT;
ALTER TABLE "CustomOrder" ADD COLUMN "quotedPriceCents" INTEGER;
ALTER TABLE "CustomOrder" ADD COLUMN "sizeCode" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN "backing" TEXT;
ALTER TABLE "Order" ADD COLUMN "country" TEXT;
ALTER TABLE "Order" ADD COLUMN "material" TEXT;
ALTER TABLE "Order" ADD COLUMN "size" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "priceCents" INTEGER,
    "stock" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("createdAt", "id", "name", "priceCents", "slug", "stock", "updatedAt") SELECT "createdAt", "id", "name", "priceCents", "slug", "stock", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
