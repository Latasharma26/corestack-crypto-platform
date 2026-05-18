-- CreateTable
CREATE TABLE "UserMetric" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "secretToken" TEXT NOT NULL,
    "serverStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackgroundJob" (
    "id" TEXT NOT NULL,
    "taskTitle" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dispatchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "BackgroundJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMetric_secretToken_key" ON "UserMetric"("secretToken");
