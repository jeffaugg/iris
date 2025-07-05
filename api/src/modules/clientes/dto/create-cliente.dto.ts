import { type z } from 'zod'
import { ClienteSchema } from '../../../shared/database/types/Cliente'

export const CreateClienteSchema = ClienteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true
})

export type CreateClienteDto = z.infer<typeof CreateClienteSchema>
