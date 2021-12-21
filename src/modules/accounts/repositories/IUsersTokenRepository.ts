import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO"
import { UserToken } from "../infra/typeorm/entities/Usertokens"

interface IUsersTokenRepository {
  create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserToken>
}
export { IUsersTokenRepository }
