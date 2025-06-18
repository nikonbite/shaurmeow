/*
  Warnings:

  - You are about to drop the `Story` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoryItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StoryItem" DROP CONSTRAINT "StoryItem_storyId_fkey";

-- AlterTable
ALTER TABLE "ProductItem" ALTER COLUMN "size" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Story";

-- DropTable
DROP TABLE "StoryItem";
