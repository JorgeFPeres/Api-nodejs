import { AppError } from "@shared/errors/AppError"
import { Rental } from "../infra/typeorm/entities/Rental"
import { IRentalsRepository } from "../repositories/IRentalsRepository"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

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
    const expectedReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format()
    const dateNow = dayjs().utc().local().format()
    const rentalTime = dayjs(expectedReturnDateFormat).diff(dateNow, "hours")

    if (rentalTime < minimumRentalCarHours) {
      throw new AppError("Invalid return time!")
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    })

    return rental
  }
}

export { CreateRentalUseCase }
