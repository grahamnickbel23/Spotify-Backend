/*
  Warnings:

  - The primary key for the `deviceIdBlacklist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `secreateKey` on the `user` table. All the data in the column will be lost.
  - Made the column `deviceId` on table `deviceIdBlacklist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `deviceIdBlacklist` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "deviceIdBlacklist" DROP CONSTRAINT "deviceIdBlacklist_userId_fkey";

-- DropIndex
DROP INDEX "deviceIdBlacklist_deviceId_key";

-- DropIndex
DROP INDEX "deviceIdBlacklist_userId_key";

-- AlterTable
ALTER TABLE "deviceIdBlacklist" DROP CONSTRAINT "deviceIdBlacklist_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "deviceId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL,
ADD CONSTRAINT "deviceIdBlacklist_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "deviceIdBlacklist_id_seq";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "secreateKey",
ADD COLUMN     "secretKey" TEXT;

-- CreateTable
CREATE TABLE "deviceList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceName" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deviceList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "deviceList_userId_deviceId_key" ON "deviceList"("userId", "deviceId");

-- AddForeignKey
ALTER TABLE "deviceList" ADD CONSTRAINT "deviceList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deviceIdBlacklist" ADD CONSTRAINT "deviceIdBlacklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
