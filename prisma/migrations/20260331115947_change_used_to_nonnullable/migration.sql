/*
  Warnings:

  - Made the column `used` on table `ValidationCode` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ValidationCode` MODIFY `used` BOOLEAN NOT NULL DEFAULT false;
