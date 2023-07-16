-- AlterTable
ALTER TABLE `repair` ADD COLUMN `delivered` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `deliveryDate` DATETIME(3) NULL;
