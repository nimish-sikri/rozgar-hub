/*
  Warnings:

  - Made the column `updatedAt` on table `jobs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "jobs" ALTER COLUMN "updatedAt" SET NOT NULL;
