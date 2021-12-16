import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListCarUseCase } from "./ListCarUseCase"

let listCarsUseCase: ListCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
describe("List Cars ", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListCarUseCase(carsRepositoryInMemory)
  })
  it("should be able to list all available cars", async () => {
    const mockCar = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 100,
      license_plate: "BZ2-1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "category_id",
    })
    const cars = await listCarsUseCase.execute({})

    expect(cars).toEqual([mockCar])
  })

  it("should be able to list all available cars by brand", async () => {
    const mockCar = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description",
      daily_rate: 100,
      license_plate: "BZ2-1234",
      fine_amount: 60,
      brand: "brand_test",
      category_id: "category_id",
    })
    const cars = await listCarsUseCase.execute({
      brand: "brand_test",
    })
    expect(cars).toEqual([mockCar])
  })
  it("should be able to list all available cars by name", async () => {
    const mockCar = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description",
      daily_rate: 100,
      license_plate: "BZ2-1234",
      fine_amount: 60,
      brand: "brand_test",
      category_id: "category_id",
    })
    const cars = await listCarsUseCase.execute({
      name: "Car3",
    })
    expect(cars).toEqual([mockCar])
    expect(cars).toHaveLength(1)
  })
  it("should be able to list all available cars by category", async () => {
    const mockCar = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description",
      daily_rate: 100,
      license_plate: "BZ2-1234",
      fine_amount: 60,
      brand: "brand_test",
      category_id: "category_id",
    })
    const cars = await listCarsUseCase.execute({
      category_id: "category_id",
    })
    expect(cars).toEqual([mockCar])
    expect(cars).toHaveLength(1)
  })
})
