/*
  Warnings:

  - You are about to alter the column `code` on the `ValidationCode` table. The data in that column could be lost. The data in that column will be cast from `UnsignedTinyInt` to `Char(6)`.

*/
-- AlterTable
ALTER TABLE `ValidationCode` MODIFY `code` CHAR(6) NOT NULL;
