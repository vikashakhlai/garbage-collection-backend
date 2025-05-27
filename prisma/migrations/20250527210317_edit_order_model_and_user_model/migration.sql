/*
  Warnings:

  - You are about to drop the column `is_completed` on the `Order` table. All the data in the column will be lost.
  - Added the required column `hour` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDisassembly` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isHeavy` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'rejected', 'processed', 'completed');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "is_completed",
ADD COLUMN     "hour" INTEGER NOT NULL,
ADD COLUMN     "isDisassembly" BOOLEAN NOT NULL,
ADD COLUMN     "isHeavy" BOOLEAN NOT NULL,
ADD COLUMN     "status" "OrderStatus" NOT NULL,
ALTER COLUMN "comment" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "dimensions" INTEGER;
