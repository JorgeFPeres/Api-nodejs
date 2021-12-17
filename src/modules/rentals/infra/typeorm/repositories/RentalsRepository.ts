import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO"
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental"
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { getRepository, Repository } from "typeorm"

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>
  constructor() {
    this.repository = getRepository(Rental)
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    })
    await this.repository.save(rental)
    return rental
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({ car_id })
    return openByCar
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({ user_id })
    return openByCar
  }
  async findById(id: string): Promise<Rental> {
    const rental = this.repository.findOne(id)
    return rental
  }
}

export { RentalsRepository }
