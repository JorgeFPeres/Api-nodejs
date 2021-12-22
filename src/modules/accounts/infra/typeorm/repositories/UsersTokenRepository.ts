import { getRepository, Repository } from "typeorm"
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO"
import { Users } from "../entities/User"

import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository"
import { UserToken } from "../entities/Usertokens"
import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO"

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserToken>

  constructor() {
    this.repository = getRepository(UserToken)
  }

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const { user_id, expires_date, refresh_token } = data

    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    })
    await this.repository.save(userToken)
    return userToken
  }
  async findByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const user_tokens = await this.repository.findOne({
      user_id,
      refresh_token,
    })
    return user_tokens
  }
  async deleteById(user_Token_id: string): Promise<void> {
    await this.repository.delete(user_Token_id)
  }
  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const user_tokens = await this.repository.findOne({ refresh_token })
    return user_tokens
  }
}
export { UsersTokenRepository }
