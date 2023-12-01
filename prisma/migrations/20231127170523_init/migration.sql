-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hero" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "artificerLevel" INTEGER NOT NULL DEFAULT 0,
    "barbarianLevel" INTEGER NOT NULL DEFAULT 0,
    "bardLevel" INTEGER NOT NULL DEFAULT 0,
    "clericLevel" INTEGER NOT NULL DEFAULT 0,
    "druidLevel" INTEGER NOT NULL DEFAULT 0,
    "fighterLevel" INTEGER NOT NULL DEFAULT 0,
    "monkLevel" INTEGER NOT NULL DEFAULT 0,
    "paladinLevel" INTEGER NOT NULL DEFAULT 0,
    "rangerLevel" INTEGER NOT NULL DEFAULT 0,
    "rogueLevel" INTEGER NOT NULL DEFAULT 0,
    "sorcererLevel" INTEGER NOT NULL DEFAULT 0,
    "warlockLevel" INTEGER NOT NULL DEFAULT 0,
    "wizardLevel" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Hero" ("artificerLevel", "barbarianLevel", "bardLevel", "clericLevel", "druidLevel", "fighterLevel", "id", "monkLevel", "name", "paladinLevel", "race", "rangerLevel", "rogueLevel", "sorcererLevel", "warlockLevel", "wizardLevel") SELECT coalesce("artificerLevel", 0) AS "artificerLevel", coalesce("barbarianLevel", 0) AS "barbarianLevel", coalesce("bardLevel", 0) AS "bardLevel", coalesce("clericLevel", 0) AS "clericLevel", coalesce("druidLevel", 0) AS "druidLevel", coalesce("fighterLevel", 0) AS "fighterLevel", "id", coalesce("monkLevel", 0) AS "monkLevel", "name", coalesce("paladinLevel", 0) AS "paladinLevel", "race", coalesce("rangerLevel", 0) AS "rangerLevel", coalesce("rogueLevel", 0) AS "rogueLevel", coalesce("sorcererLevel", 0) AS "sorcererLevel", coalesce("warlockLevel", 0) AS "warlockLevel", coalesce("wizardLevel", 0) AS "wizardLevel" FROM "Hero";
DROP TABLE "Hero";
ALTER TABLE "new_Hero" RENAME TO "Hero";
CREATE UNIQUE INDEX "Hero_name_key" ON "Hero"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
