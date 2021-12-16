import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController"
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController"
import { ListCarController } from "@modules/cars/useCases/listAvailableCar/ListCarController"
import { Router } from "express"
import { ensureAdmin } from "../middlewares/ensureAdmin"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listCarController = new ListCarController()
const createCarSpecificationController = new CreateCarSpecificationController()

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
)

carsRoutes.get("/available", listCarController.handle)
carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
)

export { carsRoutes }
