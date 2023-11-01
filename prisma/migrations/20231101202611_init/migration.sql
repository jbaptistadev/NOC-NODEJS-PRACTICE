/*
  Warnings:

  - You are about to drop the column `createdAt` on the `LogModel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LogModel" DROP COLUMN "createdAt",
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
