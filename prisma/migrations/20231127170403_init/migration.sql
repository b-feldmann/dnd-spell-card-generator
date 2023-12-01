/*
  Warnings:

  - You are about to drop the column `Level` on the `Hero` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hero" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "artificerLevel" INTEGER,
    "barbarianLevel" INTEGER,
    "bardLevel" INTEGER,
    "clericLevel" INTEGER,
    "druidLevel" INTEGER,
    "fighterLevel" INTEGER,
    "monkLevel" INTEGER,
    "paladinLevel" INTEGER,
    "rangerLevel" INTEGER,
    "rogueLevel" INTEGER,
    "sorcererLevel" INTEGER,
    "warlockLevel" INTEGER,
    "wizardLevel" INTEGER
);
INSERT INTO "new_Hero" ("artificerLevel", "barbarianLevel", "bardLevel", "clericLevel", "druidLevel", "fighterLevel", "id", "monkLevel", "name", "paladinLevel", "race", "rangerLevel", "rogueLevel", "sorcererLevel", "warlockLevel", "wizardLevel") SELECT "artificerLevel", "barbarianLevel", "bardLevel", "clericLevel", "druidLevel", "fighterLevel", "id", "monkLevel", "name", "paladinLevel", "race", "rangerLevel", "rogueLevel", "sorcererLevel", "warlockLevel", "wizardLevel" FROM "Hero";
DROP TABLE "Hero";
ALTER TABLE "new_Hero" RENAME TO "Hero";
CREATE UNIQUE INDEX "Hero_name_key" ON "Hero"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
