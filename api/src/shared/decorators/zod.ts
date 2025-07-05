import { SetMetadata } from '@nestjs/common'
import { type ZodSchema } from 'zod'
export const ZOD_SCHEMA = 'ZOD_SCHEMA'
export const Zod = (schema: ZodSchema) =>
  SetMetadata(ZOD_SCHEMA, schema)
