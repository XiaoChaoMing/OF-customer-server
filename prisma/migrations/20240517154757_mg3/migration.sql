-- DropForeignKey
ALTER TABLE `postmedia` DROP FOREIGN KEY `FK__PostMedia__PostI__17036CC0`;

-- AddForeignKey
ALTER TABLE `PostMedia` ADD CONSTRAINT `FK__PostMedia__PostI__17036CC0` FOREIGN KEY (`PostId`) REFERENCES `Posts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;