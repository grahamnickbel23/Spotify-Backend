/*
  Warnings:

  - You are about to drop the column `secretKey` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "deviceList" ADD COLUMN     "secretKey" TEXT,
ALTER COLUMN "deviceName" DROP NOT NULL,
ALTER COLUMN "deviceId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "secretKey";
