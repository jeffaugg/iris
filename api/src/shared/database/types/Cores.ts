import { z } from 'zod'

export const CoresSchema = z
  .object({
    id: z
      .string()
      .uuid({ message: 'ID inválido, deve ser um UUID' }),

    codigo: z
      .string()
      .trim()
      .min(1, { message: 'Código é obrigatório' })
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        message: 'Código deve ser uma cor hexadecimal válida (ex: #FF0000 ou #F00)'
      }),

    createdAt: z
      .date({
        required_error: 'createdAt é obrigatório',
        invalid_type_error: 'createdAt deve ser uma data ISO válida'
      }),

    updatedAt: z
      .date({
        required_error: 'updatedAt é obrigatório',
        invalid_type_error: 'updatedAt deve ser uma data ISO válida'
      }),

    deletedAt: z
      .date({ invalid_type_error: 'deletedAt deve ser uma data ISO válida ou nulo' })
      .nullable()
  })

export type CoresType = z.infer<typeof CoresSchema>
