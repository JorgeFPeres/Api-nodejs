import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import { Rental } from "../infra/typeorm/entities/Rental"
import { IRentalsRepository } from "../repositories/IRentalsRepository"

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumRentalCarHours = 24

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    )

    if (carUnavailable) {
      throw new AppError("Car is unavailable")
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    )
    if (rentalOpenToUser) {
      throw new AppError("There is a rental inprogress for user!")
    }

    const dateNow = this.dateProvider.dateNow()
    const rentalTime = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    )

    if (rentalTime < minimumRentalCarHours) {
      throw new AppError("Invalid return time!")
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    })

    await this.carsRepository.updateAvailable(car_id, false)

    return rental
  }
}

export { CreateRentalUseCase }
