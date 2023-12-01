/*
  Warnings:

  - You are about to drop the column `artificerLevel` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `barbarianLevel` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `bardLevel` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `clericLevel` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `druidLevel` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `fighterLevel` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `monkLevel` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `paladinLevel` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `rangerLevel` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `rogueLevel` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `sorcererLevel` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `warlockLevel` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `wizardLevel` on the `Hero` table. All the data in the column will be lost.
  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `heroId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Class` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ClassAtLevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "level" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "heroId" INTEGER,
    "className" TEXT NOT NULL,
    CONSTRAINT "ClassAtLevel_className_fkey" FOREIGN KEY ("className") REFERENCES "Class" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClassAtLevel_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hero" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "race" TEXT NOT NULL
);
INSERT INTO "new_Hero" ("id", "name", "race") SELECT "id", "name", "race" FROM "Hero";
DROP TABLE "Hero";
ALTER TABLE "new_Hero" RENAME TO "Hero";
CREATE UNIQUE INDEX "Hero_name_key" ON "Hero"("name");
CREATE TABLE "new_Class" (
    "name" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Class" ("name") SELECT "name" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
