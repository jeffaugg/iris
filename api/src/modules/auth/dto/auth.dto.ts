import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength
} from 'class-validator'

export class AuthDto {
  @IsString({ message: 'cpf deve ser uma string' })
  @IsNotEmpty({ message: 'cpf é obrigatório' })
  @MinLength(8, {
    message: 'senha deve ter pelo menos 8 caracteres'
  })
    senha: string

  @IsNotEmpty({ message: 'email é obrigatório' })
  @IsEmail({}, { message: 'email deve ser um email válido' })
    email: string
}
