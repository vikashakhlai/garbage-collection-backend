/*
  Warnings:

  - You are about to drop the column `price` on the `OrderService` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `OrderService` table. All the data in the column will be lost.
  - Added the required column `address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `distance` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "distance" INTEGER NOT NULL,
ADD COLUMN     "floor" INTEGER NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderService" DROP COLUMN "price",
DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "service" ADD COLUMN     "price" INTEGER NOT NULL;
