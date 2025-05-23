/*
  Warnings:

  - Added the required column `worker_type` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service" ADD COLUMN     "worker_type" TEXT NOT NULL;
