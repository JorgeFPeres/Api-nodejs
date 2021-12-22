import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoyInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/dayjsDateProvider"
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "@shared/errors/AppError"
import { SendForgotPasswordUseCase } from "./SendForgotPassworUseCase"

let sendForgotPasswordUseCase: SendForgotPasswordUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    mailProvider = new MailProviderInMemory()
    sendForgotPasswordUseCase = new SendForgotPasswordUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })
  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail")
    await usersRepositoryInMemory.create({
      driver_license: "552342",
      email: "jorge@test.com.br",
      name: "jorge",
      password: "1234",
    })
    await sendForgotPasswordUseCase.execute("jorge@test.com.br")
    expect(sendMail).toHaveBeenCalled()
  })
  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordUseCase.execute("jorge@test.com.br")
    ).rejects.toEqual(new AppError("User dos not exists"))
  })

  it("should be able to create an users token ", async () => {
    const genereteToken = jest.spyOn(userTokensRepositoryInMemory, "create")

    await usersRepositoryInMemory.create({
      driver_license: "552342",
      email: "jorge@test.com.br",
      name: "jorge",
      password: "1234",
    })
    await sendForgotPasswordUseCase.execute("jorge@test.com.br")
    expect(genereteToken).toHaveBeenCalled()
  })
})
