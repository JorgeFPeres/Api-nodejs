import { container } from "tsyringe"
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository"
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository"
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository"
import { SpecificationsRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationRepository"
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository"
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImage"
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository"
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository"
import "@shared/container/providers"

//ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository)

container.registerSingleton<ICarsImageRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
)

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
)
