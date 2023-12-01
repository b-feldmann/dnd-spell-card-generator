-- CreateTable
CREATE TABLE "Spell" (
    "name" TEXT NOT NULL,
    "className" TEXT NOT NULL,

    PRIMARY KEY ("name", "className"),
    CONSTRAINT "Spell_className_fkey" FOREIGN KEY ("className") REFERENCES "Class" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LearnedSpell" (
    "heroId" INTEGER NOT NULL,
    "spellName" TEXT NOT NULL,
    "spellClassName" TEXT NOT NULL,

    PRIMARY KEY ("heroId", "spellName"),
    CONSTRAINT "LearnedSpell_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LearnedSpell_spellName_spellClassName_fkey" FOREIGN KEY ("spellName", "spellClassName") REFERENCES "Spell" ("name", "className") ON DELETE RESTRICT ON UPDATE CASCADE
);
