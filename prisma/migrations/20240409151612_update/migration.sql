/*
  Warnings:

  - You are about to drop the column `genero` on the `Genero` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Genero` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Genero" DROP COLUMN "genero",
ADD COLUMN     "nome" TEXT NOT NULL;
