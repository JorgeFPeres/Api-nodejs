import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO"
import { UserToken } from "@modules/accounts/infra/typeorm/entities/Usertokens"
import { IUsersTokenRepository } from "../IUsersTokenRepository"

class UsersTokensRepositoryInMemory implements IUsersTokenRepository {
  usersTokens: UserToken[] = []

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token,
    })

    this.usersTokens.push(userToken)
    return userToken
  }

  async findByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      (ut) => ut.user_id === user_id && ut.refresh_token && refresh_token
    )
    return userToken
  }

  async deleteById(user_Token_id: string): Promise<void> {
    const userToken = this.usersTokens.find((ut) => ut.id === user_Token_id)
    this.usersTokens.splice(this.usersTokens.indexOf(userToken))
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      (ut) => ut.refresh_token === refresh_token
    )
    return userToken
  }
}
export { UsersTokensRepositoryInMemory }
