-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT 'Random 2025',
    "profileImagelink" TEXT,
    "birthYear" INTEGER,
    "gender" TEXT,
    "language" TEXT NOT NULL DEFAULT 'Hindi, English',
    "location" TEXT,
    "payment" BOOLEAN NOT NULL DEFAULT false,
    "approvedForSongUpload" BOOLEAN NOT NULL DEFAULT false,
    "secreateKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deviceIdBlacklist" (
    "id" SERIAL NOT NULL,
    "deviceId" TEXT,
    "userId" TEXT,

    CONSTRAINT "deviceIdBlacklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "searchBlacklist" (
    "id" SERIAL NOT NULL,
    "words" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "searchBlacklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userEmailBlacklist" (
    "id" SERIAL NOT NULL,
    "emails" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userEmailBlacklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userPasswordBlacklist" (
    "id" SERIAL NOT NULL,
    "passwords" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userPasswordBlacklist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_profileImagelink_key" ON "user"("profileImagelink");

-- CreateIndex
CREATE UNIQUE INDEX "deviceIdBlacklist_deviceId_key" ON "deviceIdBlacklist"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "deviceIdBlacklist_userId_key" ON "deviceIdBlacklist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "searchBlacklist_words_key" ON "searchBlacklist"("words");

-- CreateIndex
CREATE UNIQUE INDEX "userEmailBlacklist_emails_key" ON "userEmailBlacklist"("emails");

-- CreateIndex
CREATE UNIQUE INDEX "userPasswordBlacklist_passwords_key" ON "userPasswordBlacklist"("passwords");

-- AddForeignKey
ALTER TABLE "deviceIdBlacklist" ADD CONSTRAINT "deviceIdBlacklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
