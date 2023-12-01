/*
  Warnings:

  - You are about to drop the column `classId` on the `ClassAtLevel` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClassAtLevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "level" INTEGER NOT NULL,
    "heroId" INTEGER,
    "className" TEXT NOT NULL,
    CONSTRAINT "ClassAtLevel_className_fkey" FOREIGN KEY ("className") REFERENCES "Class" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClassAtLevel_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ClassAtLevel" ("className", "heroId", "id", "level") SELECT "className", "heroId", "id", "level" FROM "ClassAtLevel";
DROP TABLE "ClassAtLevel";
ALTER TABLE "new_ClassAtLevel" RENAME TO "ClassAtLevel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
