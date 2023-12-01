-- CreateTable
CREATE TABLE "Class" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "heroId" INTEGER,
    CONSTRAINT "Class_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Hero" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "artificerLevel" INTEGER NOT NULL,
    "barbarianLevel" INTEGER NOT NULL,
    "bardLevel" INTEGER NOT NULL,
    "clericLevel" INTEGER NOT NULL,
    "druidLevel" INTEGER NOT NULL,
    "fighterLevel" INTEGER NOT NULL,
    "monkLevel" INTEGER NOT NULL,
    "paladinLevel" INTEGER NOT NULL,
    "rangerLevel" INTEGER NOT NULL,
    "rogueLevel" INTEGER NOT NULL,
    "sorcererLevel" INTEGER NOT NULL,
    "warlockLevel" INTEGER NOT NULL,
    "wizardLevel" INTEGER NOT NULL,
    "Level" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Hero_name_key" ON "Hero"("name");
