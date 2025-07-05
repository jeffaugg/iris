import { type AuthDto } from '../dto/auth.dto'

export interface IAuthService {
  authenticate: (authDto: AuthDto) => Promise<{ token: string }>
}
