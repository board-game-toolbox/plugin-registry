-- CreateTable
CREATE TABLE `Authority` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `pluginId` VARCHAR(191) NOT NULL,
    `role` ENUM('OWNER', 'MAINTAINER') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Authority` ADD CONSTRAINT `Authority_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Authority` ADD CONSTRAINT `Authority_pluginId_fkey` FOREIGN KEY (`pluginId`) REFERENCES `Plugin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
