import { z } from 'zod'

export const UsuarioSchema = z
  .object({
    id: z
      .string()
      .uuid({ message: 'ID inválido, deve ser um UUID' }),

    nome: z
      .string()
      .trim()
      .min(1, { message: 'Nome é obrigatório' })
      .max(100, { message: 'Nome deve ter no máximo 100 caracteres' }),

    email: z
      .string()
      .email({ message: 'Email inválido' })
      .transform((val) => val.toLowerCase()),

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
  .refine(
    (data) => data.createdAt <= data.updatedAt,
    {
      message: 'updatedAt deve ser igual ou posterior a createdAt',
      path: ['updatedAt']
    }
  )

export type UsuarioType = z.infer<typeof UsuarioSchema>
