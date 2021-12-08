import { IUsersRepository } from "../../repositories/IUsersRepository"
import { inject, injectable } from "tsyringe"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}
  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    await this.userRepository.create({
      name,
      password,
      email,
      driver_license,
    })
  }
}
export { CreateUserUseCase }
