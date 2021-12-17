import { AppError } from "@shared/errors/AppError"
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import dayjs from "dayjs"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/dayjsDateProvider"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjaDateProvider: DayjsDateProvider

describe("Create Rentals", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate()
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjaDateProvider,
      carsRepositoryInMemory
    )
  })
  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "1212",
      expected_return_date: dayAdd24Hours,
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })
  it("should not be able to create a new rental if there is another open rental to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1212",
        expected_return_date: dayAdd24Hours,
      })

      const rental = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1212",
        expected_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
  it("should not be able to create a new rental if there is another open rental to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayAdd24Hours,
      })

      const rental = await createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
