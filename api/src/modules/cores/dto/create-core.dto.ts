import { CoresSchema } from 'src/shared/database/types/Cores'
import { type z } from 'zod'
export const CreateCoresSchema = CoresSchema.omit(
  {
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true
  }
)

export type CreateCoresDto = z.infer<typeof CreateCoresSchema>
