/*
  Warnings:

  - Made the column `heroId` on table `ClassAtLevel` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClassAtLevel" (
    "level" INTEGER NOT NULL,
    "heroId" INTEGER NOT NULL,
    "className" TEXT NOT NULL,

    PRIMARY KEY ("className", "level"),
    CONSTRAINT "ClassAtLevel_className_fkey" FOREIGN KEY ("className") REFERENCES "Class" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClassAtLevel_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClassAtLevel" ("className", "heroId", "level") SELECT "className", "heroId", "level" FROM "ClassAtLevel";
DROP TABLE "ClassAtLevel";
ALTER TABLE "new_ClassAtLevel" RENAME TO "ClassAtLevel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
