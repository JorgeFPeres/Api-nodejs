import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationInMemory } from "@modules/cars/repositories/in-memory/SpecificationInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsInMemory: SpecificationInMemory

describe("Create Car Specification", () => {
  beforeEach(() => {
    specificationsInMemory = new SpecificationInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsInMemory
    )
  })
  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    })

    const specification = await specificationsInMemory.create({
      description: "test",
      name: "test",
    })
    const specifications_id = [specification.id]

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    })

    expect(specificationsCars).toHaveProperty("specifications")
    expect(specificationsCars.specifications).toHaveLength(1)
  })

  it("should be not able to add a new specification to a none exists car", async () => {
    expect(async () => {
      const car_id = "1234"
      const specifications_id = ["54321"]
      await createCarSpecificationUseCase.execute({ car_id, specifications_id })
    }).rejects.toBeInstanceOf(AppError)
  })
})
