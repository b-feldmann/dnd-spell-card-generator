/*
  Warnings:

  - You are about to drop the column `race` on the `Hero` table. All the data in the column will be lost.
  - Added the required column `raceName` to the `Hero` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Race" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hero" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "raceName" TEXT NOT NULL,
    CONSTRAINT "Hero_raceName_fkey" FOREIGN KEY ("raceName") REFERENCES "Race" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Hero" ("id", "name") SELECT "id", "name" FROM "Hero";
DROP TABLE "Hero";
ALTER TABLE "new_Hero" RENAME TO "Hero";
CREATE UNIQUE INDEX "Hero_name_key" ON "Hero"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Race_name_key" ON "Race"("name");
