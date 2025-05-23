/*
  Warnings:

  - You are about to drop the column `worker_type` on the `service` table. All the data in the column will be lost.
  - Changed the type of `gender` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `type` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "user_phone_key";

-- AlterTable
ALTER TABLE "service" DROP COLUMN "worker_type";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "worker_type" TEXT,
DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT NOT NULL,
ALTER COLUMN "type" SET NOT NULL;
