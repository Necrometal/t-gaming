-- DropForeignKey
ALTER TABLE `ValidationCode` DROP FOREIGN KEY `ValidationCode_userId_fkey`;

-- DropIndex
DROP INDEX `ValidationCode_userId_key` ON `ValidationCode`;

-- AddForeignKey
ALTER TABLE `ValidationCode` ADD CONSTRAINT `ValidationCode_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
