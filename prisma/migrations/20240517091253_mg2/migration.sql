/*
  Warnings:

  - Made the column `userId` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postTypeId` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `FK__Posts__postTypeI__14270015`;

-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `FK__Posts__userId__1332DBDC`;

-- AlterTable
ALTER TABLE `posts` MODIFY `userId` INTEGER NOT NULL,
    MODIFY `postTypeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `FK__Posts__postTypeI__14270015` FOREIGN KEY (`postTypeId`) REFERENCES `PostTypes`(`id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `FK__Posts__userId__1332DBDC` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
