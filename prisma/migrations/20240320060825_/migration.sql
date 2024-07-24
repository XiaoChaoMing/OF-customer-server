/*
  Warnings:

  - Made the column `firstName` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Avatar` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthDay` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Sexual` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `firstName` VARCHAR(191) NOT NULL,
    MODIFY `lastName` VARCHAR(191) NOT NULL,
    MODIFY `Avatar` VARCHAR(191) NOT NULL,
    MODIFY `birthDay` DATETIME(3) NOT NULL,
    MODIFY `Sexual` BOOLEAN NOT NULL;
