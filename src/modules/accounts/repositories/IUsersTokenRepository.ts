import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO"
import { UserToken } from "../infra/typeorm/entities/Usertokens"

interface IUsersTokenRepository {
  create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserToken>
  findByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken>
  deleteById(user_Token_id: string): Promise<void>
  findByRefreshToken(refresh_token: string): Promise<UserToken>
}
export { IUsersTokenRepository }
