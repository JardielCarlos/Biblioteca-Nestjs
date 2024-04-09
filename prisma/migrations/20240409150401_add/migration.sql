/*
  Warnings:

  - You are about to drop the column `genero` on the `Livro` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Livro" DROP COLUMN "genero";

-- CreateTable
CREATE TABLE "Genero" (
    "id" SERIAL NOT NULL,
    "genero" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneroLivro" (
    "livroId" INTEGER NOT NULL,
    "generoId" INTEGER NOT NULL,

    CONSTRAINT "GeneroLivro_pkey" PRIMARY KEY ("livroId","generoId")
);

-- AddForeignKey
ALTER TABLE "GeneroLivro" ADD CONSTRAINT "GeneroLivro_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneroLivro" ADD CONSTRAINT "GeneroLivro_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "Genero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
