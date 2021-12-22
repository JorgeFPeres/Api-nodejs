import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import { hash } from "bcryptjs"
import { inject, injectable } from "tsyringe"

interface IRequest {
  token: string
  password: string
}
@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppError("Token Invalid")
    }

    const is_expired = this.dateProvider.compareIfBefore(
      userToken.expires_date,
      this.dateProvider.dateNow()
    )
    if (is_expired) {
      throw new AppError("Token expired!")
    }

    const user = await this.userRepository.findById(userToken.user_id)
    user.password = await hash(password, 8)

    await this.userRepository.create(user)
    await this.usersTokenRepository.deleteById(userToken.id)
  }
}
export { ResetPasswordUseCase }
