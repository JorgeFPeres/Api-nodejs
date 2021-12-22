import { AppError } from "@shared/errors/AppError"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoyInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/dayjsDateProvider"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })
  it("should be able to authenticate an user ", async () => {
    const user: ICreateUserDTO = {
      driver_license: "1234",
      email: "jorge-peres@live.com",
      password: "0000",
      name: "Jorge",
    }

    await createUserUseCase.execute(user)
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty("token")
  })

  it("should not be able to authenticate an nonexixtent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "000",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"))
  })
  //#endregion
  it("should no be able to authenticate with wrong password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "1234",
      email: "jorge-peres@live.com",
      password: "0000",
      name: "Jorge",
    }

    await createUserUseCase.execute(user)
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "1234",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"))
  })
})
