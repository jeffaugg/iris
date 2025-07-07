-- CreateTable
CREATE TABLE "usuarios" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "observacoes" TEXT,
    "corId" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cores" (
    "id" UUID NOT NULL,
    "codigo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "cores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cpf_key" ON "clientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_corId_fkey" FOREIGN KEY ("corId") REFERENCES "cores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Seed Colors
INSERT INTO "cores" ("id", "codigo", "created_at", "updated_at")
VALUES
    (gen_random_uuid(), '#FF5733', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), '#33FF57', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), '#3357FF', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), '#F0F0F0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), '#000000', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), '#FFFFFF', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);