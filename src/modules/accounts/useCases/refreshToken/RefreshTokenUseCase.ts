import auth from "@config/auth"
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import { sign, verify } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"

interface IPayLoad {
  email: string
  sub: string
}
interface ITokenRespomse {
  token: string
  refresh_token: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenRespomse> {
    const { sub, email } = verify(token, auth.secret_refresh_token) as IPayLoad
    const user_id = sub

    const userToken = await this.usersTokenRepository.findByIdAndRefreshToken(
      user_id,
      token
    )

    if (!userToken) {
      throw new AppError("Refresh token does not exists!")
    }
    await this.usersTokenRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    })

    await this.usersTokenRepository.create({
      expires_date: this.dateProvider.addDays(30),
      refresh_token,
      user_id,
    })

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    })

    return { refresh_token, token: newToken }
  }
}
export { RefreshTokenUseCase }
