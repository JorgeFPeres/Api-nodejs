import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { AppError } from "@shared/errors/AppError"
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository"
import auth from "@config/auth"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
  refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    const {
      secret_refresh_token,
      expires_in_token,
      secret_token,
      expires_in_refresh_token,
    } = auth
    if (!user) {
      throw new AppError("Email or password incorrect")
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect")
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    })

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    })

    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: this.dateProvider.addDays(30),
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }
