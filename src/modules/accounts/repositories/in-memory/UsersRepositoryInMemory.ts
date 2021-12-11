import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { Users } from "../../entities/User"
import { IUsersRepository } from "../IUsersRepository"

class UsersRepositoryInMemory implements IUsersRepository {
  users: Users[] = []

  async create(data: ICreateUserDTO): Promise<void> {
    const { name, email, driver_license, password } = data
    const user = new Users()

    Object.assign(user, {
      name,
      email,
      driver_license,
      password,
    })

    this.users.push(user)
  }
  async findByEmail(email: string): Promise<Users> {
    return this.users.find((user) => user.email === email)
  }
  async findById(id: string): Promise<Users> {
    return this.users.find((user) => user.id === id)
  }
}

export { UsersRepositoryInMemory }