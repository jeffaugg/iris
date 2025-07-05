import { z } from 'zod'

function isValidCPF (cpf: string): boolean {
  const onlyDigits = cpf.replace(/\D/g, '')
  if (!/^\d{11}$/.test(onlyDigits)) return false
  if (/^(\d)\1{10}$/.test(onlyDigits)) return false

  const calcCheckDigit = (digits: string, factorStart: number) => {
    let total = 0
    for (let i = 0; i < digits.length; i++) {
      total += parseInt(digits[i], 10) * (factorStart - i)
    }
    const rest = (total * 10) % 11
    return rest === 10 ? 0 : rest
  }

  const firstCheck = calcCheckDigit(onlyDigits.slice(0, 9), 10)
  const secondCheck = calcCheckDigit(onlyDigits.slice(0, 10), 11)
  return firstCheck === parseInt(onlyDigits[9], 10) &&
      secondCheck === parseInt(onlyDigits[10], 10)
}

export const ClienteSchema = z
  .object({
    id: z
      .string()
      .uuid({ message: 'ID inválido, deve ser um UUID' }),

    nome: z
      .string()
      .trim()
      .min(1, { message: 'Nome é obrigatório' })
      .max(100, { message: 'Nome deve ter no máximo 100 caracteres' }),

    cpf: z
      .string()
      .refine(val => isValidCPF(val), { message: 'CPF inválido' }),

    email: z
      .string()
      .email({ message: 'Email inválido' })
      .transform(val => val.toLowerCase()),

    observacoes: z
      .string()
      .trim()
      .max(500, { message: 'Observações devem ter no máximo 500 caracteres' })
      .optional(),

    corId: z
      .string()
      .uuid({ message: 'corId deve ser um UUID válido' })
      .nullable()
      .optional(),

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

export type ClienteType = z.infer<typeof ClienteSchema>
