import { getRepository, Repository } from "typeorm"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { Users } from "../../entities/User"
import { IUsersRepository } from "../IUsersRepository"

class UsersRepository implements IUsersRepository {
  private repository: Repository<Users>

  constructor() {
    this.repository = getRepository(Users)
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const { name, email, driver_license, password } = data
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
    })
    await this.repository.save(user)
  }
  async findByEmail(email: string): Promise<Users> {
    const user = this.repository.findOne({ email })
    return user
  }
}
export { UsersRepository }
